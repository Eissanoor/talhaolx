const express = require('express');
const router = express.Router();
const subCategoryController = require('../controllers/subCategoryController');
const multer = require('multer');
const { storage } = require("../config/cloudanary");

const upload = multer({ storage: storage });
router.get('/', subCategoryController.getAllSubCategory)
router.post('/', subCategoryController.addSubCategory)
router.put('/:subCategoryId', subCategoryController.updateSubCategory)
router.delete('/:id', subCategoryController.deleteSubCategory)
router.get('/:id', subCategoryController.getSubCategoryById)
module.exports = router;