const baseResponse = require("./base-response")

// CRUD
const crud = {
    createOne: (req, res, Model) => {
        Model(req.body).save()
        .then(doc => {
            res.status(201)
            res.send(baseResponse.ok(res, doc)).json().end()
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
    },
    readOne: (req, res, Model) => {
        Model.findOne(req.query)
        .then(doc => {
            if (doc == null) { throw 'Retrieved document is null.' }
            res.status(200)
            res.send(baseResponse.ok(res, doc, true)).json().end()
        })
        .catch(err => {
            switch (err.code) {
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
            res.status(200)
            res.send(baseResponse.ok(res, doc, true)).json().end()
        })
        .catch(err => {
            switch (err.code) {
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
            res.status(200)
            res.send(baseResponse.ok(res, doc)).json().end()
        })
        .catch(err => {
            switch (err.code) {
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
            res.status(200)
            res.send(baseResponse.ok(res, doc)).json().end()
        })
        .catch(err => {
            switch (err.code) {
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