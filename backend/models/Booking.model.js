const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookingSchema = new Schema({
    bike: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bike',
        required: true,
    },
    serviceCenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceCenter',
        required: true,
    },
    // mm-dd-yy format

    bookingDate: {
        type: Date,
        default: Date.now,
        required: true,
        trim: true
    },
    servicingDate: Date,
    checkOutDate: Date,

    //user books

    bookingStatus: {
        type: Number,
        default: 0,
    },
    totalPrice: Number,
}, {
    timestamps: true
})

module.exports = Booking = mongoose.model('Booking', bookingSchema)
