import React, { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import axiosInstance from "../utils/axiosInstance";
import { setUserLogout } from "../features/user/userSlice";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import WishlistModal from "./WishlistModal";
import CartModal from "./CartModal";
import cart from "../assets/cart.png"
function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeUser = useSelector((state) => state.user.activeUser);
  const wishlists = useSelector((state) => state.wishlist.wishlists);
  const [wishlistModal, setWishlistModal] = useState(false);
   const [cartModal, setCartModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [search, setsearch] = useState("");
  const handleSearch = async (e) => {
    const query = e.target.value;
    setsearch(query);
    try {
      if (query) {
        const res = await axiosInstance.get(
          `/api/product/name/search?title=${query}`
        );
        console.log("jjjjjjjjjj", res);

        setSearchQuery(res.data.products);
      } else {
        setSearchQuery([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const searchButton = () => {
    setSearchQuery([]);
    setsearch("");
  };

  console.log("searchQuery", searchQuery);

  const handleUserLogout = async (e) => {
    e.preventDefault();
    const response = await axiosInstance.post("/api/auth/logout");
    console.log("resposne of user logout", response);
    if (response.status === 200) {
      dispatch(setUserLogout());
      toast.success(response.data.message);
      navigate("/");
    }
  };

  const handleWishlistModal = () => {
    setWishlistModal(true);
  };
  return (
    <nav className="fixed w-full z-20 top-0 start-0  bg-primary border-gray-200 font-poppins">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        {activeUser === null ? (
          <div className="w-1/3" onClick={() => navigate("/")}>
             <img src={cart} className="w-8 h-8 object-contain" alt="Logo"/>
          </div>
        ) : (
          <div className="w-1/3" onClick={() => navigate("/dashboard")}>
            
            <img src={cart} className="w-8 h-8 object-contain" alt="Logo"/>
          </div>
        )}

       {activeUser !== null && (
  <div className="w-1/3">
    <div className="relative hidden md:block">
      <div className="relative">
        <input
          type="text"
          className="block w-full p-2 pr-24 rounded-lg text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search anything"
          value={search}
          onChange={handleSearch}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <button
          className="absolute top-1/2 right-2 transform -translate-y-1/2 h-[calc(100%-0.5rem)] px-4 bg-secondary text-white rounded-md hover:bg-secondary-dark transition-all"
          onClick={searchButton}
        >
          Search
        </button>
        {searchQuery && searchQuery.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-lg rounded-lg mt-2 z-10 h-72 overflow-auto">
            {searchQuery.map((item) => (
              <NavLink
                key={item._id}
                to={`/productdetails/${item._id}`}
                className="flex items-center space-x-4 px-4 py-2 text-gray-700 hover:bg-blue-100 no-underline"
                onClick={() => setSearchQuery([])}
              >
                <img
                  src={item.images?.[0]}
                  alt={item.title}
                  className="w-10 h-10 object-cover rounded-md"
                />
                <span>{item.title}</span>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
)}

        <div className="w-full md:w-1/3 flex justify-end items-center gap-6 text-white text-lg">
        {activeUser!==null&&(
            <button
            onClick={handleWishlistModal}
            className="flex items-center gap-1 hover:text-secondary transition"
          >
            <GoHeart />
            <span className="bg-secondary text-xs text-white w-4 h-4 flex items-center justify-center rounded-full">
              {wishlists.length||0}
            </span>
          </button>
        )}

          {activeUser === null ? (
            <button
            onClick={()=>navigate("/signin")}
              
              className="hover:text-secondary transition text-sm"
            >
              Sign In
            </button>
          ) : (
            <button
            
              className="hover:text-secondary transition text-sm"
              onClick={handleUserLogout}
            >
              Sign Out
            </button>
          )}

        {activeUser!==null&&(
            <button
            onClick={()=>setCartModal(true)}
            className="flex items-center gap-1 hover:text-secondary transition"
          >
            <IoCartOutline />
            <span className="bg-secondary text-xs text-white w-4 h-4 flex items-center justify-center rounded-full">
              0
            </span>
          </button>
        )}
        </div>
        {wishlistModal && (
          <WishlistModal
            isOpen={wishlistModal}
            onClose={() => setWishlistModal(false)}
          />
        )}

        {cartModal&&(
          <CartModal isOpen={cartModal} onClose={()=>setCartModal(false)}/>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
