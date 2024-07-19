const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');
const multer = require('multer');
const { storage } = require("../config/cloudanary");
const upload = multer({ storage: storage });

//--------------------------Furnished----------------------------------------------------------------

router.get('/furnished', brandController.getAllFurnished)
router.post('/furnished', brandController.addnewFurnished)
router.put('/furnished', brandController.updateFurnished)
router.delete('/furnished/:id', brandController.deleteFurnished)
router.get('/furnished/:id', brandController.getFurnishedById)

//---------------------------------Make-------------------------------
router.get('/make', brandController.getAllMake)
router.post('/make',upload.fields([{ name: 'image', maxCount: 1 }]),  brandController.addnewMake)
router.put('/make/:id',upload.fields([{ name: 'image', maxCount: 1 }]), brandController.updateMake)
router.delete('/make/:id', brandController.deleteMake)
router.get('/make/:id', brandController.getMakeById)
//----------------------------------Type------------------------------
router.get('/type',brandController.getAllType)
router.post('/type',brandController.addnewType)
router.put('/type/:id',brandController.updateType)
router.delete('/type/:id',brandController.deleteType)
router.get('/type/:id',brandController.getTypeById)
//------------------------------DeviceType----------------------------------------------------
router.get('/devicetype', brandController.getAllDeviceType)
router.post('/devicetype', brandController.addnewDeviceType)
router.put('/devicetype/:id', brandController.updateDeviceType)
router.delete('/devicetype/:id', brandController.deleteDeviceType)
router.get("/devicetype/:id", brandController.getDeviceTypeById)
//---------------------------CONDITION-------------------------------------
router.post('/condition', brandController.addnewcondition)
router.get('/condition', brandController.getAllcondition)
router.put('/condition/:id', brandController.updatecondition)
router.delete('/condition/:id', brandController.deletecondition)
router.get('/condition/:id', brandController.getconditionById)
//---------------------------BRAND-------------------------------------
router.get('/', brandController.getAllbrand)
router.post('/', brandController.addnewbrand)
router.put('/:id', brandController.updateBrand)
router.delete('/:id', brandController.deleteBrand )
router.get("/:id", brandController.getBrandById)

module.exports = router;