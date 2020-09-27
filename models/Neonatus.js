const mongoose = require('mongoose')

const { neonatusEnums } = require('../app_modules/model-enums')

const Schema = mongoose.Schema

const neonatusSchema = Schema({
    idRekamMedis: { type: mongoose.Types.ObjectId, required: true, index: true, },
    pemeriksaan: {
        umur: {
            hari: { type: Number, min: 0, validate: { validator: Number.isInteger } },
            bulan: { type: Number, min: 0, validate: { validator: Number.isInteger } },
            tahun: { type: Number, min: 0, validate: { validator: Number.isInteger } }
        },
        kunjunganNeonatal: Boolean,
        tenagaKesehatan: {
            type: String,
            trim: true,
            uppercase: true,
            enum: Object.values(neonatusEnums.tenagaKesehatan)
        }
    },
    pencegahan: {
        vitK1: Boolean,
        hepatitisB: Boolean,
        bcg: Boolean,
        lainnya: Boolean
    },
    integrasiProgram: {
        kontrimoksasolProfiaksis: Boolean,
        susuFormula: Boolean
    },
    diagnosis: {
        peumonia: Boolean,
        hipotermi: Boolean,
        ikterus: Boolean,
        tetanus: Boolean,
        infeksi: Boolean,
        hematologi: Boolean,
        lainnya: Boolean
    },
    klasifikasiMTBM: {
        kpsbIB: Boolean,
        kbbrMpASI: Boolean,
        tidakDitemukan: Boolean,
        diare: Boolean,
        ikterus: Boolean,
        tidakDiperiksa: Boolean,
    },
    keadaanPulang: {
        type: String,
        trim: true,
        uppercase: true,
        enum: Object.values(neonatusEnums.keadaanPulang)
    },
    dirujuk: {
        tempat: {
            type: String,
            trim: true,
            uppercase: true,
            enum: Object.values(neonatusEnums.tempat)
        },
        keadaan: {
            tiba: {
                type: String,
                trim: true,
                uppercase: true,
                enum: Object.values(neonatusEnums.keadaanTibaDirujuk)
            },
            pulang: {
                type: String,
                trim: true,
                uppercase: true,
                enum: Object.values(neonatusEnums.keadaanPulangDirujuk)
            },
        }
    }
},
{
    collection: 'neonatus'
})

module.exports = mongoose.model('Neonatus', neonatusSchema)