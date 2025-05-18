// import React, { useRef, useState } from 'react'
// import { Dialog } from "@headlessui/react";
// import { X } from "lucide-react";
// import { useDispatch, useSelector } from 'react-redux';
// import axiosInstance from '../utils/axiosInstance';
// import { fetchProducts } from '../features/product/productActions';
// import { toast } from 'react-toastify';
// function EditModal({ isOpen, onClose,details }) {
//     const dispatch=useDispatch()
//     const activeUser=useSelector((state)=>state.user.activeUser._id)
// console.log("details......",details);
// const [title,setTitle]=useState("")
// const [selectedOption, setSelectedOption] = useState("");
//  const [description, setDescription] = useState("");
// const [images, setImages] = useState([]);
//  const [subCategory, setSubCategory] = useState("");
//   const fileInputRef = useRef(null)
//   const [previews, setPreviews] = useState([]);
// const subcategeory = useSelector((state) => state.subcategory.subCategories);
// const [variants, setVariants] = useState([
//     { ram: "", price: "", quantity: "" },
//   ]);
// const[data,setData]=useState({
//     title:details.title||title,
//     variants:details.variants||variants,
//     subCategory:details.subCategory||subCategory,
//     description:details.description||description,
//     images:details.images||images

// })

    
//  const handleChange = (e) => {
//     setSelectedOption(e.target.value);
//     console.log("Selected:", e.target.value);
//   };
//      const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setImages((prev) => [...prev, ...files]);
//     const previewUrls = files.map((file) => URL.createObjectURL(file));
//     setPreviews((prev) => [...prev, ...previewUrls]);
//   };

//   const handleUploadClick = () => {
//     fileInputRef.current.click();
//   };

//   console.log("images", fileInputRef.current);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();

//     formData.append("title", title);
//     formData.append("userId", activeUser._id);
//     formData.append("subCategory", subCategory);
//     formData.append("description", description);
//     formData.append("variants", JSON.stringify(variants));

//     images.forEach((image) => formData.append("images", image));

//     try {
//       const response = await axiosInstance.patch(
//         `/api/product/edit/${details._id}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log("response of product add", response.data);
//       if (response.status === 200) {
//         toast.success(response.data.message);
//         onClose();
//         dispatch(fetchProducts());
//       }
//     } catch (err) {
//       console.error("Product add failed:", err);
//     }
//   };

//   console.log("cccc");

//   const handleVariantChange = (index, e) => {
//     const { name, value } = e.target;
//     const updated = [...variants];
//     updated[index][name] = value;
//     setVariants(updated);
//   };

//   // Add a new empty variant
//   const handleAddVariant = () => {
//     const last = variants[variants.length - 1];
//     if (!last.ram || !last.price || !last.quantity) {
//       alert("Please fill out all fields before adding a new variant.");
//       return;
//     }
//     setVariants([...variants, { ram: "", price: "", quantity: "" }]);
//   };
//   return (
//     <Dialog
//       open={isOpen}
//       onClose={onClose}
//       className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur "
//     >
//       <div className="relative w-full max-w-3xl mx-4 md:mx-auto bg-white rounded-xl shadow-lg p-6">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//         >
//           <X className="w-5 h-5" />
//         </button>

//         <h2 className="text-xl font-semibold text-center mb-6">Edit Product</h2>

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <div className="flex flex-col md:flex-row md:items-center">
//             <label className="w-full md:w-1/4 text-gray-700 font-medium">
//               Title :
//             </label>
//             <input
//               type="text"
//               value={data.title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="w-full md:w-3/4 border border-gray-300 rounded px-4 py-2"
//             />
//           </div>

//           <div className="space-y-4">
//             <label className="text-gray-700 font-medium">Variants:</label>

//             {data.variants.map((variant, index) => (
//               <div key={index} className="flex flex-wrap items-center gap-3">
//                 <div className="flex items-center gap-2">
//                   <span>Ram:</span>
//                   <input
//                     type="text"
//                     name="ram"
//                     value={variant.ram}
//                     onChange={(e) => handleVariantChange(index, e)}
//                     className="w-20 border border-gray-300 rounded px-2 py-1"
//                   />
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span>Price:</span>
//                   <input
//                     type="number"
//                     name="price"
//                     value={variant.price}
//                     onChange={(e) => handleVariantChange(index, e)}
//                     className="w-24 border border-gray-300 rounded px-2 py-1"
//                   />
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span>QTY:</span>
//                   <input
//                     type="number"
//                     name="quantity"
//                     value={variant.quantity}
//                     onChange={(e) => handleVariantChange(index, e)}
//                     className="w-16 border border-gray-300 rounded px-2 py-1 text-center"
//                   />
//                 </div>
//               </div>
//             ))}

//             <div className="flex justify-end">
//               <button
//                 type="button"
//                 onClick={handleAddVariant}
//                 className="mt-2 px-4 py-1 bg-primary text-white rounded hover:bg-gray-700"
//               >
//                 Add variants
//               </button>
//             </div>
//           </div>

//           <div className="flex flex-col md:flex-row md:items-center">
//             <label className="w-full md:w-1/4 text-gray-700 font-medium">
//               Sub category :
//             </label>

//             <select
//               value={selectedOption}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             >
//               <option value="" className="text-gray-500">
//                 Select Sub category
//               </option>
//               {subcategeory.map((category, index) => (
//                 <option key={index} value={category.name}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="flex flex-col md:flex-row md:items-start">
//             <label className="w-full md:w-1/4 text-gray-700 font-medium">
//               Description :
//             </label>
//             <textarea
//               value={data.description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="w-full md:w-3/4 border border-gray-300 rounded px-4 py-2"
//               rows={2}
//             ></textarea>
//           </div>

