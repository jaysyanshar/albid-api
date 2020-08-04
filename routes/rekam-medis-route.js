const express = require('express')
const validator = require('../app_modules/validator')
const crud = require('../app_modules/crud')

const RekamMedis = require('../models/RekamMedis')
const { role } = require('../app_modules/app-enums')
const baseResponse = require('../app_modules/base-response')

const router = express.Router()

// Middleware
router.use(validator.sessionChecker)
router.use((req, res, next) => {
    if (req.method == 'POST') {
        validator.roleChecker(req, res, next, role.bidan, {})
    }
    else if (req.method == 'GET') {
        validator.roleChecker(req, res, next, role.bidan, {
            ifFalse: () => {
                validator.roleChecker(req, res, next, role.pasien, {
                    ifTrue: () => {
                        req.query.idPasien = req.headers['user-id']
                        next()
                    }
                })
            }
        })
    }
    else if (req.method == 'PUT') {
        // TODO
        next()
    }
    else {
        next()
    }
})

// HTTP METHODS
router.post('/', (req, res) => crud.createOne(req, res, RekamMedis))
router.get('/', (req, res) => crud.readOne(req, res, RekamMedis))
router.get('/list', (req, res) => crud.readMany(req, res, RekamMedis))
router.put('/', (req, res) => crud.updateOne(req, res, RekamMedis))
router.delete('/', (req, res) => crud.deleteOne(req, res, RekamMedis))

module.exports = router