const routes = require("../config/routes")

const handler = {
    redirectToDocs: (req, res, next) => {
        if (req.url == '/') {
            res.redirect(routes.apiCloudDocs)
        } else {
            next()
        }
    }
}

module.exports = handler