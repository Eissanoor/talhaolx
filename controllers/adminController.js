var dotenv = require("dotenv");
const passport = require('passport');
const session = require('express-session');
const Admin = require('../models/adminModel.js');
const jwt = require('jsonwebtoken');
dotenv.config({ path: "./config.env" });
const { cloudinary } = require("../config/cloudanary.js");
const C_cloud_name = process.env.C_cloud_name
require('../auth/auth.js');

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
  
    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }
  
    try {
      const user = await Admin.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
  
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
  
      const payload = { id: user.id, email: user.email };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
  
      res.json({ token, user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const addUser = async (req, res) => {
    const {  email, password, } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
  
    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }
  
    try {
      const existingUser = await Admin.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }
  
      const newUser = new Admin({
       
        email,
        password,
        
      });
  
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  module.exports = {
    loginAdmin,
    addUser
  };
  