import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ProductList from "../components/ProductList";
import ProductModal from "../components/ProductModal";
import CategoryModal from "../components/CategoryModal";
import SubCategoryModal from "../components/SubCategoryModal";

function Home() {
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showSubCategoryModal, setSubCategoryModal] = useState(false);
  return (
    <>
      <div className="flex justify-end mt-20 font-poppins ml-0 md:ml-[20%] p-4">
        <div className="flex space-x-4">
          <button
            onClick={() => setShowCategoryModal(!showCategoryModal)}
            className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark transition-all"
          >
            Add category
          </button>
          <button
            onClick={() => setSubCategoryModal(!showSubCategoryModal)}
            className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark transition-all"
          >
            Add sub category
          </button>
          <button
            onClick={() => setShowProductModal(!showProductModal)}
            className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark transition-all"
          >
            Add product
          </button>
        </div>
        <div></div>
      </div>

      <Sidebar />

      <div className="ml-0 md:ml-[20%] p-4">
        <ProductList />
      </div>

      {showProductModal && (
        <ProductModal
          isOpen={showProductModal}
          onClose={() => setShowProductModal(false)}
        />
      )}
      {showCategoryModal && (
        <CategoryModal onClose={() => setShowCategoryModal(false)} />
      )}
      {showSubCategoryModal && (
        <SubCategoryModal onClose={() => setSubCategoryModal(false)} />
      )}
    </>
  );
}

export default Home;
