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
res.status(200).json({status:true,message:"sub category added"})


}

module.exports={AddSubCategory}