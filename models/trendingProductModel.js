const mongoose = require('mongoose');
const trendingProductSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to the Product model
    searchQuery: { type: String, required: true }, // The search query that led to this product
    trendScore: { type: Number, default: 0 }, // A score representing the trend level, can be based on searchCount or other factors
    updatedAt: { type: Date, default: Date.now } // The last time the trend score was updated
  });
  
  const TrendingProduct = mongoose.model('TrendingProduct', trendingProductSchema);
  
  module.exports = TrendingProduct;
  