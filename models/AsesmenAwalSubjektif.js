const mongoose = require('mongoose')
const { asesmenAwalSubjektifEnums } = require('../app_modules/model-enums')

const Schema = mongoose.Schema

const asesmenAwalSubjektifSchema = new Schema({
    riwayatAlergi: { type: String, trim: true, },
    paritas: {
        gravida: { type: Number, min: 0, validate: { validator: Number.isInteger } }, // harus ada balancing,
        partus: { type: Number, min: 0, validate: { validator: Number.isInteger } }, // gravida = partus+abortus+1
        abortus: { type: Number, min: 0, validate: { validator: Number.isInteger } },
    },
    anamnesis: { type: String, trim: true, },
    riwayatPenyakit: {
        sekarang: [{ ket: { type: String, trim: true } }],
        dahulu: [{ ket: { type: String, trim: true } }],
        keluarga: [{ ket: { type: String, trim: true } }],
    },
    riwayatMenstruasi: {
        haidTerakhir: {
            hariPertama: Date,
            hariTerakhir: Date, // covering lamanya menstruasi
        },
        menorrhagia: Boolean,
        metrorrhagia: Boolean,
        jumlahGantiPembalut: { type: Number, min: 0, validate: { validator: Number.isInteger } },
        dismenorrhoe: Boolean,
        siklus: { type: Number, min: 0, validate: { validator: Number.isInteger } },
        teratur: Boolean,
    },
    taksiranPersalinan: Date, // otomatis dihitung dari hpht (haidTerakhir.hariPertama)
    pergerakanJaninPertama: {
        tanggal: Date,
        keterangan: { type: String, trim: true, },
    },
    riwayatImunisasiTetanusLengkap: Boolean,
    riwayatPerkawinan: {
        jumlahPerkawinan: { type: Number, min: 0, validate: { validator: Number.isInteger } },
        tahunPerkawinan: Date,
        usiaLakiLaki: { type: Number, min: 0, validate: { validator: Number.isInteger } },
        usiaPerempuan: { type: Number, min: 0, validate: { validator: Number.isInteger } } // isi otomatis berdasarkan tanggal lahir
    },
    riwayatKontrasepsi: [{
        type: String,
        trim: true, 
        uppercase: true, 
        enum: Object.values(asesmenAwalSubjektifEnums.riwayatKontrasepsi),
    }],
    riwayatGynecolog: [{
        type: String,
        trim: true,
        uppercase: true,
        enum: Object.values(asesmenAwalSubjektifEnums.riwayatGynecolog),
    }],
    riwayatObstetri: [
        {
            tanggalPersalinan: Date,
            tempatPersalinan: { type: String, trim: true, },
            usiaKehamilan: {
                bulan: { type: Number, min: 0, validate: { validator: Number.isInteger } },
                hari: { type: Number, min: 0, validate: { validator: Number.isInteger } }
            },
            metodePersalinan: {
                type: String,
                trim: true,
                uppercase: true,
                enum: Object.values(asesmenAwalSubjektifEnums.metodePersalinan),
            },
            penolongPersalinan: {
                type: String,
                trim: true,
                uppercase: true,
                enum: Object.values(asesmenAwalSubjektifEnums.penolongPersalinan),
            },
            jenisKelaminAnak: {
                type: String,
                trim: true,
                uppercase: true,
                enum: Object.values(asesmenAwalSubjektifEnums.jenisKelamin),
            },
            beratBadanAnak: { type: Number, min: 0, }, // in kg
            panjangBadanAnak: { type: Number, min: 0, }, // in cm
            asiEksklusif: Boolean,   // true kalo diberi, else false
        }
    ],
    risikoCedera: Boolean,   // true kalo ada resiko
    nutrisi: {
        tinggiBadan: { type: Number, min: 0, }, // in cm
        beratBadan: { type: Number, min: 0, }, // in kg
        bmi: { type: Number, min: 0 } // auto-compute based on tb & bb
    },
    fungsional: {
        penggunaanAlatBantu: Boolean, // ya atau tidak
        prothesis: Boolean, // ya atau tidak
        cacatTubuh: Boolean, // ya atau tidak
        adlMandiri: Boolean, // false = adlDibantu
        jatuhTigaBulanTerakhir: Boolean, // riwayat jatuh tiga bulan terakhir
    },
    asesmenNyeri: {
        provokatif: {
            type: String,
            trim: true,
            uppercase: true,
            enum: Object.values(asesmenAwalSubjektifEnums.provokatif),
        },
        quality: {
            type: String,
            trim: true,
            uppercase: true,
            enum: Object.values(asesmenAwalSubjektifEnums.quality),
        },
        region: {
            lokasi: { type: String, trim: true },
            areaSebaran: { type: String, trim: true },
        },
        severity: [
            {
                nama: { 
                    type: String, 
                    trim: true, 
                    uppercase: true, 
                    enum: Object.values(asesmenAwalSubjektifEnums.severity), 
                },
                score: Number,
            },
        ],
        durasi: { type: Number, min: 0 }, // dalam detik
        peredaNyeri: [
            {
                type: String,
                trim: true,
                uppercase: true,
                enum: Object.values(asesmenAwalSubjektifEnums.peredaNyeri),
            }
        ],
    },
    edukasi: {
        subjek: [
            {
                type: String,
                trim: true,
                uppercase: true,
                enum: Object.values(asesmenAwalSubjektifEnums.subjekEdukasi),
            }
        ],
        durasi: {
            jam: { type: Number, min: 0 },
            menit: { type: Number, min: 0 }
        },
        materi: [
            {
                type: String,
                trim: true,
                uppercase: true,
                enum: Object.values(asesmenAwalSubjektifEnums.materiEdukasi),
            }
        ],
        reedukasi: Boolean // ya atau tidak
    }
},
// { collection: 'asesmenAwalSubjektif' }
)

module.exports = asesmenAwalSubjektifSchema