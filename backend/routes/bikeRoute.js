const router = require("express").Router();
const auth = require("../middleware/auth");
const Bike = require("../models/Bike.model");
const { check, validationResult } = require("express-validator");
const User = require("../models/UserDetails.model");

//@route    POST /bike
//@desc     add user bike
//@access   Superadmin, Admin, User
router.post(
  "/",
  [
    auth,
    [
      check("number", "Please enter your bike number")
        .not()
        .isEmpty(),
      check("number", "bike number must be a number").isNumeric(),
      check("model", "Please select a bike model")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const error = validationResult(req);
    // If validation errors
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    // Initialise new Object and set properties from request
    const bike = {};
    bike.user = req.user.id;
    if (req.body.number) bike.number = req.body.number;
    if (req.body.model) bike.model = req.body.model;

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
        return res.json("Update successful");
      }

      // Create new
      bikeDetails = new Bike(bike);
      console.log(bikeDetails.user);
      await bikeDetails.save();

      res.json("New Bike profile Created");
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

module.exports = router;
