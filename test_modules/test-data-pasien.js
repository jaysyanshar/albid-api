const credentials = require('../config/credentials')

let pasienA = {
    nik: '3213210000000000',
    nama: 'My Pasien Test Name A',
    kontak: {
        noHP: '088800000000'
    }
}

let loginPasien = {
    error: {
        noHP: '080000000002',
        password: 'mytestpassword',
        isBidan: false
    },
    pasienA: {
        noHP: '088800000000',
        password: '',
        isBidan: false
    }
}

let updatePasien = {
    pasienA_TC016: {
        kontak: { email: 'mypasientestemail@mail.com' }
    },
    pasienA_TC017: {
        password: 'mypasienpassword'
    }
}

let optionsPasien = {
    pasienA: {
        headers: {
            'X-API-Key': credentials.apiKey,
            'Session-ID': ''
        },
        json: true
    }
}

module.exports = { pasienA, loginPasien, updatePasien, optionsPasien }