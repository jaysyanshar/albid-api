const mongoose = require('mongoose')
const credentials = require('./credentials')

const dbConfig = {
    connectionUri: 'mongodb+srv://' 
    + credentials.dbUser 
    + ':' 
    + credentials.dbPassword 
    + '@tugasakhir.2kf4g.mongodb.net/albid?retryWrites=true&w=majority'
}

const dbConnect = (runFunction, errorFunction) => {
    mongoose.connect(dbConfig.connectionUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(
        _ => { runFunction() },
        err => { errorFunction(err) }
    )
    .catch(err => { errorFunction(err) })
}

module.exports = dbConnect