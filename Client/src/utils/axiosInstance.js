import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'https://productmanagement-98n0.onrender.com', 
  withCredentials: true,

  
});


export default axiosInstance;