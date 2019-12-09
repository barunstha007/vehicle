const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bikeSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDetails',
        required: true
    },
    number: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = Bike = mongoose.model('Bike', bikeSchema)
