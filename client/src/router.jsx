import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import ErrorMessage from "./pages/ErrorMessage";
import Error from "./pages/Error";
import { ClientRoute } from "./pages/Client";
import { SitesRoute } from "./pages/Sites";
// import { SettingsRoute } from "./pages/Settings";
import { AddClientRoute } from "./pages/AddClient";
import { ClientInnerRoute } from "./pages/ClientInner";
import { SiteInnerPage } from "./pages/SitesInner";
import { AddUserRoute } from "./pages/AddUser";
import { ProfileRoute } from "./pages/Profile";
import { EditClientRoute } from "./pages/EditClient";
import { EditUserRoute } from "./pages/EditUser";
import { EditPasswordRoute } from "./pages/EditPassword";
import { UserRoute } from "./pages/User";
import { OrgRedirect } from "./components/OrgRedirect";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <OrgRedirect />,
  },
  {
    path: `/:orgId`,
    element: <RootLayout />,
    children: [
      {
        errorElement: <ErrorMessage />,
        children: [
          {
            index: true,
            element: <Navigate to="profile" />,
          },
          {
            path: "client",
            children: [
              { index: true, ...ClientRoute },
              {
                path: ":id",
                children: [
                  { index: true, ...ClientInnerRoute },
                  { path: "edit", ...EditClientRoute },
                ],
              },
            ],
          },
          {
            path: "sites",
            children: [
              { index: true, ...SitesRoute },
              { path: ":id", ...SiteInnerPage },
            ],
          },
          {
            path: `profile`,
            children: [{ index: true, ...ProfileRoute }],
          },
          {
            path: "manager/:id",
            children: [
              { index: true, ...UserRoute },
              { path: "edit", ...EditUserRoute },
            ],
          },
          {
            path: "password/:id/edit",
            ...EditPasswordRoute,
          },
          // { path: "settings", ...SettingsRoute },
          { path: "add-client", ...AddClientRoute },
          { path: "add-manager", ...AddUserRoute },
          { path: "*", element: <Error /> || <Navigate to="profile" /> },
        ],
      },
    ],
  },
]);
