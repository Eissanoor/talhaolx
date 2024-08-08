const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/productController.js');
const multer = require('multer');
const { storage } = require("../config/cloudanary");

const upload = multer({ storage: storage });
router.get('/', categoryController.getallproduct)
router.post('/', upload.array('images', 8),categoryController.addnewproduct)
module.exports = router;