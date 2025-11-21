import { useOrganization } from "@clerk/clerk-react";
import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  const { organization } = useOrganization();

  return (
    <div>
      404 - page does not exist
      <br />
      <Link to={`/${organization.id}`}>Get out of here!!</Link>
    </div>
  );
};

export default React.memo(Error);
