import React from "react";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import axiosInstance from "../utils/axiosInstance";
import { setUserLogout } from "../features/user/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Navbar() {
  const navigate = useNavigate();
  const activeUser = useSelector((state) => state.user.activeUser);

  const handleUserLogout = async () => {
    const response = await axiosInstance.post("/api/auth/logout");
    console.log("resposne of user logout", response);

    dispatch(setUserLogout());
    toast.success(response.data.message);
    navigate("/signin");
  };
  return (
    <nav className="fixed w-full z-20 top-0 start-0  bg-primary border-gray-200 font-poppins">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        <div className="w-1/3" onClick={() => navigate("/")}>
          <h1 className="text-white text-xl font-bold">Logo</h1>
        </div>

        <div className="w-1/3">
          <div className="relative hidden md:block">
            <div className="relative">
              <input
                type="text"
                className="block w-full p-2 pr-24 rounded-lg text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search anything"
              />
              <button className="absolute top-1/2 right-2 transform -translate-y-1/2 h-[calc(100%-0.5rem)] px-4 bg-secondary text-white rounded-md hover:bg-secondary-dark transition-all">
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 flex justify-end items-center gap-6 text-white text-lg">
          <a
            href="#"
            className="flex items-center gap-1 hover:text-secondary transition"
          >
            <GoHeart />
            <span className="bg-secondary text-xs text-white w-4 h-4 flex items-center justify-center rounded-full">
              0
            </span>
          </a>

          {activeUser == null ? (
            <a
              onClick={handleUserLogout}
              href=""
              className="hover:text-secondary transition text-sm"
            >
              Sign In
            </a>
          ) : (
            <a
              href="/signin"
              className="hover:text-secondary transition text-sm"
            >
              Sign Out
            </a>
          )}

          <a
            href="#"
            className="flex items-center gap-1 hover:text-secondary transition"
          >
            <IoCartOutline />
            <span className="bg-secondary text-xs text-white w-4 h-4 flex items-center justify-center rounded-full">
              0
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
