import React, { useEffect, useState } from 'react';
import { SlArrowRight } from "react-icons/sl";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { CiLogout } from 'react-icons/ci';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import axiosInstance from '../utils/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLogout } from '../features/user/userSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { fetchCategories } from '../features/category/categoryActions';
import { fetchSubCategories } from '../features/subCategory/subCategoryActions';
import { setActiveCategory } from '../features/category/categorySlice';
const categories = {
  Laptop: ['Hp', 'Dell'],
  Tablet: [],
  Headphones: [],
};

const Sidebar = ({ setSelectedCategory }) => {

const dispatch=useDispatch()
const navigate=useNavigate()
// const [activeCategory,setActiveCategory]=useState(null)
const [isOpen,setIsOpen]=useState(false)
const categories=useSelector((state)=>state.category.categories)
 const subcategeory=useSelector((state)=>state.subcategory.subCategories)
 const activeCategory=useSelector((state)=>state.category.activeCategory)
console.log("subcategeory",subcategeory);

useEffect(()=>{
    dispatch(fetchCategories())
    
},[dispatch])

console.log("categories",categories);




const handleSubCategory=(category)=>{
    const categoryId=category._id
      dispatch(fetchSubCategories(categoryId))
    const categoryName=category.name
// setActiveCategory(categoryName)
dispatch(setActiveCategory(category) )
setIsOpen(!isOpen)
  

}
console.log("activecategory",activeCategory);


  return (
<div className="fixed top-0 left-0 h-screen w-full md:w-1/5 bg-white rounded-lg p-4 pt-20 font-poppins overflow-y-auto shadow">
  <h2 className="text-lg font-semibold mb-4 text-primary">Categories</h2>
  <button
    className="mb-2 hover:underline"
    onClick={() => setSelectedCategory('All')}
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

    {activeCategory.name === category.name &&isOpen&& (
      <div className="ml-3">
        {subcategeory.length > 0 ? (
          subcategeory.map(sub => (
            <div
              key={sub._id}
              className="cursor-pointer px-2 py-1 text-sm rounded hover:bg-blue-100"
            >
              {sub.name}
            </div>
          ))
        ) : (
          <div className="cursor-pointer text-sm px-2 py-1 hover:bg-blue-100 rounded">
            View all
          </div>
        )}
      </div>
    )}
  </div>
))}



     {/* <div className="p-4">
          <div className="flex items-center gap-2">
            <div 
            onClick={handleUserLogout}
            className="w-10 h-10 bg-primary text-white flex items-center justify-center rounded-full text-sm">
              <CiLogout className="text-xl font-semibold"/>
            </div>
          


             <div>
                <p className="text-sm font-medium">name</p>
                <p className="text-xs text-gray-500">email</p>
              </div>
          </div>

        
        </div> */}
    </div>
  );
};

export default Sidebar;
