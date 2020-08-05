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
        // bidan-only
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
        // bidan-only
        validator.roleChecker(req, res, next, role.bidan, {
            ifTrue: () => {
                // can only update the penanggungJawab attribute
                delete req.body.idBidan
                delete req.body.idPasien
                delete req.body.tanggalKunjungan
                delete req.body.perujuk
                delete req.body.jenisPemeriksaan
                next()
            }
        })
    }
    else if (req.method == 'DELETE') {
        err = { message: 'Medical Record can not be deleted.' }
        res.status(405).send(baseResponse.error(res, err)).json().end()
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
// router.delete('/', (req, res) => crud.deleteOne(req, res, RekamMedis))

module.exports = router