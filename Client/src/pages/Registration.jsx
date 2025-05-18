import React from 'react';
import { LuUser } from "react-icons/lu";
import { HiOutlineMail } from "react-icons/hi";
import {  useNavigate } from 'react-router-dom';
import { GoLock } from "react-icons/go";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../utils/axiosInstance';
import { useDispatch } from 'react-redux';
import { setActiveUser } from '../features/user/userSlice';
import { toast } from 'react-toastify';
function Registration() {
    const navigate=useNavigate()
    const dispatch=useDispatch()



    const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  
});


const handleSubmit=async(values)=>{

    console.log("values",values);

    const response=await axiosInstance.post(`/api/auth/register`,values)

  console.log("response of register",response);
const user=response.data.user
dispatch(setActiveUser(user))
toast.success(response.data.message)
  navigate('/dashboard')

    

}
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-5xl flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden border border-gray-200">
        {/* Left Panel */}
        <div className="w-full md:w-1/2 bg-[#004071] text-white flex flex-col justify-center items-center p-10 relative">
          <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-center mb-6">To keep connected with us please<br />login with your personal info</p>
          <button className="border border-white px-8 py-2 rounded-full hover:bg-white hover:text-[#004071] transition"
onClick={()=>navigate("/signin")}
          >
            SIGN IN
          </button>
          {/* Decorative Shapes */}
          <div className="absolute top-8 left-8 w-6 h-6 rotate-45 bg-[#2C6C8C]"></div>
          <div className="absolute bottom-8 left-8 w-40 h-40 rounded-full bg-[#2C6C8C] opacity-50"></div>
          <div className="absolute bottom-24 right-16 w-10 h-10 rotate-45 bg-[#2C6C8C] opacity-50"></div>
          <div className="absolute top-24 right-8 w-20 h-20 bg-[#2C6C8C] opacity-50 rotate-45"></div>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-8">Create Account</h2>

          <Formik

            initialValues={{
              name: '',
              email: '',
              password: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (

             <Form className="w-full max-w-sm">
            <div className="mb-4">
              <div className="flex items-center bg-gray-100 rounded px-4 py-3">
                <span className="mr-3 text-gray-400">
                  {/* <i className="fas fa-user"></i> */}
                  <LuUser/>
                </span>
                <Field
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="bg-transparent outline-none w-full"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-center bg-gray-100 rounded px-4 py-3">

               
                <span className="mr-3 text-gray-400">
                  {/* <i className="fas fa-envelope"></i> */}
                  <HiOutlineMail/>
                </span>
                <Field
                  type="email"
                  placeholder="Email"
                  name="email"
                  className="bg-transparent outline-none w-full"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-center bg-gray-100 rounded px-4 py-3">
                <span className="mr-3 text-gray-400">
                  {/* <i className="fas fa-lock"></i> */}
                  <GoLock/>
                </span>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="bg-transparent outline-none w-full"
                />
                 <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>
            <button 
            type='submit'
            disabled={isSubmitting}
            className="w-full bg-yellow-500 text-white py-3 rounded-full hover:bg-yellow-600 transition">
              SIGN UP
            </button>
          </Form>

 )}
          </Formik>
         

        </div>
      </div>
    </div>
  );
}

export default Registration;
