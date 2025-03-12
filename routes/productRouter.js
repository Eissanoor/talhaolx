const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/productController.js');
const multer = require('multer');
const { upload } = require("../config/multerConfig.js");
const apicache = require('apicache');
const cache = apicache.middleware;
// const upload = multer({ storage: storage });
router.get("/homeproduct",cache('5 minutes'), categoryController.homeproduct)
router.get("/getcategoryproduct", cache('5 minutes'), categoryController.gettencategoriesbyproduct)
router.get("/getActiveProductCountByCategory", cache('5 minutes'),categoryController.getActiveProductCountByCategory)
router.get("/countProductsByStatus", cache('5 minutes'),categoryController.countProductsByStatus)
router.get("/getallproductbyadmin", categoryController.getallproductbyadmin)
router.get("/getProductsByCategory/:categoryId",cache('5 minutes'), categoryController.getProductsByCategory)
router.get("/getProductsByCategoryId/:categoryId",cache('5 minutes'), categoryController.getProductsByCategoryId)
router.get("/getProductsByUserId/:userId",cache('5 minutes'), categoryController.getProductsByUserId)
router.get("/getTrendingProducts",cache('5 minutes'), categoryController.getTrendingProducts)
router.post("/searchProduct", categoryController.searchProduct)
router.get('/',cache('5 minutes'), categoryController.getallproduct)
router.get("/:id",cache('5 minutes'), categoryController.getProductById)
router.post('/', upload.array('images', 8),categoryController.addnewproduct)
router.put("/:id", upload.array('images', 8),categoryController.updateProduct)
router.delete("/:productId", categoryController.deleteProduct)
module.exports = router;