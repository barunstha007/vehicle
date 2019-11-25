const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookingSchema = new Schema({
    bike: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bike',
        required: true,
    },
    // mm-dd-yy format

    bookingDate: {
        type: Date,
        default: Date.now,
        required: true,
        trim: true
    },
    checkInDate: Date,
    estimatedCheckOutDate: Date,
    checkOutDate: Date,

    //user books
    bookingStatus: {
        type: Boolean,
        default: false,
    },

    queueStatus: {
        type: Boolean,
        default: false,
    },
    totalPrice: Number,
}, {
    timestamps: true
})

module.exports = Booking = mongoose.model('Booking', bookingSchema)
