import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Landing() {
    const navigate=useNavigate()
    const activeUser=useSelector((state)=>state.user.activeUser)
  return (
    <div className="w-full  h-screen  bg-primary text-white flex flex-col justify-center items-center p-10 relative font-poppins">
      <h2 className="text-3xl font-bold mb-4">Hello Friend!</h2>
      <p className="text-center mb-6">
        Enter your personal details and <br />
        start your journey with us
      </p>
      {activeUser===null?(
  <button
      onClick={()=>navigate('/signup')} 
      className="border border-white px-8 py-2 rounded-full hover:bg-white hover:text-[#004071] transition">
        GET STARTED
      </button>
      ):(
          <button
      onClick={()=>navigate('/dashboard')} 
      className="border border-white px-8 py-2 rounded-full hover:bg-white hover:text-[#004071] transition">
        GO TO DASHBOARD
      </button>
      )}
    

      <div className="absolute top-8 left-8 w-6 h-6 rotate-45 bg-[#2C6C8C]"></div>
      <div className="absolute bottom-8 left-8 w-40 h-40 rounded-full bg-[#2C6C8C] opacity-50"></div>
      <div className="absolute bottom-24 right-16 w-10 h-10 rotate-45 bg-[#2C6C8C] opacity-50"></div>
      <div className="absolute top-24 right-8 w-20 h-20 bg-[#2C6C8C] opacity-50 rotate-45"></div>
    </div>
  );
}

export default Landing;
