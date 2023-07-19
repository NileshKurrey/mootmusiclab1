const express = require('express');
const { isAuthenticatedUser ,authorizeRoles} = require('../middleware/auth');
const { registerUser, loginUser, logout, forgetPassword,getAllUser, getUserDetails,updateUserRole,deleteUser, } = require('../controllers/userController');
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser)
router.route('/logout').get(logout)
router.route('/password/forgot').post(forgetPassword)
router.route('/me').get(isAuthenticatedUser,getUserDetails)
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);
router
  .route("/admin/user/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router