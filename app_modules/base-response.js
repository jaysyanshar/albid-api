const httpStatusCode = require("./http-status-code")

const baseResponse = {
    ok: (res, doc, isCompleteDoc = false) => {
        return isCompleteDoc ?
        {
            doc: doc,
            httpStatus: httpStatusCode[(res.statusCode)]
        } :
        {
            docId: doc._id,
            httpStatus: httpStatusCode[(res.statusCode)]
        }
    },
    error: (res, err) => {
        return {
            httpStatus: httpStatusCode[(res.statusCode)],
            details: err,
        }
    }
}

module.exports = baseResponse