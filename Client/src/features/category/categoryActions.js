import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/api/product/category/all');

    if (response.status !== 200) {
      throw new Error('Failed to fetch categories');
    }

    const data = response.data.categories;
    console.log("Fetched categories:", data);

    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
