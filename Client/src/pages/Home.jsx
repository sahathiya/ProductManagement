// import React, { useState } from 'react'
// import ProductList from '../components/ProductList';
// import Sidebar from '../components/Sidebar';


// function Home() {
//     const [selectedCategory, setSelectedCategory] = useState('All');
//   return (
//     <>
//     <div className='flex justify-end mt-5 font-poppins'>
//            <div className='flex  space-x-4'>
//         <button className='px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark transition-all'>Add category</button>
//         <button className='px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark transition-all'>Add sub category</button>
//         <button className='px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark transition-all'>Add product</button>
//     </div>


//     <div>

//     </div>
//     </div>

//      <div className="flex flex-col md:flex-row p-4 gap-4">

 
//       <Sidebar setSelectedCategory={setSelectedCategory} />
//       <ProductList selectedCategory={selectedCategory} />
//     </div>
//     </>

//   )
// }

// export default Home



// function Home() {
//   const [selectedCategory, setSelectedCategory] = useState('All');

//   return (
//     <>
//       <div className='flex justify-end mt-5 font-poppins md:ml-[20%] p-4'>
//         <div className='flex space-x-4'>
//           <button className='px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark transition-all'>Add category</button>
//           <button className='px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark transition-all'>Add sub category</button>
//           <button className='px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark transition-all'>Add product</button>
//         </div>
//       </div>

//       {/* Sidebar + Product List */}
//       <Sidebar setSelectedCategory={setSelectedCategory} />
//       <div className="md:ml-[25%] p-4">
//         <ProductList selectedCategory={selectedCategory} />
//       </div>
//     </>
//   );
// }

// export default Home


// function Home() {
//   const [selectedCategory, setSelectedCategory] = useState('All');

//   return (
//     <>
//       {/* Top buttons */}
      

//       {/* Sidebar */}
//       <Sidebar setSelectedCategory={setSelectedCategory} />

//       {/* Product list */}


//       <div className='flex justify-end mt-5 font-poppins ml-0 md:ml-[20%] p-4'>
//         <div className='flex space-x-4'>
//           <button className='px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark transition-all'>Add category</button>
//           <button className='px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark transition-all'>Add sub category</button>
//           <button className='px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark transition-all'>Add product</button>
//         </div>
//       </div>
//       <div className="ml-0 md:ml-[20%] p-4">
//         <ProductList selectedCategory={selectedCategory} />
//       </div>


//     </>
//   );
// }


//  export default Home



import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ProductList from '../components/ProductList';
import ProductModal from '../components/ProductModal';
import CategoryModal from '../components/CategoryModal';
import SubCategoryModal from '../components/SubCategoryModal';

function Home() {
  // const [selectedCategory, setSelectedCategory] = useState('All');
   const [showProductModal,setShowProductModal]=useState(false)
   const [showCategoryModal,setShowCategoryModal]=useState(false)
const[showSubCategoryModal,setSubCategoryModal]=useState(false)
  return (
    <>
     
 {/* Buttons at the top */}
      <div className="flex justify-end mt-20 font-poppins ml-0 md:ml-[20%] p-4">
        <div className="flex space-x-4">
          <button 
          onClick={()=>setShowCategoryModal(!showCategoryModal)}
          className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark transition-all">
            Add category
          </button>
          <button 
          onClick={()=>setSubCategoryModal(!showSubCategoryModal)}
          className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark transition-all">
            Add sub category
          </button>
          <button 
          onClick={()=>setShowProductModal(!showProductModal)}
          className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark transition-all">
            Add product
          </button>
        </div>
        <div>

        </div>
      </div>

      {/* Sidebar */}
      {/* <Sidebar setSelectedCategory={setSelectedCategory} /> */}
 <Sidebar />
      {/* Product list */}
      <div className="ml-0 md:ml-[20%] p-4">
        {/* <ProductList selectedCategory={selectedCategory} /> */}
         <ProductList  />
      </div>

      { showProductModal&&<ProductModal isOpen={showProductModal} onClose={() => setShowProductModal(false)}/>}
        {showCategoryModal&&<CategoryModal onClose={()=>setShowCategoryModal(false)}/>}
            {showSubCategoryModal&&<SubCategoryModal onClose={()=>setSubCategoryModal(false)}/>}
    </>
  );
}

export default Home;
