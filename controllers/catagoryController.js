const Category = require("../models/catagoryModel");
const path = require("path");
var dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const { cloudinary } = require("../config/cloudanary.js");
const getallcategories = async (req, res) => {
  try {
    // Modify the find query to filter categories with status = 1
    const categories = await Category.find();
    res.status(201).json(categories);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
const addnewcategories = async (req, res) => {
  try {
    const { name, status } = req.body; // Get text fields from the body
    const imagePath = req.files["image"] ? req.files["image"][0].path : null; // Get image path if uploaded
    const iconPath = req.files["icon"] ? req.files["icon"][0].path : null; // Get icon path if uploaded

    const category = new Category({
      name,
      image: imagePath,
      icon: iconPath,
      status,
    });

    const addedCategory = await category.save();
    res.status(201).json(addedCategory);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const getPublicIdFromUrl = (url) => {
      const urlParts = url.split("/");

      const fileName = urlParts.pop(); // Get the filename

      urlParts.pop(); // Remove the version part

      const publicId = `uploads/${fileName.split(".")[0]}`; // Combine folder path and filename without extension

      return publicId;
    };

    let imagePath = category.image;
    if (req.files && req.files["image"] && req.files["image"][0]) {
      if (category.image) {
        const public_id = getPublicIdFromUrl(category.image);
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

    let iconPath = category.icon;
    if (req.files && req.files["icon"] && req.files["icon"][0]) {
      if (category.icon) {
        const public_id = getPublicIdFromUrl(category.icon);
        console.log("Deleting old icon with public ID:", public_id);
        try {
          const result = await cloudinary.uploader.destroy(public_id, {
            resource_type: "image",
          });
          console.log("Old icon deletion result:", result);
        } catch (error) {
          console.error("Error deleting old icon from Cloudinary:", error);
        }
      }
      iconPath = req.files["icon"][0].path;
    }

    category.name = name || category.name;
    category.status = status || category.status;
    category.image = imagePath;
    category.icon = iconPath;

    const updatedCategory = await category.save();
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error.message);
    res.status(500).json({ message: error.message });
  }
};
const deleteCategory = async (req, res) => {
    try {
      const { id } = req.params;
  
      const category = await Category.findById(id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
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
  
      // Delete icon from Cloudinary
      if (category.icon) {
        const public_id = getPublicIdFromUrl(category.icon);
        console.log('Deleting icon with public ID:', public_id);
        try {
          const result = await cloudinary.uploader.destroy(public_id, { resource_type: 'image' });
          console.log('Icon deletion result:', result);
        } catch (error) {
          console.error('Error deleting icon from Cloudinary:', error);
        }
      }
  
      // Delete category from database
      await Category.findByIdAndDelete(id);
  
      res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      console.error('Error deleting category:', error.message);
      res.status(500).json({ message:error.message });
    }
  };
  const getCategoryById = async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json(category);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  };

  
module.exports = {
  getallcategories,
  addnewcategories,
  updateCategory,
  deleteCategory,
  getCategoryById
};
