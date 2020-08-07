/**
 * Please run the full/file test to avoid error
 */

const expect = require('chai').expect
const needle = require('needle')
const path = require('../config/path')

const apiKey = require('../config/credentials').apiKey
const bidanUri = path.apiLocalHost + path.apiPath.root + path.apiPath.bidan
const pasienUri = path.apiLocalHost + path.apiPath.root + path.apiPath.pasien
const sessionUri = path.apiLocalHost + path.apiPath.root + path.apiPath.session

// PASIEN DATA
let options = {
    headers: {
        'X-API-Key': apiKey
    },
    json: true
}

let data = {
    nik: '3210000000000001',
    nama: 'My Pasien Test Name',
    kontak: {
        noHP: '080000000001'
    },
    pekerjaan: 'Aktris',
    alamat: {
        provinsi: 'Jawa Barat',
        kota: 'Bandung',
        kecamatan: 'Gedebage',
        kelurahan: 'Rancanumpang',
        alamatJalan: 'Summarecon No.300'
    }
}

let loginInfo = {
    noHP: data.kontak.noHP,
    password: data.password || '',
    isBidan: false
}

// BIDAN DATA
let bidanOptions = {
    headers: {
        'X-API-Key': apiKey
    },
    json: true
}

let bidanData = {
    nik: '3210000000000000',
    password: 'mytestpassword',
    nama: 'My Test Name',
    kontak: {
        noHP: '080000000000'
    }
}

let bidanLoginInfo = {
    noHP: bidanData.kontak.noHP,
    password: bidanData.password,
    isBidan: true
}

