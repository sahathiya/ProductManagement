import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist } from "../features/wishlist/wishlistActions";
import { setRemoveWishlist } from "../features/wishlist/wishlistSlice";
import clsx from "clsx";
import { X } from "lucide-react";
import { GoHeart } from "react-icons/go";
import { CiCircleRemove } from "react-icons/ci";
import axiosInstance from "../utils/axiosInstance";
function WishlistModal({ isOpen, onClose }) {
  const wishlists = useSelector((state) => state.wishlist.wishlists);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handlewishlistToggle = async (productId) => {
    const response = await axiosInstance.post(
      `/api/product/wishlist/add/${productId}`
    );
    console.log("response of wishlist", response);
    dispatch(setRemoveWishlist(productId));
  };
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0    backdrop-blur-md " onClick={onClose} />
      )}

      <div
        className={clsx(
          "font-poppins    fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out",
          {
            "translate-x-0": isOpen,
            "translate-x-full": !isOpen,
          }
        )}
      >
        <div className="flex justify-between items-center mb-6 bg-primary p-4">
          <div className="flex space-x-4">
            <button className="ml-2 p-3 rounded-full  bg-primary-light">
              <GoHeart />
            </button>
            <h2 className="text-xl text-white">Items</h2>
          </div>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto h-full">
          <div className="space-y-4 p-4">
            {Array.isArray(wishlists) && wishlists.length > 0 ? (
              wishlists.map((wishlist) => (
                <div
                  key={wishlist._id}
                  className="bg-white shadow-md rounded-xl p-4 flex flex-col md:flex-row items-center justify-between border border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center space-x-4 w-full">
                    <img
                      src={wishlist.productId?.images?.[0]}
                      alt={wishlist.productId?.title}
                      className="w-24 h-24 object-cover rounded-md border border-gray-400"
                    />

                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-gray-800">
                        {wishlist.productId?.title}
                      </h2>
                      <p className="text-gray-600 font-medium">
                        ₹{wishlist.productId?.variants?.[0].price}
                      </p>

                      {/* Static Rating */}
                      <div className="flex mt-1 text-yellow-400">★★★★☆</div>
                    </div>

                    <button
                      className="text-primary hover:text-primary-light text-2xl font-bold transition duration-150"
                      onClick={() => handlewishlistToggle(wishlist._id)}
                    >
                      <CiCircleRemove />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No items found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default WishlistModal;
