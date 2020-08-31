const router = require("express").Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../models/UserDetails.model");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");


// @route   GET '/profile'
// @desc    get current user profile
// @access  Superadmin
router.get('/user', auth, async (req, res) => {

    const { role, id } = req.user

    try {
        const userprofile = await User.findById(id).select(['-password', '-role', '-assignedServiceCenter'])
        if (userprofile)
            //Return admin
            return res.status(200).json(userprofile)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }

})

// @route   POST '/profile/update/:id'
// @desc    Update requested user profile
// @access  Private
router.post("/update/:id", [
    // express validator
    check("username", "Username must be atleast 4 characters").isLength({ min: 4 }),
    check("name", "Name must be minimum of 3 characters").isLength({ min: 3 }),
    check("email", "Please include a valid email").isEmail(),
    check("phone", "Phone number must be of minimum of 7 length ").isLength({ min: 7 }),
    check("location", "Location must be of minimum 4 characters").isLength({ min: 4 })
],
    // async await function
    async (req, res) => {
        const error = validationResult(req);
        // if error is not empty || if there is error
        if (!error.isEmpty()) {
            return (
                // take the error from express validation
                res.status(400).json({ error: error.array() })
            );
        }

        try {
            // search requested user
            let userID = await User.findOne({ _id: req.params.id });

            // pass if username is same as in db else check for username availability
            if (req.body.username.toLowerCase() === userID.username) { }
            else {
                let username = await User.findOne({ username: req.body.username.toLowerCase() });
                if (username) {
                    return res
                        .status(400)
                        .json({ error: "The username is taken" });
                }
            }
            if (req.body.phone === userID.phone) { }
            else {
                let phone = await User.findOne({ phone: req.body.phone });
                if (phone) {
                    return res
                        .status(400)
                        .json({ error: "The phone number is taken" });
                }
            }
            if (req.body.email === userID.email) { }
            else {
                let email = await User.findOne({ email: req.body.email });
                if (email) {
                    return res
                        .status(400)
                        .json({ error: "The email already exists" });
                }
            }

            //Get user Gravatar from the email in request body
            const avatar = gravatar.url(req.body.email, {
                s: "200",
                r: "pg",
                d: "mm"
            });


            const userUpdate = {}
            if (req.body.username) userUpdate.username = req.body.username.toLowerCase();
            if (req.body.name) userUpdate.name = req.body.name;
            if (req.body.email) userUpdate.email = req.body.email;
            if (req.body.phone) userUpdate.phone = req.body.phone;
            if (req.body.location) userUpdate.location = req.body.location;

            userUpdate.avatar = avatar

            // // Encrypt password
            if (req.body.password) {
                try {
                    // if (req.body.password < 6) return res.json({ error: "Password must be more than 4 character" })
                    const salt = await bcrypt.genSalt(10);
                    userUpdate.password = await bcrypt.hash(req.body.password, salt);
                } catch (err) {
                    return res.json(err)
                }
            }

            if (userID) {
                userID = await User.findOneAndUpdate(
                    { _id: req.params.id },
                    { $set: userUpdate },
                    { new: true }
                );

                return res.json(userID);

            }


            res.send('User Not Found')

        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

module.exports = router;
