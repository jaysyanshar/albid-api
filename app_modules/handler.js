const credentials = require("../config/credentials")

const handler = {
    redirectRoot: (req, res, next) => {
        if (req.url == '/') {
            res.redirect(credentials.apiCloudDocs)
        } else {
            next()
        }
    }
}

module.exports = handler