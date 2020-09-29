const expect = require('chai').expect
const needle = require('needle')

let { uri } = require('../test_modules/test-config')
let { bidanA, loginBidan, optionsBidan } = require('../test_modules/test-data-bidan')
let { pasienA, loginPasien, optionsPasien } = require('../test_modules/test-data-pasien')
let { rekamMedisA, rekamMedisB, updateRekamMedis } = require('../test_modules/test-data-rekam-medis')

let optBidanA = optionsBidan.bidanA
let optPasienA = optionsPasien.pasienA

describe('Test 03: Mengelola Rekam Medis (Register)', () => {
    describe('Create Data: Test 03', () => {
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
                rekamMedisA.idBidan = doc.userId
                expect(httpStatus.statusCode).equal(201)
                done()
            })
        })

        it('should create Pasien A', (done) => {
            needle.post(uri.pasien, JSON.stringify(pasienA), optBidanA, (err, res) => {
                let httpStatus = res.body.httpStatus
                rekamMedisA.idPasien = res.body.docId
                expect(httpStatus.statusCode).equal(201)
                done()
            })
        })

        it('should login as Pasien A', (done) => {
            needle.post(uri.session, JSON.stringify(loginPasien.pasienA), optPasienA, (err, res) => {
                let httpStatus = res.body.httpStatus
                let doc = res.body.doc
                optPasienA.headers['Session-ID'] = doc._id
                expect(httpStatus.statusCode).equal(201)
                done()
            })
        })
    })

    describe('SC-011: Create Data Register', () => {
        it('TC-019: should return Status Code 201', (done) => {
            needle.post(uri.rekamMedis, JSON.stringify(rekamMedisA), optBidanA, (err, res) => {
                let httpStatus = res.body.httpStatus
                rekamMedisA._id = res.body.docId
                expect(httpStatus.statusCode).equal(201)
                done()
            })
        })

        it('TC-020: should return Status Code 201', (done) => {
            rekamMedisB.idBidan = rekamMedisA.idBidan
            rekamMedisB.idPasien = rekamMedisA.idPasien
            needle.post(uri.rekamMedis, JSON.stringify(rekamMedisB), optBidanA, (err, res) => {
                let httpStatus = res.body.httpStatus
                rekamMedisB._id = res.body.docId
                expect(httpStatus.statusCode).equal(201)
                done()
            })
        })
    })

    describe('SC-012: Read Data Register', () => {
        it('TC-021: should return ID Bidan A, ID Pasien A, Jenis Pemeriksaan "ASESMEN AWAL"', (done) => {
            needle.get(`${uri.rekamMedis}?_id=${rekamMedisA._id}`, optBidanA, (err, res) => {
                let doc = res.body.doc
                expect(doc.idBidan).equal(rekamMedisA.idBidan)
                expect(doc.idPasien).equal(rekamMedisA.idPasien)
                expect(doc.jenisPemeriksaan).equal('ASESMEN AWAL')
                done()
            })
        })

        it('TC-022: should return ID Bidan A, ID Pasien A, Jenis Pemeriksaan "ASESMEN AWAL"', (done) => {
            needle.get(`${uri.rekamMedis}?_id=${rekamMedisA._id}`, optPasienA, (err, res) => {
                let doc = res.body.doc
                expect(doc.idBidan).equal(rekamMedisA.idBidan)
                expect(doc.idPasien).equal(rekamMedisA.idPasien)
                expect(doc.jenisPemeriksaan).equal('ASESMEN AWAL')
                done()
            })
        })

        it('TC-023: should return ID Bidan A, ID Pasien A, Jenis Pemeriksaan 1 "ASESMEN AWAL", Jenis Pemeriksaan 2 "ANC"', (done) => {
            needle.get(`${uri.rekamMedis}/list?idBidan=${rekamMedisA.idBidan}`, optBidanA, (err, res) => {
                let doc = res.body.doc
                expect(doc[0].idBidan).equal(rekamMedisA.idBidan)
                expect(doc[0].idPasien).equal(rekamMedisA.idPasien)
                expect(doc[0].jenisPemeriksaan).equal('ASESMEN AWAL')
                expect(doc[1].jenisPemeriksaan).equal('ANC')
                done()
            })
        })
    })

    describe('SC-013: Update Data Register', () => {
        it('TC-024: should return No. HP "081111111112", Perujuk "BIDAN"', (done) => {
            needle.put(`${uri.rekamMedis}?_id=${rekamMedisA._id}`, JSON.stringify(updateRekamMedis.rekamMedisA), optBidanA, (err, res) => {
                needle.get(`${uri.rekamMedis}?_id=${rekamMedisA._id}`, optBidanA, (err, res) => {
                    let doc = res.body.doc
                    expect(doc.penanggungJawab.noHP).equal('081111111112')
                    expect(doc.perujuk).equal('BIDAN')
                    done()
                })
            })
        })

        it('TC-025: should return Status Code 405', (done) => {
            needle.put(`${uri.rekamMedis}?_id=${rekamMedisA._id}`, JSON.stringify(updateRekamMedis.rekamMedisA), optPasienA, (err, res) => {
                let httpStatus = res.body.httpStatus
                expect(httpStatus.statusCode).equal(405)
                done()
            })
        })
    })

    describe('SC-014: Delete Data Register', () => {
        it('TC-026: should return Status Code 200', (done) => {
            needle.delete(`${uri.rekamMedis}?_id=${rekamMedisA._id}`, null, optBidanA, (err, res) => {
                let httpStatus = res.body.httpStatus
                expect(httpStatus.statusCode).equal(200)
                done()
            })
        })

        it('TC-027: should return Status Code 405', (done) => {
            needle.delete(`${uri.rekamMedis}?_id=${rekamMedisB._id}`, null, optPasienA, (err, res) => {
                let httpStatus = res.body.httpStatus
                expect(httpStatus.statusCode).equal(405)
                done()
            })
        })
    })

    describe('Clear Data: Test 03', () => {
        it('should delete Rekam Medis B', (done) => {
            needle.delete(`${uri.rekamMedis}?_id=${rekamMedisB._id}`, null, optBidanA, (err, res) => {
                let httpStatus = res.body.httpStatus
                expect(httpStatus.statusCode).equal(200)
                done()
            })
        })

        it('should delete Pasien A', (done) => {
            needle.delete(uri.pasien, null, optPasienA, (err, res) => {
                let httpStatus = res.body.httpStatus
                expect(httpStatus.statusCode).equal(200)
                done()
            })
        })

        it('should delete Bidan A', (done) => {
            needle.delete(uri.bidan, null, optBidanA, (err, res) => {
                let httpStatus = res.body.httpStatus
                expect(httpStatus.statusCode).equal(200)
                done()
            })
        })
    })
})