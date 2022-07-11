const mongoose = require("mongoose");
const Category = require("./categoryModel");

const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: { type: String, required: true },
});

const SpecificProductSchema = new Schema({
  price: {
    type: Number,
    requires: true,
  },
  color: {
    type: String,
  },
  size: {
    type: Number,
    required: true,
  },
  defaultImage: {type: String, required: true},
  images: [String],
});

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  categories: [CategorySchema],
  specificProducts: [SpecificProductSchema],
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
