const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const footerContentSchema = new Schema(
  {
    heading: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("FooterContent", footerContentSchema);
