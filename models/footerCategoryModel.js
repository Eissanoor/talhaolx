const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const footercategorySchema = new Schema({
    subCategory:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
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

module.exports = mongoose.model("FooterCategory", footercategorySchema);
