// const Wishlist = require("../models/wishlistModel");
const Wishlist=require("../models/wishlistSchema")
// Add to wishlist
const addToWishlist = async (req, res) => {
  const productId = req.params.id;


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

// // Remove from wishlist
// const removeFromWishlist = async (req, res) => {
//   const { userId, productId } = req.body;

//   if (!userId || !productId) {
//     return res.status(400).json({ message: "userId and productId are required" });
//   }

//   const removed = await Wishlist.findOneAndDelete({ userId, productId });

//   if (!removed) {
//     return res.status(404).json({ message: "Product not found in wishlist" });
//   }

//   res.status(200).json({ message: "Removed from wishlist", removed });
// };


const AllwishlistProducts=async(req,res)=>{
    const userId=req.user._id
const wishlist=await Wishlist.find({userId:userId}).populate("productId")
res.status(200).json({message:'all products in wishlist',wishlist})

}
module.exports = {
  addToWishlist,
//   removeFromWishlist,
  AllwishlistProducts
};
