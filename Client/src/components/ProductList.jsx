import React, { useEffect, useState } from "react";
import { GoHeart } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../features/product/productActions";

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const activeCategory = useSelector((state) => state.category.activeCategory);
  const activeSubCategory = useSelector(
    (state) => state.subcategory.activeSubCategory
  );
  const Products = useSelector((state) => state.product.products);
  const categoryProducts = useSelector(
    (state) => state.product.categoryProducts
  );
  const subCategoryProducts = useSelector(
    (state) => state.product.subCategoryProducts
  );

  useEffect(() => {
   
    if (!activeCategory && !activeSubCategory) {
      dispatch(fetchProducts());
    }
    setCurrentPage(1);
  }, [dispatch, activeCategory, activeSubCategory]);

  useEffect(() => {
    if (activeCategory) {
      setProducts(categoryProducts);
    } else {
      setProducts(Products); 
    }
    setCurrentPage(1);
  }, [activeCategory, Products, categoryProducts]);
  useEffect(() => {
    if (activeSubCategory) {
      setProducts(subCategoryProducts);
    } else {
      setProducts(Products); 
    }
    setCurrentPage(1);
  }, [activeSubCategory, Products, subCategoryProducts]);


    const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);
  return (
    <div className="w-full  md:w-4/5 font-poppins">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {currentProducts .map((product) => (
          <div
            key={product._id}
            onClick={() => navigate(`/productdetails/${product._id}`)}
            className="relative border border-gray-300 p-4 rounded-lg shadow hover:shadow-md transition-all bg-white"
          >
            <div className="absolute top-2 right-2 bg-primary-light p-2 rounded-full z-10">
              <GoHeart />
            </div>

            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-40 object-contain mb-2"
            />

            <h4 className="text-md font-medium">{product.title}</h4>
            <p className="text-gray-600">${product.variants[0].price}</p>

            {/* Static Rating */}
            <div className="flex gap-1 mt-1 text-yellow-500">
              {"★★★★★".split("").map((star, idx) => (
                <span key={idx}>{star}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

     
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-sm text-gray-600 gap-2">
        <span>
          Showing {startIndex + 1}-{Math.min(endIndex, totalProducts)} of {totalProducts} items
        </span>

        {/* Page Buttons */}
        <div className="flex gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded-full ${
                page === currentPage ? "bg-yellow-500 text-white" : "bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Rows per page */}
        <div>
          Show{" "}
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1); // reset to page 1
            }}
            className="border px-2 py-1 rounded text-sm"
          >
            <option value={10}>10 rows</option>
            <option value={20}>20 rows</option>
            <option value={50}>50 rows</option>
          </select>
        </div>
      </div>
      
    </div>
  );
};

export default ProductList;
