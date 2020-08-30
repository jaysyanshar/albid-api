const express = require('express')
const validator = require('../app_modules/validator')
const crud = require('../app_modules/crud')

const RekamMedis = require('../models/RekamMedis')
const Bidan = require('../models/Bidan')
const Pasien = require('../models/Pasien')
const { role } = require('../app_modules/app-enums')
const baseResponse = require('../app_modules/base-response')
const { rekamMedisEnums } = require('../app_modules/model-enums')
const AsesmenAwal = require('../models/AsesmenAwal')
const AntenatalCare = require('../models/AntenatalCare')
const jenisPemeriksaan = rekamMedisEnums.pemeriksaan

const router = express.Router()

// Middleware
router.use(validator.sessionChecker)
router.use((req, res, next) => {
    if (req.method == 'POST') {
        // bidan-only
        validator.roleChecker(req, res, next, role.bidan, {
            ifTrue: () => {
                Bidan.findOne({ _id: req.body.idBidan }, '_id')
                .then(doc => {
                    if (doc == undefined) throw Error('Bidan not found.')
                    else {
                        Pasien.findOne({ _id: req.body.idPasien }, '_id')
                        .then(doc => {
                            if (doc == undefined) throw Error('Pasien not found.')
                            else next()
                        })
                        .catch(err => {
                            if (err == 'Error: Pasien not found.') res.status(404)
                            else res.status(500)
                            res.send(baseResponse.error(res, err)).json().end()
                        })
                    }
                })
                .catch(err => {
                    if (err == 'Error: Bidan not found.') res.status(404)
                    else res.status(500)
                    res.send(baseResponse.error(res, err)).json().end()
                })
            }
        })
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
        validator.roleChecker(req, res, next, role.bidan, {})
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
router.delete('/', (req, res) => {
    RekamMedis.findOne(req.query, 'jenisPemeriksaan')
    .then(doc => {
        if (doc.jenisPemeriksaan == jenisPemeriksaan.asesmenAwal) {
            AsesmenAwal.findOneAndDelete({ idRekamMedis: req.query._id })
            .then(doc => {})
            .catch(err => {})
        }
        if (doc.jenisPemeriksaan == jenisPemeriksaan.anc) {
            AntenatalCare.findOneAndDelete({ idRekamMedis: req.query._id })
            .then(doc => {})
            .catch(err => {})
        }
        crud.deleteOne(req, res, RekamMedis)
    })
    .catch(err => {
        res.status(500)
        res.send(baseResponse.error(res, err)).json().end()
    })
})

module.exports = router