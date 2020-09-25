const express = require('express')
const validator = require('../app_modules/validator')
const crud = require('../app_modules/crud')

const RekamMedis = require('../models/RekamMedis')
const Bidan = require('../models/Bidan')
const Pasien = require('../models/Pasien')

const AsesmenAwal = require('../models/AsesmenAwal')
const AntenatalCare = require('../models/AntenatalCare')
const Kohort = require('../models/Kohort')
const SOAP1 = require('../models/SOAP1')
const SOAP2 = require('../models/SOAP2')
const SOAP3 = require('../models/SOAP3')
const SOAP4 = require('../models/SOAP4')
// const Partograf = require('../models/Partograf')
const PostnatalCare = require('../models/PostnatalCare')
const KartuBayi = require('../models/KartuBayi')
// const Neonatus = require('../models/Neonatus')
// const PemeriksaanBayi = require('../models/PemeriksaanBayi')
// const PelayananKesehatan = require('../models/PelayananKesehatan')

const { role } = require('../app_modules/app-enums')
const baseResponse = require('../app_modules/base-response')
const { rekamMedisEnums } = require('../app_modules/model-enums')
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


// Create Function
const createPemeriksaanRekamMedis = (req, res, Model) => {
    let idRekamMedis = req.body.idRekamMedis
    Model(req.body).save()
    .then(doc => {
        try {
            res.status(201)
            res.send(baseResponse.ok(res, {_id: idRekamMedis})).json().end()
        } catch (e) {
            throw Error('Failed to send data.')
        }
    })
    .catch(err => {
        if (err == 'Error: Failed to send data.') {
            res.status(500)
        } else switch (err.code) {
            // unique data already exist
            case 11000: { res.status(409); break }
            // required field not assigned
            case undefined: { res.status(400); break }
            case null: { res.status(400); break }
            // server error
            default: res.status(500)
        }
        res.send(baseResponse.error(res, err)).json().end()
    })
}

const getModel = (jenis) => {
    switch (jenis) {
        case jenisPemeriksaan.asesmenAwal:
            return AsesmenAwal
        case jenisPemeriksaan.anc:
            return AntenatalCare
        case jenisPemeriksaan.kohort:
            return Kohort
        case jenisPemeriksaan.soap1:
            return SOAP1
        case jenisPemeriksaan.soap2:
            return SOAP2
        case jenisPemeriksaan.soap3:
            return SOAP3
        case jenisPemeriksaan.soap4:
            return SOAP4
        // case jenisPemeriksaan.partograf:
        //     return Partograf
        case jenisPemeriksaan.pnc:
            return PostnatalCare
        case jenisPemeriksaan.kartuBayi:
            return KartuBayi
        // case jenisPemeriksaan.neonatus:
        //     return Neonatus
        // case jenisPemeriksaan.pemeriksaanBayi:
        //     return PemeriksaanBayi
        // case jenisPemeriksaan.pelayananKesehatan:
        //     return PelayananKesehatan
        default:
            return null
    }
}

// HTTP METHODS
router.post('/', (req, res) => {
    let jenis = req.body.jenisPemeriksaan
    let Model = getModel(jenis)
    RekamMedis(req.body).save()
    .then(doc => {
        try {
            req.body = { idRekamMedis: doc._id }
            createPemeriksaanRekamMedis(req, res, Model)
        } catch (e) {
            throw Error('Failed to send data.')
        }
    })
    .catch(err => {
        if (err == 'Error: Failed to send data.') {
            res.status(500)
        } else switch (err.code) {
            // unique data already exist
            case 11000: { res.status(409); break }
            // required field not assigned
            case undefined: { res.status(400); break }
            case null: { res.status(400); break }
            // server error
            default: res.status(500)
        }
        res.send(baseResponse.error(res, err)).json().end()
    })
})
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