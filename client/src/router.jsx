import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import ErrorMessage from "./pages/ErrorMessage";
import Error from "./pages/Error";
import Dashboard from "./pages/Dashboard";
import Vault from "./pages/Vault";
import Settings from "./pages/Settings";
import AddPassword from "./pages/AddPassword";
import Login from "./pages/Login";

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
          { path: "login", element: <Login /> },
          { path: "vault", element: <Vault /> },
          { path: "settings", element: <Settings /> },
          { path: "add", element: <AddPassword /> },
          { path: "*", element: <Error /> },
        ],
      },
    ],
  },
]);
