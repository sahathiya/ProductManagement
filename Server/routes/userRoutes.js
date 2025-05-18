const express=require('express')
const { UserRegistration, UserLogin, UserLogout } = require('../controllers/authController')
const { AddCategory, AllCategories } = require('../controllers/categoryController')
const tryCatch =require("../middilewares/tryCatch")
const { AddSubCategory, SubCategoryofCategory } = require('../controllers/subCategoryController')
const upload=require("../middilewares/upload")
const { AddProduct, AllProducts, ProductByCategory, ProductbyId } = require('../controllers/productController')
const { SearchByproductTitle } = require('../controllers/searchController')
const {userAuthMiddleware}=require("../middilewares/userAuthMiddleware")
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
.get("/product/category/subcategory/:id",tryCatch(SubCategoryofCategory))


//product

.post("/product/add/:id",userAuthMiddleware,upload.array("images",3),tryCatch(AddProduct))
.get("/product/all",tryCatch(AllProducts))
.get("/product/category/all/:id",tryCatch(ProductByCategory))
.get("/product/:id",tryCatch(ProductbyId))

//search

.get("/product/search",tryCatch(SearchByproductTitle))


//wishlist





module.exports=userRoutes