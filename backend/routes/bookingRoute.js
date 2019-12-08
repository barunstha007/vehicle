const router = require('express').Router()
const auth = require('../middleware/auth')
const Booking = require('../models/Booking.model')
const Bike = require('../models/Bike.model')
const mongoose = require('mongoose')
const { check, validationResult } = require('express-validator')
//const user = require('../models/User.model')

// @route   GET /bookings/mybooking
// @desc    get current users booking
// @access  @Private
router.get('/mybooking', auth, async (req, res) => {
    try {
        // Check booking for current user
        const bookingDetails = await Booking.findOne({ user: req.user.id })
        // If no booking
        if (!bookingDetails) {
            res.json("There is no booking for this user")

        }
        //If there is booking
        res.json(bookingDetails)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }

})

//@router POST /bookings/
//@desc add users booking
//@access Private

router.post('/', auth, async (req, res) => {

    let bikebooking = await Bike.findOne({ user: req.user.id })
    console.log(bikebooking.id)

    const booking = {}
    booking.bike = bikebooking.id
    booking.bookingStatus = true

    if (bikebooking) bike.bikeNumber = req.body.bikeNumber



    // Build profile Object
    const bookingFields = {}

    bookingFields.bike = req.user.id

    try {
        // look for the profile with user req.user.id 
        let booking = await Booking.findOne({ user: req.user.id })

        // if profile is found for the user
        if (booking) {
            console.log('Profile Found')
            // For Update
            mongoose.set('useFindAndModify', false);
            booking = await Booking.findOneAndUpdate(
                // Update profile in this id
                { user: req.user.id },
                { $set: bookingFields },
                { new: true }
            )

            return res.json(booking)
            // console.log('Booking Updated')
        }

        console.log('Profile NOT Found')
        // Else Create new profile
        booking = new Booking(bookingFields)
        console.log(booking) //CORRECT (has user id of current user)
        await booking.save()
        // res.json(booking)
        console.log('Booking Created')
        console.log(req.user)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }

})

module.exports = router