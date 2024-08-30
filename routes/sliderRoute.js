const express = require('express');
const router = express.Router();
const sliderController = require('../controllers/sliderController');
const multer = require('multer');
const { storage } = require("../config/cloudanary");

const upload = multer({ storage: storage });

router.get('/', sliderController.getallSlider);
router.get("/:id", sliderController.getSliderById)
router.post('/', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'icon', maxCount: 1 }]), sliderController.addnewSlider);
router.put('/:id', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'icon', maxCount: 1 }]), sliderController.updateSlider);
router.delete('/:id',sliderController.deleteSlider);
module.exports = router;