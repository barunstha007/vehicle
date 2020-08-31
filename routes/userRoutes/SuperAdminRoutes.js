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
    const superadminList = await User.find({ role: 1 }).select("-password")
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
    check("name", "Minimum name lenth is 3")
      .isLength(3),
    check("phone", "Please Enter a Phone")
      .not()
      .isEmpty(),
    check("phone", "Minimum phone lenth is 7")
      .isLength(7),
    check("location", "Please Enter location")
      .not()
      .isEmpty(),
    check("location", "Minimum location lenth is 5")
      .isLength(5),
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
      if (username) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Username already exists" }] });
      }
      // See if user exists
      if (email) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Email already exists" }] });
      }
      // See if user exists
      if (phone) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Phone already exists" }] });
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
          res.json(user);
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
  check("superadmin", "Superadmin missing").not().isEmpty()
]],
  // async (req, res) => { res.json(req.params.id, req.body) }
  async (req, res) => {
    //   Check if User is Superadmin
    if (req.user.role !== 1) {
      return res.status(400).json("Not authorized");
    }
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return (
        res.status(400).json({ error: error.array() })
      );
    }
    // Initialise new Object and set properties from request
    const superadmin = {};

    if (req.body.superadmin.username) superadmin.username = req.body.superadmin.username;
    if (req.body.superadmin.password) superadmin.password = req.body.superadmin.password;
    if (req.body.superadmin.name) superadmin.name = req.body.superadmin.name;
    if (req.body.superadmin.email) superadmin.email = req.body.superadmin.email;
    if (req.body.superadmin.phone) superadmin.phone = req.body.superadmin.phone;
    if (req.body.superadmin.location) superadmin.location = req.body.superadmin.location;
    superadmin.role = 1;

    // Encrypt password
    if (req.body.superadmin.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        superadmin.password = await bcrypt.hash(req.body.superadmin.password, salt);
      } catch (err) {
        return res.json(err)
      }
    }

    // res.json('superadmin')
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

        return res.json(superadminDetails);

      }
      res.json('User not Found')


    } catch (err) {
      return res.status(500).send(err.message);
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
