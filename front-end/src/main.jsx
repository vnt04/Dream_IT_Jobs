import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./Router/Routers";
import AuthProvider from "./context/AuthProvider";
import DataProvider from "./context/DataProvider";
import "./i18n/i18n";
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <DataProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </DataProvider>
  </Provider>,
);
