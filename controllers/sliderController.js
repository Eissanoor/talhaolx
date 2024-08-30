const Slider = require("../models/sliderModel.js");
const path = require("path");
var dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const { cloudinary } = require("../config/cloudanary.js");

const getallSlider = async (req, res) => {
    try {
      // Modify the find query to filter Slider with status = 1
      const Slider = await Slider.find();
      res.status(201).json(Slider);
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
    }
  };
  const addnewSlider = async (req, res) => {
    try {
      const {  status } = req.body; // Get text fields from the body
      const imagePath = req.files["image"] ? req.files["image"][0].path : null; // Get image path if uploaded
      const iconPath = req.files["icon"] ? req.files["icon"][0].path : null; // Get icon path if uploaded
  
      const category = new Slider({
       
        image: imagePath,
        status,
      });
  
      const addedSlider = await Slider.save();
      res.status(201).json(addedSlider);
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
    }
  };
  const updateSlider = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, status } = req.body;
  
      const Slider = await Slider.findById(id);
      if (!Slider) {
        return res.status(404).json({ message: "Slider not found" });
      }
  
      const getPublicIdFromUrl = (url) => {
        const urlParts = url.split("/");
  
        const fileName = urlParts.pop(); // Get the filename
  
        urlParts.pop(); // Remove the version part
  
        const publicId = `uploads/${fileName.split(".")[0]}`; // Combine folder path and filename without extension
  
        return publicId;
      };
  
      let imagePath = Slider.image;
      if (req.files && req.files["image"] && req.files["image"][0]) {
        if (Slider.image) {
          const public_id = getPublicIdFromUrl(Slider.image);
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
  
      let iconPath = Slider.icon;
      if (req.files && req.files["icon"] && req.files["icon"][0]) {
        if (Slider.icon) {
          const public_id = getPublicIdFromUrl(Slider.icon);
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
  
      
      Slider.status = status || Slider.status;
      Slider.image = imagePath;
    
  
      const updatedSlider = await Slider.save();
      res.status(200).json(updatedSlider);
    } catch (error) {
      console.error("Error updating Slider:", error.message);
      res.status(500).json({ message: error.message });
    }
  };
  const deleteSlider = async (req, res) => {
      try {
        const { id } = req.params;
    
        const Slider = await Slider.findById(id);
        if (!Slider) {
          return res.status(404).json({ message: 'Slider not found' });
        }
    
        const getPublicIdFromUrl = (url) => {
          const urlParts = url.split('/');
          const fileName = urlParts.pop(); // Get the filename
          urlParts.pop(); // Remove the version part
          const publicId = `uploads/${fileName.split('.')[0]}`; // Combine folder path and filename without extension
          return publicId;
        };
    
        // Delete image from Cloudinary
        if (Slider.image) {
          const public_id = getPublicIdFromUrl(Slider.image);
          console.log('Deleting image with public ID:', public_id);
          try {
            const result = await cloudinary.uploader.destroy(public_id, { resource_type: 'image' });
            console.log('Image deletion result:', result);
          } catch (error) {
            console.error('Error deleting image from Cloudinary:', error);
          }
        }
    
       
        // Delete Slider from database
        await Slider.findByIdAndDelete(id);
    
        res.status(200).json({ message: 'Slider deleted successfully' });
      } catch (error) {
        console.error('Error deleting Slider:', error.message);
        res.status(500).json({ message:error.message });
      }
    };
    const getSliderById = async (req, res) => {
      try {
        const { id } = req.params;
        const Slider = await Slider.findById(id);
        if (!Slider) {
          return res.status(404).json({ message: 'Slider not found' });
        }
        res.status(200).json(Slider);
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
  