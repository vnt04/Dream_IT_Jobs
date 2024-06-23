import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./Router/Routers";
import AuthProvider from "./context/AuthProvider";
import DataProvider from "./context/DataProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <DataProvider>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </DataProvider>
);
