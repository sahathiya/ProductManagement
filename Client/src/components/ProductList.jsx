import React, { useEffect, useState } from 'react';
import { GoHeart } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../features/product/productActions';

const ProductList = () => {
//     const navigate=useNavigate()
//     const dispatch=useDispatch()
//     const[products,setProducts]=useState([])
//     const activeCategory=useSelector((state)=>state.category.activeCategory)
//     const activeSubCategory=useSelector((state)=>state.subcategory.activeSubCategory)
//     const Products=useSelector((state)=>state.product.products)
//     const categoryProducts=useSelector((state)=>state.product.categoryProducts)
//     const subCategoryProducts=useSelector((state)=>state.product.subCategoryProducts)
//     useEffect(()=>{


// if(activeCategory){
//   setProducts(categoryProducts)

// }else{
//   dispatch(fetchProducts())
//   setProducts(Products)
// }
//     },[dispatch,activeCategory, categoryProducts, Products,subCategoryProducts])

//     console.log("subCategoryProducts",subCategoryProducts);
    const navigate = useNavigate();
const dispatch = useDispatch();
const [products, setProducts] = useState([]);

const activeCategory = useSelector((state) => state.category.activeCategory);
const activeSubCategory = useSelector((state) => state.subcategory.activeSubCategory);
const Products = useSelector((state) => state.product.products);
const categoryProducts = useSelector((state) => state.product.categoryProducts);
const subCategoryProducts = useSelector((state) => state.product.subCategoryProducts);

// useEffect(() => {
//   // Priority: subcategory > category > all
//   if (activeSubCategory) {
//     setProducts(subCategoryProducts);
//   } else if (activeCategory) {
//     setProducts(categoryProducts);
//   } else {
//     dispatch(fetchProducts()); // get all products
//     setProducts(Products);
//   }
// }, [dispatch, activeSubCategory, activeCategory, Products, categoryProducts, subCategoryProducts]);

useEffect(() => {
  // Fetch all products once if nothing is selected
  if (!activeCategory && !activeSubCategory) {
    dispatch(fetchProducts());
  }
}, [dispatch, activeCategory, activeSubCategory]);



useEffect(() => {
  
   if (activeCategory) {
    setProducts(categoryProducts);
  } else {
    setProducts(Products); // this will now contain the result after fetchProducts() finishes
  }
}, [ activeCategory, Products, categoryProducts]);
useEffect(() => {
  if (activeSubCategory ) {
    setProducts(subCategoryProducts);
  
  } else {
    setProducts(Products); // this will now contain the result after fetchProducts() finishes
  }
}, [activeSubCategory, Products, subCategoryProducts]);

  return (
    <div className="w-full  md:w-4/5 font-poppins">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {products.map(product => (
        

          <div
  key={product._id}
  onClick={() => navigate(`/productdetails/${product._id}`)}
  className="relative border border-gray-300 p-4 rounded-lg shadow hover:shadow-md transition-all bg-white"
>
  {/* Heart Icon in Top-Right */}
  <div className="absolute top-2 right-2 bg-primary-light p-2 rounded-full z-10">
    <GoHeart />
  </div>

  {/* Product Image */}
  <img
    src={product.images[0]}
    alt={product.title}
    className="w-full h-40 object-contain mb-2"
  />

  <h4 className="text-md font-medium">{product.title}</h4>
 <p className="text-gray-600">${product.variants[0].price}</p>

  {/* Static Rating */}
  <div className="flex gap-1 mt-1 text-yellow-500">
    {'★★★★★'.split('').map((star, idx) => (
      <span key={idx}>{star}</span>
    ))}
  </div>
</div>

        ))}
      </div>



      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
        <span>10 of 456 items</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(page => (
            <button
              key={page}
              className={`px-3 py-1 rounded-full ${
                page === 1 ? 'bg-yellow-500 text-white' : 'bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <div>
          Show{' '}
          <select className="border px-2 py-1 rounded text-sm">
            <option>10 rows</option>
            <option>20 rows</option>
            <option>50 rows</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
