import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { GoHeart } from "react-icons/go";
import EditModal from "../components/EditModal";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const[editModal,setEditModal]=useState(false)
  useEffect(() => {
    const fetchproductbyId = async () => {
      const response = await axiosInstance.get(`/api/product/${id}`);
      const data = response.data.product;
      setDetails(data);
      if (data.images?.length > 0) setSelectedImage(data.images[0]);
      if (data.variants?.length > 0) {
        setSelectedVariant(data.variants[0]);
        setPrice(data.variants[0].price);
      }
    };
    fetchproductbyId();
  }, [id]);

  const [selectedImage, setSelectedImage] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("");
  console.log("details", details);

  console.log("selectedImage", selectedImage);
  console.log("selectedVariant", selectedVariant);

  useEffect(() => {
    if (details?.images?.length > 0 && !selectedImage) {
      setSelectedImage(details.images[0]);
    }
    if (details?.variants?.length > 0 && !selectedVariant) {
      setSelectedVariant(details.variants[0]);
    }
    if (details?.variants?.length > 0) {
      setPrice(details.variants?.[0].price);
    }
  }, [details]);


const handleBuy=()=>{
  toast.success("product added to cart")
}
  return (
    <div className="container mx-auto px-4 py-8 mt-20 font-poppins">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          <div className="border p-4 rounded-xl">
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full object-contain max-h-96 mx-auto"
            />
          </div>

          <div className="flex gap-4 mt-4 justify-center">
            {details.images?.map((img, idx) => {
              if (img?.trim() === selectedImage?.trim()) return null;
              return (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  onClick={() => {
                    setSelectedImage(img);
                    setSelectedVariant(details.variants?.[idx]);
                    setQuantity(1);
                  }}
                  className="w-24 h-24 cursor-pointer border rounded-xl p-2 object-contain"
                />
              );
            })}
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-gray-800">
            {details.title}
          </h2>
          <p className="text-xl font-bold text-gray-700 mt-2">
            ${selectedVariant?.price}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <FaCheck className="text-green-600" />
            <span className="text-green-600 font-medium">In stock</span>
          </div>
          <p className="text-sm text-gray-500">
            Hurry up! only 34 product left in stock!
          </p>

          <div className="mt-6">
            <p className="font-medium mb-2">Ram:</p>
            <div className="flex gap-3">
              {details.variants?.map((v) => (
                <button
                  key={v._id}
                  onClick={() => setSelectedVariant(v)}
                  className={`px-4 py-2 border rounded-full ${
                    selectedVariant === v
                      ? "bg-black text-white"
                      : "text-gray-700 border-gray-300"
                  }`}
                >
                  {v.ram}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="font-medium mb-2">Quantity:</p>
            <div className="flex items-center gap-3">
              <button
                className="px-3 py-1 border rounded-md"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                className="px-3 py-1 border rounded-md"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <button 
            onClick={()=>setEditModal(true)}
            className="bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-full font-semibold">
              Edit product
            </button>
            <button 
            onClick={handleBuy}
            className="bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-full font-semibold">
              Buy it now
            </button>
            <button className="ml-2 p-3 rounded-full  bg-primary-light">
              <GoHeart />
            </button>
          </div>

          {editModal&&<EditModal isOpen={editModal} onClose={()=>setEditModal(false)} details={details}/>}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
