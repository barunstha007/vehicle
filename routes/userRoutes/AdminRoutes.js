const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");
const User = require("../../models/UserDetails.model");
const { check, validationResult } = require("express-validator");

// @route   GET '/admin'
// @desc    get all vacant admin
// @access  Superadmin
router.get("/", auth, async (req, res) => {
  //   Check if User is Superadmin
  if (req.user.role !== 1) {
    return res.status(400).json("Not authorized");
  }

  try {
    // Search admin
    const adminList = await User.find({
      role: 2,
      assignedServiceCenter: 0,
    }).select("-password");

    //Return admin
    res.json(adminList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET '/admin/all'
// @desc    get all admin
// @access  Superadmin
router.get("/all", auth, async (req, res) => {
  //   Check if User is Superadmin
  if (req.user.role !== 1) {
    return res.status(400).json("Not authorized");
  }

  try {
    // Search admin
    const admin = await User.find({ role: 2 }).select("-password");

    //If there is admin
    res.json(admin);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST '/admin/register'
// @desc    Register admin, role == 2
//@access   Superadmin
router.post(
  "/register",
  [
    auth,
    [
      // express validator
      check("name", "Name is required").not().isEmpty(),
      check("phone", "Please Enter a Phone").not().isEmpty(),
      check("location", "Please Enter location").not().isEmpty(),
      check("email", "PLease include a valid email").isEmail(),
      check("username", "Username must be atleast 4 characters").isLength({
        min: 4,
      }),
      check("password", "Password must be atleast 5 characters").isLength({
        min: 5,
      }),
    ],
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
      // Search for admin by username, email or phone
      let username = await User.findOne({ username: req.body.username });
      let email = await User.findOne({ email: req.body.email });
      let phone = await User.findOne({ phone: req.body.phone });

      // See if user exists
      if (username) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Username already exists" }] });
      } else if (email) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Email already exists" }] });
      } else if (phone) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Phone already exists" }] });
      }

      //Get user Gravatar from the email in request body
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      // saving details from req.body
      user = new User({
        name: req.body.name,
        phone: req.body.phone,
        location: req.body.location,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        role: 2,
        assignedServiceCenter: 0,
        avatar,
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
          role: user.role,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) res.json({ err });
          res.json(user);
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

// @route    POST '/admin/update/:id'
// @desc     Update admin
// @access   Superadmin, Same Admin
router.post(
  "/update/:id",
  [
    auth,
    [
      check("admin.username", "Please enter username").not().isEmpty(),
      check("admin.name", "Please enter name").not().isEmpty(),
      check("admin.email", "Please enter email").isEmail(),
      check("admin.phone", "Please enter a phone number").isNumeric(),
      check("admin.location", "Please enter location").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    //   Check if User is not Superadmin or Admin
    if (req.user.role > 2) {
      return res.status(400).json("Not authorized");
    }
    //   Check if User is Admin, must be same Admin
    if (req.user.role == 2 && req.user.id !== req.params.id) {
      return res.status(400).json("Not authorized");
    }

    const error = validationResult(req);
    // If validation errors

    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    // Initialise new Object and set properties from request
    const admin = {};

    if (req.body.admin.username) admin.username = req.body.admin.username;
    if (req.body.admin.password) admin.password = req.body.admin.password;
    if (req.body.admin.name) admin.name = req.body.admin.name;
    if (req.body.admin.email) admin.email = req.body.admin.email;
    if (req.body.admin.phone) admin.phone = req.body.admin.phone;
    if (req.body.admin.location) admin.location = req.body.admin.location;
    admin.role = 2;

    // Encrypt password
    if (req.body.admin.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(req.body.admin.password, salt);
      } catch (err) {
        return res.json(err);
      }
    }

    try {
      let adminDetails = await User.findOne({ _id: req.params.id, role: 2 });

      // If admin exists, Update
      if (adminDetails) {
        adminDetails = await User.findOneAndUpdate(
          { _id: req.params.id },
          { $set: admin },
          { new: true }
        );

        return res.json(adminDetails);
      }
      res.json("User not Found");
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

//@route    DELETE /admin/:id
//@desc     delete admin
//@access   Superadmin
router.delete("/:id", auth, async (req, res) => {
  //   Check if User is Superadmin
  if (req.user.role !== 1) {
    return res.status(400).json("Not authorized");
  }

  try {
    // If admin exists, Update
    let admin = await User.findOne({ _id: req.params.id, role: 2 });

    // If user exists
    if (admin) {
      await User.findByIdAndDelete({ _id: req.params.id });

      return res.json("Admin deleted");
    }
    res.json("User not Found");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//@route    POST '/admin/assignServiceCenter'
//@desc     Update assignAdminServieCenter admin
//@access   Superadmin
router.post(
  "/assignServiceCenter",
  [
    auth,
    [
      check("id", "Please select admin").not().isEmpty(),
      check("assignedServiceCenter", "Please assign ServiceCenter")
        .not()
        .isEmpty(),
    ],
  ],
  // async (req, res) => { res.json('body') }
  async (req, res) => {
    //   Check if User is not Superadmin or Admin
    if (req.user.role > 2) {
      return res.status(400).json("Not authorized");
    }

    const error = validationResult(req);
    // If validation errors

    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    // Initialise new Object and set properties from request
    const admin = {};

    admin.assignedServiceCenter = req.body.assignedServiceCenter;
    if (req.body.id) admin._id = req.body.id;

    try {
      let adminDetails = await User.findOne({ _id: req.body.id, role: 2 });

      // If admin exists, Update
      if (adminDetails) {
        adminDetails = await User.findOneAndUpdate(
          { _id: req.body.id },
          { $set: admin },
          { new: true }
        );

        return res.json(adminDetails);
      }
      res.json("Admin not Found");
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

module.exports = router;
