const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");
const User = require("../../models/UserDetails.model");
const { check, validationResult } = require("express-validator");


// @route   GET '/superadmin'
// @desc    get all superadmin
// @access  Superadmin
router.get('/', auth, async (req, res) => {

  //   Check if User is Superadmin
  if (req.user.role !== 1) {
    return res.status(400).json("Not authorized");
  }

  try {
    // Search superadmin 
    const superadminList = await User.find({ role: 1 })
    // If no superadmin
    if (!superadminList) {
      return res.json("There are no superadmin")

    }
    //If there is superadmin
    res.json(superadminList)

  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }

})

// @route   POST '/superadmin/register'
// @desc    Register superadmin, role == 1
//@access   Superadmin
router.post("/register", [
  auth,
  [
    // express validator
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("phone", "Please Enter a Phone")
      .not()
      .isEmpty(),
    check("location", "Please Enter location")
      .not()
      .isEmpty(),
    check("email", "PLease include a valid email").isEmail(),
    check("username", "Username must be atleast 4 characters").isLength({
      min: 4
    }),
    check("password", "Password must be atleast 5 characters").isLength({
      min: 5
    })]],
  // async await function
  async (req, res) => {
    //   Check if User is Superadmin
    if (req.user.role !== 1) {
      return res.status(400).json("Not authorized");
    }
    const error = validationResult(req);
    // if error is not empty || if there is error
    if (!error.isEmpty()) {
      return (
        // take the error from express validation
        res.status(400).json({ error: error.array() })
      );
    }

    try {
      // Search for superadmin by username, email or phone
      let username = await User.findOne({ username: req.body.username });
      let email = await User.findOne({ email: req.body.email });
      let phone = await User.findOne({ phone: req.body.phone });

      // See if user exists
      if (username || email || phone) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      //Get user Gravatar from the email in request body
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      // saving details from req.body
      user = new User({
        name: req.body.name,
        phone: req.body.phone,
        location: req.body.location,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        role: 1,
        avatar
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);

      // save to database
      await user.save();

      // Return JsonWebToken
      const payload = {
        user: {
          id: user.id,
          role: user.role
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) res.json({ err });
          res.json({ token });
          console.log("Token Generate SUCCESFULL");
        }
      );

      // res.send('User registered')
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route    POST '/superadmin/:id'
//@desc     Update superadmin
//@access   Superadmin
router.post("/update/:id", [auth, [
  check("username", "Please enter username").not().isEmpty(),
  check("password", "Please enter password").not().isEmpty(),
  check("name", "Please enter name").not().isEmpty(),
  check("email", "Please enter email").isEmail(),
  check("phone", "Please enter a phone number").isNumeric(),
  check("location", "Please Enter location").not().isEmpty(),
]],
  async (req, res) => {
    //   Check if User is Superadmin
    if (req.user.role !== 1) {
      return res.status(400).json("Not authorized");
    }
    const error = validationResult(req);
    // If validation errors

    if (!error.isEmpty()) {
      return (
        res.status(400).json({ error: error.array() })
      );
    }
    // Initialise new Object and set properties from request
    const superadmin = {};


    if (req.body.username) superadmin.username = req.body.username;
    if (req.body.password) superadmin.password = req.body.password;
    if (req.body.name) superadmin.name = req.body.name;
    if (req.body.email) superadmin.email = req.body.email;
    if (req.body.phone) superadmin.phone = req.body.phone;
    if (req.body.location) superadmin.location = req.body.location;
    superadmin.role = 1;

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    superadmin.password = await bcrypt.hash(req.body.password, salt);

    try {
      // If superadmin exists, Update 
      let superadminDetails = await User.findOne({ _id: req.params.id, role: 1 });

      // If user exists
      if (superadminDetails) {
        superadminDetails = await User.findOneAndUpdate(
          { _id: req.params.id },
          { $set: superadmin },
          { new: true }
        );

        res.json("Update successful");
        return res.json(superadminDetails);

      }
      res.json('User not Found')


    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

//@route    DELETE '/superadmin/:id'
//@desc     delete superadmin
//@access   Superadmin
router.delete("/:id", auth, async (req, res) => {
  //   Check if User is Superadmin
  if (req.user.role !== 1) {
    return res.status(400).json("Not authorized");
  }

  try {
    // If superadmin exists
    let superadmin = await User.findOne({ _id: req.params.id, role: 1 });

    if (superadmin) {
      await User.findByIdAndDelete({ _id: req.params.id });

      return res.json("Superadmin deleted");
    }
    res.json('User not Found')


  } catch (err) {
    res.status(500).send(err.message);
  }
}
);

module.exports = router;
