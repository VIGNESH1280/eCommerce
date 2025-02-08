import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    min: [3, "Product name should atleast 3 characters long"],
    max: [20, "Product name should at most 20 characters long"],
  },
  description: {
    type: String,
    required: true,
    trim: true,
    min: [10, "Description should atleast 10 characters long"],
    max: [40, "Description should at most 40 characters long"],
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  seller: {
    type: String,
    required: true,
  },
  reviews: {
    type: Array,
    default: [],
  },
  images: {
    type: Array,
    default: [],
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
