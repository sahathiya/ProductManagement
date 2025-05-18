import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/api/product/all');

    if (response.status !== 200) {
      throw new Error('Failed to fetch products');
    }

    const data = response.data.products;
    console.log("Fetched categories:", data);

    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
