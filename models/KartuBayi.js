const mongoose = require('mongoose')

const { kartuBayiEnums } = require('../app_modules/model-enums')

const Schema = mongoose.Schema

const kartuBayiSchema = Schema({
    idRekamMedis: { type: mongoose.Types.ObjectId, required: true, index: true, },
    noBayi: { type: String, trim: true, },
    nama: { type: String, trim: true, },
    namaAyah: { type: String, trim: true, },
    tanggalLahir: Date,
    waktuLahir: {
        jam: { type: Number, min: 0, max: 23, validate: { validator: Number.isInteger } },
        menit: { type: Number, min: 0, max: 59, validate: { validator: Number.isInteger } },
    },
    jenisKelamin: {
        type: String,
        trim: true,
        uppercase: true,
        enum: Object.values(kartuBayiEnums.jenisKelamin)
    },
    beratBadan: { type: Number, min: 0 },
    panjangBadan: { type: Number, min: 0 },
    golonganDarah: {
        tipe: {
            type: String,
            trim: true,
            uppercase: true,
            enum: Object.values(kartuBayiEnums.golonganDarah)
        },
        rhesus: {
            type: String,
            trim: true,
            uppercase: true,
            enum: Object.values(kartuBayiEnums.rhesus)
        },
    },
    memilikiBukuKIA: Boolean,
    keadaanLahir: {
        type: String,
        trim: true,
        uppercase: true,
        enum: Object.values(kartuBayiEnums.keadaanLahir)
    },
    keadaanPulang: {
        type: String,
        trim: true,
        uppercase: true,
        enum: Object.values(kartuBayiEnums.keadaanPulang)
    },
    dirujuk: {
        tempat: {
            type: String,
            trim: true,
            uppercase: true,
            enum: Object.values(kartuBayiEnums.tempatDirujuk)
        },
        keadaanTiba: {
            type: String,
            trim: true,
            uppercase: true,
            enum: Object.values(kartuBayiEnums.keadaanTibaDirujuk)
        },
        keadaanPulang: {
            type: String,
            trim: true,
            uppercase: true,
            enum: Object.values(kartuBayiEnums.keadaanPulangDirujuk)
        },
    },
    komplikasi: {
        type: String,
        trim: true,
        uppercase: true,
        enum: Object.values(kartuBayiEnums.komplikasi)
    },
    resusitasi: Boolean,
    imd: {
        type: String,
        trim: true,
        uppercase: true,
        enum: Object.values(kartuBayiEnums.imd)
    },
    pencegahan: {
        type: String,
        trim: true,
        uppercase: true,
        enum: Object.values(kartuBayiEnums.pencegahan)
    },
},
{
    collection: 'kartuBayi'
})

module.exports = mongoose.model('KartuBayi', kartuBayiSchema)