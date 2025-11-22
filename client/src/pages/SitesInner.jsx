import { Link, useLoaderData } from "react-router-dom";
import { getClients } from "../api/clients";
import { getPasswords } from "../api/passwords";
import { CgProfile } from "react-icons/cg";
// import { capitalizeFirstWord } from "../utils/caps"; // capitalizes stuff
import { BiChevronLeftSquare } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import React, { useState } from "react";
import ClientCard from "../components/ClientCard";

const SitesInner = () => {
  const { client, passwords } = useLoaderData();
  const organization = client[0]?.OrgId;

  // Used for Filter State
  const [filter, setFilter] = useState("");
  const [searchOpen, setSearchOpen] = useState();

  // Takes password from URL slug
  const url = window.location;
  const slug = url.pathname.split(`/${organization}/sites/`).filter(Boolean);

  // password filter by SiteName
  const passwordFilteredBySite = passwords.filter(
    (item) => item.PassSite.toLowerCase() === slug[0]
  );

  // password filtered by ClientID = [1,2]
  const clientIDFilterByPassword = passwordFilteredBySite.map(
    (item) => item.ClientId
  );

  // Client filtered from passwords
  const clientsFiltered = client.filter((item) =>
    clientIDFilterByPassword.includes(item.ClientId)
  );

  return (
    <div className="flex flex-col gap-4 mt-4 mb-8">
      <div className="flex flex-col flex-nowrap gap-4 align-middle justify-start w-20">
        <Link to="../">
          <BiChevronLeftSquare className="text-3xl text-lime-500 hover:scale-115 transition-all ease-in-out cursor-pointer" />
        </Link>
      </div>
      <div className="flex flex-row flex-nowrap gap-2 justify-start">
        <h2 className="mt-2">Website:</h2>
        <span className="flex flex-row flex-nowrap gap-2 text-3xl font-bold text-lime-500 align-top">
          {passwordFilteredBySite[0]?.PassSite}
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
          .map((item, index) => (
            <ClientCard
              key={index}
              id={item.ClientId}
              name={item.ClientUsername}
              organization={organization}>
              <CgProfile className="text-4xl text-slate-900 " />
              <h3 className="text-slate-900 ">{item.ClientUsername}</h3>
            </ClientCard>
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

// eslint-disable-next-line react-refresh/only-export-components
export const SiteInnerPage = {
  loader,
  element: <SitesInner />,
};

export default React.memo(SitesInner);
