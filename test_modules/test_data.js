const path = require('../config/path')
const { rekamMedisEnums } = require('../app_modules/model-enums')

const apiKey = require('../config/credentials').apiKey
const bidanUri = path.apiLocalHost + path.apiPath.root + path.apiPath.bidan
const pasienUri = path.apiLocalHost + path.apiPath.root + path.apiPath.pasien
const sessionUri = path.apiLocalHost + path.apiPath.root + path.apiPath.session
const rekamMedisUri = path.apiLocalHost + path.apiPath.root + path.apiPath.rekamMedis

var bidanOptions = {
    headers: {
        'X-API-Key': apiKey
    },
    json: true
}

var bidanData = {
    nik: '3210000000000000',
    password: 'mytestpassword',
    nama: 'My Test Name',
    kontak: {
        noHP: '080000000000'
    }
}

var bidanLoginInfo = {
    noHP: bidanData.kontak.noHP,
    password: bidanData.password,
    isBidan: true,
}

var pasienOptions = {
    headers: {
        'X-API-Key': apiKey
    },
    json: true
}

var pasienData = {
    nik: '3210000000000001',
    nama: 'My Pasien Test Name',
    kontak: {
        noHP: '080000000001'
    }
}

var pasienLoginInfo = {
    noHP: pasienData.kontak.noHP,
    password: '',
    isBidan: false
}

var rekamMedisData = {
    penanggungJawab: {
        nama: 'Penanggung Jawab Pasien',
        noHP: '080000000002',
        hubungan: rekamMedisEnums.hubungan.keluarga,
    },
    perujuk: rekamMedisEnums.perujuk.bidan,
    jenisPemeriksaan: rekamMedisEnums.pemeriksaan.asesmenAwal,
}

module.exports = {
    uri: {
        bidan: bidanUri,
        pasien: pasienUri,
        session: sessionUri,
        rekamMedis: rekamMedisUri,
    },
    options: {
        bidan: bidanOptions,
        pasien: pasienOptions,
    },
    user: {
        bidan: bidanData,
        pasien: pasienData,
    },
    login: {
        bidan: bidanLoginInfo,
        pasien: pasienLoginInfo,
    },
    rekamMedis: rekamMedisData
}