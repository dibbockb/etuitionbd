import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { router } from "./Router/Router.jsx";
import { RouterProvider } from "react-router";
import AuthProvider from "./Components/AuthLayout/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);