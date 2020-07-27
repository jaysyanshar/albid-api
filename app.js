// Import
const express = require('express')
const bodyParser = require('body-parser')
const dbConnect = require('./config/db')

// Values
const credentials = require('./config/credentials')
const httpStatusCode = require('./app_modules/http-status-code')

// Router
const bidanRoute = require('./routes/bidan-route')
const pasienRoute = require('./routes/pasien-route')

// Custom Global Middleware
var apiKeyChecker = (req, res, next) => {
    let headers = req.headers
    if (headers['x-api-key'] === credentials.apiKey) {
        next()
    } else {
        res.statusMessage = httpStatusCode[412].statusMessage
        res.status(412).send(httpStatusCode[412]).json().end()
    }
}

// Main Run Function
const runFunction = () => {
    // Notify in server side when database is connected
    console.log('Database connected.')

    // Middleware Config
    const app = express()
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(apiKeyChecker)
    const port = process.env.port || 4000

    // Using specific URI path to listen
    const root = credentials.apiRoute.root
    app.use(root + credentials.apiRoute.bidan, bidanRoute)
    app.use(root + credentials.apiRoute.pasien, pasienRoute)

    // Listening on server
    app.listen(port, () => console.log('Listening on port ', port))
}

// Main Error Function
const errorFunction = (err) => {
    // error handling
    console.error(err)
    res.statusMessage = httpStatusCode[500].statusMessage
    res.status(500).send(httpStatusCode[500]).json().end()
}

// Start DB and App
dbConnect(runFunction, errorFunction)