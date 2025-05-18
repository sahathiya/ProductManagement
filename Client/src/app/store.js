import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice"
import categorySlice from "../features/category/categorySlice"
import subCategorySlice from "../features/subCategory/subCategorySlice"
import productSlice from "../features/product/productSlice"
import wishlistSlice from "../features/wishlist/wishlistSlice"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const userPersistConfig = {
    key: "user",
    storage,
  };

  const categoryPersistConfig={
    key:"category",
    storage
  }
  const subCategoryPersistConfig={
    key:"subcategory",
    storage
  }

    const productPersistConfig={
    key:"product",
    storage
  }

  const wishlistPersisConfig={
    key:"wishlist",
    storage
  }
  const persistedUserReducer = persistReducer(userPersistConfig,userSlice);
  const persistedCategoryReducer=persistReducer(categoryPersistConfig,categorySlice)

  const persistedsubCategoryReducer=persistReducer(subCategoryPersistConfig,subCategorySlice)
  const persistedproductReducer=persistReducer(productPersistConfig,productSlice)

  const persistedwishlistReducer=persistReducer(wishlistPersisConfig,wishlistSlice)
export const store=configureStore({
    reducer:{
        user:persistedUserReducer,
        category:persistedCategoryReducer,
        subcategory:persistedsubCategoryReducer,
        product:persistedproductReducer,
        wishlist:persistedwishlistReducer,

    }
})

export const persistor = persistStore(store);