
const Cart=require("../models/cartSchema")
const mongoose=require('mongoose')
// Add to cart
const addToCart = async (req, res) => {
  const productId = req.params.id;
 if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res
      .status(400)
      .json({ status: false, message: "Invalid product ID" });
  }

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }


    const existing = await Cart.findOne({ userId:req.user._id, productId });

    if (existing) {
      await Cart.deleteOne({ _id: existing._id });
      return res.status(200).json({ message: "Product removed from cart" });
    } else {
      const newItem = new Cart({ userId:req.user._id, productId });
      await newItem.save();
      console.log("newItem",newItem);
      
      return res.status(201).json({ message: "Product added to cart",  newItem });
    }
};



const AllCartProducts=async(req,res)=>{
    const userId=req.user._id
const cart=await Cart.find({userId:userId}).populate("productId")
res.status(200).json({message:'all products in Cart',cart})

}
module.exports = {
  addToCart,

  AllCartProducts
};
