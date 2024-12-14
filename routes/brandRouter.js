const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');
const multer = require('multer');
const { upload } = require("../config/multerConfig");
const apicache = require('apicache');
const cache = apicache.middleware;
// const upload = multer({ storage: storage });
//--------------------filteing api------------------------

router.get('/filter_masterdata_in_subcategory/:id',cache('5 minutes'), brandController.getAllModelsBySubCategory)
router.get('/getAllModelsByFooterCategory/:id',cache('5 minutes'), brandController.getAllModelsByFooterCategory)

//----------------------Language----------------------------------------------------

router.get('/Language', cache('5 minutes'),brandController.getAllLanguage)
router.post('/Language', brandController.addnewLanguage)
router.put('/Language/:id', brandController.updateLanguage)
router.delete('/Language/:id', brandController.deleteLanguage)
router.get('/Language/:id',cache('5 minutes'), brandController.getLanguageById)
//----------------------Origin----------------------------------------------------

router.get('/Origin',cache('5 minutes'), brandController.getAllOrigin)
router.post('/Origin', brandController.addnewOrigin)
router.put('/Origin/:id', brandController.updateOrigin)
router.delete('/Origin/:id', brandController.deleteOrigin)
router.get('/Origin/:id',cache('5 minutes'), brandController.getOriginById)
//----------------------Handmade----------------------------------------------------

router.get('/Handmade',cache('5 minutes'), brandController.getAllHandmade)
router.post('/Handmade', brandController.addnewHandmade)
router.put('/Handmade/:id', brandController.updateHandmade)
router.delete('/Handmade/:id', brandController.deleteHandmade)
router.get('/Handmade/:id',cache('5 minutes'), brandController.getHandmadeById)
//----------------------Materialtype----------------------------------------------------

router.get('/Materialtype',cache('5 minutes'), brandController.getAllMaterialtype)
router.post('/Materialtype', brandController.addnewMaterialtype)
router.put('/Materialtype/:id', brandController.updateMaterialtype)
router.delete('/Materialtype/:id', brandController.deleteMaterialtype)
router.get('/Materialtype/:id',cache('5 minutes'), brandController.getMaterialtypeById)
//----------------------Sex----------------------------------------------------

router.get('/Sex',cache('5 minutes'), brandController.getAllSex)
router.post('/Sex', brandController.addnewSex)
router.put('/Sex/:id', brandController.updateSex)
router.delete('/Sex/:id', brandController.deleteSex)
router.get('/Sex/:id',cache('5 minutes'), brandController.getSexById)
//----------------------Breed----------------------------------------------------

router.get('/Breed',cache('5 minutes'), brandController.getAllBreed)
router.post('/Breed', brandController.addnewBreed)
router.put('/Breed/:id', brandController.updateBreed)
router.delete('/Breed/:id', brandController.deleteBreed)
router.get('/Breed/:id',cache('5 minutes'), brandController.getBreedById)
//----------------------TypeofAd----------------------------------------------------

router.get('/TypeofAd',cache('5 minutes'), brandController.getAllTypeofAd)
router.post('/TypeofAd', brandController.addnewTypeofAd)
router.put('/TypeofAd/:id', brandController.updateTypeofAd)
router.delete('/TypeofAd/:id', brandController.deleteTypeofAd)
router.get('/TypeofAd/:id',cache('5 minutes'), brandController.getTypeofAdById)
//----------------------PositionType----------------------------------------------------

router.get('/PositionType',cache('5 minutes'), brandController.getAllPositionType)
router.post('/PositionType', brandController.addnewPositionType)
router.put('/PositionType/:id', brandController.updatePositionType)
router.delete('/PositionType/:id', brandController.deletePositionType)
router.get('/PositionType/:id',cache('5 minutes'), brandController.getPositionTypeById)
//----------------------CareerLevel----------------------------------------------------

