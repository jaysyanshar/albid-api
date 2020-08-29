// const fs = require('fs')
const express = require('express')
const mongoose = require('mongoose')
// const gridfs = require('gridfs-stream')
const validator = require('../app_modules/validator')
const { role } = require('../app_modules/app-enums')
const { rekamMedisEnums } = require('../app_modules/model-enums')

const AsesmenAwal = require('../models/AsesmenAwal')
const RekamMedis = require('../models/RekamMedis')
const crud = require('../app_modules/crud')
const baseResponse = require('../app_modules/base-response')

const router = express.Router()

// gridfs.mongo = mongoose.mongo

router.use(validator.sessionChecker)
router.use((req, res, next) => {
    if (req.method == 'POST') {
        validator.roleChecker(req, res, next, role.bidan, {})
    }
    else if (req.method == 'PUT') {
        validator.roleChecker(req, res, next, role.bidan, {})
    }
    else {
        next()
    }
})

router.post('/', (req, res) => {
    RekamMedis.findOne({ _id: req.body.idRekamMedis }, 'jenisPemeriksaan')
    .then(doc => {
        if (doc == null) { throw Error('Retrieved document is null.') }
        if (doc.jenisPemeriksaan != rekamMedisEnums.pemeriksaan.asesmenAwal) {
            throw Error('Invalid reference ID.')
        }
        else {
            AsesmenAwal.findOne({ idRekamMedis: doc._id }, 'idRekamMedis')
            .then(doc => {
                if (doc == undefined) {
                    crud.createOne(req, res, AsesmenAwal)
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

router.put('/subjektif', (req, res) => {
    req.body = {
        subjektif: req.body
    }
    crud.updateOne(req, res, AsesmenAwal)
})

router.put('/objektif', (req, res) => {
    req.body = {
        objektif: req.body
    }
    crud.updateOne(req, res, AsesmenAwal)
})

module.exports = router