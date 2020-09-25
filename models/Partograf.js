const mongoose = require('mongoose')

const { partografEnums } = require('../app_modules/model-enums')

const Schema = mongoose.Schema

const partografSchema = Schema({
    idRekamMedis: { type: mongoose.Types.ObjectId, required: true, index: true, },
    kala1: { type: String, trim: true },
    kala2: {
        episotomi: Boolean,
        pendampingPersalinan: {
            type: String,
            trim: true,
            uppercase: true,
            enum: Object.values(partografEnums.pendampingPersalinan)
        },
        gawatJanin: Boolean,
        distosiaBahu: Boolean,
        masalahLain: { type: String, trim: true }
    },
    kala3: {
        inisiasiMenyusui: Boolean,
        durasi: Number, //menit
        pemberianOksitosin: Boolean,
        pemberianUlangOksitosin: Boolean,
        peganganTaliPusatTerkendali: Boolean,
        masaseFundusUteri: Boolean,
        plasenta: {
            plasentaLengkap: Boolean,
            plasentaTidakLahir: Boolean,
        },
        laserasi: {
            laserasi: Boolean,
            laserasiParineum: {
                type: String,
                trim: true,
                uppercase: true,
                enum: Object.values(partografEnums.laserasiParineum)
            }
        },
        tindakan: { type: String, trim: true },
        atoneUteri: Boolean,
        jumlahDarahKeluar: { type: Number, min: 0 }, //mL
        masalah: { type: String, trim: true },
        solusi: { type: String, trim: true },
    },
    kala4: {
        kondisiIbu: {
            keluhanUtama: { type: String, trim: true },
            tekananDarah: {
                sistolik: { type: Number, min: 0, validate: { validator: Number.isInteger } },
                diastolik: { type: Number, min: 0, validate: { validator: Number.isInteger } }
            },
            nadi: { type: Number, min: 0, validate: { validator: Number.isInteger } },
            napas: { type: Number, min: 0, validate: { validator: Number.isInteger } },
        },
        pemantauan: {
            jamKe: { type: Number, min: 0, validate: { validator: Number.isInteger } },
            waktu: {
                jam: { type: Number, min: 0, max: 23, validate: { validator: Number.isInteger } },
                menit: { type: Number, min: 0, max: 59, validate: { validator: Number.isInteger } }
            },
            tekananDarah: {
                sistolik: { type: Number, min: 0, validate: { validator: Number.isInteger } },
                diastolik: { type: Number, min: 0, validate: { validator: Number.isInteger } }
            },
            nadi: { type: Number, min: 0, validate: { validator: Number.isInteger } },
            suhu: Number,
            tinggiFundusUteri: { type: Number, min: 0 },
            kontraksiUterus: {
                type: String,
                trim: true,
                uppercase: true,
                enum: Object.values(partografEnums.kontraksiUterus)
            },
            vesicaUrinaria: {
                type: String,
                trim: true,
                uppercase: true,
                enum: Object.values(partografEnums.vesicaUrinaria)
            },
            darahKeluar: { type: Number, min: 0 },
        }
    },
    bbl: {
        beratBadan: { type: Number, min: 0 }, //kg
        panjangBadan: { type: Number, min: 0 }, //cm
        jenisKelamin: {
            type: String,
            trim: true,
            uppercase: true,
            enum: Object.values(partografEnums.jenisKelamin)
        },
        penilaianBayi: {
            type: String,
            trim: true,
            uppercase: true,
            enum: Object.values(partografEnums.penilaianBayi)
        },
        bayiLahir: {
            bayiNormal: [
                {
                    type: String,
                    trim: true,
                    uppercase: true,
                    enum: Object.values(partografEnums.bayiNormal)
                }
            ],
            bayiTidakNormal: {
                kondisi: {
                    type: String,
                    trim: true,
                    uppercase: true,
                    enum: Object.values(partografEnums.kondisiBayi)
                },
                tindakan: [
                    {
                        type: String,
                        trim: true,
                        uppercase: true,
                        enum: Object.values(partografEnums.tindakanBayiTidakNormal)
                    }
                ]
            },
            cacatBawaan: { type: String, trim: true },
            hipotermi: { type: String, trim: true },
        },
        pemberianASI: Boolean
    }
},
{
    collection: 'partograf'
})

module.exports = mongoose.model('Partograf', partografSchema)