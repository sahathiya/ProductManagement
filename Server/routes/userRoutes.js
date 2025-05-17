const express=require('express')
const { UserRegistration, UserLogin, UserLogout } = require('../controllers/authController')
const { AddCategory, AllCategories } = require('../controllers/categoryController')
const tryCatch =require("../middilewares/tryCatch")
const { AddSubCategory } = require('../controllers/subCategoryController')
const upload=require("../middilewares/upload")
const { AddProduct } = require('../controllers/productController')
const userRoutes=express.Router()
userRoutes

//auth
.post("/auth/register",tryCatch(UserRegistration))
.post("/auth/login",tryCatch(UserLogin))
.post("/auth/logout",tryCatch(UserLogout))

//category

.post("/product/category/add",tryCatch(AddCategory))
.get("/product/category/all",tryCatch(AllCategories))


//subcategory
.post("/product/category/:id",tryCatch(AddSubCategory))


//product

.post("/product/add/:id",upload.array("images",3),tryCatch(AddProduct))

module.exports=userRoutes