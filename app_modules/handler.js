const path = require("../config/path")

const handler = {
    redirectToDocs: (req, res, next) => {
        if (req.url == '/') {
            res.redirect(path.apiCloudDocs)
        } else {
            next()
        }
    }
}

module.exports = handler