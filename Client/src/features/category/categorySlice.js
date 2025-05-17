import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "./categoryActions";
const categorySlice=createSlice({
    name:"category",
    initialState:{categories:[],activeCategory:null,loading:false,error:null},
    reducers:{
        setActiveCategory:(state,action)=>{
    state.activeCategory=action.payload
        }
    },
     extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }

})
export const{setActiveCategory}=categorySlice.actions
export default categorySlice.reducer;