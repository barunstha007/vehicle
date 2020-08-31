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
    const serviceCenterProfile = await ServiceCenter.find({}).sort('serviceLocation').populate('admin', 'name');

    //If there is service center
    return res.status(200).json(serviceCenterProfile);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET /service-center/:id
// @desc    get service Center by admin id
// @access  Private
router.get("/admin", auth, async (req, res) => {
  try {

    // Check service center for params admin
    const serviceCenterProfile = await ServiceCenter.findOne({ admin: req.user.id }).populate('admin', 'name');
    // If no service center
    if (!serviceCenterProfile) {
      return res.json("No service center assigned to this admin");
    }
    //If there is service center
    return res.status(200).json(serviceCenterProfile);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


//@router   POST /service-center/
//@desc     create new servicing center
//@access   Superadmin
router.post("/", [auth,
  [
    check("serviceLocation", "Please enter service center location")
      .not()
      .isEmpty(),
    check("serviceLocation", "Service Center Location must be alphabet")
      .not()
      .isNumeric(),
    check("admin", "Please enter admin").not().isEmpty(),
    check("name", "Please enter service center name")
      .not()
      .isEmpty(),

    check("bookingLimit", "Maximum booking limit of bikes in number").isNumeric(),
    check("contact", "Contact Number must be a number").isNumeric()
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
    // if (!error.isEmpty()) {
    //   return res.status(400).json({ error: error.array() });
    // }

    try {
      // if Superadmin, can create and update any service center
      let serviceCenterProfile;
      const newServiceCenter = {};

      // set other details from request
      if (req.body.admin) newServiceCenter.admin = req.body.admin;
      if (req.body.name) newServiceCenter.name = req.body.name;
      if (req.body.serviceLocation) newServiceCenter.serviceLocation = req.body.serviceLocation;
      if (req.body.bookingLimit) newServiceCenter.bookingLimit = req.body.bookingLimit;
      if (req.body.contact) newServiceCenter.contact = req.body.contact;

      // edit service center for given admin
      serviceCenterProfile = await ServiceCenter.findOne({
        admin: req.body.admin
      });

      // Check if user service center exists of admin
      if (serviceCenterProfile) {
        return res.status(400).json("This admin already has service center");
      }
      // Else Create new service center
      serviceCenterProfile = new ServiceCenter(newServiceCenter);
      await serviceCenterProfile.save();

      // reset admin 'assignedServiceCenter = 1' after assigning admin to serviceCenter
      await User.findOneAndUpdate(
        { _id: serviceCenterProfile.admin },
        { assignedServiceCenter: 1 },
        { new: true }
      );

      return res.status(200).json(newServiceCenter);

    } catch (err) {
      return res.status(500).json("Server Error");
    }
  }
);

//@router   POST /service-center/update
//@desc     update servicing center
//@access   Superadmin, Admin
router.post("/update", [auth,
  [
    check("admin", "Please enter admin").not().isEmpty(),
    check("name", "Please enter service center name")
      .not()
      .isEmpty(),
    check("serviceLocation", "Service Center Location must be alphabet")
      .not()
      .isNumeric(),

    check("bookingLimit", "Maximum booking limit of bikes in number").isNumeric(),
    check("contact", "Contact Number must be a number").isNumeric()
  ]
],
  async (req, res) => {
    // If customer, exit from route
    if (req.user.role == 3) {
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
      if (req.body.bookingLimit) newServiceCenter.bookingLimit = req.body.bookingLimit;
      if (req.body.contact) newServiceCenter.contact = req.body.contact;

      // edit service center for given admin
      serviceCenterProfile = await ServiceCenter.findOne({
        _id: req.body.id
      });

      // Check if user service center exists
      if (serviceCenterProfile) {
        // If service center found, update
        serviceCenterProfile = await ServiceCenter.findOneAndUpdate(
          // Update profile in this sc id
          { _id: req.body.id },
          { $set: newServiceCenter },
          { new: true }
        );

        // reset admin 'assignedServiceCenter = 1' after assigning admin to serviceCenter
        await User.findOneAndUpdate(
          { _id: serviceCenterProfile.admin },
          { assignedServiceCenter: 1 },
          { new: true }
        );

        return res.status(200).json("Service center updated");
      }
      res.status(200).json("Service doesnot exist");



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
    // console.log(req.params.id)
    let id = req.params.id
    // console.log(_id)

    // If service center exists
    let serviceCenter = await ServiceCenter.findOne({ _id: id });

    if (serviceCenter) {
      await ServiceCenter.findByIdAndDelete({ _id: id });

      // reset admin 'assignedServiceCenter = 0' after deleting serviceCenter
      await User.findOneAndUpdate(
        { _id: serviceCenter.admin },
        { assignedServiceCenter: 0 },
        { new: true }
      );


      return res.json("Service Center deleted");
    }
    // res.json('Service Center not Found')


  } catch (err) {
    res.status(500).send(err.message);
  }
}
);

module.exports = router;