describe('Pasien Profile Test', () => {
    // REGISTER
    describe('Register', () => {
        // sign up bidan first, register should use bidan account
        it('sign up bidan: should return 201', (done) => {
            needle.post(bidanUri, JSON.stringify(bidanData), bidanOptions, (err, res) => {
                try {
                    if (err) { throw err }
                    let doc = res.body
                    if (doc.docId == undefined) { throw doc }
                    expect(doc.httpStatus.statusCode).equal(201)
                    done()
                } catch (e) {
                    return
                }
            })
        })
        // login using bidan account
        it('login bidan: should return 201', (done) => {
                needle.post(sessionUri, JSON.stringify(bidanLoginInfo), bidanOptions, (err, res) => {
                try {
                    if (err) { throw err }
                    let doc = res.body
                    if (doc.doc._id == undefined) { throw doc }
                    expect(doc.httpStatus.statusCode).equal(201)
                    bidanOptions.headers['Session-ID'] = doc.doc._id
                    done()
                } catch (e) {
                    return
                }
            })
        })
        // first register pasien
        it('register pasien: should return 201', (done) => {
            needle.post(pasienUri, JSON.stringify(data), bidanOptions, (err, res) => {
                try {
                    if (err) { throw err }
                    let doc = res.body
                    if (doc.docId == undefined) { throw doc }
                    expect(doc.httpStatus.statusCode).equal(201)
                    done()
                } catch (e) {
                    return
                }
            })
        })
        // second register (cannot register twice because the object is unique)
        it('second register pasien: should return 409', (done) => {
            needle.post(pasienUri, JSON.stringify(data), bidanOptions, (err, res) => {
                try {
                    if (err) { throw err }
                    let doc = res.body
                    if (doc.docId == undefined) { throw doc }
                    return
                } catch (e) {
                    expect(e.httpStatus.statusCode).equal(409)
                    done()
                }
            })
        })
        // delete bidan
        it('delete bidan account: should return 200', (done) => {
            needle.delete(bidanUri, null, bidanOptions, (err, res) => {
                try {
                    if (err) { throw err }
                    let doc = res.body
                    if (doc.docId == undefined) { throw doc }
                    expect(doc.httpStatus.statusCode).equal(200)
                    done()
                } catch (e) {
                    return
                }
            })
        })
    })
    // LOGIN
    describe('Login', () => {
        // first login using username, password
        it('first login: should return 201', (done) => {
            needle.post(sessionUri, JSON.stringify(loginInfo), options, (err, res) => {
                try {
                    if (err) { throw err }
                    let doc = res.body
                    if (doc.doc._id == undefined) { throw doc }
                    expect(doc.httpStatus.statusCode).equal(201)
                    options.headers['Session-ID'] = doc.doc._id
                    done()
                } catch (e) {
                    return
                }
            })
        })
        // second login using username, password. should update the latest login.
        it('second login: should return 200', (done) => {
            needle.post(sessionUri, JSON.stringify(loginInfo), options, (err, res) => {
                try {
                    if (err) { throw err }
                    let doc = res.body
                    if (doc.doc._id == undefined) { throw doc }
                    expect(doc.httpStatus.statusCode).equal(200)
                    options.headers['Session-ID'] = doc.doc._id
                    done()
                } catch (e) {
                    return
                }
            })
        })
        // third login (re-login) using Session-ID, should update the latest login.
        it('re-login: should return 200', (done) => {
            needle.get(sessionUri, options, (err, res) => {
                try {
                    if (err) { throw err }
                    let doc = res.body
                    if (doc.doc._id == undefined) { throw doc }
                    expect(doc.httpStatus.statusCode).equal(200)
                    done()
                } catch (e) {
                    return
                }
            })
        })
    })
    // LOGOUT
    describe('Logout', () => {
        // first logout from current connection only
        it('logout: should return 200', (done) => {
            needle.put(sessionUri, null, options, (err, res) => {
                try {
                    if (err) { throw err }
                    let doc = res.body
                    if (doc.docId == undefined) { throw doc }
                    expect(doc.httpStatus.statusCode).equal(200)
                    done()
                } catch (e) {
                    return
                }
            })
        })
        // re-create login for re-logout test
        it('re-create login: should return 201', (done) => {
            needle.post(sessionUri, JSON.stringify(loginInfo), options, (err, res) => {
                try {
                    if (err) { throw err }
                    let doc = res.body
                    if (doc.doc._id == undefined) { throw doc }
                    expect(doc.httpStatus.statusCode).equal(201)
                    options.headers['Session-ID'] = doc.doc._id
                    done()
                } catch (e) {
                    return
                }
            })
        })
        // logout all
        it('logout all: should return 200', (done) => {
            needle.delete(sessionUri, null, options, (err, res) => {
                try {
                    if (err) { throw err }
                    let doc = res.body
                    if (doc.docId == undefined) { throw doc }
                    expect(doc.httpStatus.statusCode).equal(200)
                    done()
                } catch (e) {
                    return
                }
            })
        })
    })
    // GET PROFILE
    describe('Get Profile', () => {
        // re-login
        it('re-login: should return 201', (done) => {
            needle.post(sessionUri, JSON.stringify(loginInfo), options, (err, res) => {
                try {
                    if (err) { throw err }
                    let doc = res.body
                    if (doc.doc._id == undefined) { throw doc }
                    expect(doc.httpStatus.statusCode).equal(201)
                    options.headers['Session-ID'] = doc.doc._id
                    done()
                } catch (e) {
                    return
                }
            })
        })
        // get my own profile
        it('get profile: should return data signed up in object', (done) => {
            needle.get(pasienUri, options, (err, res) => {
                try {
                    if (err) { throw err }
                    let doc = res.body
                    if (doc.doc._id == undefined) { throw doc }
                    expect(doc.doc.nik).equal(data.nik)
                    expect(doc.doc.nama).equal(data.nama)
                    expect(doc.doc.kontak.noHP).equal(data.kontak.noHP)
                    done()
                } catch (e) {
                    return
                }
            })
        })
    })
    // UPDATE PROFILE
    describe('Update Profile', () => {
        let updateData = {
            password: 'mypasientestpassword',
            kontak: {
                email: 'mypasientestemail@test.com'
            }
        }
        // update my own profile
        it('update profile: should return 200', (done) => {
            needle.put(pasienUri, JSON.stringify(updateData), options, (err, res) => {
                try {
                    if (err) { throw err }
                    let doc = res.body
                    if (doc.docId == undefined) { throw doc }
                    expect(doc.httpStatus.statusCode).equal(200)
                    done()
                } catch (e) {
                    return
                }
            })
        })
    })
    // DELETE ACCOUNT
    describe('Delete Account', () => {
        // delete your account forever
        it('delete account: should return 200', (done) => {
            needle.delete(pasienUri, null, options, (err, res) => {
                try {
                    if (err) { throw err }
                    let doc = res.body
                    if (doc.docId == undefined) { throw doc }
                    expect(doc.httpStatus.statusCode).equal(200)
                    done()
                } catch (e) {
                    return
                }
            })
        })
    })
})