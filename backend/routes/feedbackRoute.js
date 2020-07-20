const router = require("express").Router();
const auth = require("../middleware/auth");
const Feedback = require("../models/Feeback.model");
const { check, validationResult } = require("express-validator");
const User = require("../models/UserDetails.model");

// @route   POST '/feedback'
// @desc    post feedback
// @access  Client
router.post('/post', auth, async (req, res) => {

    try {
        const { sc, vote, msg } = req.body
        // Create new
        const postFeedback = new Feedback({
            user_id: req.user.id,
            serviceCenter_id: sc,
            vote: vote,
            message: msg,
            posted: Date.now()
        });
        await postFeedback.save();
        return res.json(req.body)

    } catch (err) {
        res.status(500).send('Server Error')
    }

})

// @route   GET '/feedback/:id'
// @desc    get user bike
// @access  Private
router.get('/:id', auth, async (req, res) => {

    try {
        const getFeedback = await Feedback.find({ serviceCenter_id: req.params.id }).sort({ posted: 1 })
        return res.json(getFeedback)

    } catch (err) {
        res.status(500).send('Server Error')
    }

})

module.exports = router;
