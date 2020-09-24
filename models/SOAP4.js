const mongoose = require('mongoose')

const { soapEnums } = require('../app_modules/model-enums')

const Schema = mongoose.Schema

const soap4Schema = Schema({
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
        kontraksiUterus: {
            type: String,
            trim: true,
            uppercase: true,
            enum: Object.values(soapEnums.kontraksiUterus)
        },
        tinggiFundusUteri: { type: Number, min: 0 },
        jumlahPendarahan: { type: Number, min: 0 },
        vesicaUrinaria: {
            type: String,
            trim: true,
            uppercase: true,
            enum: Object.values(soapEnums.vesicaUrinaria)
        }
    },
    assessment: {
        diagnosa: { type: String, trim: true },
        masalahPotensial: { type: String, trim: true },
        antisipasiMasalah: { type: String, trim: true },
    },
    planning: { type: String, trim: true },
},
{
    collection: 'soap4'
})

module.exports = mongoose.model('SOAP4', soap4Schema)