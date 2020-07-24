const express = require('express')
const crud = require('./crud')

const Bidan = require('../models/Bidan')
const router = express.Router()

// EXPRESS HTTP METHODS
router.post('/', (req, res) => crud.createOne(req, res, Bidan))
router.get('/', (req, res) => crud.readOne(req, res, Bidan))
router.get('/list', (req, res) => crud.readMany(req, res, Bidan))
router.put('/', (req, res) => crud.updateOne(req, res, Bidan))
router.delete('/', (req, res) => crud.deleteOne(req, res, Bidan))

module.exports = router