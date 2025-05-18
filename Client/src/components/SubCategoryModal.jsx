import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubCategories } from "../features/subCategory/subCategoryActions";
import axiosInstance from "../utils/axiosInstance";

function SubCategoryModal({ onClose }) {
  const dispatch = useDispatch();
  const [subCategoryName, setSubCategoryName] = useState("");
  const categories = useSelector((state) => state.category.categories);
  const [selectedOption, setSelectedOption] = useState("");

  const activeCategory = useSelector((state) => state.category.activeCategory);

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    console.log("Selected:", e.target.value);
  };
  const handleAdd = async (categoryId) => {
    if (subCategoryName.trim()) {
      const response = await axiosInstance.post(
        `/api/product/category/${categoryId}`,
        { name: subCategoryName }
      );
      if (response.status === 200) {
        dispatch(fetchSubCategories(categoryId));
        setSubCategoryName("");
        onClose();
      }
    }
  };

  const handleDiscard = () => {
    setSubCategoryName("");
    onClose();
  };

  return (
    <div className="font-poppins fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-center items-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Add Sub Category
        </h2>

        <div className="flex-col space-y-4">
          <select
            value={selectedOption}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="" className="text-gray-500">
              Select category
            </option>
            {categories.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={subCategoryName}
            onChange={(e) => setSubCategoryName(e.target.value)}
            placeholder="Enter sub category name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>

        <div className="flex space-x-4 mt-8">
          <button
            onClick={() => handleAdd(activeCategory._id)}
            className="w-1/2 bg-secondary text-white py-2 rounded-lg hover:bg-secondary-dark transition"
          >
            ADD
          </button>

          <button
            onClick={handleDiscard}
            className="w-1/2 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            DISCARD
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubCategoryModal;
