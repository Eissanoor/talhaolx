const Product = require("../models/productModel.js");
const Category = require("../models/catagoryModel");
const SearchQuery = require('../models/searchQueryModel.js');
const TrendingProduct = require('../models/trendingProductModel.js');
const apicache = require('apicache');


const fs = require('fs'); // Import the fs module for file system operations
const path = require('path');
var dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const { cloudinary } = require("../config/cloudanary.js");

const updateTrendingProducts = async (req, res) => {
  try {
    const { query } = req.body;

    // Find or create the search query entry
    let searchEntry = await SearchQuery.findOne({ query });
    if (!searchEntry) {
      searchEntry = new SearchQuery({ query });
      await searchEntry.save();
    } else {
      await searchEntry.incrementSearchCount();
    }

    // Find a product based on the query
    const product = await Product.findOne({ name: new RegExp(query, 'i') });

    if (product) {
      // Update or create a trending product entry
      let trendingEntry = await TrendingProduct.findOne({ productId: product._id });
      
      if (!trendingEntry) {
        trendingEntry = new TrendingProduct({ productId: product._id, searchQuery: query });
      }

      // Update trend score and timestamp
      trendingEntry.trendScore = searchEntry.searchCount;
      trendingEntry.updatedAt = Date.now();
      await trendingEntry.save();

      return res.status(200).json(trendingEntry);
    } else {
      return res.status(404).json({ error: "Product not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getTrendingProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10; // Get limit from query params or use default

    const trendingProducts = await TrendingProduct.find()
      .sort({ trendScore: -1, updatedAt: -1 })
      .limit(limit)
      .populate('productId', 'name image');

    res.status(200).json(trendingProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const searchProduct = async (req, res) => {
  try {
    const { query } = req.body; // Search query from request body
    const limit = parseInt(req.query.limit) || 10; // Get limit from query params or use default

    if (query) {
      // **Update Trending Products based on the Search Query**

      // Find or create the search query entry
      let searchEntry = await SearchQuery.findOne({ query });
      if (!searchEntry) {
        searchEntry = new SearchQuery({ query, searchCount: 1 }); // Initialize search count
        await searchEntry.save();
      } else {
        searchEntry.searchCount += 1;
        await searchEntry.save();
      }

      // Search for products matching the query across multiple fields
      const products = await Product.find({
        $or: [
          { name: new RegExp(query, 'i') },
          { description: new RegExp(query, 'i') },
          { category: new RegExp(query, 'i') }, // Add more fields if needed
        ],
      });

      if (products.length > 0) {
        // Update or create a trending product entry for each product found
        for (const product of products) {
          let trendingEntry = await TrendingProduct.findOne({ productId: product._id });

          if (!trendingEntry) {
            trendingEntry = new TrendingProduct({
              productId: product._id,
              searchQuery: query,
              trendScore: searchEntry.searchCount,
              updatedAt: Date.now(),
            });
          } else {
            trendingEntry.trendScore = searchEntry.searchCount;
            trendingEntry.updatedAt = Date.now();
          }

          await trendingEntry.save();
        }

        // Return the matched products as the response
        return res.status(200).json(products);
      } else {
        return res.status(404).json({ error: 'Product not found.' });
      }
    } else {
      // **Get Trending Products if no query is provided**

      const trendingProducts = await TrendingProduct.find()
        .sort({ trendScore: -1, updatedAt: -1 })
        .limit(limit)
        .populate('productId', 'name image'); // Populate product details like name and image

      return res.status(200).json(trendingProducts);
    }
  } catch (error) {
    console.error('Error searching for products:', error);
    return res.status(500).json({ error: error.message });
  }
};


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
    const images = req.files.map((file) => `/uploads/${file.filename}`);

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

    // Handle image updates
    if (req.files && req.files.length > 0) {
      // Delete old images from the filesystem
      if (product.images && product.images.length > 0) {
        // Assuming images are stored in a local uploads directory
        for (const image of product.images) {
          const filePath = path.join(__dirname, '../uploads', path.basename(image)); // Adjust the path as necessary
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error('Error deleting old image:', err);
            } else {
              console.log('Old image deleted:', filePath);
            }
          });
        }
      }
      // Set new images
      const images = req.files.map((file) => `/uploads/${file.filename}`); // Adjust as needed for your URL structure
      product.images = images;
    }

    // Save the updated product to the database
    const updatedProduct = await product.save();
    
    // Clear cache for the full URL
    apicache.clear("/product/getcategoryproduct");
//
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // Find the product by ID to get image paths
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    // Delete associated images from the filesystem
    if (product.images && product.images.length > 0) {
      for (const image of product.images) {
        const filePath = path.join(__dirname, '../uploads', path.basename(image)); // Adjust path as necessary
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting image:', err);
          } else {
            console.log('Image deleted:', filePath);
          }
        });
      }
    }

    // Delete the product from the database
    await Product.findByIdAndDelete(productId);

    res.status(200).json({ message: "Product and associated images deleted successfully." });
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
    const categories = await Category.find({ status: 1 }, { name: 1 });

    // Extract the category IDs
    const categoryIds = categories.map(category => category._id);

    // Find the products based on the category IDs
    const products = await Product.find(
      { Category: { $in: categoryIds }, status: "active" }
    ).sort({ createdAt: -1 });

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
const getProductsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    const products = await Product.find({ User: userId })
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

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found for this user" });
    }

    // Filter out null references in each product
    const validProducts = products.map((product) => {
      const productObj = product.toObject();
      const populatedFields = [
        "category", "subCategory", "footerCategory", "user", "brand",
        "condition", "deviceType", "type", "make", "furnished", "bedroom",
        "bathroom", "storey", "construction", "feature", "areaUnit",
        "floorLevel", "constructionState", "operatingSystem", "hardDriveType",
        "functionType", "sensorSize", "wifi", "minFocalLengthRange", 
        "maxFocalLengthRange", "maxAperatureRange", "screenSize", "resolution",
        "engineType", "engineCapacity", "registrationCity", "hiringPerson",
        "careerLevel", "positionType", "typeOfAd", "breed", "sex", 
        "materialType", "handmade", "origin", "language"
      ];
      
      const isValid = populatedFields.every((field) => productObj[field] !== null);
      return isValid ? productObj : null;
    }).filter(product => product !== null);

    if (validProducts.length === 0) {
      return res.status(400).json({ message: "No valid product data found for this user" });
    }

    res.status(200).json(validProducts);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getActiveProductCountByCategory = async (req, res) => {
  try {
    // Aggregate to group products by category and count active products
    const categoryProductCounts = await Product.aggregate([
      {
        $match: { status: "active" } // Match only active products
      },
      {
        $group: {
          _id: "$Category", // Group by category
          productCount: { $sum: 1 } // Count the products in each group
        }
      }
    ]);

    // Fetch the first 10 categories with status = 1
    const categories = await Category.find({ status: 1 }, { name: 1 });

    // Combine the counts with the category details
    const categorizedProductCounts = categories.map(category => {
      const productData = categoryProductCounts.find(
        countData => countData._id.toString() === category._id.toString()
      );
      return {
        _id: category._id,
        category: category.name,
        productCount: productData ? productData.productCount : 0 // Default to 0 if no products are active
      };
    });

    // Return the structured response
    res.status(201).json(categorizedProductCounts);
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
  getallproductbyadmin,
  getProductsByUserId,
  updateTrendingProducts,
  getTrendingProducts,
  searchProduct,
  getActiveProductCountByCategory
};
