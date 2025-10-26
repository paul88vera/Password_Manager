import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";
import { ErrorBoundary } from "./pages/ErrorBoundary.jsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import Error from "./pages/Error.jsx";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ErrorBoundary fallback={<Error />}>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </ClerkProvider>
  </StrictMode>
);
