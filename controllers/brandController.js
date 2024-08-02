const { Brand, Condition,DeviceType,Type,Make,Furnished,Bedroom,bathroom,storey,Construction,Feature,Areaunit,ConstructionState,
  OperatingSystem,HardDriveType,FunctionType,SensorSize,Wifi,MinFocalLengthRange,MaxFocalLengthRange,MaxAperatureRange,ScreenSize,
  Resolution,EngineType,EngineCapacity,RegistrationCity,HiringPerson,CareerLevel,PositionType,TypeofAd,Breed,Sex,Materialtype,Handmade,
  Origin,Language
 } = require("../models/brandsModel");
var dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const { cloudinary } = require("../config/cloudanary.js");


const getAllLanguage = async (req, res) => {
  try {
    const categories = await Language.find();
    res.status(201).json(categories);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
const addnewLanguage = async (req, res) => {
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!subCategory && !footerCategory) {
    return res.status(400).json({ error: 'Either subCategory or footerCategory is required' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const newBrand = new Language({
      name,
      subCategory: subCategory || null,
      footerCategory: footerCategory || null,
      status: status || null,
    });

    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateLanguage = async (req, res) => {
  const { id } = req.params;
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name && !subCategory && !footerCategory && status === undefined) {
    return res.status(400).json({ error: 'At least one field must be provided to update' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const brand = await Language.findById(id);
    if (!brand) {
      return res.status(404).json({ error: 'Language not found' });
    }

    if (name) {
      brand.name = name;
    }

    if (subCategory) {
      brand.subCategory = subCategory;
      brand.footerCategory = null;  // Clear footerCategory if subCategory is provided
    }

    if (footerCategory) {
      brand.footerCategory = footerCategory;
      brand.subCategory = null;  // Clear subCategory if footerCategory is provided
    }

    if (status !== undefined) {
      brand.status = status;
    }

    await brand.save();
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteLanguage = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Language.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ error: 'Language not found' });
    }

    res.status(200).json({ message: 'Language deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getLanguageById = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Language.findById(id).populate('subCategory footerCategory');
    if (!brand) {
      return res.status(404).json({ error: 'Language not found' });
    }

    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//--------------------------------------------ConstructionState--------------------------------------------
const getAllOrigin = async (req, res) => {
  try {
    const categories = await Origin.find();
    res.status(201).json(categories);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
const addnewOrigin = async (req, res) => {
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!subCategory && !footerCategory) {
    return res.status(400).json({ error: 'Either subCategory or footerCategory is required' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const newBrand = new Origin({
      name,
      subCategory: subCategory || null,
      footerCategory: footerCategory || null,
      status: status || null,
    });

    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateOrigin = async (req, res) => {
  const { id } = req.params;
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name && !subCategory && !footerCategory && status === undefined) {
    return res.status(400).json({ error: 'At least one field must be provided to update' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const brand = await Origin.findById(id);
    if (!brand) {
      return res.status(404).json({ error: 'Origin not found' });
    }

    if (name) {
      brand.name = name;
    }

    if (subCategory) {
      brand.subCategory = subCategory;
      brand.footerCategory = null;  // Clear footerCategory if subCategory is provided
    }

    if (footerCategory) {
      brand.footerCategory = footerCategory;
      brand.subCategory = null;  // Clear subCategory if footerCategory is provided
    }

    if (status !== undefined) {
      brand.status = status;
    }

    await brand.save();
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteOrigin = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Origin.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ error: 'Origin not found' });
    }

    res.status(200).json({ message: 'Origin deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getOriginById = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Origin.findById(id).populate('subCategory footerCategory');
    if (!brand) {
      return res.status(404).json({ error: 'Origin not found' });
    }

    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//--------------------------------------------ConstructionState--------------------------------------------
const getAllHandmade = async (req, res) => {
  try {
    const categories = await Handmade.find();
    res.status(201).json(categories);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
const addnewHandmade = async (req, res) => {
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!subCategory && !footerCategory) {
    return res.status(400).json({ error: 'Either subCategory or footerCategory is required' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const newBrand = new Handmade({
      name,
      subCategory: subCategory || null,
      footerCategory: footerCategory || null,
      status: status || null,
    });

    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateHandmade = async (req, res) => {
  const { id } = req.params;
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name && !subCategory && !footerCategory && status === undefined) {
    return res.status(400).json({ error: 'At least one field must be provided to update' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const brand = await Handmade.findById(id);
    if (!brand) {
      return res.status(404).json({ error: 'Handmade not found' });
    }

    if (name) {
      brand.name = name;
    }

    if (subCategory) {
      brand.subCategory = subCategory;
      brand.footerCategory = null;  // Clear footerCategory if subCategory is provided
    }

    if (footerCategory) {
      brand.footerCategory = footerCategory;
      brand.subCategory = null;  // Clear subCategory if footerCategory is provided
    }

    if (status !== undefined) {
      brand.status = status;
    }

    await brand.save();
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteHandmade = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Handmade.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ error: 'Handmade not found' });
    }

    res.status(200).json({ message: 'Handmade deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getHandmadeById = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Handmade.findById(id).populate('subCategory footerCategory');
    if (!brand) {
      return res.status(404).json({ error: 'Handmade not found' });
    }

    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//--------------------------------------------ConstructionState--------------------------------------------
const getAllMaterialtype = async (req, res) => {
  try {
    const categories = await Materialtype.find();
    res.status(201).json(categories);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
const addnewMaterialtype = async (req, res) => {
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!subCategory && !footerCategory) {
    return res.status(400).json({ error: 'Either subCategory or footerCategory is required' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const newBrand = new Materialtype({
      name,
      subCategory: subCategory || null,
      footerCategory: footerCategory || null,
      status: status || null,
    });

    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateMaterialtype = async (req, res) => {
  const { id } = req.params;
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name && !subCategory && !footerCategory && status === undefined) {
    return res.status(400).json({ error: 'At least one field must be provided to update' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const brand = await Materialtype.findById(id);
    if (!brand) {
      return res.status(404).json({ error: 'Materialtype not found' });
    }

    if (name) {
      brand.name = name;
    }

    if (subCategory) {
      brand.subCategory = subCategory;
      brand.footerCategory = null;  // Clear footerCategory if subCategory is provided
    }

    if (footerCategory) {
      brand.footerCategory = footerCategory;
      brand.subCategory = null;  // Clear subCategory if footerCategory is provided
    }

    if (status !== undefined) {
      brand.status = status;
    }

    await brand.save();
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteMaterialtype = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Materialtype.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ error: 'Materialtype not found' });
    }

    res.status(200).json({ message: 'Materialtype deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getMaterialtypeById = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Materialtype.findById(id).populate('subCategory footerCategory');
    if (!brand) {
      return res.status(404).json({ error: 'Materialtype not found' });
    }

    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//--------------------------------------------ConstructionState--------------------------------------------
const getAllSex = async (req, res) => {
  try {
    const categories = await Sex.find();
    res.status(201).json(categories);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
const addnewSex = async (req, res) => {
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!subCategory && !footerCategory) {
    return res.status(400).json({ error: 'Either subCategory or footerCategory is required' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const newBrand = new Sex({
      name,
      subCategory: subCategory || null,
      footerCategory: footerCategory || null,
      status: status || null,
    });

    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateSex = async (req, res) => {
  const { id } = req.params;
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name && !subCategory && !footerCategory && status === undefined) {
    return res.status(400).json({ error: 'At least one field must be provided to update' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const brand = await Sex.findById(id);
    if (!brand) {
      return res.status(404).json({ error: 'Sex not found' });
    }

    if (name) {
      brand.name = name;
    }

    if (subCategory) {
      brand.subCategory = subCategory;
      brand.footerCategory = null;  // Clear footerCategory if subCategory is provided
    }

    if (footerCategory) {
      brand.footerCategory = footerCategory;
      brand.subCategory = null;  // Clear subCategory if footerCategory is provided
    }

    if (status !== undefined) {
      brand.status = status;
    }

    await brand.save();
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteSex = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Sex.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ error: 'Sex not found' });
    }

    res.status(200).json({ message: 'Sex deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getSexById = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Sex.findById(id).populate('subCategory footerCategory');
    if (!brand) {
      return res.status(404).json({ error: 'Sex not found' });
    }

    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//--------------------------------------------ConstructionState--------------------------------------------

const getAllBreed = async (req, res) => {
  try {
    const categories = await Breed.find();
    res.status(201).json(categories);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
const addnewBreed = async (req, res) => {
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!subCategory && !footerCategory) {
    return res.status(400).json({ error: 'Either subCategory or footerCategory is required' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const newBrand = new Breed({
      name,
      subCategory: subCategory || null,
      footerCategory: footerCategory || null,
      status: status || null,
    });

    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateBreed = async (req, res) => {
  const { id } = req.params;
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name && !subCategory && !footerCategory && status === undefined) {
    return res.status(400).json({ error: 'At least one field must be provided to update' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const brand = await Breed.findById(id);
    if (!brand) {
      return res.status(404).json({ error: 'Breed not found' });
    }

    if (name) {
      brand.name = name;
    }

    if (subCategory) {
      brand.subCategory = subCategory;
      brand.footerCategory = null;  // Clear footerCategory if subCategory is provided
    }

    if (footerCategory) {
      brand.footerCategory = footerCategory;
      brand.subCategory = null;  // Clear subCategory if footerCategory is provided
    }

    if (status !== undefined) {
      brand.status = status;
    }

    await brand.save();
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteBreed = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Breed.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ error: 'Breed not found' });
    }

    res.status(200).json({ message: 'Breed deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getBreedById = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Breed.findById(id).populate('subCategory footerCategory');
    if (!brand) {
      return res.status(404).json({ error: 'Breed not found' });
    }

    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//--------------------------------------------ConstructionState--------------------------------------------

const getAllTypeofAd = async (req, res) => {
  try {
    const categories = await TypeofAd.find();
    res.status(201).json(categories);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
const addnewTypeofAd = async (req, res) => {
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!subCategory && !footerCategory) {
    return res.status(400).json({ error: 'Either subCategory or footerCategory is required' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const newBrand = new TypeofAd({
      name,
      subCategory: subCategory || null,
      footerCategory: footerCategory || null,
      status: status || null,
    });

    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateTypeofAd = async (req, res) => {
  const { id } = req.params;
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name && !subCategory && !footerCategory && status === undefined) {
    return res.status(400).json({ error: 'At least one field must be provided to update' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const brand = await TypeofAd.findById(id);
    if (!brand) {
      return res.status(404).json({ error: 'TypeofAd not found' });
    }

    if (name) {
      brand.name = name;
    }

    if (subCategory) {
      brand.subCategory = subCategory;
      brand.footerCategory = null;  // Clear footerCategory if subCategory is provided
    }

    if (footerCategory) {
      brand.footerCategory = footerCategory;
      brand.subCategory = null;  // Clear subCategory if footerCategory is provided
    }

    if (status !== undefined) {
      brand.status = status;
    }

    await brand.save();
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteTypeofAd = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await TypeofAd.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ error: 'TypeofAd not found' });
    }

    res.status(200).json({ message: 'TypeofAd deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getTypeofAdById = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await TypeofAd.findById(id).populate('subCategory footerCategory');
    if (!brand) {
      return res.status(404).json({ error: 'TypeofAd not found' });
    }

    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//--------------------------------------------ConstructionState--------------------------------------------
const getAllPositionType = async (req, res) => {
  try {
    const categories = await PositionType.find();
    res.status(201).json(categories);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
const addnewPositionType = async (req, res) => {
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!subCategory && !footerCategory) {
    return res.status(400).json({ error: 'Either subCategory or footerCategory is required' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const newBrand = new PositionType({
      name,
      subCategory: subCategory || null,
      footerCategory: footerCategory || null,
      status: status || null,
    });

    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updatePositionType = async (req, res) => {
  const { id } = req.params;
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name && !subCategory && !footerCategory && status === undefined) {
    return res.status(400).json({ error: 'At least one field must be provided to update' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const brand = await PositionType.findById(id);
    if (!brand) {
      return res.status(404).json({ error: 'PositionType not found' });
    }

    if (name) {
      brand.name = name;
    }

    if (subCategory) {
      brand.subCategory = subCategory;
      brand.footerCategory = null;  // Clear footerCategory if subCategory is provided
    }

    if (footerCategory) {
      brand.footerCategory = footerCategory;
      brand.subCategory = null;  // Clear subCategory if footerCategory is provided
    }

    if (status !== undefined) {
      brand.status = status;
    }

    await brand.save();
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deletePositionType = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await PositionType.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ error: 'PositionType not found' });
    }

    res.status(200).json({ message: 'PositionType deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getPositionTypeById = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await PositionType.findById(id).populate('subCategory footerCategory');
    if (!brand) {
      return res.status(404).json({ error: 'PositionType not found' });
    }

    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//--------------------------------------------ConstructionState--------------------------------------------
const getAllCareerLevel = async (req, res) => {
  try {
    const categories = await CareerLevel.find();
    res.status(201).json(categories);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
const addnewCareerLevel = async (req, res) => {
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!subCategory && !footerCategory) {
    return res.status(400).json({ error: 'Either subCategory or footerCategory is required' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const newBrand = new CareerLevel({
      name,
      subCategory: subCategory || null,
      footerCategory: footerCategory || null,
      status: status || null,
    });

    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateCareerLevel = async (req, res) => {
  const { id } = req.params;
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name && !subCategory && !footerCategory && status === undefined) {
    return res.status(400).json({ error: 'At least one field must be provided to update' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const brand = await CareerLevel.findById(id);
    if (!brand) {
      return res.status(404).json({ error: 'CareerLevel not found' });
    }

    if (name) {
      brand.name = name;
    }

    if (subCategory) {
      brand.subCategory = subCategory;
      brand.footerCategory = null;  // Clear footerCategory if subCategory is provided
    }

    if (footerCategory) {
      brand.footerCategory = footerCategory;
      brand.subCategory = null;  // Clear subCategory if footerCategory is provided
    }

    if (status !== undefined) {
      brand.status = status;
    }

    await brand.save();
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteCareerLevel = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await CareerLevel.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ error: 'CareerLevel not found' });
    }

    res.status(200).json({ message: 'CareerLevel deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getCareerLevelById = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await CareerLevel.findById(id).populate('subCategory footerCategory');
    if (!brand) {
      return res.status(404).json({ error: 'CareerLevel not found' });
    }

    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//--------------------------------------------ConstructionState--------------------------------------------
const getAllHiringPerson = async (req, res) => {
  try {
    const categories = await HiringPerson.find();
    res.status(201).json(categories);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
const addnewHiringPerson = async (req, res) => {
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!subCategory && !footerCategory) {
    return res.status(400).json({ error: 'Either subCategory or footerCategory is required' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const newBrand = new HiringPerson({
      name,
      subCategory: subCategory || null,
      footerCategory: footerCategory || null,
      status: status || null,
    });

    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateHiringPerson = async (req, res) => {
  const { id } = req.params;
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name && !subCategory && !footerCategory && status === undefined) {
    return res.status(400).json({ error: 'At least one field must be provided to update' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const brand = await HiringPerson.findById(id);
    if (!brand) {
      return res.status(404).json({ error: 'HiringPerson not found' });
    }

    if (name) {
      brand.name = name;
    }

    if (subCategory) {
      brand.subCategory = subCategory;
      brand.footerCategory = null;  // Clear footerCategory if subCategory is provided
    }

    if (footerCategory) {
      brand.footerCategory = footerCategory;
      brand.subCategory = null;  // Clear subCategory if footerCategory is provided
    }

    if (status !== undefined) {
      brand.status = status;
    }

    await brand.save();
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteHiringPerson = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await HiringPerson.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ error: 'HiringPerson not found' });
    }

    res.status(200).json({ message: 'HiringPerson deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getHiringPersonById = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await HiringPerson.findById(id).populate('subCategory footerCategory');
    if (!brand) {
      return res.status(404).json({ error: 'HiringPerson not found' });
    }

    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//--------------------------------------------ConstructionState--------------------------------------------
const getAllRegistrationCity = async (req, res) => {
  try {
    const categories = await RegistrationCity.find();
    res.status(201).json(categories);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
const addnewRegistrationCity = async (req, res) => {
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!subCategory && !footerCategory) {
    return res.status(400).json({ error: 'Either subCategory or footerCategory is required' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const newBrand = new RegistrationCity({
      name,
      subCategory: subCategory || null,
      footerCategory: footerCategory || null,
      status: status || null,
    });

    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateRegistrationCity = async (req, res) => {
  const { id } = req.params;
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name && !subCategory && !footerCategory && status === undefined) {
    return res.status(400).json({ error: 'At least one field must be provided to update' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const brand = await RegistrationCity.findById(id);
    if (!brand) {
      return res.status(404).json({ error: 'RegistrationCity not found' });
    }

    if (name) {
      brand.name = name;
    }

    if (subCategory) {
      brand.subCategory = subCategory;
      brand.footerCategory = null;  // Clear footerCategory if subCategory is provided
    }

    if (footerCategory) {
      brand.footerCategory = footerCategory;
      brand.subCategory = null;  // Clear subCategory if footerCategory is provided
    }

    if (status !== undefined) {
      brand.status = status;
    }

    await brand.save();
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteRegistrationCity = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await RegistrationCity.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ error: 'RegistrationCity not found' });
    }

    res.status(200).json({ message: 'RegistrationCity deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getRegistrationCityById = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await RegistrationCity.findById(id).populate('subCategory footerCategory');
    if (!brand) {
      return res.status(404).json({ error: 'RegistrationCity not found' });
    }

    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//--------------------------------------------ConstructionState--------------------------------------------
const getAllEngineCapacity = async (req, res) => {
  try {
    const categories = await EngineCapacity.find();
    res.status(201).json(categories);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
const addnewEngineCapacity = async (req, res) => {
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!subCategory && !footerCategory) {
    return res.status(400).json({ error: 'Either subCategory or footerCategory is required' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const newBrand = new EngineCapacity({
      name,
      subCategory: subCategory || null,
      footerCategory: footerCategory || null,
      status: status || null,
    });

    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateEngineCapacity = async (req, res) => {
  const { id } = req.params;
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name && !subCategory && !footerCategory && status === undefined) {
    return res.status(400).json({ error: 'At least one field must be provided to update' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const brand = await EngineCapacity.findById(id);
    if (!brand) {
      return res.status(404).json({ error: 'EngineCapacity not found' });
    }

    if (name) {
      brand.name = name;
    }

    if (subCategory) {
      brand.subCategory = subCategory;
      brand.footerCategory = null;  // Clear footerCategory if subCategory is provided
    }

    if (footerCategory) {
      brand.footerCategory = footerCategory;
      brand.subCategory = null;  // Clear subCategory if footerCategory is provided
    }

    if (status !== undefined) {
      brand.status = status;
    }

    await brand.save();
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteEngineCapacity = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await EngineCapacity.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ error: 'EngineCapacity not found' });
    }

    res.status(200).json({ message: 'EngineCapacity deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getEngineCapacityById = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await EngineCapacity.findById(id).populate('subCategory footerCategory');
    if (!brand) {
      return res.status(404).json({ error: 'EngineCapacity not found' });
    }

    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//--------------------------------------------ConstructionState--------------------------------------------
const getAllEngineType = async (req, res) => {
  try {
    const categories = await EngineType.find();
    res.status(201).json(categories);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
const addnewEngineType = async (req, res) => {
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!subCategory && !footerCategory) {
    return res.status(400).json({ error: 'Either subCategory or footerCategory is required' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const newBrand = new EngineType({
      name,
      subCategory: subCategory || null,
      footerCategory: footerCategory || null,
      status: status || null,
    });

    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateEngineType = async (req, res) => {
  const { id } = req.params;
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name && !subCategory && !footerCategory && status === undefined) {
    return res.status(400).json({ error: 'At least one field must be provided to update' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const brand = await EngineType.findById(id);
    if (!brand) {
      return res.status(404).json({ error: 'EngineType not found' });
    }

    if (name) {
      brand.name = name;
    }

    if (subCategory) {
      brand.subCategory = subCategory;
      brand.footerCategory = null;  // Clear footerCategory if subCategory is provided
    }

    if (footerCategory) {
      brand.footerCategory = footerCategory;
      brand.subCategory = null;  // Clear subCategory if footerCategory is provided
    }

    if (status !== undefined) {
      brand.status = status;
    }

    await brand.save();
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteEngineType = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await EngineType.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ error: 'EngineType not found' });
    }

    res.status(200).json({ message: 'EngineType deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getEngineTypeById = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await EngineType.findById(id).populate('subCategory footerCategory');
    if (!brand) {
      return res.status(404).json({ error: 'EngineType not found' });
    }

    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//--------------------------------------------ConstructionState--------------------------------------------

const getAllResolution = async (req, res) => {
  try {
    const categories = await Resolution.find();
    res.status(201).json(categories);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
const addnewResolution = async (req, res) => {
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!subCategory && !footerCategory) {
    return res.status(400).json({ error: 'Either subCategory or footerCategory is required' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const newBrand = new Resolution({
      name,
      subCategory: subCategory || null,
      footerCategory: footerCategory || null,
      status: status || null,
    });

    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateResolution = async (req, res) => {
  const { id } = req.params;
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name && !subCategory && !footerCategory && status === undefined) {
    return res.status(400).json({ error: 'At least one field must be provided to update' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const brand = await Resolution.findById(id);
    if (!brand) {
      return res.status(404).json({ error: 'Resolution not found' });
    }

    if (name) {
      brand.name = name;
    }

    if (subCategory) {
      brand.subCategory = subCategory;
      brand.footerCategory = null;  // Clear footerCategory if subCategory is provided
    }

    if (footerCategory) {
      brand.footerCategory = footerCategory;
      brand.subCategory = null;  // Clear subCategory if footerCategory is provided
    }

    if (status !== undefined) {
      brand.status = status;
    }

    await brand.save();
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteResolution = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Resolution.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ error: 'Resolution not found' });
    }

    res.status(200).json({ message: 'Resolution deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getResolutionById = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Resolution.findById(id).populate('subCategory footerCategory');
    if (!brand) {
      return res.status(404).json({ error: 'Resolution not found' });
    }

    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//--------------------------------------------ConstructionState--------------------------------------------

const getAllScreenSize = async (req, res) => {
  try {
    const categories = await ScreenSize.find();
    res.status(201).json(categories);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
const addnewScreenSize = async (req, res) => {
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!subCategory && !footerCategory) {
    return res.status(400).json({ error: 'Either subCategory or footerCategory is required' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const newBrand = new ScreenSize({
      name,
      subCategory: subCategory || null,
      footerCategory: footerCategory || null,
      status: status || null,
    });

    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateScreenSize = async (req, res) => {
  const { id } = req.params;
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name && !subCategory && !footerCategory && status === undefined) {
    return res.status(400).json({ error: 'At least one field must be provided to update' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const brand = await ScreenSize.findById(id);
    if (!brand) {
      return res.status(404).json({ error: 'ScreenSize not found' });
    }

    if (name) {
      brand.name = name;
    }

    if (subCategory) {
      brand.subCategory = subCategory;
      brand.footerCategory = null;  // Clear footerCategory if subCategory is provided
    }

    if (footerCategory) {
      brand.footerCategory = footerCategory;
      brand.subCategory = null;  // Clear subCategory if footerCategory is provided
    }

    if (status !== undefined) {
      brand.status = status;
    }

    await brand.save();
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteScreenSize = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await ScreenSize.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ error: 'ScreenSize not found' });
    }

    res.status(200).json({ message: 'ScreenSize deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getScreenSizeById = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await ScreenSize.findById(id).populate('subCategory footerCategory');
    if (!brand) {
      return res.status(404).json({ error: 'ScreenSize not found' });
    }

    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//--------------------------------------------ConstructionState--------------------------------------------

const getAllMaxAperatureRange = async (req, res) => {
  try {
    const categories = await MaxAperatureRange.find();
    res.status(201).json(categories);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
const addnewMaxAperatureRange = async (req, res) => {
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!subCategory && !footerCategory) {
    return res.status(400).json({ error: 'Either subCategory or footerCategory is required' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const newBrand = new MaxAperatureRange({
      name,
      subCategory: subCategory || null,
      footerCategory: footerCategory || null,
      status: status || null,
    });

    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateMaxAperatureRange = async (req, res) => {
  const { id } = req.params;
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name && !subCategory && !footerCategory && status === undefined) {
    return res.status(400).json({ error: 'At least one field must be provided to update' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const brand = await MaxAperatureRange.findById(id);
    if (!brand) {
      return res.status(404).json({ error: 'MaxAperatureRange not found' });
    }

    if (name) {
      brand.name = name;
    }

    if (subCategory) {
      brand.subCategory = subCategory;
      brand.footerCategory = null;  // Clear footerCategory if subCategory is provided
    }

    if (footerCategory) {
      brand.footerCategory = footerCategory;
      brand.subCategory = null;  // Clear subCategory if footerCategory is provided
    }

    if (status !== undefined) {
      brand.status = status;
    }

    await brand.save();
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteMaxAperatureRange = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await MaxAperatureRange.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ error: 'MaxAperatureRange not found' });
    }

    res.status(200).json({ message: 'MaxAperatureRange deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getMaxAperatureRangeById = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await MaxAperatureRange.findById(id).populate('subCategory footerCategory');
    if (!brand) {
      return res.status(404).json({ error: 'MaxAperatureRange not found' });
    }

    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//--------------------------------------------ConstructionState--------------------------------------------
const getAllMaxFocalLengthRange = async (req, res) => {
  try {
    const categories = await MaxFocalLengthRange.find();
    res.status(201).json(categories);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
const addnewMaxFocalLengthRange = async (req, res) => {
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!subCategory && !footerCategory) {
    return res.status(400).json({ error: 'Either subCategory or footerCategory is required' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const newBrand = new MaxFocalLengthRange({
      name,
      subCategory: subCategory || null,
      footerCategory: footerCategory || null,
      status: status || null,
    });

    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateMaxFocalLengthRange = async (req, res) => {
  const { id } = req.params;
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name && !subCategory && !footerCategory && status === undefined) {
    return res.status(400).json({ error: 'At least one field must be provided to update' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const brand = await MaxFocalLengthRange.findById(id);
    if (!brand) {
      return res.status(404).json({ error: 'MaxFocalLengthRange not found' });
    }

    if (name) {
      brand.name = name;
    }

    if (subCategory) {
      brand.subCategory = subCategory;
      brand.footerCategory = null;  // Clear footerCategory if subCategory is provided
    }

    if (footerCategory) {
      brand.footerCategory = footerCategory;
      brand.subCategory = null;  // Clear subCategory if footerCategory is provided
    }

    if (status !== undefined) {
      brand.status = status;
    }

    await brand.save();
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteMaxFocalLengthRange = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await MaxFocalLengthRange.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ error: 'MaxFocalLengthRange not found' });
    }

    res.status(200).json({ message: 'MaxFocalLengthRange deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getMaxFocalLengthRangeById = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await MaxFocalLengthRange.findById(id).populate('subCategory footerCategory');
    if (!brand) {
      return res.status(404).json({ error: 'MaxFocalLengthRange not found' });
    }

    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//--------------------------------------------ConstructionState--------------------------------------------
const getAllMinFocalLengthRange = async (req, res) => {
  try {
    const categories = await MinFocalLengthRange.find();
    res.status(201).json(categories);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
const addnewMinFocalLengthRange = async (req, res) => {
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!subCategory && !footerCategory) {
    return res.status(400).json({ error: 'Either subCategory or footerCategory is required' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const newBrand = new MinFocalLengthRange({
      name,
      subCategory: subCategory || null,
      footerCategory: footerCategory || null,
      status: status || null,
    });

    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateMinFocalLengthRange = async (req, res) => {
  const { id } = req.params;
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name && !subCategory && !footerCategory && status === undefined) {
    return res.status(400).json({ error: 'At least one field must be provided to update' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const brand = await MinFocalLengthRange.findById(id);
    if (!brand) {
      return res.status(404).json({ error: 'MinFocalLengthRange not found' });
    }

    if (name) {
      brand.name = name;
    }

    if (subCategory) {
      brand.subCategory = subCategory;
      brand.footerCategory = null;  // Clear footerCategory if subCategory is provided
    }

    if (footerCategory) {
      brand.footerCategory = footerCategory;
      brand.subCategory = null;  // Clear subCategory if footerCategory is provided
    }

    if (status !== undefined) {
      brand.status = status;
    }

    await brand.save();
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteMinFocalLengthRange = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await MinFocalLengthRange.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ error: 'MinFocalLengthRange not found' });
    }

    res.status(200).json({ message: 'MinFocalLengthRange deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getMinFocalLengthRangeById = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await MinFocalLengthRange.findById(id).populate('subCategory footerCategory');
    if (!brand) {
      return res.status(404).json({ error: 'MinFocalLengthRange not found' });
    }

    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//--------------------------------------------ConstructionState--------------------------------------------
const getAllWifi = async (req, res) => {
  try {
    const categories = await Wifi.find();
    res.status(201).json(categories);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
const addnewWifi = async (req, res) => {
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!subCategory && !footerCategory) {
    return res.status(400).json({ error: 'Either subCategory or footerCategory is required' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const newBrand = new Wifi({
      name,
      subCategory: subCategory || null,
      footerCategory: footerCategory || null,
      status: status || null,
    });

    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateWifi = async (req, res) => {
  const { id } = req.params;
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name && !subCategory && !footerCategory && status === undefined) {
    return res.status(400).json({ error: 'At least one field must be provided to update' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const brand = await Wifi.findById(id);
    if (!brand) {
      return res.status(404).json({ error: 'Wifi not found' });
    }

    if (name) {
      brand.name = name;
    }

    if (subCategory) {
      brand.subCategory = subCategory;
      brand.footerCategory = null;  // Clear footerCategory if subCategory is provided
    }

    if (footerCategory) {
      brand.footerCategory = footerCategory;
      brand.subCategory = null;  // Clear subCategory if footerCategory is provided
    }

    if (status !== undefined) {
      brand.status = status;
    }

    await brand.save();
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteWifi = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Wifi.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ error: 'Wifi not found' });
    }

    res.status(200).json({ message: 'Wifi deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getWifiById = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Wifi.findById(id).populate('subCategory footerCategory');
    if (!brand) {
      return res.status(404).json({ error: 'Wifi not found' });
    }

    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//--------------------------------------------ConstructionState--------------------------------------------
const getAllSensorSize = async (req, res) => {
  try {
    const categories = await SensorSize.find();
    res.status(201).json(categories);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
const addnewSensorSize = async (req, res) => {
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!subCategory && !footerCategory) {
    return res.status(400).json({ error: 'Either subCategory or footerCategory is required' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const newBrand = new SensorSize({
      name,
      subCategory: subCategory || null,
      footerCategory: footerCategory || null,
      status: status || null,
    });

    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateSensorSize = async (req, res) => {
  const { id } = req.params;
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name && !subCategory && !footerCategory && status === undefined) {
    return res.status(400).json({ error: 'At least one field must be provided to update' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const brand = await SensorSize.findById(id);
    if (!brand) {
      return res.status(404).json({ error: 'SensorSize not found' });
    }

    if (name) {
      brand.name = name;
    }

    if (subCategory) {
      brand.subCategory = subCategory;
      brand.footerCategory = null;  // Clear footerCategory if subCategory is provided
    }

    if (footerCategory) {
      brand.footerCategory = footerCategory;
      brand.subCategory = null;  // Clear subCategory if footerCategory is provided
    }

    if (status !== undefined) {
      brand.status = status;
    }

    await brand.save();
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteSensorSize = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await SensorSize.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ error: 'SensorSize not found' });
    }

    res.status(200).json({ message: 'SensorSize deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getSensorSizeById = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await SensorSize.findById(id).populate('subCategory footerCategory');
    if (!brand) {
      return res.status(404).json({ error: 'SensorSize not found' });
    }

    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//--------------------------------------------ConstructionState--------------------------------------------
const getAllFunctionType = async (req, res) => {
  try {
    const categories = await FunctionType.find();
    res.status(201).json(categories);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
const addnewFunctionType = async (req, res) => {
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!subCategory && !footerCategory) {
    return res.status(400).json({ error: 'Either subCategory or footerCategory is required' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const newBrand = new FunctionType({
      name,
      subCategory: subCategory || null,
      footerCategory: footerCategory || null,
      status: status || null,
    });

    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateFunctionType = async (req, res) => {
  const { id } = req.params;
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name && !subCategory && !footerCategory && status === undefined) {
    return res.status(400).json({ error: 'At least one field must be provided to update' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const brand = await FunctionType.findById(id);
    if (!brand) {
      return res.status(404).json({ error: 'FunctionType not found' });
    }

    if (name) {
      brand.name = name;
    }

    if (subCategory) {
      brand.subCategory = subCategory;
      brand.footerCategory = null;  // Clear footerCategory if subCategory is provided
    }

    if (footerCategory) {
      brand.footerCategory = footerCategory;
      brand.subCategory = null;  // Clear subCategory if footerCategory is provided
    }

    if (status !== undefined) {
      brand.status = status;
    }

    await brand.save();
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteFunctionType = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await FunctionType.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ error: 'FunctionType not found' });
    }

    res.status(200).json({ message: 'FunctionType deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getFunctionTypeById = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await FunctionType.findById(id).populate('subCategory footerCategory');
    if (!brand) {
      return res.status(404).json({ error: 'FunctionType not found' });
    }

    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//--------------------------------------------ConstructionState--------------------------------------------

const getAllHardDriveType = async (req, res) => {
  try {
    const categories = await HardDriveType.find();
    res.status(201).json(categories);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
const addnewHardDriveType = async (req, res) => {
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!subCategory && !footerCategory) {
    return res.status(400).json({ error: 'Either subCategory or footerCategory is required' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const newBrand = new HardDriveType({
      name,
      subCategory: subCategory || null,
      footerCategory: footerCategory || null,
      status: status || null,
    });

    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateHardDriveType = async (req, res) => {
  const { id } = req.params;
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name && !subCategory && !footerCategory && status === undefined) {
    return res.status(400).json({ error: 'At least one field must be provided to update' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const brand = await HardDriveType.findById(id);
    if (!brand) {
      return res.status(404).json({ error: 'HardDriveType not found' });
    }

    if (name) {
      brand.name = name;
    }

    if (subCategory) {
      brand.subCategory = subCategory;
      brand.footerCategory = null;  // Clear footerCategory if subCategory is provided
    }

    if (footerCategory) {
      brand.footerCategory = footerCategory;
      brand.subCategory = null;  // Clear subCategory if footerCategory is provided
    }

    if (status !== undefined) {
      brand.status = status;
    }

    await brand.save();
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteHardDriveType = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await HardDriveType.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ error: 'HardDriveType not found' });
    }

    res.status(200).json({ message: 'HardDriveType deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getHardDriveTypeById = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await HardDriveType.findById(id).populate('subCategory footerCategory');
    if (!brand) {
      return res.status(404).json({ error: 'HardDriveType not found' });
    }

    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//--------------------------------------------ConstructionState--------------------------------------------
const getAllOperatingSystem = async (req, res) => {
  try {
    const categories = await OperatingSystem.find();
    res.status(201).json(categories);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
const addnewOperatingSystem = async (req, res) => {
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!subCategory && !footerCategory) {
    return res.status(400).json({ error: 'Either subCategory or footerCategory is required' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const newBrand = new OperatingSystem({
      name,
      subCategory: subCategory || null,
      footerCategory: footerCategory || null,
      status: status || null,
    });

    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateOperatingSystem = async (req, res) => {
  const { id } = req.params;
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name && !subCategory && !footerCategory && status === undefined) {
    return res.status(400).json({ error: 'At least one field must be provided to update' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const brand = await OperatingSystem.findById(id);
    if (!brand) {
      return res.status(404).json({ error: 'OperatingSystem not found' });
    }

    if (name) {
      brand.name = name;
    }

    if (subCategory) {
      brand.subCategory = subCategory;
      brand.footerCategory = null;  // Clear footerCategory if subCategory is provided
    }

    if (footerCategory) {
      brand.footerCategory = footerCategory;
      brand.subCategory = null;  // Clear subCategory if footerCategory is provided
    }

    if (status !== undefined) {
      brand.status = status;
    }

    await brand.save();
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteOperatingSystem = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await OperatingSystem.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ error: 'OperatingSystem not found' });
    }

    res.status(200).json({ message: 'OperatingSystem deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getOperatingSystemById = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await OperatingSystem.findById(id).populate('subCategory footerCategory');
    if (!brand) {
      return res.status(404).json({ error: 'OperatingSystem not found' });
    }

    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//--------------------------------------------ConstructionState--------------------------------------------
const getAllConstructionState = async (req, res) => {
  try {
    const categories = await ConstructionState.find();
    res.status(201).json(categories);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
const addnewConstructionState = async (req, res) => {
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!subCategory && !footerCategory) {
    return res.status(400).json({ error: 'Either subCategory or footerCategory is required' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const newBrand = new ConstructionState({
      name,
      subCategory: subCategory || null,
      footerCategory: footerCategory || null,
      status: status || null,
    });

    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateConstructionState = async (req, res) => {
  const { id } = req.params;
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name && !subCategory && !footerCategory && status === undefined) {
    return res.status(400).json({ error: 'At least one field must be provided to update' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const brand = await ConstructionState.findById(id);
    if (!brand) {
      return res.status(404).json({ error: 'ConstructionState not found' });
    }

    if (name) {
      brand.name = name;
    }

    if (subCategory) {
      brand.subCategory = subCategory;
      brand.footerCategory = null;  // Clear footerCategory if subCategory is provided
    }

    if (footerCategory) {
      brand.footerCategory = footerCategory;
      brand.subCategory = null;  // Clear subCategory if footerCategory is provided
    }

    if (status !== undefined) {
      brand.status = status;
    }

    await brand.save();
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteConstructionState = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await ConstructionState.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ error: 'ConstructionState not found' });
    }

    res.status(200).json({ message: 'ConstructionState deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getConstructionStateById = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await ConstructionState.findById(id).populate('subCategory footerCategory');
    if (!brand) {
      return res.status(404).json({ error: 'ConstructionState not found' });
    }

    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//--------------------------------------------ConstructionState--------------------------------------------

const getAllAreaunit = async (req, res) => {
  try {
    const categories = await Areaunit.find();
    res.status(201).json(categories);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
const addnewAreaunit = async (req, res) => {
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!subCategory && !footerCategory) {
    return res.status(400).json({ error: 'Either subCategory or footerCategory is required' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const newBrand = new Areaunit({
      name,
      subCategory: subCategory || null,
      footerCategory: footerCategory || null,
      status: status || null,
    });

    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateAreaunit = async (req, res) => {
  const { id } = req.params;
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name && !subCategory && !footerCategory && status === undefined) {
    return res.status(400).json({ error: 'At least one field must be provided to update' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const brand = await Areaunit.findById(id);
    if (!brand) {
      return res.status(404).json({ error: 'Areaunit not found' });
    }

    if (name) {
      brand.name = name;
    }

    if (subCategory) {
      brand.subCategory = subCategory;
      brand.footerCategory = null;  // Clear footerCategory if subCategory is provided
    }

    if (footerCategory) {
      brand.footerCategory = footerCategory;
      brand.subCategory = null;  // Clear subCategory if footerCategory is provided
    }

    if (status !== undefined) {
      brand.status = status;
    }

    await brand.save();
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteAreaunit = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Areaunit.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ error: 'Areaunit not found' });
    }

    res.status(200).json({ message: 'Areaunit deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAreaunitById = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Areaunit.findById(id).populate('subCategory footerCategory');
    if (!brand) {
      return res.status(404).json({ error: 'Areaunit not found' });
    }

    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//--------------------------------------------Areaunit--------------------------------------------


const getAllFeature = async (req, res) => {
  try {
    const categories = await Feature.find();
    res.status(201).json(categories);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
const addnewFeature = async (req, res) => {
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!subCategory && !footerCategory) {
    return res.status(400).json({ error: 'Either subCategory or footerCategory is required' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const newBrand = new Feature({
      name,
      subCategory: subCategory || null,
      footerCategory: footerCategory || null,
      status: status || null,
    });

    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateFeature = async (req, res) => {
  const { id } = req.params;
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name && !subCategory && !footerCategory && status === undefined) {
    return res.status(400).json({ error: 'At least one field must be provided to update' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const brand = await Feature.findById(id);
    if (!brand) {
      return res.status(404).json({ error: 'Feature not found' });
    }

    if (name) {
      brand.name = name;
    }

    if (subCategory) {
      brand.subCategory = subCategory;
      brand.footerCategory = null;  // Clear footerCategory if subCategory is provided
    }

    if (footerCategory) {
      brand.footerCategory = footerCategory;
      brand.subCategory = null;  // Clear subCategory if footerCategory is provided
    }

    if (status !== undefined) {
      brand.status = status;
    }

    await brand.save();
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteFeature = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Feature.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ error: 'Feature not found' });
    }

    res.status(200).json({ message: 'Feature deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getFeatureById = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Feature.findById(id).populate('subCategory footerCategory');
    if (!brand) {
      return res.status(404).json({ error: 'Feature not found' });
    }

    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//------------------------------Feature------------------------------------------------



const getAllConstruction = async (req, res) => {
  try {
    const categories = await Construction.find();
    res.status(201).json(categories);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
const addnewConstruction = async (req, res) => {
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!subCategory && !footerCategory) {
    return res.status(400).json({ error: 'Either subCategory or footerCategory is required' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const newBrand = new Construction({
      name,
      subCategory: subCategory || null,
      footerCategory: footerCategory || null,
      status: status || null,
    });

    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateConstruction = async (req, res) => {
  const { id } = req.params;
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name && !subCategory && !footerCategory && status === undefined) {
    return res.status(400).json({ error: 'At least one field must be provided to update' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const brand = await Construction.findById(id);
    if (!brand) {
      return res.status(404).json({ error: 'Construction not found' });
    }

    if (name) {
      brand.name = name;
    }

    if (subCategory) {
      brand.subCategory = subCategory;
      brand.footerCategory = null;  // Clear footerCategory if subCategory is provided
    }

    if (footerCategory) {
      brand.footerCategory = footerCategory;
      brand.subCategory = null;  // Clear subCategory if footerCategory is provided
    }

    if (status !== undefined) {
      brand.status = status;
    }

    await brand.save();
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteConstruction = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Construction.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ error: 'Construction not found' });
    }

    res.status(200).json({ message: 'Construction deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getConstructionById = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Construction.findById(id).populate('subCategory footerCategory');
    if (!brand) {
      return res.status(404).json({ error: 'Construction not found' });
    }

    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//------------------------------Construction----------------------------------------------------
const getAllstorey = async (req, res) => {
  try {
    const categories = await storey.find();
    res.status(201).json(categories);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
const addnewstorey = async (req, res) => {
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!subCategory && !footerCategory) {
    return res.status(400).json({ error: 'Either subCategory or footerCategory is required' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const newBrand = new storey({
      name,
      subCategory: subCategory || null,
      footerCategory: footerCategory || null,
      status: status || null,
    });

    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updatestorey = async (req, res) => {
  const { id } = req.params;
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name && !subCategory && !footerCategory && status === undefined) {
    return res.status(400).json({ error: 'At least one field must be provided to update' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const brand = await storey.findById(id);
    if (!brand) {
      return res.status(404).json({ error: 'storey not found' });
    }

    if (name) {
      brand.name = name;
    }

    if (subCategory) {
      brand.subCategory = subCategory;
      brand.footerCategory = null;  // Clear footerCategory if subCategory is provided
    }

    if (footerCategory) {
      brand.footerCategory = footerCategory;
      brand.subCategory = null;  // Clear subCategory if footerCategory is provided
    }

    if (status !== undefined) {
      brand.status = status;
    }

    await brand.save();
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deletestorey = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await storey.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ error: 'storey not found' });
    }

    res.status(200).json({ message: 'storey deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getstoreyById = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await storey.findById(id).populate('subCategory footerCategory');
    if (!brand) {
      return res.status(404).json({ error: 'storey not found' });
    }

    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//-----------------------------storey-------------------------------

const getAllbathroom = async (req, res) => {
  try {
    const categories = await bathroom.find();
    res.status(201).json(categories);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
const addnewbathroom = async (req, res) => {
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!subCategory && !footerCategory) {
    return res.status(400).json({ error: 'Either subCategory or footerCategory is required' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const newBrand = new bathroom({
      name,
      subCategory: subCategory || null,
      footerCategory: footerCategory || null,
      status: status || null,
    });

    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updatebathroom = async (req, res) => {
  const { id } = req.params;
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name && !subCategory && !footerCategory && status === undefined) {
    return res.status(400).json({ error: 'At least one field must be provided to update' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const brand = await bathroom.findById(id);
    if (!brand) {
      return res.status(404).json({ error: 'bathroom not found' });
    }

    if (name) {
      brand.name = name;
    }

    if (subCategory) {
      brand.subCategory = subCategory;
      brand.footerCategory = null;  // Clear footerCategory if subCategory is provided
    }

    if (footerCategory) {
      brand.footerCategory = footerCategory;
      brand.subCategory = null;  // Clear subCategory if footerCategory is provided
    }

    if (status !== undefined) {
      brand.status = status;
    }

    await brand.save();
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deletebathroom = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await bathroom.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ error: 'bathroom not found' });
    }

    res.status(200).json({ message: 'bathroom deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getbathroomById = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await bathroom.findById(id).populate('subCategory footerCategory');
    if (!brand) {
      return res.status(404).json({ error: 'bathroom not found' });
    }

    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





//---------------------------------Bathroom--------------------------------
const getAllBedroom = async (req, res) => {
  try {
    const categories = await Bedroom.find();
    res.status(201).json(categories);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
const addnewBedroom = async (req, res) => {
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!subCategory && !footerCategory) {
    return res.status(400).json({ error: 'Either subCategory or footerCategory is required' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const newBrand = new Bedroom({
      name,
      subCategory: subCategory || null,
      footerCategory: footerCategory || null,
      status: status || null,
    });

    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateBedroom = async (req, res) => {
  const { id } = req.params;
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name && !subCategory && !footerCategory && status === undefined) {
    return res.status(400).json({ error: 'At least one field must be provided to update' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const brand = await Bedroom.findById(id);
    if (!brand) {
      return res.status(404).json({ error: 'Bedroom not found' });
    }

    if (name) {
      brand.name = name;
    }

    if (subCategory) {
      brand.subCategory = subCategory;
      brand.footerCategory = null;  // Clear footerCategory if subCategory is provided
    }

    if (footerCategory) {
      brand.footerCategory = footerCategory;
      brand.subCategory = null;  // Clear subCategory if footerCategory is provided
    }

    if (status !== undefined) {
      brand.status = status;
    }

    await brand.save();
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteBedroom = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Bedroom.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ error: 'Bedroom not found' });
    }

    res.status(200).json({ message: 'Bedroom deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getBedroomById = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Bedroom.findById(id).populate('subCategory footerCategory');
    if (!brand) {
      return res.status(404).json({ error: 'Bedroom not found' });
    }

    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//----------------------------BedRooms----------------------------

const getAllFurnished = async (req, res) => {
  try {
    const categories = await Furnished.find();
    res.status(201).json(categories);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
const addnewFurnished = async (req, res) => {
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!subCategory && !footerCategory) {
    return res.status(400).json({ error: 'Either subCategory or footerCategory is required' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const newBrand = new Furnished({
      name,
      subCategory: subCategory || null,
      footerCategory: footerCategory || null,
      status: status || null,
    });

    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateFurnished = async (req, res) => {
  const { id } = req.params;
  const { name, subCategory, footerCategory, status } = req.body;

  if (!name && !subCategory && !footerCategory && status === undefined) {
    return res.status(400).json({ error: 'At least one field must be provided to update' });
  }

  if (subCategory && footerCategory) {
    return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
  }

  try {
    const brand = await Furnished.findById(id);
    if (!brand) {
      return res.status(404).json({ error: 'Furnished not found' });
    }

    if (name) {
      brand.name = name;
    }

    if (subCategory) {
      brand.subCategory = subCategory;
      brand.footerCategory = null;  // Clear footerCategory if subCategory is provided
    }

    if (footerCategory) {
      brand.footerCategory = footerCategory;
      brand.subCategory = null;  // Clear subCategory if footerCategory is provided
    }

    if (status !== undefined) {
      brand.status = status;
    }

    await brand.save();
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteFurnished = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Furnished.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ error: 'Furnished not found' });
    }

    res.status(200).json({ message: 'Furnished deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getFurnishedById = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Furnished.findById(id).populate('subCategory footerCategory');
    if (!brand) {
      return res.status(404).json({ error: 'Furnished not found' });
    }

    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//-----------------------------Furnished------------------------------------------------
const getAllMake = async (req, res) => {
    try {
      const categories = await Make.find();
      res.status(201).json(categories);
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
    }
  };
  const deleteMake = async (req, res) => {
    const { id } = req.params;
  
    try {
        const category = await Make.findById(id);
        if (!category) {
          return res.status(404).json({ message: 'Make not found' });
        }
      const getPublicIdFromUrl = (url) => {
        const urlParts = url.split('/');
        const fileName = urlParts.pop(); // Get the filename
        urlParts.pop(); // Remove the version part
        const publicId = `uploads/${fileName.split('.')[0]}`; // Combine folder path and filename without extension
        return publicId;
      };
  
      // Delete image from Cloudinary
      if (category.image) {
        const public_id = getPublicIdFromUrl(category.image);
        console.log('Deleting image with public ID:', public_id);
        try {
          const result = await cloudinary.uploader.destroy(public_id, { resource_type: 'image' });
          console.log('Image deletion result:', result);
        } catch (error) {
          console.error('Error deleting image from Cloudinary:', error);
        }
      }
      await Make.findByIdAndDelete(id);
      res.status(200).json({ message: 'Make deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const getMakeById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const brand = await Make.findById(id).populate('subCategory footerCategory');
      if (!brand) {
        return res.status(404).json({ error: 'Make not found' });
      }
  
      res.status(200).json(brand);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const addnewMake = async (req, res) => {
    const { name, subCategory, footerCategory, status } = req.body;
    const imagePath = req.files["image"] ? req.files["image"][0].path : null;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
  
    if (!subCategory && !footerCategory) {
      return res.status(400).json({ error: 'Either subCategory or footerCategory is required' });
    }
  
    if (subCategory && footerCategory) {
      return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
    }
  
    try {
      const newBrand = new Make({
        name,
        subCategory: subCategory || null,
        footerCategory: footerCategory || null,
        status: status || null,
        image:imagePath
      });
  
      await newBrand.save();
      res.status(201).json(newBrand);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const updateMake = async (req, res) => {
    const { id } = req.params;
    const { name, subCategory, footerCategory, status } = req.body;
  
    if (!name && !subCategory && !footerCategory && status === undefined) {
      return res.status(400).json({ error: 'At least one field must be provided to update' });
    }
  
    if (subCategory && footerCategory) {
      return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
    }
  
    try {
      const brand = await Make.findById(id);

      const getPublicIdFromUrl = (url) => {
        const urlParts = url.split("/");
  
        const fileName = urlParts.pop(); // Get the filename
  
        urlParts.pop(); // Remove the version part
  
        const publicId = `uploads/${fileName.split(".")[0]}`; // Combine folder path and filename without extension
  
        return publicId;
      };
  
      let imagePath = brand.image;
      if (req.files && req.files["image"] && req.files["image"][0]) {
        if (brand.image) {
          const public_id = getPublicIdFromUrl(brand.image);
          console.log("Deleting old image with public ID:", public_id);
          try {
            const result = await cloudinary.uploader.destroy(public_id, {
              resource_type: "image",
            });
            console.log("Old image deletion result:", result);
          } catch (error) {
            console.error("Error deleting old image from Cloudinary:", error);
          }
        }
        imagePath = req.files["image"][0].path;
      }
      if (!brand) {
        return res.status(404).json({ error: 'Make not found' });
      }
  
      if (name) {
        brand.name = name;
      }
  
      if (subCategory) {
        brand.subCategory = subCategory;
        brand.footerCategory = null;  // Clear footerCategory if subCategory is provided
      }
  
      if (footerCategory) {
        brand.footerCategory = footerCategory;
        brand.subCategory = null;  // Clear subCategory if footerCategory is provided
      }
  
      if (status !== undefined) {
        brand.status = status;
      }
  
      await brand.save();
      res.status(200).json(brand);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

//-----------------------------Make----------------------------------------------------
const getAllType = async (req, res) => {
    try {
      const categories = await Type.find();
      res.status(201).json(categories);
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
    }
  };
  const addnewType = async (req, res) => {
    const { name, subCategory, footerCategory, status } = req.body;
  
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
  
    if (!subCategory && !footerCategory) {
      return res.status(400).json({ error: 'Either subCategory or footerCategory is required' });
    }
  
    if (subCategory && footerCategory) {
      return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
    }
  
    try {
      const newBrand = new Type({
        name,
        subCategory: subCategory || null,
        footerCategory: footerCategory || null,
        status: status || null,
      });
  
      await newBrand.save();
      res.status(201).json(newBrand);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const updateType = async (req, res) => {
    const { id } = req.params;
    const { name, subCategory, footerCategory, status } = req.body;
  
    if (!name && !subCategory && !footerCategory && status === undefined) {
      return res.status(400).json({ error: 'At least one field must be provided to update' });
    }
  
    if (subCategory && footerCategory) {
      return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
    }
  
    try {
      const brand = await Type.findById(id);
      if (!brand) {
        return res.status(404).json({ error: 'Type not found' });
      }
  
      if (name) {
        brand.name = name;
      }
  
      if (subCategory) {
        brand.subCategory = subCategory;
        brand.footerCategory = null;  // Clear footerCategory if subCategory is provided
      }
  
      if (footerCategory) {
        brand.footerCategory = footerCategory;
        brand.subCategory = null;  // Clear subCategory if footerCategory is provided
      }
  
      if (status !== undefined) {
        brand.status = status;
      }
  
      await brand.save();
      res.status(200).json(brand);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const deleteType = async (req, res) => {
    const { id } = req.params;
  
    try {
      const brand = await Type.findByIdAndDelete(id);
      if (!brand) {
        return res.status(404).json({ error: 'Type not found' });
      }
  
      res.status(200).json({ message: 'Type deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const getTypeById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const brand = await Type.findById(id).populate('subCategory footerCategory');
      if (!brand) {
        return res.status(404).json({ error: 'Type not found' });
      }
  
      res.status(200).json(brand);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
//-------------------------------DeviceType---------------------------------
const getAllDeviceType = async (req, res) => {
    try {
      const categories = await DeviceType.find();
      res.status(201).json(categories);
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
    }
  };
  const addnewDeviceType = async (req, res) => {
    const { name, subCategory, footerCategory, status } = req.body;
  
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
  
    if (!subCategory && !footerCategory) {
      return res.status(400).json({ error: 'Either subCategory or footerCategory is required' });
    }
  
    if (subCategory && footerCategory) {
      return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
    }
  
    try {
      const newBrand = new DeviceType({
        name,
        subCategory: subCategory || null,
        footerCategory: footerCategory || null,
        status: status || null,
      });
  
      await newBrand.save();
      res.status(201).json(newBrand);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const updateDeviceType = async (req, res) => {
    const { id } = req.params;
    const { name, subCategory, footerCategory, status } = req.body;
  
    if (!name && !subCategory && !footerCategory && status === undefined) {
      return res.status(400).json({ error: 'At least one field must be provided to update' });
    }
  
    if (subCategory && footerCategory) {
      return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
    }
  
    try {
      const brand = await DeviceType.findById(id);
      if (!brand) {
        return res.status(404).json({ error: 'DeviceType not found' });
      }
  
      if (name) {
        brand.name = name;
      }
  
      if (subCategory) {
        brand.subCategory = subCategory;
        brand.footerCategory = null;  // Clear footerCategory if subCategory is provided
      }
  
      if (footerCategory) {
        brand.footerCategory = footerCategory;
        brand.subCategory = null;  // Clear subCategory if footerCategory is provided
      }
  
      if (status !== undefined) {
        brand.status = status;
      }
  
      await brand.save();
      res.status(200).json(brand);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const deleteDeviceType = async (req, res) => {
    const { id } = req.params;
  
    try {
      const brand = await DeviceType.findByIdAndDelete(id);
      if (!brand) {
        return res.status(404).json({ error: 'DeviceType not found' });
      }
  
      res.status(200).json({ message: 'DeviceType deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const getDeviceTypeById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const brand = await DeviceType.findById(id).populate('subCategory footerCategory');
      if (!brand) {
        return res.status(404).json({ error: 'DeviceType not found' });
      }
  
      res.status(200).json(brand);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
//---------------------------------------brands-----------------------------
const getAllbrand = async (req, res) => {
    try {
      const categories = await Brand.find();
      res.status(201).json(categories);
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
    }
  };
  const addnewbrand = async (req, res) => {
    const { name, subCategory, footerCategory, status } = req.body;
  
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
  
    if (!subCategory && !footerCategory) {
      return res.status(400).json({ error: 'Either subCategory or footerCategory is required' });
    }
  
    if (subCategory && footerCategory) {
      return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
    }
  
    try {
      const newBrand = new Brand({
        name,
        subCategory: subCategory || null,
        footerCategory: footerCategory || null,
        status: status || null,
      });
  
      await newBrand.save();
      res.status(201).json(newBrand);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const updateBrand = async (req, res) => {
    const { id } = req.params;
    const { name, subCategory, footerCategory, status } = req.body;
  
    if (!name && !subCategory && !footerCategory && status === undefined) {
      return res.status(400).json({ error: 'At least one field must be provided to update' });
    }
  
    if (subCategory && footerCategory) {
      return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
    }
  
    try {
      const brand = await Brand.findById(id);
      if (!brand) {
        return res.status(404).json({ error: 'Brand not found' });
      }
  
      if (name) {
        brand.name = name;
      }
  
      if (subCategory) {
        brand.subCategory = subCategory;
        brand.footerCategory = null;  // Clear footerCategory if subCategory is provided
      }
  
      if (footerCategory) {
        brand.footerCategory = footerCategory;
        brand.subCategory = null;  // Clear subCategory if footerCategory is provided
      }
  
      if (status !== undefined) {
        brand.status = status;
      }
  
      await brand.save();
      res.status(200).json(brand);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const deleteBrand = async (req, res) => {
    const { id } = req.params;
  
    try {
      const brand = await Brand.findByIdAndDelete(id);
      if (!brand) {
        return res.status(404).json({ error: 'Brand not found' });
      }
  
      res.status(200).json({ message: 'Brand deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const getBrandById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const brand = await Brand.findById(id).populate('subCategory footerCategory');
      if (!brand) {
        return res.status(404).json({ error: 'Brand not found' });
      }
  
      res.status(200).json(brand);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  //-------------------------Condition---------------------------------------
  const addnewcondition = async (req, res) => {
    const { name, subCategory, footerCategory, status } = req.body;
  
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
  
    if (!subCategory && !footerCategory) {
      return res.status(400).json({ error: 'Either subCategory or footerCategory is required' });
    }
  
    if (subCategory && footerCategory) {
      return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
    }
  
    try {
      const newCondition = new Condition({
        name,
        subCategory: subCategory || null,
        footerCategory: footerCategory || null,
        status: status || null,
      });
  
      await newCondition.save();
      res.status(201).json(newCondition);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const getAllcondition = async (req, res) => {
    try {
      const categories = await Condition.find();
      res.status(201).json(categories);
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
    }
  };
  const updatecondition = async (req, res) => {
    const { id } = req.params;
    const { name, subCategory, footerCategory, status } = req.body;
  
    if (!name && !subCategory && !footerCategory && status === undefined) {
      return res.status(400).json({ error: 'At least one field must be provided to update' });
    }
  
    if (subCategory && footerCategory) {
      return res.status(400).json({ error: 'Only one of subCategory or footerCategory should be provided' });
    }
  
    try {
      const brand = await Condition.findById(id);
      if (!brand) {
        return res.status(404).json({ error: 'condition not found' });
      }
  
      if (name) {
        brand.name = name;
      }
  
      if (subCategory) {
        brand.subCategory = subCategory;
        brand.footerCategory = null;  // Clear footerCategory if subCategory is provided
      }
  
      if (footerCategory) {
        brand.footerCategory = footerCategory;
        brand.subCategory = null;  // Clear subCategory if footerCategory is provided
      }
  
      if (status !== undefined) {
        brand.status = status;
      }
  
      await brand.save();
      res.status(200).json(brand);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const deletecondition = async (req, res) => {
    const { id } = req.params;
  
    try {
      const brand = await Condition.findByIdAndDelete(id);
      if (!brand) {
        return res.status(404).json({ error: 'condition not found' });
      }
  
      res.status(200).json({ message: 'condition deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const getconditionById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const brand = await Condition.findById(id).populate('subCategory footerCategory');
      if (!brand) {
        return res.status(404).json({ error: 'Brand not found' });
      }
  
      res.status(200).json(brand);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  module.exports = {
    getAllbrand,
    addnewbrand,
    updateBrand,
    deleteBrand,
    getBrandById,
    addnewcondition,
    getAllcondition,
    updatecondition,
    deletecondition,
    getconditionById,
    getAllDeviceType,
    addnewDeviceType,
    updateDeviceType,
    deleteDeviceType,
    getDeviceTypeById,
    getAllType,
    addnewType,
    updateType,
    deleteType,
    getTypeById,
    getAllMake,
    addnewMake,
    updateMake,
    deleteMake,
    getMakeById,
    getAllFurnished,
    addnewFurnished,
    updateFurnished,
    deleteFurnished,
    getFurnishedById,
    getAllBedroom,
    addnewBedroom,
    updateBedroom,
    deleteBedroom,
    getBedroomById,
    getAllbathroom,
    addnewbathroom,
    updatebathroom,
    deletebathroom,
    getbathroomById,
    getAllstorey,
    addnewstorey,
    updatestorey,
    deletestorey,
    getstoreyById,
    getAllConstruction,
    addnewConstruction,
    updateConstruction,
    deleteConstruction,
    getConstructionById,
    getAllFeature,
    addnewFeature,
    updateFeature,
    deleteFeature,
    getFeatureById,
    getAllAreaunit,
    addnewAreaunit,
    updateAreaunit,
    deleteAreaunit,
    getAreaunitById,
    getAllConstructionState,
    addnewConstructionState,
    updateConstructionState,
    deleteConstructionState,
    getConstructionStateById,
    getAllOperatingSystem,
    addnewOperatingSystem,
    updateOperatingSystem,
    deleteOperatingSystem,
    getOperatingSystemById,
    getAllHardDriveType,
    addnewHardDriveType,
    updateHardDriveType,
    deleteHardDriveType,
    getHardDriveTypeById,
    getAllFunctionType,
    addnewFunctionType,
    updateFunctionType,
    deleteFunctionType,
    getFunctionTypeById,
    getAllSensorSize,
    addnewSensorSize,
    updateSensorSize,
    deleteSensorSize,
    deleteSensorSize,
    getSensorSizeById,
    getAllWifi,
    addnewWifi,
    updateWifi,
    deleteWifi,
    getWifiById,
    getAllMinFocalLengthRange,
    addnewMinFocalLengthRange,
    updateMinFocalLengthRange,
    deleteMinFocalLengthRange,
    getMinFocalLengthRangeById,
    getAllMaxFocalLengthRange,
    addnewMaxFocalLengthRange,
    updateMaxFocalLengthRange,
    deleteMaxFocalLengthRange,
    getMaxFocalLengthRangeById,
    getAllMaxAperatureRange,
    addnewMaxAperatureRange,
    updateMaxAperatureRange,
    deleteMaxAperatureRange,
    getMaxAperatureRangeById,
    getAllScreenSize,
    addnewScreenSize,
    updateScreenSize,
    deleteScreenSize,
    getScreenSizeById,
    getAllResolution,
    addnewResolution,
    updateResolution,
    deleteResolution,
    getResolutionById,
    getAllEngineType,
    addnewEngineType,
    updateEngineType,
    deleteEngineType,
    getEngineTypeById,
    getAllEngineCapacity,
    addnewEngineCapacity,
    updateEngineCapacity,
    deleteEngineCapacity,
    getEngineCapacityById,
    getAllRegistrationCity,
    addnewRegistrationCity,
    updateRegistrationCity,
    deleteRegistrationCity,
    getRegistrationCityById,
    getAllHiringPerson,
    addnewHiringPerson,
    updateHiringPerson,
    deleteHiringPerson,
    getHiringPersonById,
    getAllCareerLevel,
    addnewCareerLevel,
    updateCareerLevel,
    deleteCareerLevel,
    getCareerLevelById,
    getAllPositionType,
    addnewPositionType,
    updatePositionType,
    deletePositionType,
    getPositionTypeById,
    getAllTypeofAd,
    addnewTypeofAd,
    updateTypeofAd,
    deleteTypeofAd,
    getTypeofAdById,
    getAllBreed,
    addnewBreed,
    updateBreed,
    deleteBreed,
    getBreedById,
    getAllSex,
    addnewSex,
    updateSex,
    deleteSex,
    getSexById,
    getAllMaterialtype,
    addnewMaterialtype,
    updateMaterialtype,
    deleteMaterialtype,
    getMaterialtypeById,
    getAllHandmade,
    addnewHandmade,
    updateHandmade,
    deleteHandmade,
    getHandmadeById,
    getAllOrigin,
    addnewOrigin,
    updateOrigin,
    deleteOrigin,
    getOriginById,
    getAllLanguage,
    addnewLanguage,
    updateLanguage,
    deleteLanguage,
    getLanguageById
  };