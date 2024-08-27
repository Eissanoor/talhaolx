const Product = require("../models/productModel.js");
const Category = require("../models/catagoryModel");
const path = require("path");
var dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const { cloudinary } = require("../config/cloudanary.js");

const getallproduct = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("Category", "name")
      .populate("SubCategory", "name")
      .populate("FooterCategory", "name")
      .populate({
        path: "User",
        select: "username email phone userId",
      })
      .populate("Brand", "name")
      .populate("Condition", "name")
      .populate("DeviceType", "name")
      .populate("Type", "name")
      .populate("Make", "name")
      .populate("Furnished", "name")
      .populate("Bedroom", "name")
      .populate("Bathroom", "name")
      .populate("Storey", "name")
      .populate("Construction", "name")
      .populate("Feature", "name")
      .populate("Areaunit", "name")
      .populate("FloorLevel", "name")
      .populate("ConstructionState", "name")
      .populate("OperatingSystem", "name")
      .populate("HardDriveType", "name")
      .populate("FunctionType", "name")
      .populate("SensorSize", "name")
      .populate("Wifi", "name")
      .populate("MinFocalLengthRange", "name")
      .populate("MaxFocalLengthRange", "name")
      .populate("MaxAperatureRange", "name")
      .populate("ScreenSize", "name")
      .populate("Resolution", "name")
      .populate("EngineType", "name")
      .populate("EngineCapacity", "name")
      .populate("RegistrationCity", "name")
      .populate("HiringPerson", "name")
      .populate("CareerLevel", "name")
      .populate("PositionType", "name")
      .populate("TypeofAd", "name")
      .populate("Breed", "name")
      .populate("Sex", "name")
      .populate("Materialtype", "name")
      .populate("Handmade", "name")
      .populate("Origin", "name")
      .populate("Language", "name");

    // Filter out products with any null references
    const validProducts = products.filter((product) => {
      const productObj = product.toObject();
      return Object.keys(productObj).every((key) => {
        if (Array.isArray(productObj[key])) {
          return (
            productObj[key].length > 0 &&
            productObj[key].every((item) => item !== null)
          );
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
    const {
      name,
      description,
      price,
      location,
      Category,
      SubCategory,
      User,
      ...optionalFields
    } = req.body;

    // Validate required fields
    if (!name || !price || !location || !Category || !SubCategory || !User) {
      return res
        .status(400)
        .json({
          error:
            "Name, price, location, category, SubCategory, and User are required.",
        });
    }

    // Validate at least one image
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "At least one image is required." });
    }

    // Get image URLs from the uploaded files
    const images = req.files.map((file) => file.path);

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
};
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      location,
      Category,
      SubCategory,
      User,
      ...optionalFields
    } = req.body;

    // Check if the product exists
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    // Update the product fields if they are provided in the request body
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (location) product.location = location;
    if (Category) product.Category = Category;
    if (SubCategory) product.SubCategory = SubCategory;
    if (User) product.User = User;

    // Update optional fields
    Object.assign(product, optionalFields);

    // If new images are uploaded, update the images field
    if (req.files && req.files.length > 0) {
      const images = req.files.map((file) => file.path);
      product.images = images;
    }

    // Save the updated product to the database
    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // Delete the product from the database
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId)
      .populate("Category", "name")
      .populate("SubCategory", "name")
      .populate("FooterCategory", "name")
      .populate({
        path: "User",
        select: "username email phone userId",
      })
      .populate("Brand", "name")
      .populate("Condition", "name")
      .populate("DeviceType", "name")
      .populate("Type", "name")
      .populate("Make", "name")
      .populate("Furnished", "name")
      .populate("Bedroom", "name")
      .populate("Bathroom", "name")
      .populate("Storey", "name")
      .populate("Construction", "name")
      .populate("Feature", "name")
      .populate("Areaunit", "name")
      .populate("FloorLevel", "name")
      .populate("ConstructionState", "name")
      .populate("OperatingSystem", "name")
      .populate("HardDriveType", "name")
      .populate("FunctionType", "name")
      .populate("SensorSize", "name")
      .populate("Wifi", "name")
      .populate("MinFocalLengthRange", "name")
      .populate("MaxFocalLengthRange", "name")
      .populate("MaxAperatureRange", "name")
      .populate("ScreenSize", "name")
      .populate("Resolution", "name")
      .populate("EngineType", "name")
      .populate("EngineCapacity", "name")
      .populate("RegistrationCity", "name")
      .populate("HiringPerson", "name")
      .populate("CareerLevel", "name")
      .populate("PositionType", "name")
      .populate("TypeofAd", "name")
      .populate("Breed", "name")
      .populate("Sex", "name")
      .populate("Materialtype", "name")
      .populate("Handmade", "name")
      .populate("Origin", "name")
      .populate("Language", "name");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Filter out null references
    const productObj = product.toObject();
    const isValid = Object.keys(productObj).every((key) => {
      if (Array.isArray(productObj[key])) {
        return (
          productObj[key].length > 0 &&
          productObj[key].every((item) => item !== null)
        );
      }
      return productObj[key] !== null;
    });

    if (!isValid) {
      return res.status(400).json({ message: "Invalid product data" });
    }

    res.status(200).json(productObj);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
