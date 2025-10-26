import { Navigate } from "react-router-dom";
import { useOrganization } from "@clerk/clerk-react";

export function OrgRedirect() {
  const { organization } = useOrganization();

  if (!organization) {
    // Show a loader or fallback while Clerk initializes
    return <div>Loading...</div>;
  }

  return <Navigate to={`/${organization.id}/profile`} replace />;
}
