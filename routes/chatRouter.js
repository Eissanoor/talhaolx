const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController.js');

router.get("/getmychat", chatController.listUserChats);
router.post("/", chatController.sendMessage);
router.get("/", chatController.getChatHistory)

module.exports = router;