import { createSlice } from "@reduxjs/toolkit";
import { fetchWishlist } from "./wishlistActions";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { wishlists: [], loading: false, error: null },
  reducers: {
    setRemoveWishlist: (state, action) => {
      const IdToRemove = action.payload;
      if (Array.isArray(state.wishlists)) {
        state.wishlists.splice(IdToRemove, 1);
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlists = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setRemoveWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
