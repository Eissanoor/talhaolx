const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const adminschema = new Schema({


  userId: {
    type: String,
    unique: true, // Ensure userId is unique
    default: () => new mongoose.Types.ObjectId().toString(), // Auto-generate a unique userId if not provided
  },
//   username: {
//     type: String,
//     required: true,
//     trim: true
//   },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: "Please enter a valid email address."
    }
  },
//   image: String,
  password:String,
//   dateOfBirth:String,
//   aboutMe:String,
//   status: Number,
//   phone: String,
//   address: String,
 
  
  // Other user fields can go here
});

adminschema.pre('save', async function(next) {
  if (this.isModified('password') || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Method to compare given password with the database hash
adminschema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};
module.exports = mongoose.model("admin", adminschema);
