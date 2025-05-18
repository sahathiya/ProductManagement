import React, { useEffect, useState } from "react";

import { MdOutlineKeyboardArrowRight } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../features/category/categoryActions";
import { fetchSubCategories } from "../features/subCategory/subCategoryActions";
import { setActiveCategory } from "../features/category/categorySlice";
import {
  fetchProducts,
  fetchProductsByCategory,
  fetchProductsBysubCategory,
} from "../features/product/productActions";
import { setActiveSubCategory } from "../features/subCategory/subCategorySlice";

const categories = {
  Laptop: ["Hp", "Dell"],
  Tablet: [],
  Headphones: [],
};

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const categories = useSelector((state) => state.category.categories);
  const subcategeory = useSelector((state) => state.subcategory.subCategories);
  const activeCategory = useSelector((state) => state.category.activeCategory);
  console.log("subcategeory", subcategeory);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  console.log("categories", categories);

  const handleSubCategory = (category) => {
    const categoryId = category._id;
    dispatch(fetchProductsByCategory(categoryId));
    dispatch(fetchSubCategories(categoryId));
    dispatch(setActiveCategory(category));
    setIsOpen(!isOpen);
  };
  console.log("activecategory", activeCategory);

  const handleAllCategoryProducts = () => {
    dispatch(setActiveCategory(null));
    dispatch(setActiveSubCategory(null));
    dispatch(fetchProducts());
  };

  const handlesubCategoryProducts = (subcategory) => {
    dispatch(setActiveSubCategory(subcategory));
    const subCategory = subcategory.name;
    dispatch(fetchProductsBysubCategory(subCategory));
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-full md:w-1/5 bg-white rounded-lg p-4 pt-20 font-poppins overflow-y-auto shadow">
      <h2 className="text-lg font-semibold mb-4 text-primary">Categories</h2>
      <button
        className="mb-2 underline hover:underline hover:text-primary"
        onClick={handleAllCategoryProducts}
      >
        All categories
      </button>

      {categories.map((category) => (
        <div key={category._id} className="mb-3">
          <div
            onClick={() => handleSubCategory(category)}
            className="flex justify-between items-center cursor-pointer hover:bg-blue-100 rounded px-2 py-1"
          >
            <h3 className="font-medium text-gray-700">{category.name}</h3>
            <MdOutlineKeyboardArrowRight className="text-2xl text-gray-500" />
          </div>

          {activeCategory?.name === category?.name && isOpen && (
            <div className="ml-3">
              {subcategeory.length > 0 ? (
                subcategeory.map((sub) => (
                  <div
                    key={sub._id}
                    onClick={() => handlesubCategoryProducts(sub)}
                    className="cursor-pointer px-2 py-1 text-sm rounded hover:bg-blue-100"
                  >
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedSubcategoryId === sub._id}
                        onChange={() =>
                          setSelectedSubcategoryId(
                            selectedSubcategoryId === sub._id ? null : sub._id
                          )
                        }
                      />
                      {sub.name}
                    </label>
                  </div>
                ))
              ) : (
                <div className="cursor-pointer text-sm px-2 py-1 hover:bg-blue-100 rounded"></div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
