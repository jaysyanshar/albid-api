const expect = require('chai').expect
const needle = require('needle')

let { uri } = require('../test_modules/test-config')
let { bidanA, bidanB, loginBidan, updateBidan, optionsBidan } = require('../test_modules/test-data-bidan')

let optionsA = optionsBidan.bidanA
let optionsB = optionsBidan.bidanB

describe('Test 01: Mengelola Profil Bidan', () => {
    describe('SC-001: Sign Up Bidan', () => {
        it('TC-001: should return Status Code 201', (done) => {
            needle.post(uri.bidan, JSON.stringify(bidanA), optionsA, (err, res) => {
                let httpStatus = res.body.httpStatus
                expect(httpStatus.statusCode).equal(201)
                done()
            })
        })

        it('TC-002: should return Status Code 409', (done) => {
            needle.post(uri.bidan, JSON.stringify(bidanA), optionsA, (err, res) => {
                let httpStatus = res.body.httpStatus
                expect(httpStatus.statusCode).equal(409)
                done()
            })
        })

        it('TC-003: should return Status Code 201', (done) => {
            needle.post(uri.bidan, JSON.stringify(bidanB), optionsB, (err, res) => {
                let httpStatus = res.body.httpStatus
                expect(httpStatus.statusCode).equal(201)
                done()
            })
        })
    })

    describe('SC-002: Login Bidan', () => {
        it('TC-004: should return Status Code 404', (done) => {
            needle.post(uri.session, JSON.stringify(loginBidan.error), optionsA, (err, res) => {
                let httpStatus = res.body.httpStatus
                expect(httpStatus.statusCode).equal(404)
                done()
            })
        })

        it('TC-005: should return Status Code 201', (done) => {
            needle.post(uri.session, JSON.stringify(loginBidan.bidanA), optionsA, (err, res) => {
                let httpStatus = res.body.httpStatus
                let doc = res.body.doc
                optionsA.headers['Session-ID'] = doc._id
                expect(httpStatus.statusCode).equal(201)
                done()
            })
        })
    })

    describe('SC-003: Get Profile Bidan', () => {
        it('TC-006: should return NIK "3210000000000000", Nama "My Test Name A", No. HP "080000000000"', (done) => {
            needle.get(uri.bidan, optionsA, (err, res) => {
                let doc = res.body.doc
                expect(doc.nik).equal('3210000000000000')
                expect(doc.nama).equal('My Test Name A')
                expect(doc.kontak.noHP).equal('080000000000')
                done()
            })
        })

        it('TC-007: should return NIK "3210000000000001", Nama "My Test Name B", No. HP "080000000001"', (done) => {
            needle.get(`${uri.bidan}?nik=3210000000000001`, optionsA, (err, res) => {
                let doc = res.body.doc
                expect(doc.nik).equal('3210000000000001')
                expect(doc.nama).equal('My Test Name B')
                expect(doc.kontak.noHP).equal('080000000001')
                done()
            })
        })
    })

    describe('SC-004: Update Profile Bidan', () => {
        it('TC-008: should return Email "mytestemail@mail.com", No. HP "080000000000"', (done) => {
            needle.put(uri.bidan, JSON.stringify(updateBidan.bidanA), optionsA, (err, res) => {
                needle.get(uri.bidan, optionsA, (err, res) => {
                    let doc = res.body.doc
                    expect(doc.kontak.email).equal('mytestemail@mail.com')
                    expect(doc.kontak.noHP).equal('080000000000')
                    done()
                })
            })
        })
    })

    describe('SC-005: Delete Account Bidan', () => {
        it('TC-009: should return Status Code 200', (done) => {
            needle.delete(uri.bidan, null, optionsA, (err, res) => {
                let httpStatus = res.body.httpStatus
                expect(httpStatus.statusCode).equal(200)
                done()
            })
        })
    })

    describe('Clear Data: Test 01', () => {
        it('should delete Bidan B', (done) => {
            needle.post(uri.session, JSON.stringify(loginBidan.bidanB), optionsB, (err, res) => {
                let httpStatus = res.body.httpStatus
                expect(httpStatus.statusCode).equal(201)
                optionsB.headers['Session-ID'] = res.body.doc._id
                needle.delete(uri.bidan, null, optionsB, (err, res) => {
                    let httpStatus = res.body.httpStatus
                    expect(httpStatus.statusCode).equal(200)
                    done()
                })
            })
        })
    })
})