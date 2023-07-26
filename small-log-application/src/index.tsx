import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ApplicationRoutes } from "./Routing/ApplicationRoutes";
import { LoginProvider } from "./Context/LoginAuthContext";
import { HandleProductProvider } from "./Context/HandleProductContext";
import { CartContextProvider } from "./Context/HandleCartContext";
import { ProductUserDynamicForm } from "./Components/ProductUserDynamicForm";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <LoginProvider>
      <HandleProductProvider>
        <CartContextProvider>
          <ApplicationRoutes />
        </CartContextProvider>
      </HandleProductProvider>
    </LoginProvider>
  </React.StrictMode>
);
