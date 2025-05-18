import React, { useRef, useState } from 'react'
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { useSelector } from 'react-redux';
function EditModal({ isOpen, onClose,details }) {
console.log("details......",details);
const [title,setTitle]=useState("")
const [selectedOption, setSelectedOption] = useState("");
 const [description, setDescription] = useState("");
const [images, setImages] = useState([]);
  const fileInputRef = useRef(null)
  const [previews, setPreviews] = useState([]);
const subcategeory = useSelector((state) => state.subcategory.subCategories);
const[data,setData]=useState({
    title:details.title||"",
    variants:details.variants||[],
    subCategory:details.subCategory||"",
    description:details.description||"",
    images:details.images||[]

})

    const handleSubmit=()=>{

    }
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

        <h2 className="text-xl font-semibold text-center mb-6">Edit Product</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row md:items-center">
            <label className="w-full md:w-1/4 text-gray-700 font-medium">
              Title :
            </label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full md:w-3/4 border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div className="space-y-4">
            <label className="text-gray-700 font-medium">Variants:</label>

            {data.variants.map((variant, index) => (
              <div key={index} className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <span>Ram:</span>
                  <input
                    type="text"
                    name="ram"
                    value={variant.ram}
                    // onChange={(e) => handleVariantChange(index, e)}
                    className="w-20 border border-gray-300 rounded px-2 py-1"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span>Price:</span>
                  <input
                    type="number"
                    name="price"
                    value={variant.price}
                    // onChange={(e) => handleVariantChange(index, e)}
                    className="w-24 border border-gray-300 rounded px-2 py-1"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span>QTY:</span>
                  <input
                    type="number"
                    name="quantity"
                    value={variant.quantity}
                    // onChange={(e) => handleVariantChange(index, e)}
                    className="w-16 border border-gray-300 rounded px-2 py-1 text-center"
                  />
                </div>
              </div>
            ))}

            <div className="flex justify-end">
              <button
                type="button"
                // onClick={handleAddVariant}
                className="mt-2 px-4 py-1 bg-primary text-white rounded hover:bg-gray-700"
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
              value={data.subCategory}
            //   onChange={handleChange}
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
              value={data.description}
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
              {data.images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="preview"
                  className="w-20 h-16 object-cover rounded shadow"
                />
              ))}

              <div
                className="w-20 h-16 border-2 border-dashed border-gray-300 flex items-center justify-center rounded cursor-pointer hover:border-blue-400"
                // onClick={handleUploadClick}
              >
                <span className="text-gray-400 text-sm">+</span>
              </div>

              <input
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                // onChange={handleImageChange}
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
  )
}

export default EditModal
