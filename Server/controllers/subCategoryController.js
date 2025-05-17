const mongoose=require("mongoose")

const SubCategory=require("../models/subCategorySchema")
const Category=require("../models/categorySchema")


const AddSubCategory=async(req,res)=>{
const categoryId=req.params.id
    const{name}=req.body

    if(!name){
         return res.status(400).json({status:false,message:"name is required"})
    }

    const category=await Category.findById(categoryId)
    if(!category){
         return res.status(400).json({status:false,message:"category not found"})
    }

 const subCategoryExist=await SubCategory.findOne({name:name,category:categoryId})
 if(subCategoryExist){
     return res.status(400).json({status:false,message:"subcategory is already exist in this category"})
 }
    const subCategory=new SubCategory({name:name,category:categoryId})

    await subCategory.save()

      category.subCategory.push(subCategory._id);
  await category.save();

res.status(200).json({status:true,message:"sub category added"})


}


const SubCategoryofCategory=async(req,res)=>{
    const categoryId=req.params.id
     if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return res.status(400).json({ status: false, message: "Invalid category ID" });
    }
    const category=await Category.findById({_id:categoryId}).populate("subCategory")
    if(!category){
         return res.status(400).json({status:false,message:"category not found"})
    
    }

    res.status(200).json({ status: true, subCategories: category.subCategory });





}
module.exports={AddSubCategory,SubCategoryofCategory}