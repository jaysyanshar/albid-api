const mongoose = require('mongoose')

const { soapEnums } = require('../app_modules/model-enums')

const Schema = mongoose.Schema

const soap3Schema = Schema({
    idRekamMedis: { type: mongoose.Types.ObjectId, required: true, index: true, },
    tanggal: Date,
    waktu: {
        jam: { type: Number, min: 0, max: 23, validate: { validator: Number.isInteger } },
        menit: { type: Number, min: 0, max: 59, validate: { validator: Number.isInteger } },
    },
    subjektif: {
        keluhanUtama: { type: String, trim: true }
    },
    objektif: {
        kesadaran: { type: String, trim: true },
        ttv: {
            tekananDarah: {
                sistolik: { type: Number, min: 0, validate: { validator: Number.isInteger } },
                diastolik: { type: Number, min: 0, validate: { validator: Number.isInteger } }
            },
            nadi: { type: Number, min: 0, validate: { validator: Number.isInteger } }, // per menit
            respirasi: { type: Number, min: 0, validate: { validator: Number.isInteger } }, // per menit
            suhu: Number, // celsius
        },
        palpasiAbdomen: {
            type: String,
            trim: true,
            uppercase: true,
            enum: Object.values(soapEnums.palpasiAbdomen)
        },
        tandaPelepasanPlasenta: { type: String, trim: true },
        kontraksiUterus: {
            type: String,
            trim: true,
            uppercase: true,
            enum: Object.values(soapEnums.kontraksiUterus)
        },
        uterusMembulat: Boolean,
        tinggiFundusUteri: { type: Number, min: 0 }, // cm
        vesicaUrinaria: {
            type: String,
            trim: true,
            uppercase: true,
            enum: Object.values(soapEnums.vesicaUrinaria)
        },
        semburanDarah: Boolean
    },
    assessment: {
        diagnosa: { type: String, trim: true },
        masalahPotensial: { type: String, trim: true },
        antisipasiMasalah: { type: String, trim: true },
    },
    planning: { type: String, trim: true },
    plasenta: {
        waktuLahir: {
            jam: { type: Number, min: 0, max: 23, validate: { validator: Number.isInteger } },
            menit: { type: Number, min: 0, max: 59, validate: { validator: Number.isInteger } },
        },
        keterangan: {
            type: String,
            trim: true,
            uppercase: true,
            enum: Object.values(soapEnums.keteranganPlasenta)
        },
        kontraksi: {
            frekuensi: { type: Number, min: 0 },
            interval: { type: Number, min: 0 },
            durasi: { type: Number, min: 0 }
        },
        pendarahan: { type: Number, min: 0 },
        keadaanJalanLahir: { type: String, trim: true },
        bilaRupture: {
            type: String,
            trim: true,
            uppercase: true,
            enum: Object.values(soapEnums.bilaRupture)
        }
    }
},
{
    collection: 'soap3'
})

module.exports = mongoose.model('SOAP3', soap3Schema)