//           <div className="flex flex-col md:flex-row md:items-center">
//             <label className="w-full md:w-1/4 text-gray-700 font-medium">
//               Upload image:
//             </label>

//             <div className="flex gap-3 mt-2 md:mt-0 flex-wrap">
//               {data.images?.map((img, i) => (
//                 <img
//                   key={i}
//                   src={img}
//                   alt="preview"
//                   className="w-20 h-16 object-cover rounded shadow"
//                 />
//               ))}

//               <div
//                 className="w-20 h-16 border-2 border-dashed border-gray-300 flex items-center justify-center rounded cursor-pointer hover:border-blue-400"
//                 onClick={handleUploadClick}
//               >
//                 <span className="text-gray-400 text-sm">+</span>
//               </div>

//               <input
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 ref={fileInputRef}
//                 onChange={handleImageChange}
//                 className="hidden"
//               />
//             </div>
//           </div>

//           <div className="flex justify-end gap-4 mt-6">
//             <button
//               type="button"
//               className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
//               onClick={onClose}
//             >
//               DISCARD
//             </button>
//             <button
//               type="submit"
//               className="bg-secondary text-white px-6 py-2 rounded hover:bg-secondary-dark"
//             >
//               ADD
//             </button>
//           </div>
//         </form>
//       </div>
//     </Dialog>
//   )
// }

// export default EditModal

import React, { useEffect, useRef, useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../utils/axiosInstance";
import { fetchProducts } from "../features/product/productActions";
import { toast } from "react-toastify";

function EditModal({ isOpen, onClose, details }) {
  const dispatch = useDispatch();
  const activeUser = useSelector((state) => state.user.activeUser._id);
  const subcategeory = useSelector((state) => state.subcategory.subCategories);
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [variants, setVariants] = useState([{ ram: "", price: "", quantity: "" }]);

  useEffect(() => {
    if (details) {
      setTitle(details.title || "");
      setSelectedOption(details.subCategory || "");
      setDescription(details.description || "");
      setImages(details.images || []);
      setVariants(details.variants || [{ ram: "", price: "", quantity: "" }]);
    }
  }, [details]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...previewUrls]);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...variants];
    updated[index][name] = value;
    setVariants(updated);
  };

  const handleAddVariant = () => {
    const last = variants[variants.length - 1];
    if (!last.ram || !last.price || !last.quantity) {
      alert("Please fill out all fields before adding a new variant.");
      return;
    }
    setVariants([...variants, { ram: "", price: "", quantity: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("userId", activeUser._id);
    formData.append("subCategory", selectedOption);
    formData.append("description", description);
    formData.append("variants", JSON.stringify(variants));
    images.forEach((image) => formData.append("images", image));

    try {
      const response = await axiosInstance.patch(
        `/api/product/edit/${details._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        onClose();
        dispatch(fetchProducts());
      }
    } catch (err) {
      console.error("Product update failed:", err);
      toast.error("Failed to update product.");
    }
  };
console.log("setImages",images);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur"
    >
      <div className="relative w-full max-w-3xl mx-4 md:mx-auto bg-white rounded-xl shadow-lg p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold text-center mb-6">Edit Product</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Title */}
          <div className="flex flex-col md:flex-row md:items-center">
            <label className="w-full md:w-1/4 text-gray-700 font-medium">Title :</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full md:w-3/4 border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* Variants */}
          <div className="space-y-4">
            <label className="text-gray-700 font-medium">Variants:</label>
            {variants.map((variant, index) => (
              <div key={index} className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <span>Ram:</span>
                  <input
                    type="text"
                    name="ram"
                    value={variant.ram}
                    onChange={(e) => handleVariantChange(index, e)}
                    className="w-20 border border-gray-300 rounded px-2 py-1"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span>Price:</span>
                  <input
                    type="number"
                    name="price"
                    value={variant.price}
                    onChange={(e) => handleVariantChange(index, e)}
                    className="w-24 border border-gray-300 rounded px-2 py-1"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span>QTY:</span>
                  <input
                    type="number"
                    name="quantity"
                    value={variant.quantity}
                    onChange={(e) => handleVariantChange(index, e)}
                    className="w-16 border border-gray-300 rounded px-2 py-1 text-center"
                  />
                </div>
              </div>
            ))}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleAddVariant}
                className="mt-2 px-4 py-1 bg-primary text-white rounded hover:bg-gray-700"
              >
                Add Variant
              </button>
            </div>
          </div>

          {/* Subcategory */}
          <div className="flex flex-col md:flex-row md:items-center">
            <label className="w-full md:w-1/4 text-gray-700 font-medium">Sub category :</label>
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Sub category</option>
              {subcategeory.map((category, index) => (
                <option key={index} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="flex flex-col md:flex-row md:items-start">
            <label className="w-full md:w-1/4 text-gray-700 font-medium">Description :</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full md:w-3/4 border border-gray-300 rounded px-4 py-2"
              rows={3}
            ></textarea>
          </div>

          {/* Image Upload */}
          <div className="flex flex-col md:flex-row md:items-center">
            <label className="w-full md:w-1/4 text-gray-700 font-medium">Upload image:</label>
            <div className="flex gap-3 mt-2 md:mt-0 flex-wrap">
              {Array.isArray(previews) &&
                previews.map((img, i) => (
                  <img
                    key={i}
                    src={typeof img === "string" ? img : URL.createObjectURL(img)}
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

          {/* Submit / Cancel Buttons */}
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
              UPDATE
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default EditModal;
