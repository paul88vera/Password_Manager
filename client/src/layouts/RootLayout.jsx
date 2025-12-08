import {
  Outlet,
  ScrollRestoration,
  // useLocation,
  // useNavigate,
} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
  SignedOut,
  SignedIn,
  RedirectToSignIn,
  // useOrganization,
} from "@clerk/clerk-react";
import { attachClerkInterceptor } from "../api/base";
import { useAuth } from "@clerk/clerk-react";
import { memo, useEffect } from "react";

const RootLayout = () => {
  const { getToken } = useAuth();
  // const location = useLocation();

  useEffect(() => {
    attachClerkInterceptor(getToken);
  }, [getToken]);

  // const { organization } = useOrganization();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!organization || !organization.id) return;

  //   const currentOrgId = organization.id;
  //   const path = location.pathname;

  //   // 1. If path already starts with "/orgId", do NOTHING
  //   if (path.startsWith(`/${currentOrgId}`)) return;

  //   // 2. Detect if path incorrectly contains another orgId
  //   // e.g. /abcd123/profile → remove the first segment
  //   const segments = path.split("/").filter(Boolean); // removes empty items
  //   const firstSegment = segments[0];

  //   const isOrgIdInUrl =
  //     firstSegment &&
  //     /^[a-zA-Z0-9]+$/.test(firstSegment) &&
  //     firstSegment.length >= 10;
  //   // Clerk orgIds are long alphanumeric strings (10+ chars)

  //   let cleanedPath = path;

  //   if (isOrgIdInUrl) {
  //     // remove the incorrect org prefix
  //     cleanedPath = "/" + segments.slice(1).join("/");
  //   }

  //   // 3. Build corrected path (prefix with correct orgId)
  //   const corrected = `/${currentOrgId}${cleanedPath}`;

  //   // 4. Redirect only if different
  //   if (corrected !== path) {
  //     navigate(corrected, { replace: true });
  //   }
  // }, [organization, location.pathname, navigate]);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-0 flex-nowrap">
      <ScrollRestoration />

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <SignedIn>
        <div
          id="sidebar"
          className="md:float-left float-none p-0 md:w-15 w-screen">
          <Sidebar />
        </div>
        <div className="main-container md:float-end md:p-8 p-4 pb-10 w-full">
          <Outlet />
        </div>
      </SignedIn>
    </div>
  );
};

export default memo(RootLayout);
