const router = require("express").Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../models/UserDetails.model");

// @route   GET '/profile'
// @desc    get current user profile
// @access  Superadmin
router.get('/', auth, async (req, res) => {

    const { role, id } = req.user

    try {
        const userprofile = await User.findById(id)
        if (userprofile)
            //Return admin
            return res.status(200).json(userprofile)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }

})

// @route   POST '/profile/update'
// @desc    Update requested user profile
// @access  Private
router.post("/", [
    // express validator
    check("username", "Username must be atleast 4 characters").isLength({
        min: 4
    }),
    check("name", "Name must be minimum of 3 characters").isLength({ min: 3 }),
    check("email", "Please include a valid email").isEmail(),
    check("phone", "Phone number must be of minimum of 7 length ").isLength({ min: 7 }),
    check("location", "Location must be of minimum 4 characters").isLength({ min: 4 }),
    check("password", "Password must be atleast 5 characters").isLength({
        min: 5
    })
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
            // See if user exists
            // find in db the value of  req.body.email
            let username = await User.findOne({ username: req.body.username });
            let email = await User.findOne({ email: req.body.email });
            let phone = await User.findOne({ phone: req.body.phone });

            if (username) {
                return res
                    .status(400)
                    .json({ error: [{ msg: "The username already exists" }] });
            } else if (email) {
                return res
                    .status(400)
                    .json({ error: [{ msg: "The email already exists" }] });
            } else if (phone) {
                return res
                    .status(400)
                    .json({ error: [{ msg: "The phone number already exists" }] });
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
                role: 3,
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
                    // Send token and user role in json
                    const role = payload.user.role
                    res.json({ token, role });

                    console.log("Register Token Generate SUCCESFULL");
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
