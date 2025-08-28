// import { useLoaderData } from "react-router-dom";
import { getPasswords } from "../api/passwords";
import { CgWebsite } from "react-icons/cg";

// eslint-disable-next-line react-refresh/only-export-components
const ClientInner = () => {
  // const passwords = useLoaderData();

  return <div>Client Inner</div>;
};

async function loader({ request: { signal }, params: { POC } }) {
  const passwords = await getPasswords(POC, { signal });
  return passwords;
}

export const ClientInnerRoute = {
  loader,
  element: <ClientInner />,
};
