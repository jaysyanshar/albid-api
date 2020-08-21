const mongoose = require('mongoose')

const AsesmenAwalSubjektif = require('./AsesmenAwalSubjektif')
const AsesmenAwalObjektif = require('./AsesmenAwalObjektif')

const Schema = mongoose.Schema

const asesmenAwalSchema = new Schema({
    idRekamMedis: { type: mongoose.Types.ObjectId, required: true, index: true, },
    subjektif: AsesmenAwalSubjektif,
    objektif: AsesmenAwalObjektif,
},
{ collection: 'asesmenAwal' }
)

module.exports = mongoose.model('AsesmenAwal', asesmenAwalSchema)