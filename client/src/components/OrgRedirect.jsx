import { Navigate, useLocation } from "react-router-dom";
import { useOrganization } from "@clerk/clerk-react";
import * as React from "react";

export function OrgRedirect() {
  const { organization } = useOrganization();
  const location = useLocation();

  const redirectPath = React.useMemo(() => {
    // Strip any leading slash to keep it clean
    const cleanPath = location.pathname.replace(/^\//, "");

    if (!organization) return null;
    return `/${organization.id}/${cleanPath}`;
  }, [organization, location.pathname]);

  if (!organization || !redirectPath) {
    return <div>Loading...</div>;
  }

  return <Navigate to={redirectPath} replace />;
}