router.get('/CareerLevel',cache('5 minutes'), brandController.getAllCareerLevel)
router.post('/CareerLevel', brandController.addnewCareerLevel)
router.put('/CareerLevel/:id', brandController.updateCareerLevel)
router.delete('/CareerLevel/:id', brandController.deleteCareerLevel)
router.get('/CareerLevel/:id',cache('5 minutes'), brandController.getCareerLevelById)
//----------------------HiringPerson----------------------------------------------------

router.get('/HiringPerson', brandController.getAllHiringPerson)
router.post('/HiringPerson', brandController.addnewHiringPerson)
router.put('/HiringPerson/:id', brandController.updateHiringPerson)
router.delete('/HiringPerson/:id', brandController.deleteHiringPerson)
router.get('/HiringPerson/:id', brandController.getHiringPersonById)
//----------------------RegistrationCity----------------------------------------------------

router.get('/RegistrationCity',cache('5 minutes'), brandController.getAllRegistrationCity)
router.post('/RegistrationCity', brandController.addnewRegistrationCity)
router.put('/RegistrationCity/:id', brandController.updateRegistrationCity)
router.delete('/RegistrationCity/:id', brandController.deleteRegistrationCity)
router.get('/RegistrationCity/:id',cache('5 minutes'), brandController.getRegistrationCityById)
//----------------------EngineCapacity----------------------------------------------------

router.get('/EngineCapacity',cache('5 minutes'), brandController.getAllEngineCapacity)
router.post('/EngineCapacity', brandController.addnewEngineCapacity)
router.put('/EngineCapacity/:id', brandController.updateEngineCapacity)
router.delete('/EngineCapacity/:id', brandController.deleteEngineCapacity)
router.get('/EngineCapacity/:id',cache('5 minutes'), brandController.getEngineCapacityById)
//----------------------EngineType----------------------------------------------------

router.get('/EngineType',cache('5 minutes'), brandController.getAllEngineType)
router.post('/EngineType', brandController.addnewEngineType)
router.put('/EngineType/:id', brandController.updateEngineType)
router.delete('/EngineType/:id', brandController.deleteEngineType)
router.get('/EngineType/:id',cache('5 minutes'), brandController.getEngineTypeById)
//----------------------Resolution----------------------------------------------------

router.get('/Resolution',cache('5 minutes'), brandController.getAllResolution)
router.post('/Resolution', brandController.addnewResolution)
router.put('/Resolution/:id', brandController.updateResolution)
router.delete('/Resolution/:id', brandController.deleteResolution)
router.get('/Resolution/:id',cache('5 minutes'), brandController.getResolutionById)
//----------------------ScreenSize----------------------------------------------------

router.get('/ScreenSize',cache('5 minutes'), brandController.getAllScreenSize)
router.post('/ScreenSize', brandController.addnewScreenSize)
router.put('/ScreenSize/:id', brandController.updateScreenSize)
router.delete('/ScreenSize/:id', brandController.deleteScreenSize)
router.get('/ScreenSize/:id',cache('5 minutes'), brandController.getScreenSizeById)
//----------------------MaxAperatureRange----------------------------------------------------

router.get('/MaxAperatureRange',cache('5 minutes'), brandController.getAllMaxAperatureRange)
router.post('/MaxAperatureRange', brandController.addnewMaxAperatureRange)
router.put('/MaxAperatureRange/:id', brandController.updateMaxAperatureRange)
router.delete('/MaxAperatureRange/:id', brandController.deleteMaxAperatureRange)
router.get('/MaxAperatureRange/:id',cache('5 minutes'), brandController.getMaxAperatureRangeById)
//----------------------MaxFocalLengthRange----------------------------------------------------

router.get('/MaxFocalLengthRange',cache('5 minutes'), brandController.getAllMaxFocalLengthRange)
router.post('/MaxFocalLengthRange', brandController.addnewMaxFocalLengthRange)
router.put('/MaxFocalLengthRange/:id', brandController.updateMaxFocalLengthRange)
router.delete('/MaxFocalLengthRange/:id', brandController.deleteMaxFocalLengthRange)
router.get('/MaxFocalLengthRange/:id',cache('5 minutes'), brandController.getMaxFocalLengthRangeById)
//----------------------Wifi----------------------------------------------------
//----------------------MinFocalLengthRange----------------------------------------------------

