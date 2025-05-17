const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({
    title:{type:String,required:true},
    variants: [
  {
    ram: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
  }
],
category:{type:mongoose.Schema.ObjectId,ref:"Category"},
subCategory:{type:String,required:true},
description:{type:String,required:true},
images:[{type:String,required:true}],
createdAt: {
    type: Date,
    default: Date.now
  }


})



module.exports=mongoose.model("Product",productSchema)