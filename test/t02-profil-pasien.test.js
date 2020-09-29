const expect = require('chai').expect
const needle = require('needle')

let { uri } = require('../test_modules/test-config')
let { bidanA, loginBidan, optionsBidan } = require('../test_modules/test-data-bidan')
let { pasienA, loginPasien, updatePasien, optionsPasien } = require('../test_modules/test-data-pasien')

let optBidanA = optionsBidan.bidanA
let optPasienA = optionsPasien.pasienA

describe('Test 02: Mengelola Profil Pasien', () => {
    describe('Create Data: Test 02', () => {
        it('should create Bidan A', (done) => {
            needle.post(uri.bidan, JSON.stringify(bidanA), optBidanA, (err, res) => {
                let httpStatus = res.body.httpStatus
                expect(httpStatus.statusCode).equal(201)
                done()
            })
        })

        it('should login as Bidan A', (done) => {
            needle.post(uri.session, JSON.stringify(loginBidan.bidanA), optBidanA, (err, res) => {
                let httpStatus = res.body.httpStatus
                let doc = res.body.doc
                optBidanA.headers['Session-ID'] = doc._id
                expect(httpStatus.statusCode).equal(201)
                done()
            })
        })
    })

    describe('SC-006: Register Pasien', () => {
        it('TC-010: should return Status Code 201', (done) => {
            needle.post(uri.pasien, JSON.stringify(pasienA), optBidanA, (err, res) => {
                let httpStatus = res.body.httpStatus
                expect(httpStatus.statusCode).equal(201)
                done()
            })
        })

        it('TC-011: should return Status Code 409', (done) => {
            needle.post(uri.pasien, JSON.stringify(pasienA), optBidanA, (err, res) => {
                let httpStatus = res.body.httpStatus
                expect(httpStatus.statusCode).equal(409)
                done()
            })
        })
    })

    describe('SC-007: Login Pasien', () => {
        it('TC-012: should return Status Code 404', (done) => {
            needle.post(uri.session, JSON.stringify(loginPasien.error), optPasienA, (err, res) => {
                let httpStatus = res.body.httpStatus
                expect(httpStatus.statusCode).equal(404)
                done()
            })
        })

        it('TC-013: should return Status Code 201', (done) => {
            needle.post(uri.session, JSON.stringify(loginPasien.pasienA), optPasienA, (err, res) => {
                let httpStatus = res.body.httpStatus
                let doc = res.body.doc
                optPasienA.headers['Session-ID'] = doc._id
                expect(httpStatus.statusCode).equal(201)
                done()
            })
        })
    })

    describe('SC-008: Get Profile Pasien', () => {
        it('TC-014: should return NIK "3213210000000000", Nama "My Pasien Test Name A", No. HP "088800000000"', (done) => {
            needle.get(uri.pasien, optPasienA, (err, res) => {
                let doc = res.body.doc
                expect(doc.nik).equal('3213210000000000')
                expect(doc.nama).equal('My Pasien Test Name A')
                expect(doc.kontak.noHP).equal('088800000000')
                done()
            })
        })

        it('TC-015: should return NIK "3213210000000000", Nama "My Pasien Test Name A", No. HP "088800000000"', (done) => {
            needle.get(`${uri.pasien}?nik=3213210000000000`, optBidanA, (err, res) => {
                let doc = res.body.doc
                expect(doc.nik).equal('3213210000000000')
                expect(doc.nama).equal('My Pasien Test Name A')
                expect(doc.kontak.noHP).equal('088800000000')
                done()
            })
        })
    })

    describe('SC-009: Update Profile Pasien', () => {
        it('TC-016: should return Email "mypasientestemail@mail.com", No. HP "088800000000"', (done) => {
            needle.put(uri.pasien, JSON.stringify(updatePasien.pasienA_TC016), optPasienA, (err, res) => {
                needle.get(uri.pasien, optPasienA, (err, res) => {
                    let doc = res.body.doc
                    expect(doc.kontak.email).equal('mypasientestemail@mail.com')
                    expect(doc.kontak.noHP).equal('088800000000')
                    done()
                })
            })
        })

        it('TC-017: should return Password "", Status Code 200', (done) => {
            needle.put(`${uri.pasien}?nik=3213210000000000`, JSON.stringify(updatePasien.pasienA_TC017), optBidanA, (err, res) => {
                let httpStatus = res.body.httpStatus
                expect(httpStatus.statusCode).equal(200)
                needle.get(`${uri.pasien}?nik=3213210000000000`, optBidanA, (err, res) => {
                    let doc = res.body.doc
                    expect(doc.password).equal('')
                    done()
                })
            })
        })
    })

    describe('SC-010: Delete Account Pasien', () => {
        it('TC-018: should return Status Code 200', (done) => {
            needle.delete(uri.pasien, null, optPasienA, (err, res) => {
                let httpStatus = res.body.httpStatus
                expect(httpStatus.statusCode).equal(200)
                done()
            })
        })
    })

    describe('Clear Data: Test 02', () => {
        it('should delete Bidan A', (done) => {
            needle.delete(uri.bidan, null, optBidanA, (err, res) => {
                let httpStatus = res.body.httpStatus
                expect(httpStatus.statusCode).equal(200)
                done()
            })
        })
    })
})