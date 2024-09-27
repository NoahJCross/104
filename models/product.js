const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  images: [String],
  category: {
    id: Number,
    name: String,
    image: String,
  },
  totalSold: Number,
  isFeatured: Boolean,
  discount: Number,
});

module.exports = mongoose.model("Product", productSchema);
