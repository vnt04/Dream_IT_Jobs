
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './layouts/Navbar'
import Footer from './layouts/Footer'

function App() {

  return (

    <>
      <Navbar/>
      <Outlet/> 
      <Footer/>
    </>
    
    
  )
}

export default App
