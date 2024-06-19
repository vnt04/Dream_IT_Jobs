import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Jobs from "../Pages/Jobs";
import Company from "../Pages/Company";
import Blog from "../Pages/Blog";
import Forum from "../Pages/Forum";
import ProfileCV from "../Pages/ProfileCV";
import Home from "../Pages/Home";
import JobDetail from "../Pages/Jobs/JobDetail";
import Login from "../Pages/Account/Login";
import Register from "../Pages/Account/Register";
import SignUp from "../Pages/Account/SignUp";
import PostJobs from "../Pages/PostJobs";

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
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/dien-dan",
        element: <Forum />,
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
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