const gettencategoriesbyproduct = async (req, res) => {
  try {
    // Find the first 10 categories with status = 1 and only return the name field
    const categories = await Category.find({ status: 1 }, { name: 1 }).limit(10);

    // Extract the category IDs
    const categoryIds = categories.map(category => category._id);

    // Find the products based on the category IDs
    const products = await Product.find({ Category: { $in: categoryIds }, status: "active"});

    // Group products by their category and limit to 12 products per category
    const categorizedProducts = categories.map(category => {
      return {
        category: category,
        products: products
          .filter(product => product.Category.toString() === category._id.toString())
          .slice(0, 12) // Limit to 12 products
      };
    });

    // Return the structured response
    res.status(201).json(categorizedProducts);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params; // Assume the category ID is passed as a route parameter

    // Find products by category and populate related fields
    const products = await Product.find({ Category: categoryId })
      .populate("Category", "name")
      .populate("SubCategory", "name")
      .populate("FooterCategory", "name")
      .populate({
        path: "User",
        select: "username email phone userId",
      })
      .populate("Brand", "name")
      .populate("Condition", "name")
      .populate("DeviceType", "name")
      .populate("Type", "name")
      .populate("Make", "name")
      .populate("Furnished", "name")
      .populate("Bedroom", "name")
      .populate("Bathroom", "name")
      .populate("Storey", "name")
      .populate("Construction", "name")
      .populate("Feature", "name")
      .populate("Areaunit", "name")
      .populate("FloorLevel", "name")
      .populate("ConstructionState", "name")
      .populate("OperatingSystem", "name")
      .populate("HardDriveType", "name")
      .populate("FunctionType", "name")
      .populate("SensorSize", "name")
      .populate("Wifi", "name")
      .populate("MinFocalLengthRange", "name")
      .populate("MaxFocalLengthRange", "name")
      .populate("MaxAperatureRange", "name")
      .populate("ScreenSize", "name")
      .populate("Resolution", "name")
      .populate("EngineType", "name")
      .populate("EngineCapacity", "name")
      .populate("RegistrationCity", "name")
      .populate("HiringPerson", "name")
      .populate("CareerLevel", "name")
      .populate("PositionType", "name")
      .populate("TypeofAd", "name")
      .populate("Breed", "name")
      .populate("Sex", "name")
      .populate("Materialtype", "name")
      .populate("Handmade", "name")
      .populate("Origin", "name")
      .populate("Language", "name");

    // Filter out products with any null references
    const validProducts = products.filter((product) => {
      const productObj = product.toObject();
      return Object.keys(productObj).every((key) => {
        if (Array.isArray(productObj[key])) {
          return (
            productObj[key].length > 0 &&
            productObj[key].every((item) => item !== null)
          );
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
const countProductsByStatus = async (req, res) => {
  try {
    const statusCounts = await Product.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    const counts = {
      active: 0,
      pending: 0,
      rejected: 0,
    };

    statusCounts.forEach(item => {
      counts[item._id] = item.count;
    });

    res.status(200).json(counts);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
const getallproductbyadmin = async (req, res) => {
  try {
    const products = await Product.find()
      .populate({
        path: "User",
        select: "username email phone userId",
      })

    // Filter out products with any null references
    const validProducts = products.filter((product) => {
      const productObj = product.toObject();
      return Object.keys(productObj).every((key) => {
        if (Array.isArray(productObj[key])) {
          return (
            productObj[key].length > 0 &&
            productObj[key].every((item) => item !== null)
          );
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


module.exports = {
  getallproduct,
  addnewproduct,
  updateProduct,
  deleteProduct,
  getProductById,
  gettencategoriesbyproduct,
  getProductsByCategory,
  countProductsByStatus,
  getallproductbyadmin
};
