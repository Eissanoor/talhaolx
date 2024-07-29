const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brandSchema = new Schema({
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
  },
  footerCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FooterCategory",
  },
  name: {
    type: String,
    required: true,
  },
  status: Number,
}, {
  timestamps: true,
});
//-------------------------------condition---------------------------------
const conditionSchema = new Schema({
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
  },
  footerCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FooterCategory",
  },
  name: {
    type: String,
    required: true,
  },
  status: Number,
}, {
  timestamps: true,
});
//-------------------------------DeviceType--------------------------------
const DeviceTypeSchema = new Schema({
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    footerCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FooterCategory",
    },
    name: {
      type: String,
      required: true,
    },
    status: Number,
  }, {
    timestamps: true,
  });
  //------------------------------Type---------------------------------
  const TypeSchema = new Schema({
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    footerCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FooterCategory",
    },
    name: {
      type: String,
      required: true,
    },
    status: Number,
  }, {
    timestamps: true,
  });
  //------------------------------------Makers--------------------------------
  const MakeSchema = new Schema({
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    footerCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FooterCategory",
    },
    name: {
      type: String,
      required: true,
    },
    image:String,
    status: Number,
  }, {
    timestamps: true,
  });
//------------------------------------Furnished--------------------------------
  const FurnishedSchema = new Schema({
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    footerCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FooterCategory",
    },
    name: {
      type: String,
      required: true,
    },
    status: Number,
  }, {
    timestamps: true,
  });

  //----------------------------------bedrooms--------------------------------
  const BedroomSchema = new Schema({
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    footerCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FooterCategory",
    },
    name: {
      type: String,
      required: true,
    },
    status: Number,
  }, {
    timestamps: true,
  });

  //---------------------------------bathroom-----------------------------------
  const bathroomSchema = new Schema({
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    footerCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FooterCategory",
    },
    name: {
      type: String,
      required: true,
    },
    status: Number,
  }, {
    timestamps: true,
  });
  //---------------------------------storeys-----------------------------------
  const storeySchema = new Schema({
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    footerCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FooterCategory",
    },
    name: {
      type: String,
      required: true,
    },
    status: Number,
  }, {
    timestamps: true,
  });

  //----------------------------Construction------------------------------------
  const ConstructionSchema = new Schema({
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    footerCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FooterCategory",
    },
    name: {
      type: String,
      required: true,
    },
    status: Number,
  }, {
    timestamps: true,
  });
  //----------------------------Feature------------------------------------
  const FeatureSchema = new Schema({
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    footerCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FooterCategory",
    },
    name: {
      type: String,
      required: true,
    },
    status: Number,
  }, {
    timestamps: true,
  });
  //----------------------------Areaunit------------------------------------
  const AreaunitSchema = new Schema({
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    footerCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FooterCategory",
    },
    name: {
      type: String,
      required: true,
    },
    status: Number,
  }, {
    timestamps: true,
  });
  //----------------------------FloorLevel------------------------------------
  const FloorLevelSchema = new Schema({
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    footerCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FooterCategory",
    },
    name: {
      type: String,
      required: true,
    },
    status: Number,
  }, {
    timestamps: true,
  });
   //----------------------------ConstructionState------------------------------------
   const ConstructionStateSchema = new Schema({
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    footerCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FooterCategory",
    },
    name: {
      type: String,
      required: true,
    },
    status: Number,
  }, {
    timestamps: true,
  });
  //----------------------------OperatingSystem------------------------------------
  const OperatingSystemSchema = new Schema({
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    footerCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FooterCategory",
    },
    name: {
      type: String,
      required: true,
    },
    status: Number,
  }, {
    timestamps: true,
  });
  //----------------------------HardDriveType------------------------------------
  const HardDriveTypeSchema = new Schema({
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    footerCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FooterCategory",
    },
    name: {
      type: String,
      required: true,
    },
    status: Number,
  }, {
    timestamps: true,
  });
  //----------------------------FunctionType------------------------------------
  const FunctionTypeSchema = new Schema({
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    footerCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FooterCategory",
    },
    name: {
      type: String,
      required: true,
    },
    status: Number,
  }, {
    timestamps: true,
  });
  //----------------------------SensorSize------------------------------------
  const SensorSizeSchema = new Schema({
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    footerCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FooterCategory",
    },
    name: {
      type: String,
      required: true,
    },
    status: Number,
  }, {
    timestamps: true,
  });
   //----------------------------Wifi------------------------------------
   const WifiSchema = new Schema({
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    footerCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FooterCategory",
    },
    name: {
      type: String,
      required: true,
    },
    status: Number,
  }, {
    timestamps: true,
  });
const Brand = mongoose.model("Brand", brandSchema);
const Condition = mongoose.model("Condition", conditionSchema);
const DeviceType = mongoose.model("DeviceType", DeviceTypeSchema);
const Type = mongoose.model("Type", TypeSchema);
const Make = mongoose.model("Make", MakeSchema);
const Furnished = mongoose.model("Furnished", FurnishedSchema);
const Bedroom = mongoose.model("Bedroom", BedroomSchema);
const bathroom = mongoose.model("Bathroom", bathroomSchema);
const storey = mongoose.model("Storey", storeySchema);
const Construction = mongoose.model("Construction", ConstructionSchema);
const Feature = mongoose.model("Feature", FeatureSchema);
const Areaunit = mongoose.model("Areaunit", AreaunitSchema);
const FloorLevel = mongoose.model("FloorLevel", FloorLevelSchema);
const ConstructionState = mongoose.model("ConstructionState", ConstructionStateSchema);
const OperatingSystem = mongoose.model("OperatingSystem", OperatingSystemSchema);
const HardDriveType = mongoose.model("HardDriveType", HardDriveTypeSchema);
const FunctionType = mongoose.model("FunctionType", FunctionTypeSchema);
const SensorSize = mongoose.model("SensorSize", SensorSizeSchema);
const Wifi = mongoose.model("Wifi", WifiSchema);
module.exports = {
  Brand,
  Condition,
  DeviceType,
  Type,
  Make,
  Furnished,
  Bedroom,
  bathroom,
  storey,
  Construction,
  Feature,
  Areaunit,
  FloorLevel,
  ConstructionState,
  OperatingSystem,
  HardDriveType,
  FunctionType,
  SensorSize,
  Wifi
};
