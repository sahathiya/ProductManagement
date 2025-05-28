const express=require('express')
const { UserRegistration, UserLogin, UserLogout } = require('../controllers/authController')
const { AddCategory, AllCategories } = require('../controllers/categoryController')
const tryCatch =require("../middilewares/tryCatch")
const { AddSubCategory, SubCategoryofCategory } = require('../controllers/subCategoryController')
const upload=require("../middilewares/upload")
const { AddProduct, AllProducts, ProductByCategory, ProductbyId, ProductBySubCategory, EditProduct } = require('../controllers/productController')
const { SearchByproductTitle } = require('../controllers/searchController')
const {userAuthMiddleware}=require("../middilewares/userAuthMiddleware")
const { addToWishlist, AllwishlistProducts } = require('../controllers/wishlistController')
const { addToCart, AllCartProducts } = require('../controllers/cartController')
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
.get("/product/subcategory/all/:subcategory",tryCatch(ProductBySubCategory))


//product

.post("/product/add/:id",userAuthMiddleware,upload.array("images",3),tryCatch(AddProduct))
.patch("/product/edit/:id",upload.array("images",3),tryCatch(EditProduct))
.get("/product/all",tryCatch(AllProducts))
.get("/product/category/all/:id",tryCatch(ProductByCategory))
.get("/product/:id",tryCatch(ProductbyId))

//search

.get("/product/name/search",tryCatch(SearchByproductTitle))


//wishlist

.post("/product/wishlist/add/:id",userAuthMiddleware,tryCatch(addToWishlist))

.get("/product/wishlist/all",userAuthMiddleware,tryCatch(AllwishlistProducts))


//cart
.post("/product/cart/add/:id",userAuthMiddleware,tryCatch(addToCart))

.get("/product/cart/all",userAuthMiddleware,tryCatch(AllCartProducts))


module.exports=userRoutes