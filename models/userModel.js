const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({


  userId: {
    type: String,
    unique: true, // Ensure userId is unique
    default: () => new mongoose.Types.ObjectId().toString(), // Auto-generate a unique userId if not provided
  },
  username: {
    type: String,
    required: true,
   
  },
  email:{
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
   
  },
  image: String,
  password:String,
  dateOfBirth:String,
  aboutMe:String,
  status: Number,
  phone: String,
  address: String,
 
  
  // Other user fields can go here
});

module.exports = mongoose.model("User", userSchema);
