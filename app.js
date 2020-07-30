// Import
const express = require('express')
const bodyParser = require('body-parser')
const dbConnect = require('./config/db')

// Values
const credentials = require('./config/credentials')

// Function
const validator = require('./app_modules/validator')

// Router
const bidanRoute = require('./routes/bidan-route')
const pasienRoute = require('./routes/pasien-route')
const sessionRoute = require('./routes/session-route')

// Init App
const app = express()

// Main Run Function
const runFunction = () => {
    // Notify in server side when database is connected
    console.log('Database connected.')

    // Middleware Config
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(validator.requestChecker)
    app.use(validator.apiKeyChecker)
    const port = process.env.port || 4000

    // Using specific URI path to listen
    const root = credentials.apiRoute.root
    app.use(root + credentials.apiRoute.session, sessionRoute)
    app.use(root + credentials.apiRoute.bidan, bidanRoute)
    app.use(root + credentials.apiRoute.pasien, pasienRoute)

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