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


export const fetchProductsByCategory = createAsyncThunk('products/fetchProductsByCategory', async (categoryId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/api/product/category/all/${categoryId}`);

    if (response.status !== 200) {
      throw new Error('Failed to fetch fetchProductsByCategory');
    }

    const data = response.data.categoryProducts;
    console.log("Fetched fetchProductsByCategory:", data);

    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});





export const fetchProductsBysubCategory = createAsyncThunk('products/fetchProductsBysubCategory', async (subCategory, { rejectWithValue }) => {
  try {
    console.log("subCategory....",subCategory);
    
    const response = await axiosInstance.get(`/api/product/subcategory/all/${subCategory}`,);

    if (response.status !== 200) {
      throw new Error('Failed to fetch fetchProductsBysubCategory');
    }

    const data = response.data.subcategoryProducts;
    console.log("Fetched fetchProductsBysubCategory:", data);

    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});