router.get('/MinFocalLengthRange',cache('5 minutes'), brandController.getAllMinFocalLengthRange)
router.post('/MinFocalLengthRange', brandController.addnewMinFocalLengthRange)
router.put('/MinFocalLengthRange/:id', brandController.updateMinFocalLengthRange)
router.delete('/MinFocalLengthRange/:id', brandController.deleteMinFocalLengthRange)
router.get('/MinFocalLengthRange/:id',cache('5 minutes'), brandController.getMinFocalLengthRangeById)
//----------------------Wifi----------------------------------------------------

router.get('/Wifi',cache('5 minutes'), brandController.getAllWifi)
router.post('/Wifi', brandController.addnewWifi)
router.put('/Wifi/:id', brandController.updateWifi)
router.delete('/Wifi/:id', brandController.deleteWifi)
router.get('/Wifi/:id',cache('5 minutes'), brandController.getWifiById)

//----------------------SensorSize----------------------------------------------------

router.get('/SensorSize',cache('5 minutes'), brandController.getAllSensorSize)
router.post('/SensorSize', brandController.addnewSensorSize)
router.put('/SensorSize/:id', brandController.updateSensorSize)
router.delete('/SensorSize/:id', brandController.deleteSensorSize)
router.get('/SensorSize/:id',cache('5 minutes'), brandController.getSensorSizeById)

//----------------------FunctionType----------------------------------------------------

router.get('/FunctionType', cache('5 minutes'),brandController.getAllFunctionType)
router.post('/FunctionType', brandController.addnewFunctionType)
router.put('/FunctionType/:id', brandController.updateFunctionType)
router.delete('/FunctionType/:id', brandController.deleteFunctionType)
router.get('/FunctionType/:id',cache('5 minutes'), brandController.getFunctionTypeById)

//----------------------HardDriveType----------------------------------------------------

router.get('/HardDriveType',cache('5 minutes'), brandController.getAllHardDriveType)
router.post('/HardDriveType', brandController.addnewHardDriveType)
router.put('/HardDriveType/:id', brandController.updateHardDriveType)
router.delete('/HardDriveType/:id', brandController.deleteHardDriveType)
router.get('/HardDriveType/:id',cache('5 minutes'), brandController.getHardDriveTypeById)
//----------------------OperatingSystem----------------------------------------------------

router.get('/OperatingSystem',cache('5 minutes'), brandController.getAllOperatingSystem)
router.post('/OperatingSystem', brandController.addnewOperatingSystem)
router.put('/OperatingSystem/:id', brandController.updateOperatingSystem)
router.delete('/OperatingSystem/:id', brandController.deleteOperatingSystem)
router.get('/OperatingSystem/:id',cache('5 minutes'), brandController.getOperatingSystemById)


//----------------------ConstructionState----------------------------------------------------

router.get('/ConstructionState',cache('5 minutes'), brandController.getAllConstructionState)
router.post('/ConstructionState', brandController.addnewConstructionState)
router.put('/ConstructionState/:id', brandController.updateConstructionState)
router.delete('/ConstructionState/:id', brandController.deleteConstructionState)
router.get('/ConstructionState/:id',cache('5 minutes'), brandController.getConstructionStateById)

//----------------------Areaunit----------------------------------------------------

