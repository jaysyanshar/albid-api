const baseResponse = require('./base-response')
const credentials = require('../config/credentials')
const role = require('../app_modules/app-enums').role

const Session = require('../models/Session')

const validator = {
    apiKeyChecker: (req, res, next) => {
        let headers = req.headers
        if (headers['x-api-key'] === credentials.apiKey) {
            next()
        } else {
            let error = {
                message: 'API key not recognized.'
            }
            res.status(412).send(baseResponse.error(res, error)).json().end()
        }
    },
    requestChecker: (req, res, next) => {
        if ((typeof req.headers === 'object') && (typeof res.status === 'function')) {
            next()
        } else {
            let error = { message: 'Request type error.' }
            res.status(400).send(baseResponse.error(res, error)).json().end()
        }
    },
    sessionChecker: (req, res, next) => {
        let headers = req.headers
        if (headers['session-id'] != null) {
            Session.findOne({ _id: headers['session-id'] })
            .then(doc => {
                if (doc != null) {
                    req.headers['user-role'] = doc.isBidan ? role.bidan : role.pasien
                    req.headers['user-id'] = doc.userId
                    next()
                } else {
                    throw Error('Session not found.')
                }
            })
            .catch(err => {
                if (err == 'Error: Session not found.') {
                    res.status(401)
                } else {
                    res.status(500)
                }
                res.send(baseResponse.error(res, err)).json().end()
            })
        } else {
            let error = {
                message: 'Require login.'
            }
            res.status(401).send(baseResponse.error(res, error)).json().end()
        }
    },
    roleChecker: (req, res, next, requiredRole, {ifTrue=undefined, ifFalse=undefined}) => {
        if (req.headers['user-role'] == requiredRole) {
            if (ifTrue != undefined) {
                ifTrue()
            } else {
                next()
            }
        } else {
            if (ifFalse != undefined) {
                ifFalse()
            } else {
                let err = {
                    message: 'Unauthorized role.'
                }
                res.status(405).send(baseResponse.error(res, err)).json().end()
            }
        }
    }
}

module.exports = validator