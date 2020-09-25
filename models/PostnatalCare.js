const mongoose = require('mongoose')

const { postnatalCareEnums } = require('../app_modules/model-enums')

const Schema = mongoose.Schema

const postnatalCareSchema = Schema({
    idRekamMedis: { type: mongoose.Types.ObjectId, required: true, index: true, },
    pelayananPemantauan: {
        kondisiIbu: {
            type: String,
            trim: true,
            uppercase: true,
            enum: Object.values(postnatalCareEnums.kondisiIbu)
        },
        tekananDarah: {
            sistolik: { type: Number, min: 0, validate: { validator: Number.isInteger } },
            diastolik: { type: Number, min: 0, validate: { validator: Number.isInteger } }
        },
        suhuTubuh: Number,
        respirasi: { type: Number, min: 0, validate: { validator: Number.isInteger } },
        nadi: { type: Number, min: 0, validate: { validator: Number.isInteger } },
        pendarahanVagina: Boolean,
        kondisiPerineum: {
            type: String,
            trim: true,
            uppercase: true,
            enum: Object.values(postnatalCareEnums.kondisiPerineum)
        },
        tandaInfeksi: Boolean,
        kontraksiUteri: String,
        tinggiFundusUteri: {
            type: String,
            trim: true,
            uppercase: true,
            enum: Object.values(postnatalCareEnums.tinggiFundusUteri)
        },
        lokhia: {
            type: String,
            trim: true,
            uppercase: true,
            enum: Object.values(postnatalCareEnums.lokhia)
        },
        pemeriksaanJalurLahir: Boolean,
        pemeriksaanPayudara: Boolean,
        produksiASI: Boolean,
        pemberianVitA: Boolean,
        pelayananKontrasepsi: Boolean,
        penangananResikoTinggi: Boolean,
        buangAirBesar: Boolean,
        buangAirKecil: Boolean
    },
    pemberianNasihat: {
        makanSehat: Boolean,
        airMinum: Boolean,
        kebersihan: Boolean,
        istirahat: Boolean,
        kebersihanLukaCaesar: Boolean,
        caraMenyusui: Boolean,
        perawatanBayi: Boolean,
        bayiMenangis: Boolean,
        komunikasiBayi: Boolean,
        konsultasiNakes: Boolean,
    },
    kunjunganNifas: {
        kunjunganKe: { type: Number, min: 0, validate: { validator: Number.isInteger } },
        catatanDokter: { type: String, trim: true }
    }
},
{
    collection: 'postnatalCare'
})

module.exports = mongoose.model('PostnatalCare', postnatalCareSchema)