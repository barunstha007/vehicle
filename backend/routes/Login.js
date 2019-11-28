const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/UserDetails.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// express validator
const { check, validationResult } = require("express-validator");

// @route   GET /auth
// @desc    get current user
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// authenticate the login user

// @route   POST '/login'
// @desc    Login user
//@access     Public
router.post(
  "/",
  [
    // express validator
    check("username", "Please enter your username").exists(),
    check("password", "Please enter your password").exists()
  ],
  // async await function
  async (req, res) => {
    const error = validationResult(req);
    // if error is not empty || if there is error
    if (!error.isEmpty()) {
      return (
        // return Bad Request
        res.status(400).json({ error: error.array() })
      );
    }

    try {
      // Check user || user email
      // See if user doesnot exist
      // find in db the value of  req.body.phone in email or username or phone
      let user = await User.findOne({
        $or: [
          { username: req.body.username },
          { email: req.body.username },
          { phone: req.body.username }
        ]
      });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // Check password
      // Compare if password matches to the encrypted password in db
      const isMatch = await bcrypt.compare(req.body.password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

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
          // Send back the token
          res.json({ token });
          console.log("Token Generate SUCCESFULL");
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
