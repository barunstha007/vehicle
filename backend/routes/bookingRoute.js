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
        // get service center of logged-in admin
        const currentAdmin = await ServiceCenter.findOne({ admin: req.user.id })

        // Sort by date in ascending order
        var sortbybookingdate = { bookingDate: 1 };
        // find queued booking details of current admins service center
        bookingDetails = await Booking.find({ bookingStatus: 1, serviceCenter: currentAdmin })
            // .populate('serviceCenter', 'name')
            // Nested population for userDetails and for bike model
            .populate([
                {
                    path: 'bike',
                    model: 'Bike',
                    select: 'bikeNumber',
                    populate: {
                        path: 'user',
                        model: 'UserDetails',
                        select: ['name', 'phone', 'location']
                    }
                },
            ])
            .populate([
                {
                    path: 'bike',
                    model: 'Bike',
                    select: 'bikeNumber',
                    populate: {
                        path: 'bikeModel',
                        model: 'BikeModel',
                        select: 'bikeModel'
                    },
                },
            ])
            .sort(sortbybookingdate)

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
        res.status(500).send('Server Error')
    }

})

//@route POST /booking/accept
//@desc  accept queue
//@access Customer
router.post('/accept', auth, async (req, res) => {

    // check if request from customer
    if (req.user.role !== 2) return res.status(400).json({ error: [{ 'msg': 'Not Authorized!' }] })

    try {
        const acceptedBookings = req.body
        // res.json(acceptedBookings[0].id)

        acceptedBookings.map(async booking => {

            const updateBooking = await Booking.findOneAndUpdate(
                // Update profile in this id
                { bike: booking.id },
                { $set: { servicingDate: booking.servicingDate, bookingStatus: 2 } },
                { new: true }
            )
        })
        res.json('Updated')

        // const id = "e1f66d7a852986709f665c3"
        // const requestedBike = await Booking.findOne({ _id: "5e3923e8a7c3e42634dc1d46" })
        // res.json(requestedBike)


    } catch (err) {

    }

})


//@route POST /booking/
//@desc add queue for bike
//@access Customer
router.post('/request', [auth, [
    check("bikeDetails", "Please enter your bike")
        .not()
        .isEmpty(),
    check("serviceCenter", "Please select a service center to book").not().isEmpty(),

]], async (req, res) => {

    // check if request from customer
    if (req.user.role !== 3) return res.status(400).json({ error: [{ 'msg': 'Create Customer account!' }] })

    // If validation errors
    const error = validationResult(req);
    if (!error.isEmpty()) return res.status(400).json({ error: error.array() });


    const requestedServiceCenter = await ServiceCenter.findOne({ _id: req.body.serviceCenter })

    // create new object containing requested booking details
    const bookingDetails = {}
    if (req.body.serviceCenter) bookingDetails.serviceCenter = req.body.serviceCenter
    if (req.body.bookingStatus) bookingDetails.bookingStatus = req.body.bookingStatus
    bookingDetails.bookingDate = Date.now()


    // Check bookingLimit is less or equal to booking count
    if (req.body.bookingStatus == 1) {

        if (requestedServiceCenter.bookingCount >= requestedServiceCenter.bookingLimit) {
            return res.status(400).json({ error: [{ 'msg': 'Booking Full !' }] })

        }
    }
    // update if bike exists
    const checkBike = await Booking.findOne({ bike: req.body.bikeDetails })
    if (checkBike) {
        const updateBooking = await Booking.findOneAndUpdate(
            // Update profile in this id
            { bike: req.body.bikeDetails },
            { $set: bookingDetails, bookingDate: Date.now() },
            { new: true }
        ).populate('serviceCenter', 'name')

        // Increase bookingCount of requested service center if bookingStatus is 1 
        if (req.body.bookingStatus == 1) {
            await ServiceCenter.findOneAndUpdate(
                // Update profile in this id
                { _id: requestedServiceCenter },
                { $inc: { bookingCount: 1 } },
                { new: true }
            )
        }

        return res.status(200).json(updateBooking)
    }

    // Create new booking
    let newbooking = new Booking({
        bike: req.body.bikeDetails,
        serviceCenter: req.body.serviceCenter,
        bookingStatus: req.body.bookingStatus,
        bookingDate: Date.now(),
    })

    // increase booking count of service center on c
    await newbooking.save()

    if (req.body.bookingStatus == 1) {
        await ServiceCenter.findOneAndUpdate(
            // Update profile in this id
            { _id: requestedServiceCenter },
            { $inc: { bookingCount: 1 } },
            { new: true }
        )
    }

    // Populates service center
    newbooking = await newbooking.populate('serviceCenter', 'name').execPopulate()

    res.status(200).json(newbooking)

})

//@router POST /booking/
//@desc cancle booking for bike
//@access Customer
router.post('/cancle', [auth, [
    check("bikeDetails", "Please enter your bike")
        .not()
        .isEmpty()
]], async (req, res) => {

    // check if request from customer
    if (req.user.role !== 3) return res.status(400).json({ error: [{ 'msg': 'Create Customer account!' }] })

    const error = validationResult(req);
    // If validation errors
    if (!error.isEmpty()) return res.status(400).json({ error: error.array() });

    // Find requested bike
    const requestedBike = await Bike.findOne({ _id: req.body.bikeDetails })
    if (!requestedBike) return res.status(404).json({ error: [{ 'msg': "User Bike is not registered" }] })


    // remove booking
    const bookingDetails = {}
    bookingDetails.serviceCenter = null
    bookingDetails.bookingDate = null
    bookingDetails.bookingStatus = 0

    // update if bike exists
    const checkBike = await Booking.findOne({ bike: req.body.bikeDetails })

    // get booking serviceCenter to decrease bookingCount
    const requestedServiceCenter = await ServiceCenter.findOne({ _id: checkBike.serviceCenter })

    // cancel booking
    if (checkBike) {
        const cancleBooking = await Booking.findOneAndUpdate(
            // Update profile in this id
            { bike: req.body.bikeDetails },
            { $set: bookingDetails },
            { new: true }
        )
        res.json(cancleBooking)
    }

    // decrease bookingCount of service center
    await ServiceCenter.findOneAndUpdate(
        { _id: requestedServiceCenter },
        { $inc: { bookingCount: -1 } },
        { new: true }
    )

})

module.exports = router