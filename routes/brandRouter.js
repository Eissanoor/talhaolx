const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');
const multer = require('multer');
const { storage } = require("../config/cloudanary");
const upload = multer({ storage: storage });
//--------------------filteing api------------------------

router.get('/filter_masterdata_in_subcategory/:id', brandController.getAllModelsBySubCategory)
router.get('/getAllModelsByFooterCategory/:id', brandController.getAllModelsByFooterCategory)

//----------------------Language----------------------------------------------------

router.get('/Language', brandController.getAllLanguage)
router.post('/Language', brandController.addnewLanguage)
router.put('/Language/:id', brandController.updateLanguage)
router.delete('/Language/:id', brandController.deleteLanguage)
router.get('/Language/:id', brandController.getLanguageById)
//----------------------Origin----------------------------------------------------

router.get('/Origin', brandController.getAllOrigin)
router.post('/Origin', brandController.addnewOrigin)
router.put('/Origin/:id', brandController.updateOrigin)
router.delete('/Origin/:id', brandController.deleteOrigin)
router.get('/Origin/:id', brandController.getOriginById)
//----------------------Handmade----------------------------------------------------

router.get('/Handmade', brandController.getAllHandmade)
router.post('/Handmade', brandController.addnewHandmade)
router.put('/Handmade/:id', brandController.updateHandmade)
router.delete('/Handmade/:id', brandController.deleteHandmade)
router.get('/Handmade/:id', brandController.getHandmadeById)
//----------------------Materialtype----------------------------------------------------

router.get('/Materialtype', brandController.getAllMaterialtype)
router.post('/Materialtype', brandController.addnewMaterialtype)
router.put('/Materialtype/:id', brandController.updateMaterialtype)
router.delete('/Materialtype/:id', brandController.deleteMaterialtype)
router.get('/Materialtype/:id', brandController.getMaterialtypeById)
//----------------------Sex----------------------------------------------------

router.get('/Sex', brandController.getAllSex)
router.post('/Sex', brandController.addnewSex)
router.put('/Sex/:id', brandController.updateSex)
router.delete('/Sex/:id', brandController.deleteSex)
router.get('/Sex/:id', brandController.getSexById)
//----------------------Breed----------------------------------------------------

router.get('/Breed', brandController.getAllBreed)
router.post('/Breed', brandController.addnewBreed)
router.put('/Breed/:id', brandController.updateBreed)
router.delete('/Breed/:id', brandController.deleteBreed)
router.get('/Breed/:id', brandController.getBreedById)
//----------------------TypeofAd----------------------------------------------------

router.get('/TypeofAd', brandController.getAllTypeofAd)
router.post('/TypeofAd', brandController.addnewTypeofAd)
router.put('/TypeofAd/:id', brandController.updateTypeofAd)
router.delete('/TypeofAd/:id', brandController.deleteTypeofAd)
router.get('/TypeofAd/:id', brandController.getTypeofAdById)
//----------------------PositionType----------------------------------------------------

router.get('/PositionType', brandController.getAllPositionType)
router.post('/PositionType', brandController.addnewPositionType)
router.put('/PositionType/:id', brandController.updatePositionType)
router.delete('/PositionType/:id', brandController.deletePositionType)
router.get('/PositionType/:id', brandController.getPositionTypeById)
//----------------------CareerLevel----------------------------------------------------

router.get('/CareerLevel', brandController.getAllCareerLevel)
router.post('/CareerLevel', brandController.addnewCareerLevel)
router.put('/CareerLevel/:id', brandController.updateCareerLevel)
router.delete('/CareerLevel/:id', brandController.deleteCareerLevel)
router.get('/CareerLevel/:id', brandController.getCareerLevelById)
//----------------------HiringPerson----------------------------------------------------

router.get('/HiringPerson', brandController.getAllHiringPerson)
router.post('/HiringPerson', brandController.addnewHiringPerson)
router.put('/HiringPerson/:id', brandController.updateHiringPerson)
router.delete('/HiringPerson/:id', brandController.deleteHiringPerson)
router.get('/HiringPerson/:id', brandController.getHiringPersonById)
//----------------------RegistrationCity----------------------------------------------------

router.get('/RegistrationCity', brandController.getAllRegistrationCity)
router.post('/RegistrationCity', brandController.addnewRegistrationCity)
router.put('/RegistrationCity/:id', brandController.updateRegistrationCity)
router.delete('/RegistrationCity/:id', brandController.deleteRegistrationCity)
router.get('/RegistrationCity/:id', brandController.getRegistrationCityById)
//----------------------EngineCapacity----------------------------------------------------

router.get('/EngineCapacity', brandController.getAllEngineCapacity)
router.post('/EngineCapacity', brandController.addnewEngineCapacity)
router.put('/EngineCapacity/:id', brandController.updateEngineCapacity)
router.delete('/EngineCapacity/:id', brandController.deleteEngineCapacity)
router.get('/EngineCapacity/:id', brandController.getEngineCapacityById)
//----------------------EngineType----------------------------------------------------

router.get('/EngineType', brandController.getAllEngineType)
router.post('/EngineType', brandController.addnewEngineType)
router.put('/EngineType/:id', brandController.updateEngineType)
router.delete('/EngineType/:id', brandController.deleteEngineType)
router.get('/EngineType/:id', brandController.getEngineTypeById)
//----------------------Resolution----------------------------------------------------

router.get('/Resolution', brandController.getAllResolution)
router.post('/Resolution', brandController.addnewResolution)
router.put('/Resolution/:id', brandController.updateResolution)
router.delete('/Resolution/:id', brandController.deleteResolution)
router.get('/Resolution/:id', brandController.getResolutionById)
//----------------------ScreenSize----------------------------------------------------

router.get('/ScreenSize', brandController.getAllScreenSize)
router.post('/ScreenSize', brandController.addnewScreenSize)
router.put('/ScreenSize/:id', brandController.updateScreenSize)
router.delete('/ScreenSize/:id', brandController.deleteScreenSize)
router.get('/ScreenSize/:id', brandController.getScreenSizeById)
//----------------------MaxAperatureRange----------------------------------------------------

router.get('/MaxAperatureRange', brandController.getAllMaxAperatureRange)
router.post('/MaxAperatureRange', brandController.addnewMaxAperatureRange)
router.put('/MaxAperatureRange/:id', brandController.updateMaxAperatureRange)
router.delete('/MaxAperatureRange/:id', brandController.deleteMaxAperatureRange)
router.get('/MaxAperatureRange/:id', brandController.getMaxAperatureRangeById)
//----------------------MaxFocalLengthRange----------------------------------------------------

router.get('/MaxFocalLengthRange', brandController.getAllMaxFocalLengthRange)
router.post('/MaxFocalLengthRange', brandController.addnewMaxFocalLengthRange)
router.put('/MaxFocalLengthRange/:id', brandController.updateMaxFocalLengthRange)
router.delete('/MaxFocalLengthRange/:id', brandController.deleteMaxFocalLengthRange)
router.get('/MaxFocalLengthRange/:id', brandController.getMaxFocalLengthRangeById)
//----------------------Wifi----------------------------------------------------
//----------------------MinFocalLengthRange----------------------------------------------------

router.get('/MinFocalLengthRange', brandController.getAllMinFocalLengthRange)
router.post('/MinFocalLengthRange', brandController.addnewMinFocalLengthRange)
router.put('/MinFocalLengthRange/:id', brandController.updateMinFocalLengthRange)
router.delete('/MinFocalLengthRange/:id', brandController.deleteMinFocalLengthRange)
router.get('/MinFocalLengthRange/:id', brandController.getMinFocalLengthRangeById)
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