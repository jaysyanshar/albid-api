const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bidanSchema = new Schema({
    nik: { type: String, trim: true, unique: true, required: true, index: true, },
    password: { type: String, trim: true, required: true, },
    tanggalDaftar: { type: Date, required: true, default: Date.now, },
    nama: { type: String, trim: true, required: true, },
    tanggalLahir: Date,
    kontak: {
        noHP: { type: String, trim: true, unique: true, required: true, index: true, },
        email: { type: String, trim: true, unique: true, sparse: true, index: true, },
    },
    alamatPelayanan: {
        provinsi: { type: String, trim: true },
        kota: { type: String, trim: true },
        kecamatan: { type: String, trim: true },
        kelurahan: { type: String, trim: true },
        alamatJalan: { type: String, trim: true },
    },
    noSipb: { type: String, trim: true },
    noIbi: { type: String, trim: true },
    str: {
        no: { type: String, trim: true },
        tanggalKadaluarsa: Date,
    },
},
{ collection: 'bidan' }
)

module.exports = mongoose.model('Bidan', bidanSchema)