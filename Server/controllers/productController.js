const Product = require("../models/productSchema");
const mongoose = require("mongoose");
const subCategory = require("../models/subCategorySchema");
const AddProduct = async (req, res) => {
  const userId = req.user.id;
  const categoryId = req.params.id;
  const { title, description, subCategory, image } = req.body;
  let variants = req.body.variants;

  let images = req.files.map((file) => file.path);
  console.log("images", req.files);

  if (typeof variants === "string") {
    variants = JSON.parse(variants);
  }

  const product = new Product({
    userId: userId,
    title,
    variants,
    subCategory,
    description,
    images,
    category: categoryId,
  });

  await product.save();
  res.status(200).json({ message: "product added", product });
};

const AllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ message: "all products", products });
};

const ProductbyId = async (req, res) => {
  const productId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res
      .status(400)
      .json({ status: false, message: "Invalid category ID" });
  }
  const product = await Product.findById({ _id: productId });
  if (!product) {
    res.status(404).json({ message: "product not found" });
  }

  res.status(200).json({ message: "product details", product });
};

const ProductByCategory = async (req, res) => {
  const categoryId = req.params.id;

  const categoryProducts = await Product.find({ category: categoryId });

  if (!categoryProducts) {
    return res
      .status(404)
      .json({ message: "products by this category not found" });
  }

  res
    .status(200)
    .json({ message: "all products in this category", categoryProducts });
};

const ProductBySubCategory = async (req, res) => {
  console.log("gggg");

  const subcategory = req.params.subcategory;
  console.log("subcategory", subcategory);

  if (!subcategory) {
    return res
      .status(400)
      .json({ message: "Missing subcategory query parameter" });
  }

  const subcategoryProducts = await Product.find({ subCategory: subcategory });
  console.log("subcategoryProducts", subcategoryProducts);

  if (subcategoryProducts.length === 0) {
    return res
      .status(404)
      .json({ message: "Products by this subcategory not found" });
  }

  return res.status(200).json({
    message: "All products in this subcategory",
    subcategoryProducts,
  });
};

// const EditProduct=async(req,res)=>{

//     const productId=req.params.id

// }

module.exports = {
  AddProduct,
  AllProducts,
  ProductByCategory,
  ProductbyId,
  ProductBySubCategory,
};
