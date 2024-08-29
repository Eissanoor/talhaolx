var dotenv = require("dotenv");
const passport = require('passport');
const session = require('express-session');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
dotenv.config({ path: "./config.env" });
const { cloudinary } = require("../config/cloudanary.js");
const C_cloud_name = process.env.C_cloud_name
require('../auth/auth.js');
const frontendbaseURL = "https://olxprojectscopy.vercel.app"
const addUser = async (req, res) => {
  const { username, email, password, dateOfBirth, aboutMe, phone, address } = req.body;
  const image = req.files && req.files["image"] ? req.files["image"][0].path : null;

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
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const newUser = new User({
      username,
      email,
      image,
      password,
      dateOfBirth,
      aboutMe,
      status:1,
      phone,
      address
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }

  try {
    const user = await User.findOne({ email });
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

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, dateOfBirth, aboutMe, status, phone, address } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const getPublicIdFromUrl = (url) => {
      const urlParts = url.split("/");
      const fileName = urlParts.pop(); // Get the filename
      urlParts.pop(); // Remove the version part
      const publicId = `uploads/${fileName.split(".")[0]}`; // Combine folder path and filename without extension
      return publicId;
    };

    let imagePath = user.image;
    if (req.files && req.files["image"] && req.files["image"][0]) {
      if (user.image) {
        const public_id = getPublicIdFromUrl(user.image);
        console.log("Deleting old image with public ID:", public_id);
        try {
          const result = await cloudinary.uploader.destroy(public_id, {
            resource_type: "image",
          });
          console.log("Old image deletion result:", result);
        } catch (error) {
          console.error("Error deleting old image from Cloudinary:", error);
        }
      }
      imagePath = req.files["image"][0].path;
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.password = password || user.password;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;
    user.aboutMe = aboutMe || user.aboutMe;
    user.status = status || user.status;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.image = imagePath;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ message: error.message });
  }
};
const getUsers = async (req, res) => {
  try {
      const users = await User.find();
      res.status(200).json(users);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
      const user = await User.findById(id);

      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(user);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
      const user = await User.findByIdAndDelete(id);

      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
const changePassword = async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.password !== currentPassword) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginWithGoogle = (req, res, next) => {
  passport.authenticate('google', { scope: ['profile', 'email'], state: 'login' })(req, res, next);
};


const signupWithGoogle = (req, res, next) => {
  passport.authenticate('google', { scope: ['profile', 'email'], state: 'signup' })(req, res, next);
};

const googleCallback = (req, res, next) => {
  passport.authenticate('google', async (err, user, info) => {
    if (err) {
      console.log(err);
      return next(err);
    }

    if (!user) {
      const redirectUrl = req.query.state === 'login' ? '/signup' : '/login';
      const status = req.query.state === 'login' ? 0 : 1;
      return res.redirect(`${process.env.CLIENT_URL}${redirectUrl}?status=${status}`);
    }

    req.logIn(user, (err) => {
      if (err) {
        console.log(err);
        return next(err);
      }

      // Generate JWT token with userId included
      const payload = { id: user.userId, email: user.email }; // Include userId in the payload
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Redirect to client-side dashboard with token in query params
      res.redirect(`${frontendbaseURL}?token=${token}`);
    });
  })(req, res, next);
};




// Export functions at the bottom
module.exports = {
  updateUser,
  addUser,
  getUsers,
  getUserById,
  deleteUser,
  changePassword,
  loginWithGoogle,
  signupWithGoogle,
  googleCallback,
  loginUser
};
