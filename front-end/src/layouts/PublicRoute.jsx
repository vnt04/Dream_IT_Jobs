import { Navigate, Outlet } from "react-router-dom";

function PublicRoute() {
  const token = localStorage.getItem("access_token");
  return !token ? <Outlet /> : <Navigate to={"/"} />;
}

export default PublicRoute;
