import { createSlice } from "@reduxjs/toolkit";
import { fetchSubCategories } from "./subCategoryActions";
const subCategorySlice=createSlice({
    name:"subCategory",
    initialState:{subCategories:[] , activeSubCategory:null,loading:false,error:null},
    reducers:{

      setActiveSubCategory:(state,action)=>{
        state.activeSubCategory=action.payload

      }

    },
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

export const {setActiveSubCategory}=subCategorySlice.actions
export default subCategorySlice.reducer