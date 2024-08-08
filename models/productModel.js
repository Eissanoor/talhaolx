const mongoose = require("mongoose");

// Define the Product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  images: {
    type: [String], // Array of image URLs
    validate: [arrayLimit, "Exceeds the limit of 8 images"],
  },
  location: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true,
  },
  footercategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FooterCategory",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
  },
  condition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Condition",
  },
  deviceType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DeviceType",
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Type",
  },
  make: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Make",
  },
  furnished: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Furnished",
  },
  bedroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bedroom",
  },
  bathroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bathroom",
  },
  storey: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Storey",
  },
  construction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Construction",
  },
  feature: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Feature",
  },
  areaUnit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Areaunit",
  },
  floorLevel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FloorLevel",
  },
  constructionState: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ConstructionState",
  },
  operatingSystem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "OperatingSystem",
  },
  hardDriveType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HardDriveType",
  },
  functionType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FunctionType",
  },
  sensorSize: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SensorSize",
  },
  wifi: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wifi",
  },
  minFocalLengthRange: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MinFocalLengthRange",
  },
  maxFocalLengthRange: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MaxFocalLengthRange",
  },
  maxApertureRange: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MaxAperatureRange",
  },
  screenSize: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ScreenSize",
  },
  resolution: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resolution",
  },
  engineType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EngineType",
  },
  engineCapacity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EngineCapacity",
  },
  registrationCity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RegistrationCity",
  },
  hiringPerson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HiringPerson",
  },
  careerLevel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CareerLevel",
  },
  positionType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PositionType",
  },
  typeOfAd: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TypeofAd",
  },
  breed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Breed",
  },
  sex: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sex",
  },
  materialType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Materialtype",
  },
  handmade: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Handmade",
  },
  origin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Origin",
  },
  language: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Language",
  },
});

// Function to validate the image array length
function arrayLimit(val) {
  return val.length <= 8;
}

// Create the Product model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
