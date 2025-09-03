import { Link, useLoaderData } from "react-router-dom";
import { getClients } from "../api/clients";
import { getPasswords } from "../api/passwords";
import { RiUserSearchFill } from "react-icons/ri";

// eslint-disable-next-line react-refresh/only-export-components
const SitesInner = () => {
  const { client, passwords } = useLoaderData();

  const url = window.location;
  const slug = url.pathname.split("/").filter(Boolean);

  // Works password by SiteName
  const passwordFilteredBySite = passwords.filter(
    (item) => item.PassSite === slug[1]
  );

  // Works password Client = [1,2]
  const clientIDFilterByPassword = passwordFilteredBySite.map(
    (item) => item.Client
  );

  // TODO this is wrong. Need to fix
  const clientsFiltered = client.filter((item) =>
    clientIDFilterByPassword.includes(item.ClientID)
  );

  return (
    <div className="flex flex-col gap-4 mt-4 mb-8">
      {clientsFiltered.map((item) => (
        <Link
          to={`/client/${item.ClientID}`}
          className="site-card bg-slate-300 flex flex-row flex-nowrap gap-4 align-middle justify-start p-4 rounded-lg text-slate-900 font-bold w-100 md:max-w-[350px] hover:text-lime-500 md:hover:scale-105 hover:opacity-90 transition ease-in-out"
          key={item.ClientID}>
          {/* <img src="#" alt={clientFilter} /> */}
          <RiUserSearchFill className="text-4xl text-slate-900 hover:text-lime-500" />
          <h3 className="text-slate-900 hover:text-lime-500">
            {item.ClientUsername}
          </h3>
        </Link>
      ))}
    </div>
  );
};

async function loader({ request: { signal } }) {
  const client = await getClients({ signal });
  const passwords = await getPasswords({ signal });
  return { client: client, passwords: passwords };
}

export const SiteInnerPage = {
  loader,
  element: <SitesInner />,
};
