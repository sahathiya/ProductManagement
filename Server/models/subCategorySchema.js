const mongoose=require("mongoose")

const subCategorySchema=new mongoose.Schema({
    name:{type:String,required:true},
    category:{type:mongoose.Schema.ObjectId,ref:'Category'}
    
})

module.exports=mongoose.model("SubCategory",subCategorySchema)