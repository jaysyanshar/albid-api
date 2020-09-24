// Import
const express = require('express')
const bodyParser = require('body-parser')
const dbConnect = require('./config/db')

// Values
const path = require('./config/path')

// Function
const validator = require('./app_modules/validator')
const handler = require('./app_modules/handler')

// Router
const bidanRoute = require('./routes/bidan-route')
const pasienRoute = require('./routes/pasien-route')
const sessionRoute = require('./routes/session-route')
const rekamMedisRoute = require('./routes/rekam-medis-route')
const asesmenAwalRoute = require('./routes/asesmen-awal-route')
const antenatalCareRoute = require('./routes/antenatal-care-route')
const kohortRoute = require('./routes/kohort-route')
const soap1Route = require('./routes/soap-1-route')
const soap2Route = require('./routes/soap-2-route')

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
    const root = path.apiPath.root
    app.use(root + path.apiPath.session, sessionRoute)
    app.use(root + path.apiPath.bidan, bidanRoute)
    app.use(root + path.apiPath.pasien, pasienRoute)
    app.use(root + path.apiPath.rekamMedis, rekamMedisRoute)
    app.use(root + path.apiPath.asesmenAwal, asesmenAwalRoute)
    app.use(root + path.apiPath.anc, antenatalCareRoute)
    app.use(root + path.apiPath.kohort, kohortRoute)
    app.use(root + path.apiPath.soap1, soap1Route)
    app.use(root + path.apiPath.soap2, soap2Route)

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