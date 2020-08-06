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

describe('Bidan Profile Test', () => {
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
    describe('Login', () => {
        let loginInfo = {
            noHP: data.kontak.noHP,
            password: data.password,
            isBidan: true
        }
        // first login using username, password
        it('first login: should return 201', (done) => {
            needle.post(sessionUri, JSON.stringify(loginInfo), options, (err, res) => {
                try {
                    if (err) { throw err }
                    let doc = res.body
                    if (doc.docId == undefined) { throw doc }
                    expect(doc.httpStatus.statusCode).equal(201)
                    options.headers['Session-ID'] = doc.docId
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
                    if (doc.docId == undefined) { throw doc }
                    expect(doc.httpStatus.statusCode).equal(200)
                    options.headers['Session-ID'] = doc.docId
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