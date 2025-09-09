import { Link, useLoaderData } from "react-router-dom";
import { getClients } from "../api/clients";
import { CgProfile } from "react-icons/cg";
import { capitalizeFirstWord } from "../utils/caps";

// eslint-disable-next-line react-refresh/only-export-components
const Client = () => {
  const client = useLoaderData();

  return (
    <div className="flex flex-col gap-4 mt-4">
      {client == "" ? (
        <div className="text-white">no clients yet...</div>
      ) : null}
      {client.map((item) => (
        <Link
          to={`/client/${item.ClientID}`}
          className="site-card bg-slate-300 flex flex-row flex-nowrap gap-4 align-middle justify-start p-4 rounded-lg text-slate-900 font-bold w-full md:w-100 md:max-w-[350px] hover:text-lime-500 md:hover:scale-105 hover:opacity-90 transition ease-in-out"
          key={item.ClientID}>
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
  return client;
}

export const ClientRoute = {
  loader,
  element: <Client />,
};
