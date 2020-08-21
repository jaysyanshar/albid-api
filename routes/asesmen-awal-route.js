const fs = require('fs')
const express = require('express')
const mongoose = require('mongoose')
const gridfs = require('gridfs-stream')
const validator = require('../app_modules/validator')
const { role } = require('../app_modules/app-enums')

const AsesmenAwal = require('../models/AsesmenAwal')

const router = express.Router()

gridfs.mongo = mongoose.mongo

router.use(validator.sessionChecker)
router.use((req, res, next) => {
    if (req.method == 'POST') {
        validator.roleChecker(req, res, next, role.bidan)
    }
    else {
        next()
    }
})

router.post('/')

module.exports = router