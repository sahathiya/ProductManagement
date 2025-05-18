
const Wishlist=require("../models/wishlistSchema")
const mongoose=require('mongoose')
// Add to wishlist
const addToWishlist = async (req, res) => {
  const productId = req.params.id;
 if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res
      .status(400)
      .json({ status: false, message: "Invalid product ID" });
  }

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }


    const existing = await Wishlist.findOne({ userId:req.user._id, productId });

    if (existing) {
      await Wishlist.deleteOne({ _id: existing._id });
      return res.status(200).json({ message: "Product removed from wishlist" });
    } else {
      const newItem = new Wishlist({ userId:req.user._id, productId });
      await newItem.save();
      console.log("newItem",newItem);
      
      return res.status(201).json({ message: "Product added to wishlist",  newItem });
    }
};



const AllwishlistProducts=async(req,res)=>{
    const userId=req.user._id
const wishlist=await Wishlist.find({userId:userId}).populate("productId")
res.status(200).json({message:'all products in wishlist',wishlist})

}
module.exports = {
  addToWishlist,

  AllwishlistProducts
};
