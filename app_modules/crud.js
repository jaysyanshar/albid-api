const baseResponse = require("./base-response")

// CRUD
const crud = {
    createOne: (req, res, Model) => {
        Model(req.body).save()
        .then(doc => {
            try {
                res.status(201)
                res.send(baseResponse.ok(res, doc)).json().end()
            } catch (e) {
                throw Error('Failed to send data.')
            }
        })
        .catch(err => {
            if (err == 'Error: Failed to send data.') {
                res.status(500)
            } else switch (err.code) {
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
    },
    readOne: (req, res, Model) => {
        Model.findOne(req.query)
        .then(doc => {
            if (doc == null) { throw Error('Retrieved document is null.') }
            try {
                res.status(200)
                res.send(baseResponse.ok(res, doc, true)).json().end()
            } catch (e) {
                throw Error('Failed to send data.')
            }
        })
        .catch(err => {
            if (err == 'Error: Retrieved document is null.') {
                res.status(404)
            } else if (err == 'Error: Failed to send data.') {
                res.status(500)
            } else switch (err.code) {
                // data or page not found
                case undefined: { res.status(404); break }
                case null: { res.status(404); break }
                // server error
                default: res.status(500)
            }
            res.send(baseResponse.error(res, err)).json().end()
        })
    },
    readMany: (req, res, Model) => {
        Model.find(req.query)
        .then(doc => {
            if (Object.keys(doc).length == 0) { throw Error('Retrieved list is empty.') }
            try {
                res.status(200)
                res.send(baseResponse.ok(res, doc, true)).json().end()
            } catch (e) {
                throw Error('Failed to send data.')
            }
        })
        .catch(err => {
            if (err == 'Error: Retrieved list is empty.') {
                res.status(404)
            } else if (err == 'Error: Failed to send data.') {
                res.status(500)
            } else switch (err.code) {
                // data or page not found
                case undefined: { res.status(404); break }
                case null: { res.status(404); break }
                // server error
                default: res.status(500)
            }
            res.send(baseResponse.error(res, err)).json().end()
        })
    },
    updateOne: (req, res, Model) => {
        Model.findOneAndUpdate(req.query, req.body, { useFindAndModify: false })
        .then(doc => {
            try {
                res.status(200)
                res.send(baseResponse.ok(res, doc)).json().end()
            } catch (e) {
                throw Error('Failed to send data.')
            }
        })
        .catch(err => {
            if (err == 'Error: Failed to send data.') {
                res.status(500)
            } else switch (err.code) {
                // data or page not found
                case undefined: { res.status(404); break }
                case null: { res.status(404); break }
                // server error
                default: res.status(500)
            }
            res.send(baseResponse.error(res, err)).json().end()
        })
    },
    deleteOne: (req, res, Model) => {
        Model.findOneAndDelete(req.query)
        .then(doc => {
            try {
                res.status(200)
                res.send(baseResponse.ok(res, doc)).json().end()
            } catch (e) {
                throw Error('Failed to send data.')
            }
        })
        .catch(err => {
            if (err == 'Error: Failed to send data.') {
                res.status(500)
            } else switch (err.code) {
                // data or page not found
                case undefined: { res.status(404); break }
                case null: { res.status(404); break }
                // server error
                default: res.status(500)
            }
            res.send(baseResponse.error(res, err)).json().end()
        })
    }
}

module.exports = crud