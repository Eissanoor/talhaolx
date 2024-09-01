const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/productController.js');
const multer = require('multer');
const { storage } = require("../config/cloudanary");

const upload = multer({ storage: storage });
router.get("/getcategoryproduct", categoryController.gettencategoriesbyproduct)
router.get("/countProductsByStatus", categoryController.countProductsByStatus)
router.get("/getallproductbyadmin", categoryController.getallproductbyadmin)
router.get("/getProductsByCategory/:categoryId", categoryController.getProductsByCategory)
router.get("/getProductsByUserId/:userId", categoryController.getProductsByUserId)
router.get('/', categoryController.getallproduct)
router.get("/:id", categoryController.getProductById)
router.post('/', upload.array('images', 8),categoryController.addnewproduct)
router.put("/:id", upload.array('images', 8),categoryController.updateProduct)
router.delete("/:productId", categoryController.deleteProduct)
module.exports = router;