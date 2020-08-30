/**
 * Please run the full/file test to avoid error
 */

const expect = require('chai').expect
const needle = require('needle')

let { uri, options, user, login, rekamMedis, asesmenAwal } = require('../test_modules/test_data')
let sessionData = {}

describe('Asesmen Awal Test', () => {
    // init bidan and pasien
    describe('Init User', () => {
        // sign up bidan
        it('sign up: should return 201', (done) => {
            needle.post(uri.bidan, JSON.stringify(user.bidan), options.bidan, (err, res) => {
                try {
                    if (err) {
                        throw err
                    }
                    let body = res.body
                    if (body.docId == undefined) { throw body }
                    expect(body.httpStatus.statusCode).equal(201)
                    done()
                } catch (e) {
                    return
                }
            })
        })
        // bidan login
        it('login bidan: should return 201', (done) => {
            needle.post(uri.session, JSON.stringify(login.bidan), options.bidan, (err, res) => {
                try {
                    if (err) { throw err }
                    let body = res.body
                    if (body.doc._id == undefined) { throw body }
                    expect(body.httpStatus.statusCode).equal(201)
                    options.bidan.headers['Session-ID'] = body.doc._id
                    sessionData.bidanId = body.doc.userId
                    done()
                } catch (e) {
                    return
                }
            })
        })
        // create pasien
        it('register pasien: should return 201', (done) => {
            needle.post(uri.pasien, JSON.stringify(user.pasien), options.bidan, (err, res) => {
                try {
                    if (err) { throw err }
                    let body = res.body
                    if (body.docId == undefined) { throw body }
                    expect(body.httpStatus.statusCode).equal(201)
                    sessionData.pasienId = body.docId
                    done()
                } catch (e) {
                    return
                }
            })
        })
        // login pasien
        it('login pasien: should return 201', (done) => {
            needle.post(uri.session, JSON.stringify(login.pasien), options.pasien, (err, res) => {
                try {
                    if (err) { throw err }
                    let body = res.body
                    if (body.doc._id == undefined) { throw body }
                    expect(body.httpStatus.statusCode).equal(201)
                    options.pasien.headers['Session-ID'] = body.doc._id
                    done()
                } catch (e) {
                    return
                }
            })
        })
    })

    /**
     * MAIN TEST
     * START
     */

    describe('Asesmen Awal Test', () => {
        // create rekam medis
        it('create rekam medis: should return 201', (done) => {
            rekamMedis.idBidan = sessionData.bidanId
            rekamMedis.idPasien = sessionData.pasienId
            needle.post(uri.rekamMedis, JSON.stringify(rekamMedis), options.bidan, (err, res) => {
                try {
                    if (err) { throw err }
                    let body = res.body
                    if (body.docId == undefined) { throw body }
                    expect(body.httpStatus.statusCode).equal(201)
                    sessionData.rekamMedisId = body.docId
                    done()
                } catch (e) {
                    return
                }
            })
        })

        // create asesmen awal
        it('create asesmen awal: should return 201', (done) => {
            asesmenAwal.idRekamMedis = sessionData.rekamMedisId
            needle.post(uri.asesmenAwal, JSON.stringify(asesmenAwal), options.bidan, (err, res) => {
                try {
                    if (err) { throw err }
                    let body = res.body
                    if (body.docId == undefined) { throw body }
                    expect(body.httpStatus.statusCode).equal(201)
                    sessionData.asesmenAwalId = body.docId
                    done()
                } catch (e) {
                    return
                }
            })
        })

        // update asesmen awal subjektif
        let subjektifUpdate = {
            riwayatPenyakit: {
                sekarang: "Jantung"
            }
        }
        it('update subjektif: should return 200', (done) => {
            needle.put(`${uri.asesmenAwalSubjektif}?_id=${sessionData.asesmenAwalId}`, JSON.stringify(subjektifUpdate), options.bidan, (err, res) => {
                try {
                    if (err) { throw err }
                    let body = res.body
                    if (body.docId == undefined) { throw body }
                    expect(body.httpStatus.statusCode).equal(200)
                    done()
                } catch (e) {
                    return
                }
            })
        })

        // update asesmen awal objektif
        let objektifUpdate = {
            tandaVital: {
                nadiPerMenit: 80
            }
        }
        it('update subjektif: should return 200', (done) => {
            needle.put(`${uri.asesmenAwalObjektif}?_id=${sessionData.asesmenAwalId}`, JSON.stringify(objektifUpdate), options.bidan, (err, res) => {
                try {
                    if (err) { throw err }
                    let body = res.body
                    if (body.docId == undefined) { throw body }
                    expect(body.httpStatus.statusCode).equal(200)
                    done()
                } catch (e) {
                    return
                }
            })
        })

        // get asesmen awal
        it('get asesmen awal: should return created object', (done) => {
            needle.get(`${uri.asesmenAwal}?_id=${sessionData.asesmenAwalId}`, options.bidan, (err, res) => {
                try {
                    if (err) { throw err }
                    let body = res.body
                    let subjektif = body.doc.subjektif
                    let objektif = body.doc.objektif
                    if (body.doc._id == undefined) { throw body }
                    expect(body.doc.idRekamMedis).equal(sessionData.rekamMedisId)
                    expect(subjektif.riwayatPenyakit.sekarang[0]).equal(subjektifUpdate.riwayatPenyakit.sekarang)
                    expect(objektif.tandaVital.nadiPerMenit).equal(objektifUpdate.tandaVital.nadiPerMenit)
                    done()
                } catch (e) {
                    return
                }
            })
        })

        // delete asesmen awal
        it('delete asesmen awal: should return 403', (done) => {
            needle.delete(`${uri.asesmenAwal}?_id=${sessionData.asesmenAwalId}`, null, options.bidan, (err, res) => {
                try {
                    if (err) { throw err }
                    let body = res.body
                    if (body.docId == undefined) { throw body }
                    return
                } catch (e) {
                    expect(e.httpStatus.statusCode).equal(403)
                    done()
                }
            })
        })

        // delete rekam medis
        it('delete rekam medis: should return 200', (done) => {
            needle.delete(`${uri.rekamMedis}?_id=${sessionData.rekamMedisId}`, null, options.bidan, (err, res) => {
                try {
                    if (err) { throw err }
                    let body = res.body
                    if (body.docId == undefined) { throw body }
                    expect(body.httpStatus.statusCode).equal(200)
                    done()
                } catch (e) {
                    return
                }
            })
        })
    })

    /**
     * MAIN TEST
     * END
     */

    // remove dummy data
    describe('Remove User', () => {
        // delete bidan
        it('delete bidan: should return 200', (done) => {
            needle.delete(uri.bidan, null, options.bidan, (err, res) => {
                try {
                    if (err) { throw err }
                    let body = res.body
                    if (body.docId == undefined) { throw body }
                    expect(body.httpStatus.statusCode).equal(200)
                    done()
                } catch (e) {
                    return
                }
            })
        })
        // delete pasien
        it('delete pasien: should return 200', (done) => {
            needle.delete(uri.pasien, null, options.pasien, (err, res) => {
                try {
                    if (err) { throw err }
                    let body = res.body
                    if (body.docId == undefined) { throw body }
                    expect(body.httpStatus.statusCode).equal(200)
                    done()
                } catch (e) {
                    return
                }
            })
        })
    })
})
