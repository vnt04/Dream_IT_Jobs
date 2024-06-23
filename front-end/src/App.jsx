import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
