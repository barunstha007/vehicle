const router = require("express").Router();
const auth = require("../middleware/auth");
const User = require("../models/UserDetails.model");
const ServiceCenter = require("../models/ServiceCenter.model");
const { check, validationResult } = require("express-validator");


// @route   GET /service-center/
// @desc    get all service Center
// @access  Public
router.get("/", async (req, res) => {
  try {
    // get all service center

    // Check service center for params admin
    const serviceCenterProfile = await ServiceCenter.find({}).sort('serviceLocation');
    // If no service center
    if (serviceCenterProfile.length == 0) {
      return res.json("No service center found");
    }
    //If there is service center
    return res.status(200).json(serviceCenterProfile);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


//@router   POST /service-center/
//@desc     add new / update admins servicing center
//@access   Superadmin
router.post("/", [auth,
  [check("admin", "Please enter admin").not().isEmpty(),
  check("name", "Please enter service center name")
    .not()
    .isEmpty(),
  check("serviceLocation", "Please enter service center location")
    .not()
    .isEmpty(),
  check("maxBookingDays", "Please enter max booking days").isNumeric(),
  check("bookingLimit", "Please enter maximum booking limit of bikes").isNumeric(),
  check("contact", "Please enter contact number").isNumeric()
  ]
],
  async (req, res) => {
    // If customer, exit from route
    if (req.user.role !== 1) {
      return res.json("Know your limits!");
    }

    // check input validation
    const error = validationResult(req);
    // If validation errors
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    try {
      // if Superadmin, can create and update any service center
      let serviceCenterProfile;
      const newServiceCenter = {};

      // set other details from request
      if (req.body.admin) newServiceCenter.admin = req.body.admin;
      if (req.body.name) newServiceCenter.name = req.body.name;
      if (req.body.serviceLocation) newServiceCenter.serviceLocation = req.body.serviceLocation;
      if (req.body.maxBookingDays) newServiceCenter.maxBookingDays = req.body.maxBookingDays;
      if (req.body.bookingLimit) newServiceCenter.bookingLimit = req.body.bookingLimit;
      if (req.body.contact) newServiceCenter.contact = req.body.contact;

      // edit service center for given admin
      serviceCenterProfile = await ServiceCenter.findOne({
        admin: req.body.admin
      });

      // Check if user service center exists of admin
      if (serviceCenterProfile) {
        // If service center found, update
        serviceCenterProfile = await ServiceCenter.findOneAndUpdate(
          // Update profile in this admin
          { admin: req.body.admin },
          { $set: newServiceCenter },
          { new: true }
        );

        return res.status(200).json("Service center updated");
      }
      // Else Create new service center
      serviceCenterProfile = new ServiceCenter(newServiceCenter);
      await serviceCenterProfile.save();
      return res.status(200).json("New Service Center Created");

    } catch (err) {
      return res.status(500).json("Server Error");
    }
  }
);

//@route    DELETE '/service-center/:id'
//@desc     delete service center
//@access   Superadmin
router.delete("/:id", auth, async (req, res) => {
  //   Check if User is Superadmin
  if (req.user.role !== 1) {
    return res.status(400).json("Not authorized");
  }

  try {
    // If service center exists
    let serviceCenter = await ServiceCenter.findOne({ _id: req.params.id });

    if (serviceCenter) {
      await ServiceCenter.findByIdAndDelete({ _id: req.params.id });

      return res.json("Service Center deleted");
    }
    res.json('Service Center not Found')


  } catch (err) {
    res.status(500).send(err.message);
  }
}
);

module.exports = router;



// @route   GET /service-center/
// @desc    get Service Center
// @access  Admin- only admins, Superadmin - all
// router.get("/", auth, async (req, res) => {
//   try {
//     // if CUSTOMER
//     if (req.user.role >= 3) {
//       return res.status(400).json("Know your limits!");
//     }

//     //if ADMIN, get admin's profile only
//     if (req.user.role == 2) {
//       // Check service center of current admin
//       serviceCenterProfile = await ServiceCenter.findOne({
//         admin: req.user.id
//       }).populate("admin", "name");
//       // If no service center for admin
//       if (!serviceCenterProfile) {
//         return res.json("There is no service center for this user");
//       }
//       //If there is service center
//       return res.json(serviceCenterProfile);
//     }
//     //if SUPERADMIN, get all service center
//     if (req.user.role == 1) {
//       // Check service center for params admin
//       const serviceCenterProfile = await ServiceCenter.find(
//         {}
//       ).populate("admin", ["name", "avatar"]);
//       // If no service center
//       if (serviceCenterProfile.length == 0) {
//         return res.json("No service center found");
//       }
//       //If there is service center
//       return res.status(200).json(serviceCenterProfile);
//     }
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });