const mongoose = require('mongoose');

const searchQuerySchema = new mongoose.Schema({
  query: { type: String, required: true, unique: true }, // The search query string
  searchCount: { type: Number, default: 1 }, // Number of times the query was searched
  lastSearchedAt: { type: Date, default: Date.now } // The last time this query was searched
});

// Increment the search count and update the last searched time if the query already exists
searchQuerySchema.methods.incrementSearchCount = async function() {
  this.searchCount += 1;
  this.lastSearchedAt = Date.now();
  await this.save();
};

const SearchQuery = mongoose.model('SearchQuery', searchQuerySchema);

module.exports = SearchQuery;
