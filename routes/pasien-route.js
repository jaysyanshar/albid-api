const express = require('express')
const crud = require('../app_modules/crud')

const Pasien = require('../models/Pasien')
const router = express.Router()

// EXPRESS HTTP METHODS
router.post('/', (req, res) => crud.createOne(req, res, Pasien))
router.get('/', (req, res) => crud.readOne(req, res, Pasien))
router.get('/list', (req, res) => crud.readMany(req, res, Pasien))
router.put('/', (req, res) => crud.updateOne(req, res, Pasien))
router.delete('/', (req, res) => crud.deleteOne(req, res, Pasien))

module.exports = router