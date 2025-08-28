import { Link, useLoaderData } from "react-router-dom";
import { getClients } from "../api/clients";
import Modal from "../components/Modal";
import { RiUserSearchFill } from "react-icons/ri";

/* 
CLIENT = 0{ClientID: 1, ClientUsername: 'client_one', ClientEmail: 'client1@example.com', POC: 1, created_at: '2025-08-24T19:48:43.000Z'}

USER = 0{ UserActive: 1, UserEmail: "alice@example.com", UserID: 1, UserLogin: "alice123", UserName: "Alice Smith", UserRole: "Admin", created_at: "2025-08-24T19:48:43.000Z"}
*/

// eslint-disable-next-line react-refresh/only-export-components
const Client = () => {
  const client = useLoaderData();

  return (
    <div className="flex flex-col gap-4 mt-4">
      {client.map((item) => (
        <Link
          to={`/client/${item.ClientID}`}
          className="site-card bg-slate-300 flex flex-row flex-nowrap gap-4 align-middle justify-start p-4 rounded-lg text-slate-900 font-bold max-w-[350px] hover:text-lime-500 hover:scale-105 transition ease-in-out"
          key={item.ClientID}>
          {/* <img src="#" alt={item.ClientUsername} /> */}
          <RiUserSearchFill className="text-4xl text-slate-900 hover:text-lime-500" />
          <h3 className="text-slate-900 hover:text-lime-500">
            {item.ClientUsername}
          </h3>
        </Link>
      ))}

      <Modal />
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
