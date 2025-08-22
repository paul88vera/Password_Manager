import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import ErrorMessage from "./pages/ErrorMessage";
import Error from "./pages/Error";
import Dashboard from "./pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        errorElement: <ErrorMessage />,
        children: [
          { index: true, element: <Navigate to="/dashboard" /> },
          { path: "dashboard", element: <Dashboard /> },
          { path: "*", element: <Error /> },
        ],
      },
    ],
  },
]);
