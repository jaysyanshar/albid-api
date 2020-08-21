const mongoose = require('mongoose')
const { rekamMedisEnums } = require('../app_modules/model-enums')

const Schema = mongoose.Schema

const rekamMedisSchema = new Schema({
    idBidan: { type: mongoose.Types.ObjectId, required: true, index: true, },
    idPasien: { type: mongoose.Types.ObjectId, required: true, index: true, },
    tanggalKunjungan: { type: Date, required: true, default: Date.now, },
    penanggungJawab: {
        nama: { type: String, trim: true },
        noHP: { type: String, trim: true },
        hubungan: { 
            type: String, 
            trim: true, 
            uppercase: true, 
            enum: Object.values(rekamMedisEnums.hubungan),
            required: true
        },
    },
    perujuk: { 
        type: String, 
        trim: true, 
        enum: Object.values(rekamMedisEnums.perujuk),
        required: true,
        uppercase: true, 
    },
    jenisPemeriksaan: {
        type: String,
        trim: true,
        enum: Object.values(rekamMedisEnums.pemeriksaan),
        required: true,
        uppercase: true,
    }
},
{ collection: 'rekamMedis' }
)

module.exports = mongoose.model('RekamMedis', rekamMedisSchema)