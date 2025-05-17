import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const fetchSubCategories = createAsyncThunk('subcategories/fetchSubCategories', async (categoryId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/api/product/category/subcategory/${categoryId}`);

    if (response.status !== 200) {
      throw new Error('Failed to fetch subcategories');
    }

    const data = response.data.subCategories;
    console.log("Fetched subcategories:", data);

    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
