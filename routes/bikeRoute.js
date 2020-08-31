const router = require("express").Router();
const auth = require("../middleware/auth");
const Bike = require("../models/Bike.model");
const { check, validationResult } = require("express-validator");
const User = require("../models/UserDetails.model");

// @route   GET '/mybike'
// @desc    get user bike
// @access  Private
router.get('/', auth, async (req, res) => {

  try {
    // Search admin 
    const userBike = await Bike.findOne({ user: req.user.id }).populate('bikeModel', 'bikeModel')

    //Return user bike
    if (userBike) { return res.json(userBike) }

    return res.json('No Bike found for current user')

  } catch (err) {
    res.status(500).send('Server Error')
  }

})


//@route    POST /mybike
//@desc     add user bike
//@access   User
router.post("/addorupdate", [auth, [
  check("bikeModel", "Please select a bike model")
    .not()
    .isEmpty(),
  check("bikeNumber", "Please nter your bike number eg: Ba 66 pa 3080").not().isEmpty(),

]],
  async (req, res) => {
    if (req.user.role !== 3) {
      return res.status(400).json({ error: [{ 'msg': 'Create Customer account!' }] })
    }
    const error = validationResult(req);
    // If validation errors
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    // Initialise new Object and set properties from request
    const bike = {};
    bike.user = req.user.id;
    if (req.body.bikeModel) bike.bikeModel = req.body.bikeModel;
    if (req.body.bikeNumber) bike.bikeNumber = req.body.bikeNumber;
    if (req.body.odometer) bike.odometer = req.body.odometer

    try {
      // If user exists, Update else Create new
      let bikeDetails = await Bike.findOne({ user: req.user.id });

      // If user exists
      if (bikeDetails) {
        bikeDetails = await Bike.findOneAndUpdate(
          { user: req.user.id },
          { $set: bike },
          { new: true }
        );
        return res.json(bikeDetails);
      }

      // Create new
      bikeDetails = new Bike(bike);
      await bikeDetails.save();

      res.json(bikeDetails);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

module.exports = router;
