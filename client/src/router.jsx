import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import ErrorMessage from "./pages/ErrorMessage";
import Error from "./pages/Error";
import { ClientRoute } from "./pages/Client";
import { SitesRoute } from "./pages/Sites";
import Settings from "./pages/Settings";
import AddPassword from "./pages/AddPassword";
import Login from "./pages/Login";
import { ClientInnerRoute } from "./pages/ClientInner";
import SitesInner from "./pages/SitesInner";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        errorElement: <ErrorMessage />,
        children: [
          { index: true, element: <Navigate to="/client" /> },
          {
            path: "client",
            children: [
              { index: true, ...ClientRoute },
              { path: ":id", ...ClientInnerRoute },
            ],
          },
          {
            path: "sites",
            children: [
              { index: true, ...SitesRoute },
              { path: ":id", element: <SitesInner /> },
            ],
          },
          { path: "login", element: <Login /> },
          { path: "settings", element: <Settings /> },
          { path: "add", element: <AddPassword /> },
          { path: "*", element: <Error /> },
        ],
      },
    ],
  },
]);
