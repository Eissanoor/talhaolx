const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');
const multer = require('multer');
const { storage } = require("../config/cloudanary");
const upload = multer({ storage: storage });

//----------------------Wifi----------------------------------------------------

router.get('/Wifi', brandController.getAllWifi)
router.post('/Wifi', brandController.addnewWifi)
router.put('/Wifi/:id', brandController.updateWifi)
router.delete('/Wifi/:id', brandController.deleteWifi)
router.get('/Wifi/:id', brandController.getWifiById)

//----------------------SensorSize----------------------------------------------------

router.get('/SensorSize', brandController.getAllSensorSize)
router.post('/SensorSize', brandController.addnewSensorSize)
router.put('/SensorSize/:id', brandController.updateSensorSize)
router.delete('/SensorSize/:id', brandController.deleteSensorSize)
router.get('/SensorSize/:id', brandController.getSensorSizeById)

//----------------------FunctionType----------------------------------------------------

router.get('/FunctionType', brandController.getAllFunctionType)
router.post('/FunctionType', brandController.addnewFunctionType)
router.put('/FunctionType/:id', brandController.updateFunctionType)
router.delete('/FunctionType/:id', brandController.deleteFunctionType)
router.get('/FunctionType/:id', brandController.getFunctionTypeById)

//----------------------HardDriveType----------------------------------------------------

router.get('/HardDriveType', brandController.getAllHardDriveType)
router.post('/HardDriveType', brandController.addnewHardDriveType)
router.put('/HardDriveType/:id', brandController.updateHardDriveType)
router.delete('/HardDriveType/:id', brandController.deleteHardDriveType)
router.get('/HardDriveType/:id', brandController.getHardDriveTypeById)
//----------------------OperatingSystem----------------------------------------------------

router.get('/OperatingSystem', brandController.getAllOperatingSystem)
router.post('/OperatingSystem', brandController.addnewOperatingSystem)
router.put('/OperatingSystem/:id', brandController.updateOperatingSystem)
router.delete('/OperatingSystem/:id', brandController.deleteOperatingSystem)
router.get('/OperatingSystem/:id', brandController.getOperatingSystemById)


//----------------------ConstructionState----------------------------------------------------

router.get('/ConstructionState', brandController.getAllConstructionState)
router.post('/ConstructionState', brandController.addnewConstructionState)
router.put('/ConstructionState/:id', brandController.updateConstructionState)
router.delete('/ConstructionState/:id', brandController.deleteConstructionState)
router.get('/ConstructionState/:id', brandController.getConstructionStateById)

//----------------------Areaunit----------------------------------------------------

router.get('/areaunit', brandController.getAllAreaunit)
router.post('/areaunit', brandController.addnewAreaunit)
router.put('/areaunit/:id', brandController.updateAreaunit)
router.delete('/areaunit/:id', brandController.deleteAreaunit)
router.get('/areaunit/:id', brandController.getAreaunitById)
//-------------------------Feature--------------------------------
router.get('/feature', brandController.getAllFeature)
router.post('/feature', brandController.addnewFeature)
router.put('/feature/:id', brandController.updateFeature)
router.delete('/feature/:id', brandController.deleteFeature)
router.get('/feature/:id', brandController.getFeatureById)
//-------------------------Construction----------------------------------------------------
router.get('/construction', brandController.getAllConstruction)
router.post('/construction', brandController.addnewConstruction)
router.put('/construction/:id', brandController.updateConstruction)
router.delete('/construction/:id', brandController.deleteConstruction)
router.get('/construction/:id', brandController.getConstructionById)
//-----------------------storey----------------------------------------------------
router.get('/storey', brandController.getAllstorey)
router.post('/storey', brandController.addnewstorey)
router.put('/storey/:id', brandController.updatestorey)
router.delete('/storey/:id', brandController.deletestorey)
router.get('/storey/:id', brandController.getstoreyById)


//------------------------bathroom --------------------
router.get('/bathroom', brandController.getAllbathroom)
router.post('/bathroom', brandController.addnewbathroom)
router.put('/bathroom/:id', brandController.updatebathroom)
router.delete('/bathroom/:id', brandController.deletebathroom)
router.get('/bathroom/:id', brandController.getbathroomById)
//---------------------------bedrooms------------------------
router.get('/bedroom', brandController.getAllBedroom)
router.post('/bedroom', brandController.addnewBedroom)
router.get("/bedroom/:id", brandController.getBedroomById)
router.put('/bedroom/:id', brandController.updateBedroom)
router.delete("/bedroom/:id", brandController.deleteBedroom)


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