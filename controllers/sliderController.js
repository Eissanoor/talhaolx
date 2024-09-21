const Slider = require("../models/sliderModel.js");
const fs = require('fs');
const path = require('path');
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
      const { status } = req.body;
      
      // Get image path if uploaded and prepend localhost URL
      const imagePath = req.files?.image ? `/uploads/${req.files.image[0].filename}` : null;
  
      // Create new slider entry
      const category = new Slider({
        image: imagePath,
        status,
      });
  
      // Save the new slider in the database
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
        return res.status(404).json({ message: "Slider not found" });
      }
  
      let imagePath = addSlider.image;
  
      // Check if a new image is uploaded
      if (req.files && req.files.image && req.files.image[0]) {
        // Delete the old image from the local directory
        if (addSlider.image) {
          const oldImagePath = path.join(__dirname, '..', addSlider.image); // Construct the old image's path
          fs.unlink(oldImagePath, (err) => {
            if (err) {
              console.error("Error deleting old image:", err);
            } else {
              console.log("Old image deleted:", oldImagePath);
            }
          });
        }
        
        // Update with the new image path
        imagePath = `/uploads/${req.files.image[0].filename}`;
      }
  
      // Update other fields
      addSlider.status = status || addSlider.status;
      addSlider.image = imagePath;
  
      // Save the updated slider
      const updatedaddSlider = await addSlider.save();
      res.status(200).json(updatedaddSlider);
    }  catch (error) {
      console.error("Error updating addSlider:", error.message);
      res.status(500).json({ message: error.message });
    }
  };
  const deleteSlider = async (req, res) => {
    try {
      const { id } = req.params;
  
      const addSlider = await Slider.findById(id);
      if (!addSlider) {
        return res.status(404).json({ message: 'Slider not found' });
      }
  
      // Delete the image from the local directory
      if (addSlider.image) {
        const imagePath = path.join(__dirname, '..', addSlider.image); // Construct the image path
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error('Error deleting image:', err);
          } else {
            console.log('Image deleted:', imagePath);
          }
        });
      }
  
      // Delete the slider from the database
      await Slider.findByIdAndDelete(id);
  
      res.status(200).json({ message: 'Slider deleted successfully' });
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
  