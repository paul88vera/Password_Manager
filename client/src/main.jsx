// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";
import { ErrorBoundary } from "./pages/ErrorBoundary.jsx";
import "./index.css";
import { ClientRoute } from "./pages/Client.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <ErrorBoundary fallback={ClientRoute}>
    <RouterProvider router={router} />
  </ErrorBoundary>
  // </StrictMode>
);
