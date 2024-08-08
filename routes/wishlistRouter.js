const express = require('express');
const router = express.Router();
const wishlist = require('../controllers/wishlistController.js');



router.get('/:userId', wishlist.getWishlistByUserId)
router.post('/:userId', wishlist.addOrRemoveProductFromWishlist)
module.exports = router;