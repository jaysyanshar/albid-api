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

let bidanLogininfo = {
    noHP: bidanData.kontak.noHP,
    password: bidanData.password,
    isBidan: true
}

let pasienOptions = {
    headers: {
        'X-API-Key': apiKey
    },
    json: true
}

let pasienData = {
    nik: '3210000000000001',
    nama: 'My Pasien Test Name',
    kontak: {
        noHP: '080000000001'
    }
}

let pasienLoginInfo = {
    noHP: pasienData.kontak.noHP,
    password: pasienData.password || '',
    isBidan: false
}

let myVar = {}

describe('Pasien to Bidan Test', () => {
    // initial action
    describe('Initial Action', () => {
        // sign up bidan first
        it('sign up bidan: should return 201', (done) => {
            needle.post(bidanUri, JSON.stringify(bidanData), bidanOptions, (err, res) => {
                try {
                    if (err) { throw err }
                    let doc = res.body
                    if (doc.docId == undefined) { throw doc }
                    expect(doc.httpStatus.statusCode).equal(201)
                    myVar.bidanId = doc.docId
                    done()
                } catch (e) {
                    return
                }
            })
        })
        // login bidan
        it('login bidan: should return 201', (done) => {
            needle.post(sessionUri, JSON.stringify(bidanLogininfo), bidanOptions, (err, res) => {
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
        // create pasien
        it('register pasien: should return 201', (done) => {
            needle.post(pasienUri, JSON.stringify(pasienData), bidanOptions, (err, res) => {
                try {
                    if (err) { throw err }
                    let doc = res.body
                    if (doc.docId == undefined) { throw doc }
                    expect(doc.httpStatus.statusCode).equal(201)
                    myVar.pasienId = doc.docId
                    done()
                } catch (e) {
                    return
                }
            })
        })
        // login pasien
        it('login pasien: should return 201', (done) => {
            needle.post(sessionUri, JSON.stringify(pasienLoginInfo), pasienOptions, (err, res) => {
                try {
                    if (err) { throw err }
                    let doc = res.body
                    if (doc.doc._id == undefined) { throw doc }
                    expect(doc.httpStatus.statusCode).equal(201)
                    pasienOptions.headers['Session-ID'] = doc.doc._id
                    done()
                } catch (e) {
                    return
                }
            })
        })
    })
    // get bidan's profile
    describe('Get Bidan\'s Profile', () => {
        // in object
        it('get bidan: should return registered data in object', (done) => {
            needle.get(bidanUri + '?_id=' + myVar.bidanId, pasienOptions, (err, res) => {
                try {
                    if (err) { throw err }
                    let body = res.body
                    if (body.doc._id == undefined) { throw body }
                    expect(body.doc._id).equal(myVar.bidanId)
                    expect(body.doc.nik).equal(bidanData.nik)
                    expect(body.doc.nama).equal(bidanData.nama)
                    expect(body.doc.kontak.noHP).equal(bidanData.kontak.noHP)
                    done()
                } catch (e) {
                    return
                }
            })
        })
        // get pasien list
        it('get bidan list: should return registered data in array of object', (done) => {
            needle.get(bidanUri + '/list?_id=' + myVar.bidanId, pasienOptions, (err, res) => {
                try {
                    if (err) { throw err }
                    let body = res.body
                    if (body.doc[0]._id == undefined) { throw body }
                    expect(body.doc[0]._id).equal(myVar.bidanId)
                    expect(body.doc[0].nik).equal(bidanData.nik)
                    expect(body.doc[0].nama).equal(bidanData.nama)
                    expect(body.doc[0].kontak.noHP).equal(bidanData.kontak.noHP)
                    done()
                } catch (e) {
                    return
                }
            })
        })
    })
    describe('Final Action', () => {
        // delete bidan account
        it('delete bidan\'s account: should return 200', (done) => {
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
        // delete pasien account
        it('delete pasien\'s account: should return 200', (done) => {
            needle.delete(pasienUri, null, pasienOptions, (err, res) => {
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