const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subcategorySchema = new Schema({
    catagory:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
  name: {
    type: String,
    required: true,
  },
  status:Number,
}, {
  timestamps: true,
});

module.exports = mongoose.model("SubCategory", subcategorySchema);
