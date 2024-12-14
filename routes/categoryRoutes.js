const express = require('express');
const router = express.Router();
const apicache = require('apicache');
const cache = apicache.middleware;
const categoryController = require('../controllers/catagoryController');
const multer = require('multer');
const { upload } = require("../config/multerConfig");

// const upload = multer({ storage: storage });
router.get('/', cache('5 minutes'),categoryController.getallcategories);
router.get("/:id", cache('5 minutes'), categoryController.getCategoryById)
router.post('/', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'icon', maxCount: 1 }]), categoryController.addnewcategories);
router.put('/:id', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'icon', maxCount: 1 }]), categoryController.updateCategory);
router.delete('/:id',categoryController.deleteCategory);
module.exports = router;