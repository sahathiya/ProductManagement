// import React from "react";

// function CategoryModal({ onClose }) {
//   return (
//     <div className=" font-poppins fixed inset-0  backdrop-blur-md z-50 flex justify-center items-center transition-opacity">
//       <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4 relative animate-fade-in">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
//         >
//           &times;
//         </button>

//         <h2 className="text-xl font-bold text-center mb-4 text-gray-800">
//           Add Category
//         </h2>

//         <div className="w-full rounded-md ">
//           <input
//             type="text"
//             placeholder="Enter category name"
//             className="w-full rounded-md border border-gray-400"
//           />
//         </div>

//         <div className="flex space-x-6 mt-10">
//           <button className="w-full bg-secondary text-white py-2 rounded-lg hover:bg-secondary-dark transition">
//             ADD
//           </button>

//           <button className="w-full bg-secondary text-white py-2 rounded-lg hover:bg-secondary-dark transition">
//             DISCARD
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CategoryModal;



import React, { useState } from "react";

function CategoryModal({ onClose, onAdd }) {
  const [categoryName, setCategoryName] = useState("");

  const handleAdd = () => {
    if (categoryName.trim()) {
      onAdd(categoryName.trim());
      setCategoryName("");
      onClose();
    }
  };

  const handleDiscard = () => {
    setCategoryName("");
    onClose();
  };

  return (
    <div className="font-poppins fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-center items-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md relative animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl"
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Add Category
        </h2>

        {/* Input Field */}
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter category name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
        />

        {/* Buttons */}
        <div className="flex space-x-4 mt-8">
          <button
            onClick={handleAdd}
            className="w-1/2 bg-secondary text-white py-2 rounded-lg hover:bg-secondary-dark transition"
          >
            ADD
          </button>

          <button
            onClick={handleDiscard}
            className="w-1/2 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            DISCARD
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoryModal;
