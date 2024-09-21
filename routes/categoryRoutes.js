const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/catagoryController');
const multer = require('multer');
const { upload } = require("../config/multerConfig");

// const upload = multer({ storage: storage });
router.get('/', categoryController.getallcategories);
router.get("/:id", categoryController.getCategoryById)
router.post('/', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'icon', maxCount: 1 }]), categoryController.addnewcategories);
router.put('/:id', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'icon', maxCount: 1 }]), categoryController.updateCategory);
router.delete('/:id',categoryController.deleteCategory);
module.exports = router;