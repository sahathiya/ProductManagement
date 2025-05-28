import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'https://productmanagement-98n0.onrender.com', 
  //  baseURL: 'http://localhost:4000', 
  withCredentials: true,

  
});


export default axiosInstance;