const mongoose = require('mongoose')

const Schema = mongoose.Schema

const pemeriksaanBayiSchema = Schema({
    idRekamMedis: { type: mongoose.Types.ObjectId, required: true, index: true, },
    pemeriksaan: {
        umur: { type: Number, min: 0, validate: { validator: Number.isInteger } }, //hari
        asiEksklusif: Boolean,
        mpASI: Boolean,
        sdiDTK: Boolean
    },
    gizi: {
        beratBadan: { type: Number, min: 0 },
        tinggiBadan: { type: Number, min: 0 }
    },
    pencegahan: {
        bcg: Boolean,
        dptHB1: Boolean,
        dptHB2: Boolean,
        dptHB3: Boolean,
        polio1: Boolean,
        polio2: Boolean,
        polio3: Boolean,
        polio4: Boolean,
        campak: Boolean,
        vitaminA: Boolean,
    },
    integrasiProgram: {
        sorologiHIV: Boolean,
        cd4: Boolean,
        kelambu: Boolean,
    }
},
{
    collection: 'pemeriksaanBayi'
})

module.exports = mongoose.model('PemeriksaanBayi', pemeriksaanBayiSchema)