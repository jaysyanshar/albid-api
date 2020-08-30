const mongoose = require('mongoose')

const { antenatalCareEnums } = require('../app_modules/model-enums')

const Schema = mongoose.Schema

const antenatalCareSchema = new Schema({
    idRekamMedis: { type: mongoose.Types.ObjectId, required: true, index: true, },
    trimester: {
        type: String,
        trim: true,
        enum: Object.values(antenatalCareEnums.trimester)
    },
    pemeriksaan: {
        ibu: {
            anamnesis: { type: String, trim: true },
            beratBadan: { type: Number, min: 0 }, // in kg
            tinggiBadan: { type: Number, min: 0 }, // in cm
            tekananDarah: {
                sistolik: { type: Number, min: 0 },
                diastolik: { type: Number, min: 0 },
            },
            statusGizi: {
                type: String,
                trim: true,
                uppercase: true,
                enum: Object.values(antenatalCareEnums.statusGizi)
            },
            lingkarLenganAtas: { type: Number, min: 0 }, // in cm
            tinggiFundusUteri: { type: Number, min: 0 }, // in cm
            refleksPatellaPositif: Boolean,
        },
        bayi: {
            umurKehamilan: {
                bulan: { type: Number, min: 0, validate: { validator: Number.isInteger } },
                hari: { type: Number, min: 0, validate: { validator: Number.isInteger } },
            },
            detakJantungJanin: { type: Number, min: 0, validate: { validator: Number.isInteger } }, // in minute
            posisiKepalaMasukPap: Boolean, // ya/tidak
            taksiranBeratJanin: { type: Number, min: 0 }, // in gram
            posisiJanin: {
                type: String,
                trim: true,
                uppercase: true,
                enum: Object.values(antenatalCareEnums.posisiJanin)
            },
            jumlahJanin: { type: Number, min: 0, validate: { validator: Number.isInteger } },
            kakiBergerak: Boolean, // ya,tidak
            imunisasiTetanus: {
                type: String,
                trim: true,
                uppercase: true,
                enum: Object.values(antenatalCareEnums.imunisasiTetanus)
            },
        }
    },
    pelayanan: {
        injeksiTT: {
            type: String,
            trim: true,
            uppercase: true,
            enum: Object.values(antenatalCareEnums.imunisasiTetanus)
        },
        catatBukuKIA: Boolean,
        banyakPemberianFE: { type: Number, min: 0 },
        terapi: { type: String, trim: true },
        rujukan: { type: String, trim: true },
        umpanBalik: { type: String, trim: true },
        nasihat: { type: String, trim: true },
        kunjunganBerikutnya: Date
    },
    laboratorium: {
        pemeriksaanHb: {
            hasil: { type: Number, min: 0 },
            anemia: Boolean // ya,tidak (auto-compute)
        },
        proteinUrin: Boolean, // positif,negatif
        gulaDarah: { type: Number, min: 0 },
        talasemia: Boolean, //positif,negatif
        sifilis: Boolean, //positif,negatif
        hbsAg: Boolean, //positif,negatif
    },
    integrasiProgram: {
        hiv: {
            datangDenganHiv: Boolean, //ya,tidak
            tesHivPositif: Boolean, //ya,tidak
            pemberianArt: Boolean, //ya,tidak
        },
        malaria: {
            pemberianKelambuInsektisida: Boolean, //ya,tidak
            tesMalariaPositif: Boolean, //ya,tidak
            jumlahObatKinaAct: { type: Number, min: 0 },
        },
        tb: {
            tbcPositif: Boolean, //ya,tidak
            jumlahObat: { type: Number, min: 0 },
        },
        kecacingan: Boolean, //ya,tidak
        ims: Boolean, //ya,tidak
        hepatitis: Boolean, //ya,tidak
    }
},
{ collection: 'antenatalCare' }
)

module.exports = mongoose.model('AntenatalCare', antenatalCareSchema)