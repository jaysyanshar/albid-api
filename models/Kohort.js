const mongoose = require('mongoose')

const { kohortEnums } = require('../app_modules/model-enums')

const Schema = mongoose.Schema

const kohortSchema = Schema({
    idRekamMedis: { type: mongoose.Types.ObjectId, required: true, index: true, },
    umurIbu: {
        tahun: { type: Number, min: 0, validate: { validator: Number.isInteger } },
        bulan: { type: Number, min: 0, validate: { validator: Number.isInteger } }
    },
    umurKehamilan: {
        bulan: { type: Number, min: 0, validate: { validator: Number.isInteger } },
        hari: { type: Number, min: 0, validate: { validator: Number.isInteger } }
    },
    jumlahKehamilan: { type: Number, min: 0, validate: { validator: Number.isInteger } },
    tanggalBBKurang: Date, // BB < 45 kg pada trimester 3
    tanggalLLAKurang: Date, // LLA < 23,5 cm pada trimester 1
    tinggiBadanKurang: Boolean, // TB < 145 cm
    tanggalHbKurang: Date, // Hb < 8 gr%
    tanggalTDLebih: Date, // TD > 160/95 mmHg
    tanggalDeteksiResikoTinggi: {
        kesehatan: Date,
        nonKesehatan: Date
    },
    jarakKehamilan: {
        tahun: { type: Number, min: 0, validate: { validator: Number.isInteger } },
        bulan: { type: Number, min: 0, validate: { validator: Number.isInteger } }
    },
    tanggalImunisasi: {
        tt0: Date,
        tt1: Date,
        tt2: Date,
        tt3: Date,
        tt4: Date,
        tt5: Date
    },
    kunjunganIbu: {
        tanggal: Date,
        jumlahKunjungan: { type: Number, min: 0, validate: { validator: Number.isInteger } },
        jumlahPemberianFe: { type: Number, min: 0, validate: { validator: Number.isInteger } },
        kematianIbu: Boolean,
        partus: Boolean
    },
    penolongPersalinan: {
        type: String,
        trim: true,
        uppercase: true,
        enum: Object.values(kohortEnums.penolongPersalinan)
    },
    kelahiran: {
        tanggal: Date,
        lahirHidup: Boolean,
        beratBayi: { type: Number, min: 0, }
    },
    ibuMenyusui: {
        masaNifas: Boolean,
        setelahNifas: Boolean
    },
    keterangan: { type: String, trim: true }
},
{
    collection: 'kohort'
})

module.exports = mongoose.model('Kohort', kohortSchema)