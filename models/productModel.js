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
    type: String,
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
  status: {
    type: String,
    required: true,
    enum: ['pending', 'active', 'rejected'],
    default: 'pending', // Set default value
  },
  currency:String,
  Category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  SubCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true,
  },
  FooterCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FooterCategory",
  },
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
  },
  Condition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Condition",
  },
  DeviceType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DeviceType",
  },
  Type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Type",
  },
  Make: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Make",
  },
  Furnished: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Furnished",
  },
  Bedroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bedroom",
  },
  Bathroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bathroom",
  },
  Storey: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Storey",
  },
  Construction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Construction",
  },
  Feature: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Feature",
  },
  Areaunit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Areaunit",
  },
  FloorLevel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FloorLevel",
  },
  ConstructionState: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ConstructionState",
  },
  OperatingSystem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "OperatingSystem",
  },
  HardDriveType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HardDriveType",
  },
  FunctionType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FunctionType",
  },
  SensorSize: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SensorSize",
  },
  Wifi: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wifi",
  },
  MinFocalLengthRange: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MinFocalLengthRange",
  },
  MaxFocalLengthRange: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MaxFocalLengthRange",
  },
  MaxAperatureRange: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MaxAperatureRange",
  },
  ScreenSize: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ScreenSize",
  },
  Resolution: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resolution",
  },
  EngineType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EngineType",
  },
  EngineCapacity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EngineCapacity",
  },
  RegistrationCity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RegistrationCity",
  },
  HiringPerson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HiringPerson",
  },
  CareerLevel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CareerLevel",
  },
  PositionType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PositionType",
  },
  TypeofAd: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TypeofAd",
  },
  Breed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Breed",
  },
  Sex: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sex",
  },
  Materialtype: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Materialtype",
  },
  Handmade: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Handmade",
  },
  Origin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Origin",
  },
  Language: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Language",
  },
},{
  timestamps: true,
});

// Function to validate the image array lengthf
function arrayLimit(val) {
  return val.length <= 8;
}

// Create the Product model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
