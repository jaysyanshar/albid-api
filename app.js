// Import
const express = require('express')
const bodyParser = require('body-parser')
const dbConnect = require('./config/db')
const bidanRoute = require('./routes/bidan-route')
const credentials = require('./config/credentials')
const httpStatusCode = require('./config/http-status-code')

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
    app.use(credentials.apiRoute.bidan, bidanRoute)

    // Listening on server
    app.listen(port, () => console.log('Listening on port ', port))
}

// Main Error Function
const errorFunction = (err) => {
    // error handling
    // console.error(err)
    app.statusMessage = 'Server Error'
    
}

// Start DB and App
dbConnect(runFunction, errorFunction)