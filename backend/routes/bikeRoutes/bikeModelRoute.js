const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const BikeModel = require("../../models/BikeModel.model");
const { check, validationResult } = require("express-validator");

// @route   GET '/bikemodel'
// @desc    get all bike model
// @access  Public
router.get('/', async (req, res) => {

    try {
        // Search admin 
        const bikeModelList = await BikeModel.find({})

        //Return admin
        res.json(bikeModelList)

    } catch (err) {

        res.status(500).send({ error: [{ msg: err.response }] })
    }

})

// @route   POST '/bikemodel'
// @desc    add new bike model, role == 1
//@access   Superadmin  
router.post("/add", [auth, [
    check("bikeModel", "Bike Model Name is required")
        .not()
        .isEmpty().trim(),
]],
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

            // Search for existing bikemodel
            let bikeModel = await BikeModel.findOne({ bikeModel: req.body.bikeModel });

            // See if bikemodel exists
            if (bikeModel) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Bike Model already exists" }] });
            }

            // saving details from req.body
            bikeModel = new BikeModel({
                bikeModel: req.body.bikeModel
            });

            // save to database
            await bikeModel.save();

            res.status(200).json(bikeModel)

            // res.send('User registered')
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

// @route   POST '/bikemodel'
// @desc    update bike model, role == 1
//@access   Superadmin  
router.post("/update/:id", [auth, [
    check("bikeModel", "bikeModel is required")
        .not()
        .isEmpty().trim(),
]],
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

        const updatebike = {}
        if (req.body.bikeModel) updatebike.bikeModel = req.body.bikeModel

        try {

            // If superadmin exists, Update 
            let bikeModelDetails = await BikeModel.findOne({ _id: req.params.id });

            // If user exists
            if (bikeModelDetails) {
                bikeModelDetails = await BikeModel.findOneAndUpdate(
                    { _id: req.params.id },
                    { $set: updatebike },
                    { new: true }
                );

                return res.json(bikeModelDetails);

            }
            res.json('Bike Model not Found')

            // res.send('User registered')
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

// @route   DELETE '/bikemodel'
// @desc    delete bike model
// @access  Superadmin
router.delete('/:id', auth, async (req, res) => {

    try {
        // Search admin 
        const bikeModel = await BikeModel.findOne({ _id: req.params.id })

        if (bikeModel) {
            await BikeModel.findByIdAndDelete({ _id: req.params.id });

            return res.json("Bike Model deleted");
        }
        res.json('Bike Model not found')


        //Return admin
        res.json(bikeModel)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }

})

module.exports = router