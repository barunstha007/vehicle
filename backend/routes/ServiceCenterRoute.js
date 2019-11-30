const router = require("express").Router();
const auth = require("../middleware/auth");
const User = require("../models/UserDetails.model");
const ServiceCenter = require("../models/ServiceCenter.model");
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");

// @route   GET /service-center/
// @desc    get Service Center
// @access  Admin, Superadmin
router.get("/", auth, async (req, res) => {
  try {
    // if CUSTOMER
    if (req.user.role >= 3) {
      return res.status(400).json("Know your limits!");
    }

    //if ADMIN, get admin's profile only
    if (req.user.role == 2) {
      // Check service center of current admin
      serviceCenterProfile = await ServiceCenter.findOne({
        admin: req.user.id
      }).populate("admin", "name");
      // If no service center for admin
      if (!serviceCenterProfile) {
        return res.json("There is no service center for this user");
      }
      //If there is service center
      return res.json(serviceCenterProfile);
    }
    //if SUPERADMIN, get all service center
    if (req.user.role == 1) {
      // Check service center for params admin
      const serviceCenterProfile = await ServiceCenter.find(
        {}
      ).populate("admin", ["name", "avatar"]);
      // If no service center
      if (serviceCenterProfile.isEmpty) {
        return res.json("No service center found");
      }
      //If there is service center
      return res.json(serviceCenterProfile);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@router   POST /service-center/
//@desc     add admins servicing center
//@access   Admin, Superadmin
router.post(
  "/",
  [
    auth,
    [
      check("name", "Please enter service center name")
        .not()
        .isEmpty(),
      check("serviceLocation", "Please enter service center location")
        .not()
        .isEmpty(),
      check("maxBookingDays", "Please enter max booking days").isNumeric(),
      check(
        "bookingLimit",
        "Please enter maximum booking limit of bikes"
      ).isNumeric()
    ]
  ],
  async (req, res) => {
    // If customer, exit from route
    if (req.user.role > 2) {
      return res.json("Know your limits!");
    }

    // check input validation
    const error = validationResult(req);
    // If validation errors
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    try {
      // if Admin, create and update only their profile
      if (req.user.role == 2) {
        let serviceCenterProfile;
        const newServiceCenter = {};
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

          return res.status(200).json(serviceCenterProfile);
        }
        // Else Create new profile for service center
        serviceCenterProfile = new ServiceCenter(newServiceCenter);
        await serviceCenterProfile.save();
        console.log("New Service Center Created");
      }

      // if Superadmin, can create and update any service center
      if (req.user.role == 1) {
        let serviceCenterProfile;
        const newServiceCenter = {};

        // set other details from request
        if (req.body.admin) newServiceCenter.admin = req.body.admin;
        if (req.body.name) newServiceCenter.name = req.body.name;
        if (req.body.serviceLocation)
          newServiceCenter.serviceLocation = req.body.serviceLocation;
        if (req.body.maxBookingDays)
          newServiceCenter.maxBookingDays = req.body.maxBookingDays;
        if (req.body.bookingLimit)
          newServiceCenter.bookingLimit = req.body.bookingLimit;

        // edit service center for given admin
        serviceCenterProfile = await ServiceCenter.findOne({
          admin: req.body.admin
        });

        // Check if user service center
        if (serviceCenterProfile) {
          // For Update
          serviceCenterProfile = await ServiceCenter.findOneAndUpdate(
            // Update profile in this id
            { admin: req.body.admin },
            { $set: newServiceCenter },
            { new: true }
          );

          return res.status(200).json(serviceCenterProfile);
        }
        // Else Create new profile for service center
        serviceCenterProfile = new ServiceCenter(newServiceCenter);
        await serviceCenterProfile.save();
        return res.status(200).json("New Service Center Created");
      }
    } catch (err) {
      return res.status(500).json("Server Error");
    }
  }
);

module.exports = router;
