const Category=require("../models/categorySchema")

const AddCategory=async(req,res)=>{
    const {name}=req.body
if(!name){
   return res.status(400).json({status:false,message:"name is required"})
}
const categoryExist=await Category.findOne({name})
if(categoryExist){
   return  res.status(400).json({status:false,message:"category is already exists"})
}

    const category=new Category({name})

    await category.save()

     res.status(200).json({status:true,message:"category added",category})



}

const AllCategories=async(req,res)=>{

    const categories=await Category.find()
    res.status(200).json({ status:true,message:"all categories",categories})

}
module.exports={AddCategory,AllCategories}