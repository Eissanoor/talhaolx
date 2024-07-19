const { Brand, Condition,DeviceType,Type,Make,Furnished } = require("../models/brandsModel");
var dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const { cloudinary } = require("../config/cloudanary.js");


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
    getFurnishedById
  };