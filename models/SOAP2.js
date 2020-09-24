const mongoose = require('mongoose')

const { soapEnums } = require('../app_modules/model-enums')

const Schema = mongoose.Schema

const soap2Schema = Schema({
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
        detakJantungJanin: { type: Number, min: 0, validate: { validator: Number.isInteger } }, // per menit
        periksaDalam: {
            vulva: { type: String, trim: true },
            pembukaan: { type: Number, min: 0, validate: { validator: Number.isInteger } },
            keadaanKetuban: { type: String, trim: true },
            persentasi: { type: String, trim: true },
            bagianTerabahLain: { type: String, trim: true },
            bagianTerendahTurun: { type: String, trim: true },
        },
        vesicaUrinaria: {
            type: String,
            trim: true,
            uppercase: true,
            enum: Object.values(soapEnums.vesicaUrinaria)
        },
        perineum: { type: String, trim: true }
    },
    assessment: {
        diagnosa: { type: String, trim: true },
        masalahPotensial: { type: String, trim: true },
        antisipasiMasalah: { type: String, trim: true },
    },
    planning: { type: String, trim: true },
    kelahiranBayi: {
        waktuKelahiran: {
            jam: { type: Number, min: 0, max: 23, validate: { validator: Number.isInteger } },
            menit: { type: Number, min: 0, max: 59, validate: { validator: Number.isInteger } },
        },
        jenisKelamin: {
            type: String,
            trim: true,
            uppercase: true,
            enum: Object.values(soapEnums.jenisKelamin)
        },
        beratBadan: { type: Number, min: 0 },
        panjangBadan: { type: Number, min: 0 },
        lingkarKepala: { type: Number, min: 0 },
        lingkarDada: { type: Number, min: 0 },
        keadaanSaatLahir: { type: String, trim: true },
        evaluasiBayi: { type: String, trim: true }
    }
},
{
    collection: 'soap2'
})

module.exports = mongoose.model('SOAP2', soap2Schema)