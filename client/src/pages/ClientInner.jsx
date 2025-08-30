import { Link, useLoaderData } from "react-router-dom";
import { getPassword } from "../api/passwords";
import { RiUserSearchFill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { getClient } from "../api/clients";
import { useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
const ClientInner = () => {
  const { passwords, client } = useLoaderData();
  const [isOpen, setIsOpen] = useState();

  const openedCard = () => {
    setIsOpen((current) => !current);
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="grid grid-cols-1 grid-rows-auto flex-nowrap justify-between bg-slate-200 p-8 rounded-2xl min-w-dvh">
        <div className="flex flex-row gap-4 justify-start relative">
          <RiUserSearchFill className="text-7xl text-slate-900" />
          <p className="text-3xl font-bold text-slate-950">
            {client[0].ClientUsername || "Unknown"} <br />{" "}
            <span className="text-2xl font-normal">
              {client[0].ClientCompany || "Arkham Asylum"}
            </span>
          </p>
          <Link className="!text-slate-950 absolute right-0 top-0 button flex flex-row gap-2 flex-nowrap align-middle hover:!text-lime-500 hover:scale-105 transition ease-in-out">
            Add Password <FaPlusCircle className="text-2xl text-slate-900" />
          </Link>
        </div>

        <div className="mt-8">
          {/* password cards - need to map */}
          {passwords.map((pass) => (
            <div
              className="site-card text-slate-300 flex flex-col flex-nowrap gap-0 align-middle justify-start p-4 rounded-lg bg-slate-900 font-bold max-w-[380px]  hover:scale-105 transition ease-in-out"
              key={pass.PassID}>
              <div
                className="flex flex-row gap-4 align-middle justify-start w-full relative cursor-pointer"
                onClick={openedCard}>
                <RiUserSearchFill className="text-4xl bg-slate-900 " />
                <h3 className="bg-slate-900 ">{pass.PassSite}</h3>
                {isOpen ? (
                  <MdEdit className="text-2xl text-lime-500 hover:text-slate-300 absolute right-0" />
                ) : null}
              </div>
              <div className="p-0">
                {isOpen ? (
                  <div className="flex flex-col gap-4 pt-4">
                    <label
                      htmlFor="username"
                      className="flex flex-row flex-nowrap gap-4 justify-end">
                      Username:{" "}
                      <input
                        type="text"
                        name="username"
                        id="username"
                        defaultValue={pass.PassUsername}
                        className="w-auto bg-slate-300 text-slate-900 pl-2 rounded-sm"
                      />
                    </label>
                    <label
                      htmlFor="Password"
                      className="flex flex-row flex-nowrap gap-4 justify-end">
                      Password:{" "}
                      <input
                        type="text"
                        name="password"
                        id="password"
                        defaultValue={pass.PassPW}
                        className="w-auto bg-slate-300 text-slate-900 pl-2 rounded-sm"
                      />
                    </label>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

async function loader({ request: { signal }, params: { id } }) {
  const passwords = await getPassword(id, { signal });
  const client = await getClient(id, { signal });
  return { passwords: passwords, client: client };
}

export const ClientInnerRoute = {
  loader,
  element: <ClientInner />,
};
