const express = require('express');
const router = express.Router();
const apicache = require('apicache');
const cache = apicache.middleware;
const chatController = require('../controllers/chatController.js');

router.get("/getmychat",cache('5 minutes'), chatController.listUserChats);
router.post('/deliver', chatController.markMessagesAsDelivered)
router.post('/read',cache('5 minutes'), chatController.getAndMarkChatAsRead)
router.post("/notification", chatController.notification)
router.post("/", chatController.sendMessage);
router.get("/", cache('5 minutes'),chatController.getChatHistory)
module.exports = router;