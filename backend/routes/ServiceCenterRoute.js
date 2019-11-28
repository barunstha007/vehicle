const router = require("express").Router();
const auth = require("../middleware/auth");
const User = require("../models/UserDetails.model");
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");

// @route   GET /service-center
// @desc    get admin Service Center
// @access  @Admin
router.get("/", auth, async (req, res) => {
  try {
    //   Check admin role, 2 is admin
    if (req.user.role !== 2) {
      return res.status(400).json("You are not admin");
    }
    // Check booking for current user
    const serviceCenter = await User.findOne({ user: req.user.id });
    // If no booking
    if (!serviceCenter) {
      res.json("There is no service center for this user");
    }
    //If there is booking
    res.json(serviceCenter);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@router   POST /service-center/
//@desc     add admins servicing center
//@access   Admin
router.post(
  "/",
  [
    auth,
    [
      check("name", "Please enter your name")
        .not()
        .isEmpty(),
      check("location", "Please enter a location")
        .not()
        .isEmpty(),
      check("maxBookingDays", "Please enter max booking days")
        .not()
        .isEmpty()
        .isNumeric(),
      check("bookingLimit", "Please enter booking limit")
        .not()
        .isEmpty()
        .isNumeric()
    ]
  ],
  async (req, res) => {
    // if user is customer, role == 3
    if (req.user.role > 2) {
      return res.status(400).json("You are not admin");
    }

    const errors = validationResult(req);
    // If errors arenot empty || if there are errors
    if (!errors.isEmpty) {
      // take the error from express validation
      return res.status(400).json({ errors: array() });
    }

    let serviceCenterUser;
    const newServiceCenter = {};

    // Admin can create and update only their profile
    if (req.user.role == 2) {
      // Check service center for user
      serviceCenterUser = await User.findOne({ user: req.user.id });
      newServiceCenter.admin = req.user.id;
    }

    if (req.body.name) newServiceCenter.name = req.body.name;
    if (req.body.serviceLocation)
      newServiceCenter.serviceLocation = req.body.serviceLocation;
    if (req.body.maxBookingDays)
      newServiceCenter.maxBookingDays = req.body.maxBookingDays;
    if (req.body.bookingLimit)
      newServiceCenter.bookingLimit = req.body.bookingLimit;
    if (req.body.bikeNumber) bike.bikeNumber = req.body.bikeNumber;

    try {
      // look for the profile with user req.user.id
      let booking = await Booking.findOne({ user: req.user.id });

      // if profile is found for the user
      if (booking) {
        console.log("Profile Found");
        // For Update
        mongoose.set("useFindAndModify", false);
        booking = await Booking.findOneAndUpdate(
          // Update profile in this id
          { user: req.user.id },
          { $set: bookingFields },
          { new: true }
        );

        return res.json(booking);
        // console.log('Booking Updated')
      }

      console.log("Profile NOT Found");
      // Else Create new profile
      booking = new Booking(bookingFields);
      console.log(booking); //CORRECT (has user id of current user)
      await booking.save();
      // res.json(booking)
      console.log("Booking Created");
      console.log(req.user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
