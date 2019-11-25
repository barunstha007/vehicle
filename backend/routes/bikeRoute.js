const router = require('express').Router()
const auth = require('../middleware/auth')
const Bike = require('../models/Bike.model')
const { check, validationResult } = require('express-validator')
const User = require('../models/User.model')

//@route    POST mybike/
//@desc     add user bike details
//@access   Private
router.post('/', [auth, [
    check('bikeNumber', 'Please enter your bike number')
        .not().isEmpty(),
    check('bikeNumber', 'bike number must be a number')
        .isNumeric(),
    check('bikeModel', 'Please select a bike model')
        .not().isEmpty()
]], async (req, res) => {
    const error = validationResult(req)
    // If validation errors
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }

    // Initialise new Object and set properties from request
    const bike = {}
    bike.user = req.user.id
    if (req.body.bikeNumber) bike.bikeNumber = req.body.bikeNumber
    if (req.body.bikeModel) bike.bikeModel = req.body.bikeModel

    try {
        // If user exists, Update else Create new
        let bikeDetails = await Bike.findOne({ user: req.user.id })

        // If user exists
        if (bikeDetails) {
            bikeDetails = await Bike.findOneAndUpdate(
                { user: req.user.id },
                { $set: bike },
                { new: true }
            )
            return res.json('Update successful')
        }

        // Create new 
        bikeDetails = new Bike(bike)
        await bikeDetails.save()

        res.json('New Bike profile Created')

    } catch (err) {
        res.status(500).send(err.message)
    }
})

module.exports = router