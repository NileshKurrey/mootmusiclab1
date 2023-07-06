const express = require('express');
const {registerArtist,getArtistDetails, getAllArtist, delateArtist, updateArtist,likeAndUnlike, mostLikedArtist} = require('../controllers/artistController')
const {isAuthenticatedUser,authorizeRoles} = require('../middleware/auth')
const router = express.Router();

router.route('/registerArtist').post( isAuthenticatedUser,registerArtist);
router.route('/getArtist/:id').get(isAuthenticatedUser,getArtistDetails)
router.route('/getAllartist').get(isAuthenticatedUser,getAllArtist)
router.route('/deleteArtist/:id').delete(isAuthenticatedUser,authorizeRoles('admin','artist'),delateArtist)
router.route('/updateArtist/:id').put(isAuthenticatedUser,authorizeRoles('admin','artist'),updateArtist)
router.route('/addLike/:id').get(isAuthenticatedUser,likeAndUnlike)
router.route('/mostLiked').get(mostLikedArtist)


module.exports = router