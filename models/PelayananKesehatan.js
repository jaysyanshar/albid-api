const mongoose = require('mongoose')

const { pelayananKesehatanEnums } = require('../app_modules/model-enums')

const Schema = mongoose.Schema

const pelayananKesehatanSchema = Schema({
    idRekamMedis: { type: mongoose.Types.ObjectId, required: true, index: true, },
    kunjungan: {
        beratBadan: { type: Number, min: 0 },
        panjangBadan: { type: Number, min: 0 },
        suhu: Number,
        kesehatanBayi: { type: String, trim: true, }
    },
    pemeriksaan: {
        diare: Boolean,
        ikterus: Boolean,
        bbRendah: Boolean,
        masalahPemberianAsi: Boolean,
        statusPemberianVitaminK1: Boolean,
        statusImunisasiHB0: Boolean,
        shk: {
            daerah: { type: String, trim: true },
            hasil: Boolean
        },
        keluhanLain: { type: String, trim: true },
        masalahIbu: {
            keluhan: { type: String, trim: true },
            tindakan: {
                type: String,
                trim: true,
                uppercase: true,
                enum: Object.values(pelayananKesehatanEnums.tindakan)
            }
        }
    }
},
{
    collection: 'pelayananKesehatan'
})

module.exports = mongoose.model('PelayananKesehatan', pelayananKesehatanSchema)