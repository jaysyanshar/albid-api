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
        if (req.headers['user-role'] == 'bidan') {
            next()
        } else {
            let error = { message: 'Unauthorized role.' }
            res.status(405).send(baseResponse.error(res, error)).json().end()
        }
    // Update Pasien Profile with specific role
    } else if (req.method == 'PUT') {
        if (req.headers['user-role'] == 'bidan') {
            if (req.body.password != null) {
                let error = { message: 'Cannot change Pasien\'s password while using Bidan role.' }
                res.status(405).send(baseResponse.error(res, error)).json().end()
            } else {
                next()
            }
        } else if (req.headers['user-role'] == 'pasien') {
            if (Object.keys(req.query).length !== 0) {
                let error = { message: 'Cannot change profile using query-params while using Pasien role.' }
                res.status(405).send(baseResponse.error(res, error)).json().end()
            } else {
                req.query = { _id: req.headers['user-id'] }
                next()
            }
        } else {
            let error = { message: 'Unauthorized role.' }
            res.status(405).send(baseResponse.error(res, error)).json().end()
        }
    } else if (req.method == 'DELETE') {
        if (req.headers['user-role'] == 'pasien') {
            req.query = { _id: req.headers['user-id'] }
            next()
        } else {
            let error = { message: 'Unauthorized role.' }
            res.status(405).send(baseResponse.error(res, error)).json().end()
        }
    } else {
        next()
    }
})

// Get Pasien Profile List (bidan access only)
const getPasienList = (req, res) => {
    if (req.headers['user-role'] == 'bidan') {
        crud.readMany(req, res, Pasien)
    } else {
        let error = { message: 'Unauthorized role.' }
        res.status(405).send(baseResponse.error(res, error)).json().end()
    }
}

// Delete Account
const deletePasienAccount = (req, res) => {
    Pasien.findOneAndDelete(req.query)
    .then(doc => {
        Session.deleteOne({ userId: doc._id, isBidan: false })
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
// Register
router.post('/', (req, res) => crud.createOne(req, res, Pasien))
// Get Pasien Profile Detail
router.get('/', (req, res) => crud.readOne(req, res, Pasien))
// Get Pasien Profile List (bidan only)
router.get('/list', (req, res) => getPasienList(req, res))
// Update Pasien Profile
router.put('/', (req, res) => crud.updateOne(req, res, Pasien))
// Delete Account
router.delete('/', (req, res) => deletePasienAccount(req, res))

module.exports = router