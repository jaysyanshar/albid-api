const express = require('express')
const requestIp = require('request-ip')
const crud = require('../app_modules/crud')
const baseResponse = require('../app_modules/base-response')

const Session = require('../models/Session')
const Bidan = require('../models/Bidan')
const Pasien = require('../models/Pasien')

const router = express.Router()

// Upsert Session (Login)
const upsertSession = (req, res, Model) => {
    let data = req.body
    let clientIp = requestIp.getClientIp(req)

    Model.findOne({ "kontak.noHP": data.noHP, password: data.password })
    .then(modelDoc => {
        if (modelDoc == null) { throw Error('User not found.') }

        Session.findOne({ userID: modelDoc._id })
        .then(sessionDoc => {
            if (sessionDoc == null) { throw Error('Session not found.') }
            else {
                let sent = false
                for (let i = 0; i < sessionDoc.login.length; i++) {
                    if (sessionDoc.login[i].connection == clientIp) {
                        sessionDoc.login[i].date = Date.now()
                        sessionDoc.save()
                        res.status(200).send(baseResponse.ok(res, sessionDoc)).json().end()
                        sent = true
                        break
                    }
                }
                if (sent == false) {
                    sessionDoc.login.push({ connection: clientIp, date: Date.now() })
                    sessionDoc.save()
                    res.status(200).send(baseResponse.ok(res, sessionDoc)).json().end()
                    sent = true
                }
                if (sent == false) {
                    throw Error('Failed to send data to database.')
                }
            }
        })
        .catch(sessionErr => {
            if (sessionErr == 'Error: Session not found.') {
                let sessionData = {
                    isBidan: data.isBidan,
                    userID: modelDoc._id,
                    login: [
                        {
                            connection: clientIp,
                            date: Date.now()
                        }
                    ]
                }
                req.body = sessionData
                crud.createOne(req, res, Session)
            }
            else {
                res.status(500).send(baseResponse.error(res, sessionErr)).json().end()
            }
        })
    })
    .catch(err => {
        switch (err.code) {
            // unique data already exist
            case 11000: { res.status(409); break }
            // required field not assigned
            case undefined: { res.status(400); break }
            case null: { res.status(400); break }
            // server error
            default: res.status(500)
        }
        res.send(baseResponse.error(res, err)).json().end()
    })
}

// Re-login
const reLoginSession = (req, res) => {
    let clientIp = requestIp.getClientIp(req)
    Session.findOne({ _id: req.headers["session-id"] })
    .then(doc => {
        let sent = false
        for (let i = 0; i < doc.login.length; i++) {
            if (doc.login[i].connection == clientIp) {
                doc.login[i].date = Date.now()
                try {
                    doc.save()
                    res.status(200).send(baseResponse.ok(res, doc, true)).json().end()
                    sent = true
                } catch (e) {
                    throw Error('Failed to send data.')
                }
                break
            }
        }
        if (!sent) {
            throw Error('Need re-login.')
        }
    })
    .catch(err => {
        console.log(err)
        if (err == 'Error: Need re-login.') {
            res.status(401).send(baseResponse.error(res, err)).json().end()
        } else {
            res.status(500).send(baseResponse.error(res, err)).json().end()
        }
    })
}

// Logout
const logoutSession = (req, res) => {
    let clientIp = requestIp.getClientIp(req)
    Session.findOne({ _id: req.headers["session-id"] })
    .then(doc => {
        let sent = false
        for (let i = 0; i < doc.login.length; i++) {
            if (doc.login[i].connection == clientIp) {
                doc.login.splice(i, 1)
                try {
                    doc.save()
                    res.status(200).send(baseResponse.ok(res, doc)).json().end()
                    sent = true
                } catch (e) {
                    throw Error('Failed to send data.')
                }
                break
            }
        }
        if (!sent) {
            throw Error('Connection not found.')
        }
    })
    .catch(err => {
        if (err == 'Error: Failed to send data.') {
            res.status(500).send(baseResponse.error(res, err)).json().end()
        } else if (err == 'Error: Connection not found.') {
            res.status(404).send(baseResponse.error(res, err)).json().end()
        }
        else { res.status(500).send(baseResponse.error(res, err)).json().end() }
    })
}

// Logout All
const logoutAllSession = (req, res) => {
    let clientIp = requestIp.getClientIp(req)
    Session.findOne({ _id: req.headers['session-id'] })
    .then(doc => {
        let isDeleted = false
        if (doc == null) { throw Error('No session data.') }
        for (let i = 0; i < doc.login.length; i++) {
            if (doc.login[i].connection == clientIp) {
                let newReq = { query: { _id: doc._id } }
                try {
                    crud.deleteOne(newReq, res, Session)
                    isDeleted = true
                } catch (e) {
                    throw Error('Failed to delete.')
                }
                break
            }
        }
        if (!isDeleted) {
            throw Error('IP not recognized.')
        }
    })
    .catch(err => {
        if (err == 'Error: Failed to delete.') {
            res.status(500)
        } else if (err == 'Error: IP not recognized.') {
            res.status(403)
        } else if (err == 'Error: No session data.') {
            res.status(400)
        } else {
            res.status(500)
        }
        res.send(baseResponse.error(res, err)).json().end()
    })
}

// EXPRESS HTTP METHODS
// Login
router.post('/', (req, res) => {
    if (req.body.isBidan) {
        upsertSession(req, res, Bidan)
    } else {
        upsertSession(req, res, Pasien)
    }
})
// Re-Login
router.get('/', (req, res) => reLoginSession(req, res))
// Logout
router.put('/', (req, res) => logoutSession(req, res))
// Logout All Devices
router.delete('/', (req, res) => logoutAllSession(req, res))

module.exports = router