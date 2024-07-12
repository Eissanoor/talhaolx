const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
   
  },
  
  // Other user fields can go here
});

module.exports = mongoose.model("User", userSchema);
