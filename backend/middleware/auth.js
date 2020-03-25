const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token')

    // check if no token
    if (!token) {
        // 401 = unauthorised
        return res.status(401).json({ error: [{ 'msg': 'Please Login' }] })
    }
    // Verifytoken
    try {
        // Decode the token
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        // take req object and assign value to user from user of decoded value
        req.user = decoded.user
        next()

    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' })
    }
}