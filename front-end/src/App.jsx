import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <Navbar />
      <div className="w-full">
        <Outlet />
      </div>
      <div className="bg-gray-300">
        <Footer />
      </div>
      <ToastContainer />
      <ScrollToTop />
    </>
  );
}

export default App;
