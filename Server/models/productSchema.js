const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "User" },
  title: { type: String },
  variants: [
    {
      ram: { type: String },
      price: { type: Number },
      quantity: { type: Number },
    },
  ],
  category: { type: mongoose.Schema.ObjectId, ref: "Category" },
  subCategory: { type: String },
  description: { type: String},
  images: [{ type: String }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
