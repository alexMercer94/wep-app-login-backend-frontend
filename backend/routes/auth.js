const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');
const auth = require('../middlewares/auth');

/**
 * Route for login
 */
router.post(
    '/',
    [
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'El password no puede ir vacio').not().isEmpty(),
    ],
    authController.authenticateUser
);

/**
 * Route in order to get User authenticated
 */
router.get('/', auth, authController.userAuthneticated);

module.exports = router;
