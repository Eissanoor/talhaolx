const Slider = require("../models/sliderModel.js");
const path = require("path");
var dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const { cloudinary } = require("../config/cloudanary.js");

const getallSlider = async (req, res) => {
    try {
      // Modify the find query to filter Slider with status = 1
      const addSlider = await Slider.find();
      res.status(201).json(addSlider);
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
    }
  };
  const addnewSlider = async (req, res) => {
    try {
      const {  status } = req.body; // Get text fields from the body
      const imagePath = req.files["image"] ? req.files["image"][0].path : null; // Get image path if uploaded
  
      const category = new Slider({
       
        image: imagePath,
        status,
      });
  
      const addedSlider = await category.save();
      res.status(201).json(addedSlider);
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
    }
  };
  const updateSlider = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      const addSlider = await Slider.findById(id);
      if (!addSlider) {
        return res.status(404).json({ message: "addSlider not found" });
      }
  
      const getPublicIdFromUrl = (url) => {
        const urlParts = url.split("/");
  
        const fileName = urlParts.pop(); // Get the filename
  
        urlParts.pop(); // Remove the version part
  
        const publicId = `uploads/${fileName.split(".")[0]}`; // Combine folder path and filename without extension
  
        return publicId;
      };
  
      let imagePath = addSlider.image;
      if (req.files && req.files["image"] && req.files["image"][0]) {
        if (addSlider.image) {
          const public_id = getPublicIdFromUrl(addSlider.image);
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
  
    
      
      addSlider.status = status || addSlider.status;
      addSlider.image = imagePath;
    
  
      const updatedaddSlider = await addSlider.save();
      res.status(200).json(updatedaddSlider);
    } catch (error) {
      console.error("Error updating addSlider:", error.message);
      res.status(500).json({ message: error.message });
    }
  };
  const deleteSlider = async (req, res) => {
      try {
        const { id } = req.params;
    
        const addSlider = await Slider.findById(id);
        if (!addSlider) {
          return res.status(404).json({ message: 'addSlider not found' });
        }
    
        const getPublicIdFromUrl = (url) => {
          const urlParts = url.split('/');
          const fileName = urlParts.pop(); // Get the filename
          urlParts.pop(); // Remove the version part
          const publicId = `uploads/${fileName.split('.')[0]}`; // Combine folder path and filename without extension
          return publicId;
        };
    
        // Delete image from Cloudinary
        if (addSlider.image) {
          const public_id = getPublicIdFromUrl(addSlider.image);
          console.log('Deleting image with public ID:', public_id);
          try {
            const result = await cloudinary.uploader.destroy(public_id, { resource_type: 'image' });
            console.log('Image deletion result:', result);
          } catch (error) {
            console.error('Error deleting image from Cloudinary:', error);
          }
        }
    
       
        // Delete addSlider from database
        await Slider.findByIdAndDelete(id);
    
        res.status(200).json({ message: 'addSlider deleted successfully' });
      } catch (error) {
        console.error('Error deleting addSlider:', error.message);
        res.status(500).json({ message:error.message });
      }
    };
    const getSliderById = async (req, res) => {
      try {
        const { id } = req.params;
        const addSlider = await Slider.findById(id);
        if (!addSlider) {
          return res.status(404).json({ message: 'Slider not found' });
        }
        res.status(200).json(addSlider);
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
      }
    };
  
    
  module.exports = {
    getallSlider,
    addnewSlider,
    updateSlider,
    deleteSlider,
    getSliderById
  };
  