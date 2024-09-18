const express = require('express');
const router = express.Router();
const reactNativeController = require('../controllers/reactNativeAuthController');
router.post('/login', reactNativeController.loginUser);
router.post('/register', reactNativeController.register)
module.exports = router;