const express = require('express')
const validator = require('../app_modules/validator')
const { role } = require('../app_modules/app-enums')
const { rekamMedisEnums } = require('../app_modules/model-enums')

const RekamMedis = require('../models/RekamMedis')
const PemeriksaanBayi = require('../models/PemeriksaanBayi')
const crud = require('../app_modules/crud')
const baseResponse = require('../app_modules/base-response')

const router = express.Router()

router.use(validator.sessionChecker)
router.use((req, res, next) => {
    if (req.method == 'POST') {
        validator.roleChecker(req, res, next, role.bidan, {})
    }
    else if (req.method == 'PUT') {
        validator.roleChecker(req, res, next, role.bidan, {})
    }
    else if (req.method == 'GET') {
        next()
    }
    else if (req.method == 'DELETE') {
        let err = {
            message: 'Can not delete sub-document. Please delete the RekamMedis instead to delete this document.'
        }
        res.status(403).send(baseResponse.error(res, err)).json().end()
    }
    else {
        next()
    }
})

router.post('/', (req, res) => {
    RekamMedis.findOne({ _id: req.body.idRekamMedis }, 'jenisPemeriksaan')
    .then(doc => {
        if (doc == null) { throw Error('Retrieved document is null.') }
        if (doc.jenisPemeriksaan != rekamMedisEnums.pemeriksaan.pemeriksaanBayi) {
            throw Error('Invalid reference ID.')
        }
        else {
            PemeriksaanBayi.findOne({ idRekamMedis: doc._id }, 'idRekamMedis')
            .then(doc => {
                if (doc == undefined) {
                    crud.createOne(req, res, PemeriksaanBayi)
                }
                else throw Error('This document already exist, use update instead.')
            })
            .catch(err => {
                if (err == 'Error: This document already exist, use update instead.') res.status(409)
                else res.status(500)
                res.send(baseResponse.error(res, err)).json().end()
            })
        }
    })
    .catch(err => {
        if (err == 'Error: Retrieved document is null.') res.status(404)
        else if (err == 'Error: Invalid reference ID.') res.status(412)
        else res.status(500)
        res.send(baseResponse.error(res, err)).json().end()
    })
})

router.put('/', (req, res) => { crud.updateOne(req, res, PemeriksaanBayi) })
router.get('/', (req, res) => { crud.readOne(req, res, PemeriksaanBayi) })

module.exports = router