const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/productController.js');
const multer = require('multer');
const { upload } = require("../config/multerConfig.js");
const apicache = require('apicache');
const cache = apicache.middleware;
// const upload = multer({ storage: storage });
router.get("/getcategoryproduct", cache('5 minutes'), categoryController.gettencategoriesbyproduct)
router.get("/getActiveProductCountByCategory", categoryController.getActiveProductCountByCategory)
router.get("/countProductsByStatus", categoryController.countProductsByStatus)
router.get("/getallproductbyadmin", categoryController.getallproductbyadmin)
router.get("/getProductsByCategory/:categoryId", categoryController.getProductsByCategory)
router.get("/getProductsByUserId/:userId", categoryController.getProductsByUserId)
router.get("/getTrendingProducts", categoryController.getTrendingProducts)
router.post("/searchProduct", categoryController.searchProduct)
router.get('/', categoryController.getallproduct)
router.get("/:id", categoryController.getProductById)
router.post('/', upload.array('images', 8),categoryController.addnewproduct)
router.put("/:id", upload.array('images', 8),categoryController.updateProduct)
router.delete("/:productId", categoryController.deleteProduct)
module.exports = router;