const router = require('express').Router()
const auth = require('../middleware/auth')
const Booking = require('../models/Booking.model')
const Bike = require('../models/Bike.model')
const ServiceCenter = require('../models/ServiceCenter.model')
const mongoose = require('mongoose')
const { check, validationResult } = require('express-validator')
//const user = require('../models/User.model')

// @route   GET /booking/
// @desc    get current users booking
// @access  Customer, Admin
router.get('/', auth, async (req, res) => {

    try {
        // If user is customer
        if (req.user.role == 3) {
            // Check bike for current user
            const bikeDetails = await Bike.findOne({ user: req.user.id })
            // If bike available
            if (bikeDetails) {

                // Check booking status
                const bookingDetails = await Booking.findOne({ bike: bikeDetails.id })

                if (!bookingDetails || bookingDetails.bookingStatus == 0) {
                    return res.status(404).json("There is no current booking")
                }
                return res.status(200).json(bookingDetails)
            }
            //If there is no bike for user
            return res.status(200).json("Please enter your bike details first")

        }


        // // If user is admin, get all booking status for service center
        if (req.user.role == 2) {
            // Check booking for current user
            bookingDetails = await Booking.find({ bookingStatus: 1 })
            if (!bookingDetails) res.status(404).json('There is no current booking')

            res.status(200).json(bookingDetails)
        }

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }

})

//@router POST /booking/
//@desc add booking for bike
//@access Customer, Admin

router.post('/', auth, async (req, res) => {

    // If not admin or customer
    // if (req.user.role == 2 || req.user.role == 3) return res.status(400).json('Not Eligible')

    // check input validation
    const error = validationResult(req);
    // If validation errors
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    // If request from customer
    if (req.user.role == 3) {

        // Find bike of user
        const bike = await Bike.findOne({ user: req.user.id })
        if (!bike) return res.status(404).json('Booking without bike Details is not possible')

        // Find service center location from body
        const serviceCenter = await ServiceCenter.findOne({ serviceLocation: req.body.serviceLocation })

        const booking = {}
        booking.bike = bike._id
        booking.serviceCenter = serviceCenter._id
        booking.bookingDate = new Date()
        // check null for first time booking
        if (booking.bookingStatus == null || booking.bookingStatus == 0)
            booking.bookingStatus = 1
        // if (booking.bookingStatus == 3) booking.bookingStatus = 2

        // ------THE END----------- HERE
        res.json(booking)
    }

    // const booking = {}
    // booking.bike = bikebooking.id
    // booking.bookingStatus = true

    // if (bikebooking) bike.bikeNumber = req.body.bikeNumber



    // // Build profile Object
    // const bookingFields = {}

    // bookingFields.bike = req.user.id

    // try {
    //     // look for the profile with user req.user.id 
    //     let booking = await Booking.findOne({ user: req.user.id })

    //     // if profile is found for the user
    //     if (booking) {
    //         console.log('Profile Found')
    //         // For Update
    //         mongoose.set('useFindAndModify', false);
    //         booking = await Booking.findOneAndUpdate(
    //             // Update profile in this id
    //             { user: req.user.id },
    //             { $set: bookingFields },
    //             { new: true }
    //         )

    //         return res.json(booking)
    //         // console.log('Booking Updated')
    //     }

    //     console.log('Profile NOT Found')
    //     // Else Create new profile
    //     booking = new Booking(bookingFields)
    //     console.log(booking) //CORRECT (has user id of current user)
    //     await booking.save()
    //     // res.json(booking)
    //     console.log('Booking Created')
    //     console.log(req.user)

    // } catch (err) {
    //     console.error(err.message)
    //     res.status(500).send('Server Error')
    // }

})

module.exports = router