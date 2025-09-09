import { Link, useLoaderData } from "react-router-dom";
import { getClients } from "../api/clients";
import { getPasswords } from "../api/passwords";
import { CgProfile } from "react-icons/cg";
import { capitalizeFirstWord } from "../utils/caps"; // capitalizes stuff

// eslint-disable-next-line react-refresh/only-export-components
const SitesInner = () => {
  const { client, passwords } = useLoaderData();

  // Takes password from URL slug
  const url = window.location;
  const slug = url.pathname.split("/").filter(Boolean);

  // password filter by SiteName
  const passwordFilteredBySite = passwords.filter(
    (item) => item.PassSite === slug[1]
  );

  // password filtered by ClientID = [1,2]
  const clientIDFilterByPassword = passwordFilteredBySite.map(
    (item) => item.Client
  );

  // Client filtered from passwords
  const clientsFiltered = client.filter((item) =>
    clientIDFilterByPassword.includes(item.ClientID)
  );

  return (
    <div className="flex flex-col gap-4 mt-4 mb-8">
      <h2>
        Website:{" "}
        <span className="text-3xl font-bold">
          {capitalizeFirstWord(passwordFilteredBySite[0].PassSite)}
        </span>
      </h2>
      {clientsFiltered.map((item) => (
        <Link
          to={`/client/${item.ClientID}`}
          className="site-card bg-slate-300 flex flex-row flex-nowrap gap-4 align-middle justify-start p-4 rounded-lg text-slate-900 font-bold w-full md:w-100 md:max-w-[350px] hover:text-lime-500 md:hover:scale-105 hover:opacity-90 transition ease-in-out"
          key={item.ClientID}>
          {/* <img src="#" alt={clientFilter} /> */}
          <CgProfile className="text-4xl text-slate-900 hover:text-lime-500" />
          <h3 className="text-slate-900 hover:text-lime-500">
            {capitalizeFirstWord(item.ClientUsername)}
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
