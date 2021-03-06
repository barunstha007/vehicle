const router = require("express").Router();
const auth = require("../middleware/auth");
const Bike = require("../models/Bike.model");
const ServiceCenter = require("../models/ServiceCenter.model");
const Booking = require("../models/Booking.model");
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");

// @route   GET /booking/queue
// @desc    get queued bikes
// @access  Admin
router.get("/queue", auth, async (req, res) => {
  if (req.user.role !== 2) return res.json("Not authorized");

  try {
    // get service center of logged-in admin
    const currentAdmin = await ServiceCenter.findOne({ admin: req.user.id });

    // Sort by date in ascending order
    var sortbybookingdate = { bookingDate: 1 };
    // find queued booking details of current admins service center
    bookingDetails = await Booking.find({
      bookingStatus: 1,
      serviceCenter: currentAdmin,
    })
      // .populate('serviceCenter', 'name')
      // Nested population for userDetails and for bike model
      .populate([
        {
          path: "bike",
          model: "Bike",
          select: "bikeNumber",
          populate: {
            path: "user",
            model: "UserDetails",
            select: ["name", "phone", "location", "avatar"],
          },
        },
      ])
      .populate([
        {
          path: "bike",
          model: "Bike",
          select: "bikeNumber",
          populate: {
            path: "bikeModel",
            model: "BikeModel",
            select: "bikeModel",
          },
        },
      ])
      .sort(sortbybookingdate);

    if (!bookingDetails) res.status(404).json("Booking requests are empty");

    res.status(200).json(bookingDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET /booking/acceptd
// @desc    get booking accepted bikes
// @access  Admin
router.get("/accepted", auth, async (req, res) => {
  if (req.user.role !== 2) return res.json("Not authorized");

  try {
    // get service center of logged-in admin
    const currentAdmin = await ServiceCenter.findOne({ admin: req.user.id });

    // Sort by date in ascending order
    var sortbybookingdate = { servicingDate: 1 };
    // find queued booking details of current admins service center
    bookingDetails = await Booking.find({
      bookingStatus: 2,
      serviceCenter: currentAdmin,
    })
      // .populate('serviceCenter', 'name')
      // Nested population for userDetails and for bike model
      .populate([
        {
          path: "bike",
          model: "Bike",
          select: "bikeNumber",
          populate: {
            path: "user",
            model: "UserDetails",
            select: ["name", "phone", "location", "avatar"],
          },
        },
      ])
      .populate([
        {
          path: "bike",
          model: "Bike",
          select: "bikeNumber",
          populate: {
            path: "bikeModel",
            model: "BikeModel",
            select: "bikeModel",
          },
        },
      ])
      .sort(sortbybookingdate);

    if (!bookingDetails) res.status(404).json("Booking requests are empty");

    res.status(200).json(bookingDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route POST /booking/requeue
//@desc  requeue accepted bikes
//@access Admin
router.post("/requeue", auth, async (req, res) => {
  // check if request not from admin
  if (req.user.role !== 2)
    return res.status(400).json({ error: [{ msg: "Not Authorized!" }] });

  try {
    const requeueBikes = req.body.requeueBikes;

    let countBikes = 0;

    requeueBikes.map(async (bikeid, i) => {
      countBikes++;
      await Booking.findOneAndUpdate(
        // Update profile in this id
        { bike: bikeid },
        { $set: { servicingDate: null, bookingStatus: 1 } },
        { new: true }
      );
    });

    // // increase bookingCount on requeuey
    await ServiceCenter.findOneAndUpdate(
      // Update profile in this id
      { admin: req.user.id },
      { $inc: { bookingCount: countBikes } },
      { new: true }
    );

    res.json({
      payload: requeueBikes,
      msg: countBikes + " bikes added to Queue",
    });
  } catch (err) {}
});

// @route   GET /booking/:id
// @desc    get booking by id
// @access  Customers
router.get("/:id", auth, async (req, res) => {
  if (req.user.role !== 3) return res.json("Create Customer account");

  try {
    // Check bike for current user
    const bikeDetails = await Bike.findOne({ user: req.user.id });
    // If bike available
    if (bikeDetails) {
      // Check booking status
      const bookingDetails = await Booking.findOne({
        bike: bikeDetails.id,
        $or: [{ bookingStatus: 1 }, { bookingStatus: 2 }, { bookingStatus: 3 }],
      }).populate("serviceCenter", "name");

      return res.status(200).json(bookingDetails);
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

//@route POST /booking/accept
//@desc  accept queue
//@access Admin
router.post("/accept", auth, async (req, res) => {
  // check if request from customer
  if (req.user.role !== 2)
    return res.status(400).json({ error: [{ msg: "Not Authorized!" }] });

  try {
    const acceptedBookings = req.body.acceptedBookings;

    let countUpdated = 0;
    let acceptableBike = [];

    acceptedBookings.map(async (booking, i) => {
      // if there is servicing date
      if (booking.servicingDate !== null) {
        countUpdated++;
        let obj = {};
        obj.bikeid = booking.id;
        acceptableBike[i] = obj;
        // acceptableBike.push(booking.id)

        await Booking.findOneAndUpdate(
          // Update profile in this id
          { bike: booking.id },
          { $set: { servicingDate: booking.servicingDate, bookingStatus: 2 } },
          { new: true }
        );
      }
    });

    // decrease bookingCount on accept
    await ServiceCenter.findOneAndUpdate(
      // Update profile in this id
      { admin: req.user.id },
      { $inc: { bookingCount: -countUpdated } },
      { new: true }
    );

    res.json({
      payload: acceptableBike,
      msg: countUpdated + " bikes added for servicing",
    });
  } catch (err) {}
});

//@route POST /booking/
//@desc add queue for bike
//@access Customer
router.post(
  "/request",
  [
    auth,
    [
      check("bikeDetails", "Please enter your bike").not().isEmpty(),
      check("serviceCenter", "Please select a service center to book")
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    // check if request from customer
    if (req.user.role !== 3)
      return res
        .status(400)
        .json({ error: [{ msg: "Create Customer account!" }] });

    // If validation errors
    const error = validationResult(req);
    if (!error.isEmpty()) return res.status(400).json({ error: error.array() });

    const requestedServiceCenter = await ServiceCenter.findOne({
      _id: req.body.serviceCenter,
    });

    // create new object containing requested booking details
    const bookingDetails = {};
    if (req.body.serviceCenter)
      bookingDetails.serviceCenter = req.body.serviceCenter;
    if (req.body.bookingStatus)
      bookingDetails.bookingStatus = req.body.bookingStatus;
    bookingDetails.bookingDate = Date.now();

    // Check bookingLimit is less or equal to booking count
    if (
      requestedServiceCenter.bookingCount >= requestedServiceCenter.bookingLimit
    ) {
      return res.status(400).json({ error: [{ msg: "Booking Full !" }] });
    }

    // update if bike exists
    const checkBike = await Booking.findOne({ bike: req.body.bikeDetails });

    if (checkBike) {
      if (checkBike.bookingStatus == 0) {
        const updateBooking = await Booking.findOneAndUpdate(
          // Update profile in this id
          { bike: req.body.bikeDetails },
          { $set: bookingDetails, bookingDate: Date.now() },
          { new: true }
        ).populate("serviceCenter", "name");

        await ServiceCenter.findOneAndUpdate(
          // Update profile in this id
          { _id: requestedServiceCenter },
          { $inc: { bookingCount: 1 } },
          { new: true }
        );

        return res.status(200).json(updateBooking);
      } else {
        return res
          .status(400)
          .json({ error: [{ msg: "Booking Already Done" }] });
      }
    }

    // Create new booking
    let newbooking = new Booking({
      bike: req.body.bikeDetails,
      serviceCenter: req.body.serviceCenter,
      bookingStatus: req.body.bookingStatus,
      bookingDate: Date.now(),
    });

    // increase booking count of service center on c
    await newbooking.save();

    if (req.body.bookingStatus == 1) {
      await ServiceCenter.findOneAndUpdate(
        // Update profile in this id
        { _id: requestedServiceCenter },
        { $inc: { bookingCount: 1 } },
        { new: true }
      );
    }

    // Populates service center
    newbooking = await newbooking
      .populate("serviceCenter", "name")
      .execPopulate();

    res.status(200).json(newbooking);
  }
);

//@router POST /booking/
//@desc cancle booking for bike
//@access Customer
router.post(
  "/cancle",
  [auth, [check("bikeDetails", "Please enter your bike").not().isEmpty()]],
  async (req, res) => {
    // check if request from customer
    if (req.user.role !== 3)
      return res
        .status(400)
        .json({ error: [{ msg: "Create Customer account!" }] });

    const error = validationResult(req);
    // If validation errors
    if (!error.isEmpty()) return res.status(400).json({ error: error.array() });

    // Find requested bike
    const requestedBike = await Bike.findOne({ _id: req.body.bikeDetails });
    if (!requestedBike)
      return res
        .status(404)
        .json({ error: [{ msg: "User Bike is not registered" }] });

    // remove booking
    const bookingDetails = {};
    bookingDetails.servicingDate = null;
    bookingDetails.serviceCenter = null;
    bookingDetails.bookingDate = null;
    bookingDetails.bookingStatus = 0;

    // update if bike exists
    const checkBike = await Booking.findOne({ bike: req.body.bikeDetails });

    // get booking serviceCenter to decrease bookingCount
    const requestedServiceCenter = await ServiceCenter.findOne({
      _id: checkBike.serviceCenter,
    });

    // cancel booking
    if (checkBike) {
      const cancleBooking = await Booking.findOneAndUpdate(
        // Update profile in this id
        { bike: req.body.bikeDetails },
        { $set: bookingDetails },
        { new: true }
      );
      res.json(cancleBooking);
    }

    // If service center has not acceptedthe booking because accepting queued bike decrease bookingCount of service center
    if (checkBike.bookingStatus !== 2) {
      // decrease bookingCount of service center
      await ServiceCenter.findOneAndUpdate(
        { _id: requestedServiceCenter },
        { $inc: { bookingCount: -1 } },
        { new: true }
      );
    }
  }
);
//@route POST /booking/
//@desc add queue for bike
//@access Customer
router.post("/complete-read", auth, async (req, res) => {
  try {
    const { bikeDetails } = req.body;

    const completeRead = await Booking.findOneAndUpdate(
      { bike: bikeDetails },
      { completionRead: true }
    );

    await ServiceCenter.findOneAndUpdate(
      { _id: completeRead.serviceCenter },
      { $inc: { bookingLimit: -1 } }
    );

    res.sendStatus(200);
  } catch (error) {}
});

//@route POST /booking/
//@desc add queue for bike
//@access Customer
router.post("/complete", auth, async (req, res) => {
  // check if request from customer
  if (req.user.role !== 2)
    return res.status(400).json({ error: [{ msg: "Invalid token!" }] });

  const { completedBookings } = req.body;
  try {
    completedBookings.map(async (booking) => {
      console.log(booking);
      await Booking.findOneAndUpdate(
        // Update profile in this id
        { bike: booking, bookingStatus: 2 },
        {
          $set: {
            completedDate: Date.now(),
            bookingStatus: 3,
          },
        },
        { new: true }
      );
    });

    return res.sendStatus(200);
  } catch (error) {
    res.status(400).json({ error: [{ msg: "Server Error" }] });
  }
});

module.exports = router;
