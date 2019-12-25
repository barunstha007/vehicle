const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bikeModelSchema = new Schema({
    bikeModel: {
        type: String,
        required: true
    },
    totalUsers: {
        type: String,
    }
}, {
    timestamps: true
})

module.exports = BikeModelSchema = mongoose.model('BikeModel', bikeModelSchema)
