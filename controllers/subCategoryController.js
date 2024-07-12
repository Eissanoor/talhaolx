const SubCategory = require("../models/subCatagoryModel.js");
const path = require("path");
var dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const { cloudinary } = require("../config/cloudanary.js");
const getAllSubCategory = async (req, res) => {
    try {
      // Find categories with status = 1 and populate their subcategories
      const categories = await SubCategory.find().populate("catagory");
  
      res.status(201).json(categories);
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
    }
  };
  const addSubCategory = async (req, res) => {
    try {
      const { categoryId, name, status } = req.body;
      const newSubCategory = new SubCategory({
        catagory: categoryId,
        name,
        status
      });
      await newSubCategory.save();
  
      
  
      res.status(201).json(newSubCategory);
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
    }
  };
  
  const updateSubCategory = async (req, res) => {
    try {
      const { subCategoryId } = req.params; // Assuming subCategoryId is passed as a URL parameter
      const { categoryId, name, status } = req.body; // Including categoryId in the request body
  
      // Find the subcategory by ID and update its fields
      const updatedSubCategory = await SubCategory.findByIdAndUpdate(
        subCategoryId,
        { catagory: categoryId, name, status },
        { new: true } // This option returns the updated document
      );
  
      if (!updatedSubCategory) {
        return res.status(404).json({ message: "Subcategory not found" });
      }
  
      res.status(200).json(updatedSubCategory);
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
    }
  };
  const deleteSubCategory = async (req, res) => {
    try {
      const { id } = req.params;
  
      const subCategory = await SubCategory.findByIdAndDelete(id);
  
      if (!subCategory) {
        return res.status(404).json({ message: "SubCategory not found" });
      }
  
  
      res.status(200).json({ message: "SubCategory deleted successfully" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
    }
  };
  const getSubCategoryById = async (req, res) => {
    try {
      const { id } = req.params;
      const subCategory = await SubCategory.findById(id).populate('catagory');
  
      if (!subCategory) {
        return res.status(404).json({ message: "SubCategory not found" });
      }
  
      res.status(200).json(subCategory);
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
    }
  };
module.exports = {
    getAllSubCategory,
    addSubCategory,
    updateSubCategory,
    deleteSubCategory,
    getSubCategoryById
};
