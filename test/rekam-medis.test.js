/**
 * Please run the full/file test to avoid error
 */

const expect = require('chai').expect
const needle = require('needle')
let { uri, options, user, login, rekamMedis } = require('../test_modules/test_data')

let sessionData = {}

describe('Rekam Medis Test', () => {
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

    describe('Rekam Medis Test', () => {
        // create new
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

        // get one
        it(`get rekam medis: should return created object`, (done) => {
            needle.get(`${uri.rekamMedis}?_id=${sessionData.rekamMedisId}`, options.bidan, (err, res) => {
                try {
                    if (err) { throw err }
                    let body = res.body
                    if (body.doc._id == undefined) { throw body }
                    expect(body.doc._id).equal(sessionData.rekamMedisId)
                    expect(body.doc.idBidan).equal(sessionData.bidanId)
                    expect(body.doc.idPasien).equal(sessionData.pasienId)
                    done()
                } catch (error) {
                    return
                }
            })
        })

        // get one by pasien
        it(`get rekam medis (pasien): should return created object`, (done) => {
            needle.get(`${uri.rekamMedis}?_id=${sessionData.rekamMedisId}`, options.pasien, (err, res) => {
                try {
                    if (err) { throw err }
                    let body = res.body
                    if (body.doc._id == undefined) { throw body }
                    expect(body.doc._id).equal(sessionData.rekamMedisId)
                    expect(body.doc.idBidan).equal(sessionData.bidanId)
                    expect(body.doc.idPasien).equal(sessionData.pasienId)
                    done()
                } catch (error) {
                    return
                }
            })
        })

        // get list
        it('get rekam medis list: should return created object', (done) => {
            needle.get(
                `${uri.rekamMedis}/list?idBidan=${sessionData.bidanId}&idPasien=${sessionData.pasienId}`, 
                options.bidan, (err, res) => {
                try {
                    if (err) { throw err }
                    let body = res.body
                    if (body.doc[0]._id == undefined) { throw body }
                    expect(body.doc[0]._id).equal(sessionData.rekamMedisId)
                    expect(body.doc[0].idBidan).equal(sessionData.bidanId)
                    expect(body.doc[0].idPasien).equal(sessionData.pasienId)
                    done()
                } catch (error) {
                    return
                }
            })
        })

        // get list by pasien
        it('get rekam medis list (pasien): should return created object', (done) => {
            needle.get(
                `${uri.rekamMedis}/list?idBidan=${sessionData.bidanId}&idPasien=${sessionData.pasienId}`, 
                options.pasien, (err, res) => {
                try {
                    if (err) { throw err }
                    let body = res.body
                    if (body.doc[0]._id == undefined) { throw body }
                    expect(body.doc[0]._id).equal(sessionData.rekamMedisId)
                    expect(body.doc[0].idBidan).equal(sessionData.bidanId)
                    expect(body.doc[0].idPasien).equal(sessionData.pasienId)
                    done()
                } catch (error) {
                    return
                }
            })
        })

        // update
        let updateData = {
            penanggungJawab: {
                noHP: '080000000003',
            }
        }
        it('update rekam medis: should return 200', (done) => {
            needle.put(
                `${uri.rekamMedis}?_id=${sessionData.rekamMedisId}`, 
                JSON.stringify(updateData), 
                options.bidan, (err, res) => {
                try {
                    if (err) throw err
                    let body = res.body
                    if (body.docId == undefined) throw body
                    expect(body.httpStatus.statusCode).equal(200)
                    done()
                } catch (error) {
                    return
                }
            })
        })

        // check updated field
        it('get updated rekam medis: should return updated object', (done) => {
            needle.get(`${uri.rekamMedis}?_id=${sessionData.rekamMedisId}`, options.bidan, (err, res) => {
                try {
                    if (err) { throw err }
                    let body = res.body
                    if (body.doc._id == undefined) { throw body }
                    expect(body.doc._id).equal(sessionData.rekamMedisId)
                    expect(body.doc.idBidan).equal(sessionData.bidanId)
                    expect(body.doc.idPasien).equal(sessionData.pasienId)
                    expect(body.doc.penanggungJawab.nama).equal(rekamMedis.penanggungJawab.nama)
                    expect(body.doc.penanggungJawab.noHP).equal(updateData.penanggungJawab.noHP)
                    done()
                } catch (error) {
                    return
                }
            })
        })

        // delete rekam medis
        it('delete rekam medis: should return 200', (done) => {
            needle.delete(`${uri.rekamMedis}?_id=${sessionData.rekamMedisId}`, JSON.stringify(rekamMedis), options.bidan, (err, res) => {
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