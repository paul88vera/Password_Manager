import { Link, useLoaderData } from "react-router-dom";
import { getPasswords } from "../api/passwords";
import Modal from "../components/Modal";
import { CgWebsite } from "react-icons/cg";

/* 
CLIENT = {Client: 1, PassID: 1, PassPW: "password123", PassSite: "example.com", PassUsername: "clientAuser", created_at: "2025-08-28T03:00:19.000Z"}
*/

// eslint-disable-next-line react-refresh/only-export-components
const Sites = () => {
  const passwords = useLoaderData();

  const passFiltered = passwords.filter(
    (item, index, self) =>
      index === self.findIndex((i) => i.PassSite === item.PassSite)
  );

  return (
    <div className="grid grid-flow-row gap-4 mt-4 pb-10 w-full">
      {passFiltered.map((item) => (
        <Link
          to={`/sites/${item.PassSite}`}
          className="site-card bg-slate-300 flex flex-row flex-nowrap gap-4 align-middle justify-start p-4 rounded-lg text-slate-900 font-bold w-full md:w-100 md:max-w-[350px] hover:text-lime-500 md:hover:scale-105 hover:opacity-90 transition ease-in-out"
          key={item.PassID}>
          {/* <img src="#" alt={item.ClientUsername} /> */}
          <CgWebsite className="text-4xl text-slate-900 hover:text-lime-500" />
          <h3 className="text-slate-900 hover:text-lime-500">
            {item.PassSite}
          </h3>
        </Link>
      ))}
    </div>
  );
};

async function loader({ request: { signal }, params: id }) {
  const passwords = await getPasswords(id, { signal });
  return passwords;
}

export const SitesRoute = {
  loader,
  element: <Sites />,
};
