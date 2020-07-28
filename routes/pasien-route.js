const express = require('express')
const crud = require('../app_modules/crud')

const Pasien = require('../models/Pasien')
const validator = require('../app_modules/validator')
const Session = require('../models/Session')
const baseResponse = require('../app_modules/base-response')
const router = express.Router()

// Middleware
router.use(validator.sessionChecker)
router.use((req, res, next) => {
    // only bidan that can register pasien
    if (req.method == 'POST') {
        Session.findOne({ _id: req.headers['session-id'] })
        .then(doc => {
            if (doc == null) { throw Error('Session not found.') }
            if (doc.isBidan) {
                next()
            } else {
                throw Error('Unauthorized method.')
            }
        })
        .catch(err => {
            if (err == 'Error: Session not found.') {
                res.status(401)
            } else if (err == 'Error: Unauthorized method.') {
                res.status(405)
            } else {
                res.status(500)
            }
            res.send(baseResponse.error(res, err)).json().end()
        })
    } else {
        next()
    }
})

// Get Pasien Profile List (bidan access only)
const getPasienList = (req, res) => {
    Session.findOne({ _id: req.headers['session-id'] })
    .then(doc => {
        if (doc == null) { throw Error('Session not found.') }
        if (doc.isBidan) {
            crud.readMany(req, res, Pasien)
        } else {
            throw Error('Unauthorized method.')
        }
    })
    .catch(err => {
        if (err == 'Error: Session not found.') {
            res.status(401)
        } else if (err == 'Error: Unauthorized method.') {
            res.status(405)
        } else {
            res.status(500)
        }
        res.send(baseResponse.error(res, err)).json().end()
    })
}

// EXPRESS HTTP METHODS
// Register
router.post('/', (req, res) => crud.createOne(req, res, Pasien))
// Get Pasien Profile Detail
router.get('/', (req, res) => crud.readOne(req, res, Pasien))
// Get Pasien Profile List (bidan only)
router.get('/list', (req, res) => getPasienList(req, res))
// Update Pasien Profile
// TODO
router.put('/', (req, res) => crud.updateOne(req, res, Pasien))
router.delete('/', (req, res) => crud.deleteOne(req, res, Pasien))

module.exports = router