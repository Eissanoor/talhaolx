const express = require('express');
const router = express.Router();
const wishlist = require('../controllers/wishlistController.js');



router.get('/', wishlist.getWishlistByUserId)

module.exports = router;