const baseResponse = require('./base-response')
const credentials = require('../config/credentials')

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
    }
}

module.exports = validator