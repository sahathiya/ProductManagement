const mongoose=require("mongoose")

const categorySchema=new mongoose.Schema({
    name:{type:String,required:true},
    subCategory:[{type:mongoose.Schema.ObjectId,ref:"SubCategory"}]
    

})

module.exports=mongoose.model("Category",categorySchema)