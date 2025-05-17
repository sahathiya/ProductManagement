const mongoose=require("mongoose")

const wishlistSchema=new mongoose.Schema({

    productId:{type:mongoose.Schema.ObjectId,ref:'Product'}

})

module.exports=mongoose.model("Wishlist",wishlistSchema)