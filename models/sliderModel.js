const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sliderSchema = new Schema({
  image: {
    type: String,
  },
  status:Number,
}, {
  timestamps: true,
});

module.exports = mongoose.model("Slider", sliderSchema);
