import { Link, useLoaderData } from "react-router-dom";
import { getUsers } from "../api/users";
import { capitalizeFirstWord } from "../utils/caps";
import { CgProfile } from "react-icons/cg";
import { getClients } from "../api/clients";

// eslint-disable-next-line react-refresh/only-export-components
const Profile = () => {
  const { user, client } = useLoaderData();

  const userClientFilter = client.filter((item) => item.POC == user[0]?.UserID);

  return (
    <div className="grid grid-cols-1 gap-4 mt-4">
      {user != "" ? (
        <div>
          Welcome, <b className="text-lime-500">{user[0]?.UserName}!</b>
          <br />
          <Link
            to={`/user/${user[0]?.UserID}/edit`}
            className="!text-red-800 hover:!text-lime-500">
            Edit
          </Link>
        </div>
      ) : (
        <Link to="/add-user">Add A New User</Link>
      )}
      <div className="flex flex-col md:flex-row gap-4">
        {client != "" ? (
          <div className="flex flex-col gap-4 mt-4">
            <h2>Your Clients:</h2>
            {userClientFilter.map((item) => (
              <Link
                to={`/client/${item.ClientID}`}
                className="site-card bg-slate-200 flex flex-row flex-nowrap gap-4 align-middle justify-start p-4 rounded-lg text-slate-900 font-bold w-full md:w-100 md:max-w-[350px]  md:hover:scale-105 hover:opacity-90 transition ease-in-out"
                key={item.ClientID}>
                {/* <img src="#" alt={item.ClientUsername} /> */}
                <CgProfile className="text-4xl text-slate-900 " />
                <h3 className="text-slate-900 ">
                  {capitalizeFirstWord(item.ClientUsername)}
                </h3>
              </Link>
            ))}
          </div>
        ) : null}
        {(user != "" && user[0]?.UserRole === "Admin") ||
        user[0]?.UserRole === "Manager" ? (
          <div>
            <div className="flex flex-col gap-4 mt-4">
              <h2>Users:</h2>
              {user.map((item) => (
                <Link
                  to={`/user/${item.UserID}`}
                  className={`site-card ${
                    item.UserActive == 1
                      ? `bg-slate-400 !text-slate-500`
                      : `bg-slate-600`
                  } flex flex-row flex-nowrap gap-4 align-middle justify-start p-4 rounded-lg  font-bold w-full md:w-100 md:max-w-[350px]  md:hover:scale-105 hover:opacity-90 transition ease-in-out`}
                  key={item.UserID}>
                  {/* <img src="#" alt={item.ClientUsername} /> */}
                  <CgProfile className="text-4xl text-slate-900 " />
                  <h3 className="text-slate-900 ">
                    {capitalizeFirstWord(item.UserName)}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

async function loader({ request: { signal } }) {
  const user = await getUsers({ signal });
  const client = await getClients({ signal });
  return { user: user, client: client };
}

export const ProfileRoute = {
  loader,
  element: <Profile />,
};
