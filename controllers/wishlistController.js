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

  const addOrRemoveProductFromWishlist = async (req, res) => {
    try {
      const userId = req.params.userId;
      const { productId } = req.body;
  
      let wishlist = await Wishlist.findOne({ user: userId });
  
      if (!wishlist) {
        // If no wishlist exists for the user, create a new one with the product
        wishlist = new Wishlist({ user: userId, products: [productId] });
        await wishlist.save();
        return res.status(200).json({ message: 'Product added to wishlist', wishlist });
      } else {
        // Check if the product already exists in the wishlist
        const productIndex = wishlist.products.indexOf(productId);
  
        if (productIndex > -1) {
          // If the product exists, remove it from the wishlist
          wishlist.products.splice(productIndex, 1);
          await wishlist.save();
          return res.status(200).json({ message: 'Product removed from wishlist', wishlist });
        } else {
          // If the product does not exist, add it to the wishlist
          wishlist.products.push(productId);
          await wishlist.save();
          return res.status(200).json({ message: 'Product added to wishlist', wishlist });
        }
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    }
  };
  module.exports = {
    getWishlistByUserId,
    addOrRemoveProductFromWishlist
};