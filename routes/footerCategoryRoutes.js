const express = require('express');
const router = express.Router();
const FooterCategoryController = require('../controllers/footerCategoryController');
const multer = require('multer');
const { storage } = require("../config/cloudanary");

const upload = multer({ storage: storage });
router.get('/', FooterCategoryController.getAllFooterCategories)
router.post('/', FooterCategoryController.addNewFooterCategory)
router.put('/:id', FooterCategoryController.updateFooterCategory)
router.delete('/:id', FooterCategoryController.deleteFooterCategory)
router.get('/:id', FooterCategoryController.getFooterCategoryById)
module.exports = router;