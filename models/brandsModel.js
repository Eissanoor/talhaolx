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
const Brand = mongoose.model("Brand", brandSchema);
const Condition = mongoose.model("Condition", conditionSchema);
const DeviceType = mongoose.model("DeviceType", DeviceTypeSchema);
const Type = mongoose.model("Type", TypeSchema);
const Make = mongoose.model("Make", MakeSchema);
module.exports = {
  Brand,
  Condition,
  DeviceType,
  Type,
  Make
};
