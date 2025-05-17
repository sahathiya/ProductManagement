const Product=require("../models/productSchema")

const AddProduct=async(req,res)=>{
    const categoryId=req.params.id
    const{title,description,subCategory}=req.body
let variants=req.body.variants

   let images = req.files.map((file) => file.path);
 if (typeof variants === "string") {
      variants = JSON.parse(variants);
    }

    const product=new Product({
        title,
        variants,
        subCategory,
        description,
         images,
         category:categoryId


    })

    await product.save()
    res.status(200).json({message:"product added",product})

}


const EditProduct=async(req,res)=>{

    const productId=req.params.id
    

}

module.exports={AddProduct}