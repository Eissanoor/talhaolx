const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/productController.js');
const multer = require('multer');
const { storage } = require("../config/cloudanary");

const upload = multer({ storage: storage });
router.get("/getcategoryproduct", categoryController.gettencategoriesbyproduct)
router.get("/getProductsByCategory/:categoryId", categoryController.getProductsByCategory)
router.get('/', categoryController.getallproduct)
router.get("/:id", categoryController.getProductById)
router.post('/', upload.array('images', 8),categoryController.addnewproduct)
router.put("/:id", upload.array('images', 8),categoryController.updateProduct)
router.delete("/:productId", categoryController.deleteProduct)
module.exports = router;