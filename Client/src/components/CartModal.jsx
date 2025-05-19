import React from "react";
import clsx from "clsx";
import { X } from "lucide-react";
import { IoCartOutline } from "react-icons/io5";

function CartModal({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 backdrop-blur-md font-poppins" onClick={onClose} />
      )}

      <div
        className={clsx(
          "font-poppins    fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out",
          {
            "translate-x-0": isOpen,
            "translate-x-full": !isOpen,
          }
        )}
      >
        <div className="flex justify-between items-center mb-6 bg-primary p-4">
          <div className="flex space-x-4">
            <button className="ml-2 p-3 rounded-full  bg-primary-light">
              <IoCartOutline />
            </button>
            <h2 className="text-xl text-white">Items</h2>
          </div>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto h-full">
          <div className="space-y-4 p-4">
            <p>Loading</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartModal;
