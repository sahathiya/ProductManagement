const mongoose=require("mongoose")

const wishlistSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.ObjectId,ref:'User'},

    productId:{type:mongoose.Schema.ObjectId,ref:'Product'}

})

module.exports=mongoose.model("Wishlist",wishlistSchema)