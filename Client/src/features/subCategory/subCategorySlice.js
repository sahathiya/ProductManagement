import { createSlice } from "@reduxjs/toolkit";
import { fetchSubCategories } from "./subCategoryActions";
const subCategorySlice=createSlice({
    name:"subCategory",
    initialState:{subCategories:[] ,loading:false,error:null},
    extraReducers:(builder)=>{
builder
 .addCase(fetchSubCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategories = action.payload;
      })
      .addCase(fetchSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    }
})


export default subCategorySlice.reducer