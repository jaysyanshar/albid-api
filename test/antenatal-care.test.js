/**
 * Please run the full/file test to avoid error
 */

const expect = require('chai').expect
const needle = require('needle')

const { rekamMedisEnums } = require('../app_modules/model-enums')
const jenisPemeriksaan = rekamMedisEnums.pemeriksaan

let { uri, options, user, login, rekamMedis, anc } = require('../test_modules/test_data')
let sessionData = {}

describe('Antenatal Care', () => {
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

    describe('Antenatal Care Test', () => {
        // create rekam medis
        it('create rekam medis: should return 201', (done) => {
            rekamMedis.idBidan = sessionData.bidanId
            rekamMedis.idPasien = sessionData.pasienId
            rekamMedis.jenisPemeriksaan = jenisPemeriksaan.anc
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

        // create antenatal care
        it('create antenatal care: should return 201', (done) => {
            anc.idRekamMedis = sessionData.rekamMedisId
            needle.post(uri.anc, JSON.stringify(anc), options.bidan, (err, res) => {
                try {
                    if (err) { throw err }
                    let body = res.body
                    if (body.docId == undefined) { throw body }
                    expect(body.httpStatus.statusCode).equal(201)
                    sessionData.ancId = body.docId
                    done()
                } catch (e) {
                    return
                }
            })
        })

        // update antenatal care
        let ancUpdate = {
            pemeriksaan: {
                ibu: {
                    beratBadan: 61.5
                }
            }
        }
        it('update antenatal care: should return 200', (done) => {
            needle.put(`${uri.anc}?_id=${sessionData.ancId}`, JSON.stringify(ancUpdate), options.bidan, (err, res) => {
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

        // get antenatal care
        it('get antenatal care: should return created object', (done) => {
            needle.get(`${uri.anc}?_id=${sessionData.ancId}`, options.bidan, (err, res) => {
                try {
                    if (err) { throw err }
                    let body = res.body
                    if (body.doc._id == undefined) { throw body }
                    let doc = body.doc
                    expect(doc.idRekamMedis).equal(sessionData.rekamMedisId)
                    expect(doc.pemeriksaan.ibu.beratBadan).equal(ancUpdate.pemeriksaan.ibu.beratBadan)
                    expect(doc.pemeriksaan.ibu.tinggiBadan).equal(anc.pemeriksaan.ibu.tinggiBadan)
                    done()
                } catch (e) {
                    return
                }
            })
        })

        // delete antenatal care
        it('delete antenatal care: should return 403', (done) => {
            needle.delete(`${uri.anc}?_id=${sessionData.ancId}`, null, options.bidan, (err, res) => {
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