const Category = require("../models/catagoryModel");
const path = require("path");
const fs = require('fs');
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
    const imagePath = req.files?.image ? `/uploads/${req.files.image[0].filename}` : null;
    const iconPath = req.files?.icon ? `/uploads/${req.files.icon[0].filename}` : null;

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

    // Function to delete a file from the local directory
    const deleteLocalFile = (filePath) => {
      const absolutePath = path.join(__dirname, '../', filePath); // Get absolute path
      fs.unlink(absolutePath, (err) => {
        if (err) {
          console.error(`Error deleting file ${absolutePath}:`, err);
        } else {
          console.log(`Successfully deleted file: ${absolutePath}`);
        }
      });
    };

    // Handle image update and deletion
    let imagePath = category.image;
    if (req.files && req.files["image"] && req.files["image"][0]) {
      if (category.image) {
        deleteLocalFile(category.image); // Delete the old image
      }
      imagePath = `/uploads/${req.files["image"][0].filename}`; // Store new image path
    }

    // Handle icon update and deletion
    let iconPath = category.icon;
    if (req.files && req.files["icon"] && req.files["icon"][0]) {
      if (category.icon) {
        deleteLocalFile(category.icon); // Delete the old icon
      }
      iconPath = `/uploads/${req.files["icon"][0].filename}`; // Store new icon path
    }

    // Update category details
    category.name = name || category.name;
    category.status = status || category.status;
    category.image = imagePath;
    category.icon = iconPath;

    const updatedCategory = await category.save();
    res.status(200).json(updatedCategory);
  }catch (error) {
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

    // Function to delete a file from the local directory
    const deleteLocalFile = (filePath) => {
      const absolutePath = path.join(__dirname, '../', filePath); // Construct the absolute path
      fs.unlink(absolutePath, (err) => {
        if (err) {
          console.error(`Error deleting file ${absolutePath}:`, err);
        } else {
          console.log(`Successfully deleted file: ${absolutePath}`);
        }
      });
    };

    // Delete image from local directory
    if (category.image) {
      deleteLocalFile(category.image);
    }

    // Delete icon from local directory
    if (category.icon) {
      deleteLocalFile(category.icon);
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
