const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bikeSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDetails',
        required: true
    },
    bikeModel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BikeModel',
        required: true
    },
    bikeNumber: {
        type: String,
        required: true
    },
    odometer: {
        type: Number,
    }
}, {
    timestamps: true
})

module.exports = Bike = mongoose.model('Bike', bikeSchema)
