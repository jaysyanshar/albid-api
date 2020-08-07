/**
 * Please run the full/file test to avoid error
 */

const expect = require('chai').expect
const needle = require('needle')
const path = require('../config/path')

const apiKey = require('../config/credentials').apiKey
const bidanUri = path.apiLocalHost + path.apiPath.root + path.apiPath.bidan
const sessionUri = path.apiLocalHost + path.apiPath.root + path.apiPath.session

let options = {
    headers: {
        'X-API-Key': apiKey
    },
    json: true
}

let data = {
    nik: '3210000000000000',
    password: 'mytestpassword',
    nama: 'My Test Name',
    kontak: {
        noHP: '080000000000'
    }
}

let loginInfo = {
    noHP: data.kontak.noHP,
    password: data.password,
    isBidan: true
}

describe('Bidan Profile Test', () => {
    // SIGN UP
    describe('Sign Up', () => {
        // first sign up
        it('first sign up: should return 201', (done) => {
            needle.post(bidanUri, JSON.stringify(data), options, (err, res) => {
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
        // second sign up (cannot sign up twice because the object is unique)
        it('second sign up: should return 409', (done) => {
            needle.post(bidanUri, JSON.stringify(data), options, (err, res) => {
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
            needle.get(bidanUri, options, (err, res) => {
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
            kontak: {
                email: 'mytestemail@test.com'
            },
            alamatPelayanan: {
                provinsi: 'Jawa Barat',
                kota: 'Bandung',
                kecamatan: 'Gedebage',
                kelurahan: 'Rancanumpang',
                alamatJalan: 'Jl. Abu Bakar No.211'
            },
            noSipb: '8000000000000',
            noIbi: '19999999999999',
            str: {
                no: '200002000020000',
                tanggalKadaluarsa: Date('2030-01-01')
            }
        }
        // update my own profile
        it('update profile: should return 200', (done) => {
            needle.put(bidanUri, JSON.stringify(updateData), options, (err, res) => {
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
            needle.delete(bidanUri, null, options, (err, res) => {
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