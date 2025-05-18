import { createSlice } from "@reduxjs/toolkit";
import { fetchWishlist } from "./wishlistActions";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { wishlists: [], loading: false, error: null },
  reducers: {
//     setRemoveWishlist: (state, action) => {
//        const productId = action.payload;
//     state.wishlists = state.wishlists.filter((id) => id !== productId);
//       },
//         setAddWishlist: (state, action) => {
//     const productId = action.payload;
//     if (!state.wishlists.includes(productId)) {
//       state.wishlists.push(productId);
//     }
//   },
    setRemoveWishlist: (state, action) => {
    const productId = action.payload;
    state.wishlists = state.wishlists.filter(
      (product) => product._id !== productId
    );
  },
  setAddWishlist: (state, action) => {
    const newProduct = action.payload;
    const exists = state.wishlists.some(
      (product) => product._id === newProduct
    );
    if (!exists) {
      state.wishlists.push(newProduct);
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

export const { setRemoveWishlist,setAddWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
