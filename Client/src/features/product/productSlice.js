import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./productActions";
const productSlice=createSlice({
    name:"category",
    initialState:{products:[],loading:false,error:null},
    // reducers:{
    //     setAllProducts:(state,action)=>{
    // state.activeCategory=action.payload
    //     }
    // },
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
      });
  }

})
// export const{setActiveCategory}=productSlice.actions
export default productSlice.reducer;