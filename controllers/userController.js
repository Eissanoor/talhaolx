const User = require('../models/userModel');
var dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const C_cloud_name = process.env.C_cloud_name

// Function to get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
};

// Function to create a new user
const createUser = async (req, res) => {
  try {
    const newUser = req.body;
    const newuser = await User.create(newUser);
    res.json(newuser);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
};

// Export functions at the bottom
module.exports = {
  getAllUsers,
  createUser
};
