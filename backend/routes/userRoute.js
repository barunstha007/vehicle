const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

// express validator
const { check, validationResult } = require('express-validator');

const User = require('../models/User.model')

// @route   POST 'api/users'
// @desc    Register user
//@access     Public
router.post('/register', [
    // express validator
    check('name', 'Name is required')
        .not().isEmpty(),
    check('phone', 'Please enter valid phone number')
        .isNumeric(),
    check('email', 'PLease include a valid email')
        .isEmail(),
    check('location', 'Please enter your location')
        .not().isEmpty(),
    check('username', 'Please enter valid username')
        .not().isEmpty(),
    check('password', 'Please Enter a password of 6 or more characters')
        .isLength({ min: 6 })
],
    // async await function
    async (req, res) => {
        const error = validationResult(req)
        // if error is not empty || if there is error
        if (!error.isEmpty()) {
            return (
                // take the error from express validation
                res.status(400).json({ error: error.array() })
            )

        }


        try {
            // See if user exists
            // find in db the value of  req.body.email
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return (
                    res.status(400).json({ errors: [{ msg: 'User already exists' }] })
                )
            }


            //Get user Gravatar from the email in request body
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })

            // saving details from req.body
            user = new User({
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                location: req.body.location,
                username: req.body.username,
                password: req.body.password,
                avatar
            })

            // Encrypt password
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(req.body.password, salt)

            // save to database
            await user.save()

            // Return JsonWebToken
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 36000 },
                (err, token) => {
                    if (err) res.json({ err });
                    res.json({ token })
                    console.log('Token Generate SUCCESFULL')
                })

            // res.send('User registered')
        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server Error')
        }

    })

module.exports = router