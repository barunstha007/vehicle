const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");

// express validator
const { check, validationResult } = require("express-validator");

const User = require("../../models/UserDetails.model");

// @route   POST '/register/admin'
// @desc    Register admin, role = 2
//@access   Superadmin
router.post(
  "/",
  [
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
      })
    ]
  ],
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
      // See if user exists
      // find in db the value of  req.body.email
      let username = await User.findOne({ username: req.body.username });
      let email = await User.findOne({ email: req.body.email });
      let phone = await User.findOne({ phone: req.body.phone });

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

      console.log("here");
      // saving details from req.body
      user = new User({
        name: req.body.name,
        phone: req.body.phone,
        location: req.body.location,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        role: 2,
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

module.exports = router;
