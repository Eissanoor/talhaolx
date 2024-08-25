const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController.js');
const authenticate = require('../middleware/authMiddleware.js');
const multer = require('multer');
const { storage } = require("../config/cloudanary");

const upload = multer({ storage: storage });

router.post('/login', adminController.loginAdmin);
router.post('/signup', adminController.addUser);
module.exports = router;