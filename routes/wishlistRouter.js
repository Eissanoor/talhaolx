const express = require('express');
const router = express.Router();
const wishlist = require('../controllers/wishlistController.js');

const apicache = require('apicache');
const cache = apicache.middleware;

router.get('/:userId', cache('5 minutes'), wishlist.getWishlistByUserId)
router.post('/:userId', wishlist.addOrRemoveProductFromWishlist)
module.exports = router;