
import { Outlet } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>
    <nav>Nav Bar</nav>
    <Outlet/>
    <footer>Footer</footer>
    </>
  )
}

export default App
