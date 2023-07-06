const express = require('express');
const { isAuthenticatedUser ,authorizeRoles} = require('../middleware/auth');
const { registerUser, loginUser, logout, forgetPassword, getUserDetails } = require('../controllers/userController');
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser)
router.route('/logout').get(logout)
router.route('/password/forgot').post(forgetPassword)
router.route('/me').get(isAuthenticatedUser,getUserDetails)


module.exports = router