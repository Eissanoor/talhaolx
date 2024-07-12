const FooterCategory = require("../models/footerCategoryModel.js");
const path = require("path");
var dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const { cloudinary } = require("../config/cloudanary.js");

const getAllFooterCategories = async (req, res) => {
    try {
      const categories = await FooterCategory.find();
      res.status(201).json(categories);
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
    }
  };
  
  const addNewFooterCategory = async (req, res) => {
    try {
      const { name, status, subCategory } = req.body; // Get fields from the body
  
      const category = new FooterCategory({
        name,
        subCategory,
        status,
      });
  
      const addedCategory = await category.save();
      res.status(201).json(addedCategory);
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
    }
  };
  
  const updateFooterCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, status, subCategory } = req.body;
  
      const category = await FooterCategory.findById(id);
      if (!category) {
        return res.status(404).json({ message: "FooterCategory not found" });
      }
  
      category.name = name || category.name;
      category.status = status || category.status;
      category.subCategory = subCategory || category.subCategory;
  
      const updatedCategory = await category.save();
      res.status(200).json(updatedCategory);
    } catch (error) {
      console.error("Error updating FooterCategory:", error.message);
      res.status(500).json({ message: error.message });
    }
  };
  
  const deleteFooterCategory = async (req, res) => {
    try {
      const { id } = req.params;
  
      const category = await FooterCategory.findById(id);
      if (!category) {
        return res.status(404).json({ message: 'FooterCategory not found' });
      }
  
      await FooterCategory.findByIdAndDelete(id);
  
      res.status(200).json({ message: 'FooterCategory deleted successfully' });
    } catch (error) {
      console.error('Error deleting FooterCategory:', error.message);
      res.status(500).json({ message:error.message });
    }
  };
  
  const getFooterCategoryById = async (req, res) => {
    try {
      const { id } = req.params;
      const category = await FooterCategory.findById(id);
      if (!category) {
        return res.status(404).json({ message: 'FooterCategory not found' });
      }
      res.status(200).json(category);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = {
    getAllFooterCategories,
    addNewFooterCategory,
    updateFooterCategory,
    deleteFooterCategory,
    getFooterCategoryById
  };