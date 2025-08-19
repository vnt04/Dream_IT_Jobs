import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopWithRouter from "./components/ScrollToTopWithRouter";
import { useEffect } from "react";
import userApi from "./api/userApi";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./redux/actions/authActions";

function App() {
  // call to get Profile here, set global state for user.
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMe = async () => {
      const response = await userApi.getMe();
      dispatch(loginSuccess(response.data));
    };
    fetchMe();
  }, []);
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
      <ScrollToTopWithRouter />
    </>
  );
}

export default App;
