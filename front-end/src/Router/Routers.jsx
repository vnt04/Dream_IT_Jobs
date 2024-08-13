import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Jobs from "../Pages/Jobs";
import Blog from "../Pages/Blog";
import ProfileCV from "../Pages/ProfileCV";
import Home from "../Pages/Home";
import JobDetail from "../Pages/Jobs/JobDetail";
import Login from "../Pages/Account/Login";
import Register from "../Pages/Account/Register";
import SignUp from "../Pages/Account/SignUp";
import EmailVerification from "../Pages/Account/EmailVerification";
import PostJobs from "../Pages/PostJobs";
import Company from "../Pages/Company";
import Profile from "../Pages/Account/Profile";
import MyCV from "../Pages/Account/MyCV";
import MyFollow from "../Pages/Account/MyFollow";
import MyJobs from "../Pages/Account/MyJobs";
import SearchResult from "../Pages/Company/SearchResult";
import CompanyDetail from "../Pages/Company/CompanyDetail";
import MyCompany from "../Pages/Account/MyCompany";
import ForgotPassword from "../Pages/Account/ForgotPassword";
import BlankPage from "../components/BlankPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/viec-lam-it",
        element: <Jobs />,
      },
      {
        path: "/viec-lam-it/:jobID",
        element: <JobDetail />,
      },
      {
        path: "/cong-ty-it",
        element: <Company />,
      },
      { path: "/cong-ty-it/:companyID", element: <CompanyDetail /> },
      {
        path: "/cong-ty-it/:companyID/update",
        element: <MyCompany />,
      },
      {
        path: "/cong-ty-it/search",
        element: <SearchResult />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/ho-so-CV",
        element: <ProfileCV />,
      },
      {
        path: "/dang-bai",
        element: <PostJobs />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      { path: "/verify-email", element: <EmailVerification /> },
      { path: "/password", element: <ForgotPassword /> },
      { path: "/blank", element: <BlankPage /> },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/user/profile",
        element: <Profile />,
      },
      {
        path: "/user/my-cv",
        element: <MyCV />,
      },
      {
        path: "/user/my-jobs",
        element: <MyJobs />,
      },
      {
        path: "/user/my-follow",
        element: <MyFollow />,
      },
    ],
  },
]);

export default router;
