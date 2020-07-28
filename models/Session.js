const mongoose = require('mongoose')

const Schema = mongoose.Schema

const sessionSchema = new Schema({
    userID: { type: mongoose.Types.ObjectId, trim: true, unique: true, required: true, index: true, },
    isBidan: { type: Boolean, required: true },
    login: [
        {
            connection: { type: String, required: true, index: true, trim: true },
            date: { type: Date, required: true, default: Date.now, expires: 3600*24*30 } // expires in 30 days
        }
    ]
},
{ collection: 'session' }
)

module.exports = mongoose.model('Session', sessionSchema)