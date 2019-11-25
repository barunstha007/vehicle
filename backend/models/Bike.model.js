const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bikeSchema = new Schema({
    number: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

module.exports = Bike = mongoose.model('Bike', bikeSchema)
