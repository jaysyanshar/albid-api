const credentials = require('../config/credentials')

let bidanA = {
    nik: '3210000000000000',
    password: 'mytestpassword',
    nama: 'My Test Name A',
    kontak: { noHP: '080000000000' }
}

let bidanB = {
    nik: '3210000000000001',
    password: 'mytestpassword',
    nama: 'My Test Name B',
    kontak: { noHP: '080000000001' }
}

let loginBidan = {
    error: {
        noHP: '080000000002',
        password: 'mytestpassword',
        isBidan: true
    },
    bidanA: {
        noHP: '080000000000',
        password: 'mytestpassword',
        isBidan: true
    },
    bidanB: {
        noHP: '080000000001',
        password: 'mytestpassword',
        isBidan: true
    }
}

let updateBidan = {
    bidanA: {
        kontak: { email: 'mytestemail@mail.com' }
    }
}

let optionsBidan = {
    bidanA: {
        headers: {
            'X-API-Key': credentials.apiKey,
            'Session-ID': ''
        },
        json: true
    },
    bidanB: {
        headers: {
            'X-API-Key': credentials.apiKey,
            'Session-ID': ''
        },
        json: true
    }
}

module.exports = { bidanA, bidanB, loginBidan, updateBidan, optionsBidan }