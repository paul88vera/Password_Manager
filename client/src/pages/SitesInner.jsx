import { Link, useLoaderData } from "react-router-dom";
import { getClients } from "../api/clients";
import { getPasswords } from "../api/passwords";
import { CgProfile } from "react-icons/cg";
// import { capitalizeFirstWord } from "../utils/caps"; // capitalizes stuff
import { BiChevronLeftSquare } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
const SitesInner = () => {
  const { client, passwords } = useLoaderData();

  // Used for Filter State
  const [filter, setFilter] = useState("");
  const [searchOpen, setSearchOpen] = useState();

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
    clientIDFilterByPassword.includes(item.ClientId)
  );

  return (
    <div className="flex flex-col gap-4 mt-4 mb-8">
      <div className="flex flex-col flex-nowrap gap-4 align-middle justify-start">
        <Link to="../">
          <BiChevronLeftSquare className="text-3xl text-lime-500 hover:scale-115 transition-all ease-in-out cursor-pointer" />
        </Link>
      </div>
      <div className="flex flex-row flex-nowrap gap-2 justify-start">
        <h2 className="mt-2">Website:</h2>
        <span className="flex flex-row flex-nowrap gap-2 text-3xl font-bold text-lime-500 align-top">
          {passwordFilteredBySite[0].PassSite}
          <IoSearch
            className={`text-3xl text-lime-500 hover:scale-115 transition-all ease-in-out cursor-pointer mt-1 ${
              searchOpen ? "hidden" : null
            }`}
            onClick={() => {
              setSearchOpen(true);
            }}
          />
        </span>
      </div>
      <div>
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
      <div className="mt-4">
        {clientsFiltered
          ?.filter((val) => {
            if (filter == "") {
              return val;
            } else if (
              val.ClientUsername.toLowerCase().includes(filter.toLowerCase())
            ) {
              return val;
            }
          })
          .map((item) => (
            <Link
              to={`/client/${item.ClientId}`}
              className="site-card bg-slate-300 flex flex-row flex-nowrap gap-4 align-middle justify-start p-4 rounded-lg text-slate-900 font-bold w-full md:w-100 md:max-w-[350px]  md:hover:scale-105 hover:opacity-90 transition ease-in-out"
              key={item.ClientId}>
              <CgProfile className="text-4xl text-slate-900 " />
              <h3 className="text-slate-900 ">{item.ClientUsername}</h3>
            </Link>
          ))}
      </div>
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
