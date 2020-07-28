const mongoose = require('mongoose')

const Schema = mongoose.Schema

const pasienSchema = new Schema({
    nik: { type: String, trim: true, unique: true, required: true, index: true, },
    password: { type: String, trim: true, default: '' },
    tanggalDaftar: { type: Date, required: true, default: Date.now, },
    nama: { type: String, trim: true, required: true, },
    tanggalLahir: Date,
    kontak: {
        noHP: { type: String, trim: true, unique: true, required: true, index: true, },
        email: { type: String, trim: true, unique: true, sparse: true, index: true, },
    },
    pekerjaan: { type: String, trim: true },
    alamat: {
        provinsi: { type: String, trim: true },
        kota: { type: String, trim: true },
        kecamatan: { type: String, trim: true },
        kelurahan: { type: String, trim: true },
        alamatJalan: { type: String, trim: true },
    },
},
{ collection: 'pasien' }
)

module.exports = mongoose.model('Pasien', pasienSchema)