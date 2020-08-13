const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

/**
 * Middleware in order to validate token and add the valid user to request
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');

    if (authHeader) {
        // Get token
        const token = authHeader.split(' ')[1];

        // Check JWT
        try {
            const user = jwt.verify(token, process.env.SECRET);
            req.user = user;
        } catch (error) {
            console.log(error);
            console.log('JWT no válido');
        }
    }

    return next();
};
