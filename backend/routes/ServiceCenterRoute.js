const router = require("express").Router();
const auth = require("../middleware/auth");
const User = require("../models/UserDetails.model");
const ServiceCenter = require("../models/ServiceCenter.model");
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");

// @route   GET /service-center/:id
// @desc    get admin's Service Center
// @access  Admin, Superadmin
router.get("/:id", auth, async (req, res) => {
  try {
    // if requested by customer
    if (req.user.role >= 3) {
      return res.status(400).json("Know your limits!");
    }

    let serviceCenterProfile;

    //if Admin, get admin's profile only
    if (req.user.role == 2 && req.user.id == req.params.id) {
      // Check service center of current admin
      serviceCenterProfile = await ServiceCenter.findOne({
        admin: req.user.id
      }).populate("UserDetails", ["name", "avatar"]);
      // If no service center for admin
      if (!serviceCenterProfile) {
        return res.json("There is no service center for this user");
      }
      //If there is service center
      return res.json(serviceCenterProfile);
    }

    //if Superadmin, get any admins service center
    if (req.user.role == 1) {
      // Check service center for params admin
      const serviceCenterProfile = await ServiceCenter.findOne({
        admin: req.params.id
      });
      // If no service center
      if (!serviceCenterProfile) {
        res.json("There is no service center for this admin");
      }
      //If there is service center
      res.json(serviceCenterProfile);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@router   POST /service-center/
//@desc     add admins servicing center
//@access   Admin
router.post(
  "/:id",
  [
    auth,
    [
      check("name", "Please enter your name")
        .not()
        .isEmpty(),
      check("serviceLocation", "Please enter a location")
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
      return res.status(400).json("Know your limits!");
    }

    const errors = validationResult(req);
    // If errors arenot empty || if there are errors
    if (!errors.isEmpty) {
      // take the error from express validation
      return res.status(400).json({ errors: array() });
    }

    let serviceCenterProfile;
    const newServiceCenter = {};

    try {
      // Admin can create and update only their profile
      if (req.user.role == 2 && req.params.id == req.user.id) {
        // set admin to current user
        newServiceCenter.admin = req.user.id;
        // set other details from request
        if (req.body.name) newServiceCenter.name = req.body.name;
        if (req.body.serviceLocation)
          newServiceCenter.serviceLocation = req.body.serviceLocation;
        if (req.body.maxBookingDays)
          newServiceCenter.maxBookingDays = req.body.maxBookingDays;
        if (req.body.bookingLimit)
          newServiceCenter.bookingLimit = req.body.bookingLimit;

        // Check service center for admin
        serviceCenterProfile = await ServiceCenter.findOne({
          admin: req.user.id
        });
        if (serviceCenterProfile) {
          // For Update
          serviceCenterProfile = await ServiceCenter.findOneAndUpdate(
            // Update profile in this id
            { admin: req.user.id },
            { $set: newServiceCenter },
            { new: true }
          );

          console.log("Profile Updated");
          return res.json(profile);
        }

        // Else Create new profile for service center
        serviceCenterProfile = new ServiceCenter(newServiceCenter);
        await serviceCenterProfile.save();
      }

      // if Superuser
      else if (req.user.role < 2) {
        newServiceCenter.admin = req.body.admin;
      }

      if (req.body.name) newServiceCenter.name = req.body.name;
      if (req.body.serviceLocation)
        newServiceCenter.serviceLocation = req.body.serviceLocation;
      if (req.body.maxBookingDays)
        newServiceCenter.maxBookingDays = req.body.maxBookingDays;
      if (req.body.bookingLimit)
        newServiceCenter.bookingLimit = req.body.bookingLimit;
      if (req.body.bikeNumber) bike.bikeNumber = req.body.bikeNumber;
    } catch (err) {
      return res.status(500).json("Server Error");
    }
  }
);

module.exports = router;
