import { Link, useLoaderData } from "react-router-dom";
import { getPasswords } from "../api/passwords";
import { MdOutlineComputer } from "react-icons/md";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import PasswordCard from "../components/PasswordCard";
import {useOrganization} from "@clerk/clerk-react";

const Sites = () => {
  const passwords = useLoaderData();
  const {organization} = useOrganization();

  // Used for Filter State
  const [filter, setFilter] = useState("");

  const [searchOpen, setSearchOpen] = useState();

  // Filters only one instance of a site // NO DOUBLE TITLES
  const passFiltered = passwords.filter(
    (item, index, self) =>
      index === self.findIndex((i) => i.PassSite === item.PassSite)
  );

  return (
    <div className="flex flex-col gap-4 pb-10 justify-center align-middle">
      <h2>Search Websites:</h2>
      <div className="max-w-[1000px] w-full flex flex-col justify-center align-middle content-center">
        <div className="flex flex-col flex-nowrap gap-4 align-middle justify-start">
          <IoSearch
            className={`text-3xl text-lime-500 hover:scale-115 transition-all ease-in-out cursor-pointer ${
              searchOpen ? "hidden" : null
            }`}
            onClick={() => {
              setSearchOpen(true);
            }}
          />
        </div>
        {searchOpen ? (
          <input
            type="text"
            placeholder="Search"
            onChange={(event) => {
              setFilter(event.target.value);
            }}
            className="p-2 text-center rounded-full bg-slate-500 text-slate-200 w-full placeholder:text-slate-200! focus:outline-1 focus:outline-lime-500 mt-4"
          />
        ) : null}
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {passFiltered == "" ? (
          <Link to={`/${organization.id}/client`}>
            No Sites Yet... Add A Password To A Client
          </Link>
        ) : null}
        {passFiltered
          ?.filter((val) => {
            if (filter == "") {
              return val;
            } else if (
              val.PassSite.replace(/\s+/g, " ") // "WP Site" → "WPSite"
                .toLowerCase()
                .includes(filter.replace(/\s+/g, " ").toLowerCase())
            ) {
              return val;
            }
          })
          .map((item, index) => (
            <PasswordCard key={index} id={item.PassId} name={item.PassSite}>
              <MdOutlineComputer className="text-4xl text-slate-900 " />
              <h3 className="text-slate-900 ">{item.PassSite}</h3>
            </PasswordCard>
          ))}
      </div>
    </div>
  );
};

async function loader({ request: { signal } }) {
  const passwords = await getPasswords({ signal });
  return passwords;
}

// eslint-disable-next-line react-refresh/only-export-components
export const SitesRoute = {
  loader,
  element: <Sites />,
};

export default React.memo(Sites);
