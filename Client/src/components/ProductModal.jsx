// import React, { useState } from 'react'
// import { Dialog } from "@headlessui/react";
// import { X } from "lucide-react";
// function ProductModal({ isOpen, onClose }) {

//     const [variants, setVariants] = useState([
//     { ram: "4 GB", price: "529.99", qty: 1 },
//     { ram: "8 GB", price: "929.99", qty: 3 },
//   ]);
//   const [title, setTitle] = useState("HP AMD Ryzen 3");
//   const [subCategory, setSubCategory] = useState("HP");
//   const [description, setDescription] = useState(
//     "The Ryzen 7 is a more high-end processor that compares to the Int..."
//   );
//   const [images, setImages] = useState(["/img1.png", "/img2.png"]);

//   return
//     (
//     <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
//       <div className="relative w-full max-w-3xl mx-4 md:mx-auto bg-white rounded-xl shadow-lg p-6">
//         <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
//           <X className="w-5 h-5" />
//         </button>

//         <h2 className="text-xl font-semibold text-center mb-6">Add Product</h2>

//         <form className="space-y-4">
//           <div className="flex flex-col md:flex-row md:items-center">
//             <label className="w-full md:w-1/4 text-gray-700 font-medium">Title :</label>
//             <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full md:w-3/4 border border-gray-300 rounded px-4 py-2" />
//           </div>

//           <div>
//             <label className="text-gray-700 font-medium">Variants :</label>
//             {variants.map((v, i) => (
//               <div key={i} className="flex flex-wrap md:flex-nowrap items-center gap-2 mt-2">
//                 <div className="flex items-center gap-2">
//                   <span>Ram:</span>
//                   <input value={v.ram} className="w-20 border border-gray-300 rounded px-2 py-1" readOnly />
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span>Price:</span>
//                   <input value={`$ ${v.price}`} className="w-24 border border-gray-300 rounded px-2 py-1" readOnly />
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span>QTY:</span>
//                   <input value={v.qty} className="w-12 border border-gray-300 rounded px-2 py-1 text-center" readOnly />
//                 </div>
//               </div>
//             ))}
//             <button type="button" className="mt-2 px-4 py-1 bg-gray-800 text-white rounded hover:bg-gray-700">
//               Add variants
//             </button>
//           </div>

//           <div className="flex flex-col md:flex-row md:items-center">
//             <label className="w-full md:w-1/4 text-gray-700 font-medium">Sub category :</label>
//             <select className="w-full md:w-3/4 border border-gray-300 rounded px-4 py-2">
//               <option>{subCategory}</option>
//             </select>
//           </div>

//           <div className="flex flex-col md:flex-row md:items-start">
//             <label className="w-full md:w-1/4 text-gray-700 font-medium">Description :</label>
//             <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full md:w-3/4 border border-gray-300 rounded px-4 py-2" rows={2}></textarea>
//           </div>

//           <div className="flex flex-col md:flex-row md:items-center">
//             <label className="w-full md:w-1/4 text-gray-700 font-medium">Upload image:</label>
//             <div className="flex gap-3 mt-2 md:mt-0">
//               {images.map((img, i) => (
//                 <img key={i} src={img} alt="preview" className="w-20 h-16 object-cover rounded shadow" />
//               ))}
//               <div className="w-20 h-16 border-2 border-dashed border-gray-300 flex items-center justify-center rounded cursor-pointer">
//                 <span className="text-gray-400 text-sm">+</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-end gap-4 mt-6">
//             <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">DISCARD</button>
//             <button type="submit" className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600">ADD</button>
//           </div>
//         </form>
//       </div>
//     </Dialog>
//   )
// }

// export default ProductModal

import React, { useRef, useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { useSelector } from "react-redux";

export default function AddProductModal({ isOpen, onClose }) {
  const subcategeory = useSelector((state) => state.subcategory.subCategories);

  const [variants, setVariants] = useState([]);

  const [title, setTitle] = useState("");
  const [subCategory, setSubCategory] = useState("HP");
  const [description, setDescription] = useState("");

  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    console.log("Selected:", e.target.value);
  };

  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    onClose();
  };
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur "
    >
      <div className="relative w-full max-w-3xl mx-4 md:mx-auto bg-white rounded-xl shadow-lg p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold text-center mb-6">Add Product</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row md:items-center">
            <label className="w-full md:w-1/4 text-gray-700 font-medium">
              Title :
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full md:w-3/4 border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div className="mb-4">
            <div className="flex justify-between flex-col md:flex-row md:items-center gap-4">
              <label className="text-gray-700 font-medium md:w-20">
                Variants:
              </label>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <span>Ram:</span>
                  <input
                    type="text"
                    className="w-20 border border-gray-300 rounded px-2 py-1"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span>Price:</span>
                  <input
                    type="number"
                    className="w-24 border border-gray-300 rounded px-2 py-1"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span>QTY:</span>
                  <input
                    type="number"
                    className="w-16 border border-gray-300 rounded px-2 py-1 text-center"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="mt-2 px-4 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
              >
                Add variants
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center">
            <label className="w-full md:w-1/4 text-gray-700 font-medium">
              Sub category :
            </label>

            <select
              value={selectedOption}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="" className="text-gray-500">
                Select Sub category
              </option>
              {subcategeory.map((category, index) => (
                <option key={index} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col md:flex-row md:items-start">
            <label className="w-full md:w-1/4 text-gray-700 font-medium">
              Description :
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full md:w-3/4 border border-gray-300 rounded px-4 py-2"
              rows={2}
            ></textarea>
          </div>

          <div className="flex flex-col md:flex-row md:items-center">
            <label className="w-full md:w-1/4 text-gray-700 font-medium">
              Upload image:
            </label>

            <div className="flex gap-3 mt-2 md:mt-0 flex-wrap">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="preview"
                  className="w-20 h-16 object-cover rounded shadow"
                />
              ))}

              
              <div
                className="w-20 h-16 border-2 border-dashed border-gray-300 flex items-center justify-center rounded cursor-pointer hover:border-blue-400"
                onClick={handleUploadClick}
              >
                <span className="text-gray-400 text-sm">+</span>
              </div>

             
              <input
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              DISCARD
            </button>
            <button
              type="submit"
              className="bg-secondary text-white px-6 py-2 rounded hover:bg-secondary-dark"
            >
              ADD
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}
