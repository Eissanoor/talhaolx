const express = require('express');
const router = express.Router();
const otpController = require('../controllers/otpController.js');

router.post('/passwordOtpVarify', otpController.passwordOtpVarify);
router.post('/sendOtpForPasswordChange', otpController.sendOtpForPasswordChange);
router.post('/changePassword', otpController.changePassword);
module.exports = router;