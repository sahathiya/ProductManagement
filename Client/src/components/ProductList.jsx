import React, { useEffect } from 'react';
import { GoHeart } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../features/product/productActions';
// const sampleProducts = [
//   { id: 1, name: 'HP AMD Ryzen 3', price: 529.99, image: 'https://img.freepik.com/free-photo/laptop-isolated-white-background_1232-1706.jpg?uid=R197776071&ga=GA1.1.1588935672.1725689521&semt=ais_hybrid&w=740' },
//   { id: 2, name: 'HP AMD Ryzen 3', price: 529.99, image: 'https://img.freepik.com/free-photo/laptop-isolated-white-background_1232-1706.jpg?uid=R197776071&ga=GA1.1.1588935672.1725689521&semt=ais_hybrid&w=740' },
//   { id: 3, name: 'HP AMD Ryzen 3', price: 529.99, image: 'https://img.freepik.com/free-photo/laptop-isolated-white-background_1232-1706.jpg?uid=R197776071&ga=GA1.1.1588935672.1725689521&semt=ais_hybrid&w=740' },
//   { id: 4, name: 'HP AMD Ryzen 3', price: 529.99, image: 'https://img.freepik.com/free-photo/laptop-isolated-white-background_1232-1706.jpg?uid=R197776071&ga=GA1.1.1588935672.1725689521&semt=ais_hybrid&w=740' },
//   { id: 5, name: 'HP AMD Ryzen 3', price: 529.99, image: 'https://img.freepik.com/free-photo/laptop-isolated-white-background_1232-1706.jpg?uid=R197776071&ga=GA1.1.1588935672.1725689521&semt=ais_hybrid&w=740' },
//   { id: 6, name: 'HP AMD Ryzen 3', price: 529.99, image: 'https://img.freepik.com/free-photo/laptop-isolated-white-background_1232-1706.jpg?uid=R197776071&ga=GA1.1.1588935672.1725689521&semt=ais_hybrid&w=740' },
// ];

const ProductList = ({ selectedCategory }) => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const Products=useSelector((state)=>state.product.products)
    useEffect(()=>{
dispatch(fetchProducts())
    },[dispatch])
  return (
    <div className="w-full  md:w-4/5 font-poppins">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {Products.map(product => (
          // <div
          //   key={product._id}
          //   onClick={()=>navigate(`/productdetails/${product._id}`)}
          //   className="border border-gray-300 p-4 rounded-lg shadow hover:shadow-md transition-all bg-white"
          // >
          //   <img src={product.images[0]} alt={product.title} className="w-full h-40 object-contain mb-2" />
          //   <div className='bg-primary-light rounded-full'>
          //       <GoHeart/>
          //   </div>
          //   <h4 className="text-md font-medium">{product.title}</h4>
          //   <p className="text-gray-600">${product.price}</p>
          //   <div className="flex gap-1 mt-1 text-yellow-500">
          //     {'★★★★★'.split('').map((star, idx) => (
          //       <span key={idx}>{star}</span>
          //     ))}
          //   </div>
          // </div>

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
