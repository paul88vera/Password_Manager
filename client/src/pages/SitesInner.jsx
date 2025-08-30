import { getClient } from "../api/clients";
import { getPassword } from "../api/passwords";

// eslint-disable-next-line react-refresh/only-export-components
const SitesInner = () => {
  return <div>inner site</div>;
};

async function loader({ request: { signal }, params: { id } }) {
  const passwords = await getPassword(id, { signal });
  const client = await getClient(id, { signal });
  return { passwords: passwords, client: client };
}

export const SiteInnerPage = {
  loader,
  element: <SitesInner />,
};
