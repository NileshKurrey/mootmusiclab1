
const express = require('express');
const { createSong, createGenre, createAlbum, updateSong, updateAlbum, getAllSongs, getAllMySongs, getAllAlbums, getAllmyAlbums, getAllGenre, getSongsbyGenre, deleteSong, deleteAlbum, deleteSongAdmin, deleteAlbumByAdmin, deleteGenre, removeSong, mostLikedSong, recentSongs } = require('../controllers/musiccontroller')
const {isAuthenticatedUser,authorizeRoles} = require('../middleware/auth')
const router = express.Router();

router.route('/createSong').post( isAuthenticatedUser,createSong);
router.route('/createGenre').post( isAuthenticatedUser,authorizeRoles('admin'),createGenre);
router.route('/createAlbum').post( isAuthenticatedUser,createAlbum);
router.route('/updateSong/:id').put( isAuthenticatedUser,updateSong);
router.route('/updateAlbum/:id').put( isAuthenticatedUser,updateAlbum);
router.route('/getAllSongs').get( isAuthenticatedUser,authorizeRoles('admin'),getAllSongs);
router.route('/getAllAlbums').get( isAuthenticatedUser,authorizeRoles('admin'),getAllAlbums);
router.route('/getAllMySongs').get( isAuthenticatedUser,getAllMySongs);
router.route('/getAllmyAlbums').get( isAuthenticatedUser,getAllmyAlbums);
router.route('/getAllGenre').get(getAllGenre);
router.route('/getSongsbyGenre/:id').get(getSongsbyGenre);
router.route('/deleteSong/:id').delete(isAuthenticatedUser,deleteSong);
router.route('/deleteAlbum/:id').delete(isAuthenticatedUser,deleteAlbum);
router.route('/deleteSongByadmin/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteSongAdmin);
router.route('/deleteAlbumByadmin/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteAlbumByAdmin);
router.route('/deleteGenre/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteGenre);
router.route('/removeSong/:id').put(isAuthenticatedUser,removeSong);
router.route('/mostLikedSong').get(mostLikedSong);
router.route('/recentSongs').get(recentSongs);

module.exports = router