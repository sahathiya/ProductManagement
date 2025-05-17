
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Navbar from './components/Navbar'
function App() {
 

  return (
    <>
    <Navbar/>
   <Routes>
    <Route path='/signup' element={<Registration/>}/>
    <Route path='/signin' element={<Login/>}/>
   </Routes>
    </>
  )
}

export default App
