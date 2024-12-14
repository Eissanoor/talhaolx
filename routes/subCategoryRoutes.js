const express = require('express');
const router = express.Router();
const subCategoryController = require('../controllers/subCategoryController');
const multer = require('multer');
const { storage } = require("../config/cloudanary");
const apicache = require('apicache');
const cache = apicache.middleware;
const upload = multer({ storage: storage });
router.get('/',cache('5 minutes'), subCategoryController.getAllSubCategory)
router.post('/', subCategoryController.addSubCategory)
router.put('/:subCategoryId', subCategoryController.updateSubCategory)
router.delete('/:id', subCategoryController.deleteSubCategory)
router.get('/:id',cache('5 minutes'), subCategoryController.getSubCategoryById)
module.exports = router;