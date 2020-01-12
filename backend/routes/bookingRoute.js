const router = require('express').Router()
const auth = require('../middleware/auth')
const Bike = require('../models/Bike.model')
const ServiceCenter = require('../models/ServiceCenter.model')
const Booking = require('../models/Booking.model')
const mongoose = require('mongoose')
const { check, validationResult } = require('express-validator')

// @route   GET /booking/queue
// @desc    get queued bikes
// @access  Admin
router.get('/queue', auth, async (req, res) => {
    if (req.user.role !== 2) return res.json('Not authorized')

    try {
        // Check booking for current user

        var sortbybookingdate = { bookingDate: 1 };
        bookingDetails = await Booking.find({ bookingStatus: 1 }).sort(sortbybookingdate)
        if (!bookingDetails) res.status(404).json('Booking requests are empty')

        res.status(200).json(bookingDetails)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }

})

// @route   GET /booking/acceptd
// @desc    get booking accepted bikes
// @access  Admin
router.get('/accepted', auth, async (req, res) => {
    if (req.user.role !== 2) return res.json('Not authorized')

    try {
        // Check booking for current user
        bookingDetails = await Booking.find({ bookingStatus: 2 })
        if (!bookingDetails) res.status(404).json('No Booking Accepted')

        res.status(200).json(bookingDetails)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }

})

// @route   GET /booking/:id
// @desc    get booking by id
// @access  Customers
router.get('/:id', auth, async (req, res) => {
    if (req.user.role !== 3) return res.json('Create Customer account')

    try {
        // Check bike for current user
        const bikeDetails = await Bike.findOne({ user: req.user.id })
        // If bike available
        if (bikeDetails) {

            // Check booking status
            const bookingDetails = await Booking.findOne({ bike: bikeDetails.id }).populate('serviceCenter', 'name')

            return res.status(200).json(bookingDetails)
        }


    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }

})

//@router POST /booking/
//@desc add booking for bike
//@access Customer
router.post('/request', [auth, [
    check("bikeDetails", "Please enter your bike")
        .not()
        .isEmpty(),
    check("serviceCenter", "Please select a service center to book").not().isEmpty(),

]], async (req, res) => {

    // check if request from customer
    if (req.user.role !== 3) return res.status(400).json({ error: [{ 'msg': 'Create Customer account!' }] })

    const error = validationResult(req);
    // If validation errors
    if (!error.isEmpty()) return res.status(400).json({ error: error.array() });

    // Find requested bike
    const requestedBike = await Bike.findOne({ _id: req.body.bikeDetails })
    if (!requestedBike) return res.status(404).json({ error: [{ 'msg': "User Bike is not registered" }] })
    // Find requested service center
    const requestedServiceCenter = await ServiceCenter.findOne({ _id: req.body.serviceCenter })
    if (!requestedServiceCenter) return res.status(404).json({ error: [{ 'msg': "Service Center doesnot exist" }] })

    // create new object containing requested booking details
    const bookingDetails = {}
    if (req.body.serviceCenter) bookingDetails.serviceCenter = req.body.serviceCenter
    if (req.body.bookingStatus) bookingDetails.bookingStatus = req.body.bookingStatus
    bookingDetails.bookingDate = Date.now()

    // update if bike exists
    const checkBike = await Booking.findOne({ bike: req.body.bikeDetails })
    if (checkBike) {
        const updateBooking = await Booking.findOneAndUpdate(
            // Update profile in this id
            { bike: req.body.bikeDetails },
            { $set: bookingDetails, bookingDate: Date.now() },
            { new: true }
        ).populate('serviceCenter', 'name')
        return res.json(updateBooking)
    }

    // Create new booking
    let newbooking = new Booking({
        bike: req.body.bikeDetails,
        serviceCenter: req.body.serviceCenter,
        bookingStatus: req.body.bookingStatus,
        bookingDate: Date.now()
    })

    // save to database
    await newbooking.save();

    // Populates service center
    newbooking = await newbooking.populate('serviceCenter', 'name').execPopulate()

    res.status(200).json(newbooking)

})

module.exports = router