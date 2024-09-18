var dotenv = require("dotenv");
const passport = require('passport');
const session = require('express-session');
const reactNativeModel = require('../models/reactNativeModel');
const jwt = require('jsonwebtoken');
dotenv.config({ path: "./config.env" });

const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
  
    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }
  
    try {
      const user = await reactNativeModel.findOne({ email });
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
  const register = async (req, res) => {
    const { username, email, password,  } = req.body;
  
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }
  
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
  
    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }
  
    try {
      const existingUser = await reactNativeModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }
  
      const newUser = new reactNativeModel({
        username,
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
    loginUser,
    register
    
  };
  