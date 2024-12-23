import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const token = localStorage.getItem("access_token");
  return token ? <Outlet /> : <Navigate to={"/login"} />;
}

export default PrivateRoute;
