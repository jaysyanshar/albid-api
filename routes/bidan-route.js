const express = require('express')
const crud = require('../app_modules/crud')

const Bidan = require('../models/Bidan')
const validator = require('../app_modules/validator')
const Session = require('../models/Session')
const baseResponse = require('../app_modules/base-response')
const router = express.Router()

// Middleware
router.use((req, res, next) => {
    if (req.method == 'POST') {
        // if sign up, simply do next()
        next()
    } else {
        // if update, get, delete, check the session
        validator.sessionChecker(req, res, next)
    }
})
router.use((req, res, next) => {
    if ((req.method == 'PUT') || (req.method == 'DELETE')) {
        Session.findOne({ _id: req.headers['session-id'] })
        .then(doc => {
            if (doc != null) {
                if (doc.isBidan) {
                    req.query = { _id: doc.userID }
                    next()
                } else {
                    throw Error('Unauthorized role.')
                }
            } else {
                throw Error('No document found.')
            }
        })
        .catch(err => {
            if (err == 'Error: No document found.') {
                res.status(404)
            } else if (err == 'Error: Unauthorized role.') {
                res.status(403)
            } else {
                res.status(500)
            }
            res.send(baseResponse.error(res, err)).json().end()
        })
    } else {
        next()
    }
})

const deleteAccount = (req, res) => {
    Bidan.findOneAndDelete(req.query)
    .then(doc => {
        Session.deleteOne({ userID: doc._id, isBidan: true })
        .then(_ => {
            res.status(200).send(baseResponse.ok(res, doc)).json().end()
        })
        .catch(sessionError => {
            res.status(400).send(baseResponse.error(res, sessionError)).json().end()
        })
    })
    .catch(err => {
        res.status(400).send(baseResponse.error(res, err)).end()
    })
}

// EXPRESS HTTP METHODS
// Sign Up
router.post('/', (req, res) => crud.createOne(req, res, Bidan))
// Get Bidan Profile Detail
router.get('/', (req, res) => crud.readOne(req, res, Bidan))
// Get Bidan Profile List
router.get('/list', (req, res) => crud.readMany(req, res, Bidan))
// Update Profile
router.put('/', (req, res) => crud.updateOne(req, res, Bidan))
// Delete Account
router.delete('/', (req, res) => deleteAccount(req, res))

module.exports = router