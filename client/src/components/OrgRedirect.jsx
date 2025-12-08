// import { Navigate, useLocation } from "react-router-dom";
// import { useOrganization } from "@clerk/clerk-react";
// import * as React from "react";

// export function OrgRedirect() {
//   const { organization } = useOrganization();
//   const location = useLocation();

//   const redirectPath = React.useMemo(() => {
//     // Strip any leading slash to keep it clean
//     const cleanPath = location.pathname.replace(/^\//, "");

//     if (!organization) return null;
//     return `/${organization.id}/${cleanPath}`;
//   }, [organization, location.pathname]);

//   if (!organization || !redirectPath) {
//     return <div>Loading...</div>;
//   }

//   return <Navigate to={redirectPath} replace />;
// }

import { useEffect } from "react";
import { useLocation, useNavigate, useMatches } from "react-router-dom";
import { useOrganization, useUser } from "@clerk/clerk-react";

export function OrgRedirect() {
  const { organization, isLoaded: orgLoaded } = useOrganization();
  const { isLoaded: userLoaded, user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const matches = useMatches();

  useEffect(() => {
    // Skip redirect for localhost:5400
    if (window.location.port === "5400") return;

    if (!userLoaded) return; // Still loading user
    if (!user) {
      navigate("/sign-in", { replace: true });
      return;
    }

    if (!orgLoaded) return;
    if (!organization) {
      navigate("/no-organization", { replace: true });
      return;
    }

    const orgId = organization.id;

    const parts = location.pathname.split("/").filter(Boolean);

    // If already at /orgId/... → do NOTHING
    if (parts[0] === orgId) return;

    // Remove repeated "dashboard" segments
    const cleanedParts = parts.filter((seg, idx) => {
      // Keep first "dashboard", remove duplicates after
      if (seg === "dashboard" && parts.indexOf("dashboard") !== idx) {
        return false;
      }
      return true;
    });

    // Force dashboard for empty or root-like routes
    const subPath = cleanedParts.length > 0
      ? cleanedParts.join("/")
      : "profile";

    const newPath = `/${orgId}/${subPath}`;

    // Prevent redirect loops
    if (location.pathname === newPath) return;

    // Validate route actually exists
    const newPathExists = matches.some((m) => m.pathname === newPath);

    navigate(
      newPathExists ? newPath : `/${orgId}/profile`,
      { replace: true }
    );
  }, [organization, user, userLoaded, orgLoaded, location.pathname, navigate, matches]);

  return null;
}

