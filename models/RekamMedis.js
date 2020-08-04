const mongoose = require('mongoose')
const modelEnums = require('../app_modules/model-enums')

const Schema = mongoose.Schema

const rekamMedisSchema = new Schema({
    idBidan: { type: mongoose.Types.ObjectId, trim: true, required: true, index: true, },
    idPasien: { type: mongoose.Types.ObjectId, trim: true, required: true, index: true, },
    tanggalKunjungan: { type: Date, required: true, default: Date.now, },
    penanggungJawab: {
        nama: { type: String, trim: true },
        noHP: { type: String, trim: true },
        hubungan: { 
            type: String, 
            trim: true, 
            uppercase: true, 
            enum: Object.values(modelEnums.hubungan),
            default: modelEnums.hubungan.suami,
        },
    },
    perujuk: { 
        type: String, 
        trim: true, 
        uppercase: true, 
        enum: Object.values(modelEnums.perujuk),
        default: modelEnums.perujuk.bidan,
    },
    jenisPemeriksaan: {
        type: String,
        trim: true,
        enum: Object.values(modelEnums.pemeriksaan),
        default: modelEnums.pemeriksaan.asesmenAwal,
        uppercase: true,
    }
},
{ collection: 'rekamMedis' }
)

module.exports = mongoose.model('RekamMedis', rekamMedisSchema)