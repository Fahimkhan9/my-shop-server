const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  nameofproduct: {
    type: String,
    required: true,
  },
  desoproduct: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  id: {
    type: String,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  imgofproduct: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
