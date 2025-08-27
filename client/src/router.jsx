import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import ErrorMessage from "./pages/ErrorMessage";
import Error from "./pages/Error";
import { DashboardRoute } from "./pages/Dashboard";
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
          {
            path: "dashboard",
            children: [{ index: true, ...DashboardRoute }],
          },
          { path: "login", element: <Login /> },
          { path: "vault", ...DashboardRoute },
          { path: "settings", element: <Settings /> },
          { path: "add", element: <AddPassword /> },
          { path: "*", element: <Error /> },
        ],
      },
    ],
  },
]);
