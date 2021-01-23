const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {

    // get token from header
    const token = req.header('x-auth-token');

    if (!token) {
        res.status(401).send('Not authenticated');
    }

    try {
        // verify token
        decoded_jwt = jwt.verify(token, config.get('jwtSecret'));
        // return user id from token
        res.user = decoded_jwt.payload.user;
        next();
    } catch (error) {
        console.error(error.message);
        res.status(401).send('Not authenticated');
    }
    



}