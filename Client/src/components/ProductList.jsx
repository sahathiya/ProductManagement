import React from 'react';
import { GoHeart } from "react-icons/go";
const sampleProducts = [
  { id: 1, name: 'HP AMD Ryzen 3', price: 529.99, image: 'https://img.freepik.com/free-photo/laptop-isolated-white-background_1232-1706.jpg?uid=R197776071&ga=GA1.1.1588935672.1725689521&semt=ais_hybrid&w=740' },
  { id: 2, name: 'HP AMD Ryzen 3', price: 529.99, image: 'https://img.freepik.com/free-photo/laptop-isolated-white-background_1232-1706.jpg?uid=R197776071&ga=GA1.1.1588935672.1725689521&semt=ais_hybrid&w=740' },
  { id: 3, name: 'HP AMD Ryzen 3', price: 529.99, image: 'https://img.freepik.com/free-photo/laptop-isolated-white-background_1232-1706.jpg?uid=R197776071&ga=GA1.1.1588935672.1725689521&semt=ais_hybrid&w=740' },
  { id: 4, name: 'HP AMD Ryzen 3', price: 529.99, image: 'https://img.freepik.com/free-photo/laptop-isolated-white-background_1232-1706.jpg?uid=R197776071&ga=GA1.1.1588935672.1725689521&semt=ais_hybrid&w=740' },
  { id: 5, name: 'HP AMD Ryzen 3', price: 529.99, image: 'https://img.freepik.com/free-photo/laptop-isolated-white-background_1232-1706.jpg?uid=R197776071&ga=GA1.1.1588935672.1725689521&semt=ais_hybrid&w=740' },
  { id: 6, name: 'HP AMD Ryzen 3', price: 529.99, image: 'https://img.freepik.com/free-photo/laptop-isolated-white-background_1232-1706.jpg?uid=R197776071&ga=GA1.1.1588935672.1725689521&semt=ais_hybrid&w=740' },
];

const ProductList = ({ selectedCategory }) => {
  return (
    <div className="w-full  md:w-4/5 font-poppins">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {sampleProducts.map(product => (
          <div
            key={product.id}
            className="border border-gray-300 p-4 rounded-lg shadow hover:shadow-md transition-all bg-white"
          >
            <img src={product.image} alt={product.name} className="w-full h-40 object-contain mb-2" />
            <div className='bg-primary-light rounded-full'>
                <GoHeart/>
            </div>
            <h4 className="text-md font-medium">{product.name}</h4>
            <p className="text-gray-600">${product.price}</p>
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