router.get('/areaunit',cache('5 minutes'), brandController.getAllAreaunit)
router.post('/areaunit', brandController.addnewAreaunit)
router.put('/areaunit/:id', brandController.updateAreaunit)
router.delete('/areaunit/:id', brandController.deleteAreaunit)
router.get('/areaunit/:id',cache('5 minutes'), brandController.getAreaunitById)
//-------------------------Feature--------------------------------
router.get('/feature',cache('5 minutes'), brandController.getAllFeature)
router.post('/feature', brandController.addnewFeature)
router.put('/feature/:id', brandController.updateFeature)
router.delete('/feature/:id', brandController.deleteFeature)
router.get('/feature/:id',cache('5 minutes'), brandController.getFeatureById)
//-------------------------Construction----------------------------------------------------
router.get('/construction',cache('5 minutes'), brandController.getAllConstruction)
router.post('/construction', brandController.addnewConstruction)
router.put('/construction/:id', brandController.updateConstruction)
router.delete('/construction/:id', brandController.deleteConstruction)
router.get('/construction/:id',cache('5 minutes'), brandController.getConstructionById)
//-----------------------storey----------------------------------------------------
router.get('/storey',cache('5 minutes'), brandController.getAllstorey)
router.post('/storey', brandController.addnewstorey)
router.put('/storey/:id', brandController.updatestorey)
router.delete('/storey/:id', brandController.deletestorey)
router.get('/storey/:id',cache('5 minutes'), brandController.getstoreyById)


//------------------------bathroom --------------------
router.get('/bathroom',cache('5 minutes'), brandController.getAllbathroom)
router.post('/bathroom', brandController.addnewbathroom)
router.put('/bathroom/:id', brandController.updatebathroom)
router.delete('/bathroom/:id', brandController.deletebathroom)
router.get('/bathroom/:id',cache('5 minutes'), brandController.getbathroomById)
//---------------------------bedrooms------------------------
router.get('/bedroom',cache('5 minutes'), brandController.getAllBedroom)
router.post('/bedroom', brandController.addnewBedroom)
router.get("/bedroom/:id",cache('5 minutes'), brandController.getBedroomById)
router.put('/bedroom/:id', brandController.updateBedroom)
router.delete("/bedroom/:id", brandController.deleteBedroom)


//--------------------------Furnished----------------------------------------------------------------

router.get('/furnished',cache('5 minutes'), brandController.getAllFurnished)
router.post('/furnished', brandController.addnewFurnished)
router.put('/furnished', brandController.updateFurnished)
router.delete('/furnished/:id', brandController.deleteFurnished)
router.get('/furnished/:id',cache('5 minutes'), brandController.getFurnishedById)

//---------------------------------Make-------------------------------
router.get('/make',cache('5 minutes'), brandController.getAllMake)
router.post('/make',upload.fields([{ name: 'image', maxCount: 1 }]),  brandController.addnewMake)
router.put('/make/:id',upload.fields([{ name: 'image', maxCount: 1 }]), brandController.updateMake)
router.delete('/make/:id', brandController.deleteMake)
router.get('/make/:id',cache('5 minutes'), brandController.getMakeById)
//----------------------------------Type------------------------------
router.get('/type',cache('5 minutes'),brandController.getAllType)
router.post('/type',brandController.addnewType)
router.put('/type/:id',brandController.updateType)
router.delete('/type/:id',brandController.deleteType)
router.get('/type/:id',cache('5 minutes'),brandController.getTypeById)
//------------------------------DeviceType----------------------------------------------------
router.get('/devicetype', cache('5 minutes'),brandController.getAllDeviceType)
router.post('/devicetype', brandController.addnewDeviceType)
router.put('/devicetype/:id', brandController.updateDeviceType)
router.delete('/devicetype/:id', brandController.deleteDeviceType)
router.get("/devicetype/:id",cache('5 minutes'), brandController.getDeviceTypeById)
//---------------------------CONDITION-------------------------------------
router.post('/condition', brandController.addnewcondition)
router.get('/condition',cache('5 minutes'), brandController.getAllcondition)
router.put('/condition/:id', brandController.updatecondition)
router.delete('/condition/:id', brandController.deletecondition)
router.get('/condition/:id',cache('5 minutes'), brandController.getconditionById)
//---------------------------BRAND-------------------------------------
router.get('/',cache('5 minutes'), brandController.getAllbrand)
router.post('/', brandController.addnewbrand)
router.put('/:id', brandController.updateBrand)
router.delete('/:id', brandController.deleteBrand )
router.get("/:id",cache('5 minutes'), brandController.getBrandById)

module.exports = router;