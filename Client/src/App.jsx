
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify'
function App() {
 

  return (
    <>
    <Navbar/>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/signup' element={<Registration/>}/>
    <Route path='/signin' element={<Login/>}/>
   </Routes>


    <ToastContainer
        position="bottom-right"
        autoClose={2000}
        // hideProgressBar={true}
        // closeOnClick
        // pauseOnHover
        // draggable
       
      />
    </>
  )
}

export default App
