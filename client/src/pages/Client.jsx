import { Link, useLoaderData } from "react-router-dom";
import { getClients } from "../api/clients";
import { CgProfile } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";
// import { capitalizeFirstWord } from "../utils/caps";
import { useState } from "react";
import { getManagers } from "../api/managers";
import ClientCard from "../components/ClientCard";

// eslint-disable-next-line react-refresh/only-export-components
const Client = () => {
  const { client, user } = useLoaderData();

  // Used for Filter State
  const [filter, setFilter] = useState("");
  const [searchOpen, setSearchOpen] = useState();

  return (
    <div className="flex flex-col gap-4  pb-10">
      <h2>Search Clients:</h2>
      <div className="max-w-[1000px] w-full flex flex-col justify-center align-middle content-center">
        <IoSearch
          className={`text-3xl text-lime-500 hover:scale-115 transition-all ease-in-out ${
            searchOpen ? "hidden" : null
          }`}
          onClick={() => {
            setSearchOpen(true);
          }}
        />
        {searchOpen ? (
          <input
            type="text"
            placeholder="Search"
            onChange={(event) => {
              setFilter(event.target.value);
            }}
            className="p-2 text-center rounded-full bg-slate-500 text-slate-200 w-full placeholder:!text-slate-200 focus:outline-1 focus:outline-lime-500"
          />
        ) : null}
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4">
        {client && user == "" ? (
          <Link to="/add-manager">
            No Clients or Managers Yet... Add A Manager
          </Link>
        ) : null}
        {client == "" && user != "" ? (
          <Link to="/add-client">No Clients Yet... Add A Client</Link>
        ) : null}
        {client
          ?.filter((val) => {
            if (filter == "") {
              return val;
            } else if (
              val.ClientUsername.toLowerCase().includes(filter.toLowerCase())
            ) {
              return val;
            }
          })
          .map((data, index) => (
            <ClientCard key={index} id={data.ClientId}>
              <CgProfile className="text-4xl text-slate-900 " />
              <h3 className="text-slate-900 ">{data.ClientUsername}</h3>
            </ClientCard>
          ))}
      </div>
    </div>
  );
};

async function loader({ request: { signal } }) {
  const client = await getClients({ signal });
  const user = await getManagers({ signal });
  return { client: client, user: user };
}

export const ClientRoute = {
  loader,
  element: <Client />,
};
