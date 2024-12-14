const express = require('express');
const router = express.Router();
const apicache = require('apicache');
const cache = apicache.middleware;
const FooterCategoryController = require('../controllers/footerCategoryController');
const multer = require('multer');
const { storage } = require("../config/cloudanary");

const upload = multer({ storage: storage });
router.get('/megamenu', cache('5 minutes'),FooterCategoryController.megamenu)
router.get('/', cache('5 minutes'), FooterCategoryController.getAllFooterCategories)
router.post('/', FooterCategoryController.addNewFooterCategory)
router.put('/:id', FooterCategoryController.updateFooterCategory)
router.delete('/:id', FooterCategoryController.deleteFooterCategory)
router.get('/:id', cache('5 minutes'), FooterCategoryController.getFooterCategoryById)

module.exports = router;