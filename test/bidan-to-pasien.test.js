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

let myVar = {}

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

describe('Bidan to Pasien Test', () => {
    // initial action
    describe('Initial Action', () => {
        // sign up first
        it('sign up: should return 201', (done) => {
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
        // login
        it('login bidan: should return 201', (done) => {
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
        // create dummy pasien
        it('register pasien: should return 201', (done) => {
            needle.post(pasienUri, JSON.stringify(pasienData), options, (err, res) => {
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
    })
    // get pasien's profile
    describe('Get Pasien\'s Profile', () => {
        // in object
        it('get pasien: should return registered data in object', (done) => {
            needle.get(pasienUri + '?_id=' + myVar.pasienId, options, (err, res) => {
                try {
                    if (err) { throw err }
                    let body = res.body
                    if (body.doc._id == undefined) { throw body }
                    expect(body.doc._id).equal(myVar.pasienId)
                    expect(body.doc.nik).equal(pasienData.nik)
                    expect(body.doc.nama).equal(pasienData.nama)
                    expect(body.doc.kontak.noHP).equal(pasienData.kontak.noHP)
                    done()
                } catch (e) {
                    return
                }
            })
        })
        // get pasien list
        it('get pasien list: should return registered data in array of object', (done) => {
            needle.get(pasienUri + '/list?nama=' + pasienData.nama, options, (err, res) => {
                try {
                    if (err) { throw err }
                    let body = res.body
                    if (body.doc[0]._id == undefined) { throw body }
                    expect(body.doc[0]._id).equal(myVar.pasienId)
                    expect(body.doc[0].nik).equal(pasienData.nik)
                    expect(body.doc[0].nama).equal(pasienData.nama)
                    expect(body.doc[0].kontak.noHP).equal(pasienData.kontak.noHP)
                    done()
                } catch (e) {
                    return
                }
            })
        })
    })
    // Update Pasien
    describe('Update Pasien\'s Profile', () => {
        let updateData = {
            kontak: {
                email: 'mypasienemail@test.id'
            }
        }
        it('update pasien: should return 200', (done) => {
            needle.put(pasienUri + '?_id=' + myVar.pasienId, JSON.stringify(updateData), options, (err, res) => {
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
    describe('Final Action', () => {
        // delete bidan account
        it('delete bidan\'s account: should return 200', (done) => {
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