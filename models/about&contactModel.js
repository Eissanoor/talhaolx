const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aboutschema = new Schema({
  
  caption: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});
const contactschema = new Schema({
  
    caption: {
      type: String,
      required: true,
    },
  }, {
    timestamps: true,
  });
const About = mongoose.model("AboutUs", aboutschema);
const Contact = mongoose.model("ContactUs", contactschema);

module.exports = {
    Contact,
    About}