import { createBrowserRouter, Navigate } from "react-router-dom";
import { LayoutRoute } from "./layouts/RootLayout";
import ErrorMessage from "./pages/ErrorMessage";
import Error from "./pages/Error";
import { ClientRoute } from "./pages/Client";
import { SitesRoute } from "./pages/Sites";
import Settings from "./pages/Settings";
import { AddClientRoute } from "./pages/AddClient";
import Login from "./pages/Login";
import User from "./pages/User";
import { ClientInnerRoute } from "./pages/ClientInner";
import { SiteInnerPage } from "./pages/SitesInner";
import { AddUserRoute } from "./pages/AddUser";
import { ProfileRoute } from "./pages/Profile";
import { EditClientRoute } from "./pages/EditClient";
import EditUser from "./pages/EditUser";
import { EditPasswordRoute } from "./pages/EditPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    ...LayoutRoute,
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
              { path: ":id/edit", ...EditClientRoute },
            ],
          },
          {
            path: "sites",
            children: [
              { index: true, ...SitesRoute },
              { path: ":id", ...SiteInnerPage },
            ],
          },
          { path: "login", element: <Login /> },
          {
            path: `profile`,
            children: [
              { index: true, ...ProfileRoute },
              { path: ":id/edit", element: <EditUser /> },
            ],
          },
          {
            path: "password/:id/edit",
            ...EditPasswordRoute,
          },
          { path: "settings", element: <Settings /> },
          { path: "add-client", ...AddClientRoute },
          { path: "add-user", ...AddUserRoute },
          { path: "*", element: <Error /> },
        ],
      },
    ],
  },
]);
