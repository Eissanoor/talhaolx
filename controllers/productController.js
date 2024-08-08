const Product = require("../models/productModel.js");
const path = require("path");
var dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const { cloudinary } = require("../config/cloudanary.js");

const getallproduct = async (req, res) => {
    try {
        const products = await Product.find()
          .populate('category', 'name')
          .populate('subcategory', 'name')
          .populate('footercategory', 'name')
          .populate({
            path: 'user',
            select: 'username email phone userId',
          })
          .populate('brand', 'name')
          .populate('condition', 'name')
          .populate('deviceType', 'name')
          .populate('type', 'name')
          .populate('make', 'name')
          .populate('furnished', 'name')
          .populate('bedroom', 'name')
          .populate('bathroom', 'name')
          .populate('storey', 'name')
          .populate('construction', 'name')
          .populate('feature', 'name')
          .populate('areaUnit', 'name')
          .populate('floorLevel', 'name')
          .populate('constructionState', 'name')
          .populate('operatingSystem', 'name')
          .populate('hardDriveType', 'name')
          .populate('functionType', 'name')
          .populate('sensorSize', 'name')
          .populate('wifi', 'name')
          .populate('minFocalLengthRange', 'name')
          .populate('maxFocalLengthRange', 'name')
          .populate('maxApertureRange', 'name')
          .populate('screenSize', 'name')
          .populate('resolution', 'name')
          .populate('engineType', 'name')
          .populate('engineCapacity', 'name')
          .populate('registrationCity', 'name')
          .populate('hiringPerson', 'name')
          .populate('careerLevel', 'name')
          .populate('positionType', 'name')
          .populate('typeOfAd', 'name')
          .populate('breed', 'name')
          .populate('sex', 'name')
          .populate('materialType', 'name')
          .populate('handmade', 'name')
          .populate('origin', 'name')
          .populate('language', 'name');
    
        // Filter out products with any null references
        const validProducts = products.filter(product => {
          const productObj = product.toObject();
          return Object.keys(productObj).every(key => {
            if (Array.isArray(productObj[key])) {
              return productObj[key].length > 0 && productObj[key].every(item => item !== null);
            }
            return productObj[key] !== null;
          });
        });
    
        res.status(200).json(validProducts);
      } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
    }
  };
const addnewproduct = async (req, res) => {
    try {
        const { name, description, price, location, Category, SubCategory, User, ...optionalFields } = req.body;
        
        // Validate required fields
        if (!name || !price || !location || !Category || !SubCategory || !User) {
          return res.status(400).json({ error: 'Name, price, location, category, SubCategory, and User are required.' });
        }
    
        // Validate at least one image
        if (!req.files || req.files.length === 0) {
          return res.status(400).json({ error: 'At least one image is required.' });
        }
    
        // Get image URLs from the uploaded files
        const images = req.files.map(file => file.path);
    
        // Create a new product
        const newProduct = new Product({
          name,
          description,
          price,
          location,
          Category,
          SubCategory,
          User,
          images,
          ...optionalFields,
        });
    
        // Save the product to the database
        const savedProduct = await newProduct.save();
    
        res.status(201).json(savedProduct);
      } catch (error) {
        res.status(500).json({ error: error.message });
    
}

}
  module.exports = {
    getallproduct,
    addnewproduct
};

