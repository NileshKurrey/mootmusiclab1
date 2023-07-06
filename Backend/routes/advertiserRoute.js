const express = require('express');
const {registerAdvertiser,getAdvertiserDetails, getAllAdvertiser, delateAdvertiser, updateAdvertiser} = require('../controllers/advertiserConroller')
const {isAuthenticatedUser,authorizeRoles} = require('../middleware/auth')
const router = express.Router();

router.route('/registerAdvertiser').post( isAuthenticatedUser,registerAdvertiser);
router.route('/getAdvertiser/:id').get(isAuthenticatedUser,getAdvertiserDetails)
router.route('/getAllAdvertiser').get(isAuthenticatedUser,authorizeRoles('admin'),getAllAdvertiser)
router.route('/deleteAdvertiser/:id').delete(isAuthenticatedUser,authorizeRoles('admin','Advertiser'),delateAdvertiser)
router.route('/updateAdvertiser/:id').put(isAuthenticatedUser,authorizeRoles('admin','Advertiser'),updateAdvertiser)



module.exports = router