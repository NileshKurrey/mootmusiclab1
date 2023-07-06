const express = require('express');
const { searchData } = require('../controllers/searchConroller')
const router = express.Router();

router.route('/search').get(searchData);
module.exports = router