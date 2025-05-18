import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./productActions";
import { fetchProductsByCategory } from "./productActions";
import { fetchProductsBysubCategory } from "./productActions";
const productSlice=createSlice({
    name:"category",
    initialState:{products:[],categoryProducts:[],subCategoryProducts:[],loading:false,error:null},
     extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })




         .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryProducts = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })





        .addCase(fetchProductsBysubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsBysubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategoryProducts = action.payload;
      })
      .addCase(fetchProductsBysubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  }

})

export default productSlice.reducer;