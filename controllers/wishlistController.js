const Wishlist = require("../models/wishlistModel.js");
const product = require("../models/productModel.js");
const path = require("path");
var dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const { cloudinary } = require("../config/cloudanary.js");

const getWishlistByUserId = async (req, res) => {
    try {
      const userId = req.params.userId;
      const wishlist = await Wishlist.findOne({ user: userId })
        .populate('products');
  
      if (!wishlist) {
        return res.status(404).json({ message: 'Wishlist not found' });
      }
  
      res.status(200).json(wishlist);
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
    }
  };
  module.exports = {
    getWishlistByUserId
};