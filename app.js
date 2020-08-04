// Import
const express = require('express')
const bodyParser = require('body-parser')
const dbConnect = require('./config/db')

// Values
const routes = require('./config/routes')

// Function
const validator = require('./app_modules/validator')
const handler = require('./app_modules/handler')

// Router
const bidanRoute = require('./routes/bidan-route')
const pasienRoute = require('./routes/pasien-route')
const sessionRoute = require('./routes/session-route')
const rekamMedisRoute = require('./routes/rekam-medis-route')

// Init App
const app = express()

// Main Run Function
const runFunction = () => {
    // Notify in server side when database is connected
    console.log('Database connected.')

    // Redirect Web
    app.use('/', handler.redirectToDocs)

    // Middleware Config
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(validator.requestChecker)
    app.use(validator.apiKeyChecker)
    const port = process.env.port || 4000

    // Using specific URI path to listen
    const root = routes.apiRoute.root
    app.use(root + routes.apiRoute.session, sessionRoute)
    app.use(root + routes.apiRoute.bidan, bidanRoute)
    app.use(root + routes.apiRoute.pasien, pasienRoute)
    app.use(root + routes.apiRoute.rekamMedis, rekamMedisRoute)

    // Listening on server
    app.listen(port, () => console.log('Listening on port ', port))
}

// Main Error Function
const errorFunction = (err) => {
    // error handling
    console.error(err)
}

// Start DB and App
dbConnect(runFunction, errorFunction)