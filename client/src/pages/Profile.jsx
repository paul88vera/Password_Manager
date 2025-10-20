import { Link, useLoaderData } from "react-router-dom";
import { getManagers } from "../api/managers";
// import { capitalizeFirstWord } from "../utils/caps";
import { CgProfile } from "react-icons/cg";
import { getClients } from "../api/clients";
import { useUser } from "@clerk/clerk-react";

// eslint-disable-next-line react-refresh/only-export-components
const Profile = () => {
  const { user, client } = useLoaderData();

  // const userClientFilter = client.filter(
  //   (item) => item.Manager == user[0]?.UserId
  // ); // if you want to see only your clients

  const userName = useUser().user.fullName;

  return (
    <div className="grid grid-cols-1 gap-4 mt-4">
      {user != "" ? (
        <div>
          Welcome, <b className="text-lime-500">{userName}!</b>
        </div>
      ) : (
        <Link to="/add-user">Add A New Manager</Link>
      )}
      <div className="flex flex-col md:flex-row gap-4">
        {client != "" ? (
          <div className="flex flex-col gap-4 mt-4">
            <h2>Clients:</h2>
            {client.map((item, index) => (
              <Link
                to={`/client/${item.ClientId}`}
                className="site-card bg-slate-200 flex flex-row flex-nowrap gap-4 align-middle justify-start p-4 rounded-lg text-slate-900 font-bold w-full md:w-100 md:max-w-[350px] md:hover:scale-105 hover:opacity-90 transition ease-in-out"
                key={index}>
                {/* <img src="#" alt={item.ClientUsername} /> */}
                <CgProfile className="text-4xl text-slate-900 " />
                <h3 className="text-slate-900 ">{item.ClientUsername}</h3>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4 mt-4">
            <h2>Clients:</h2>
            <div className="site-card flex flex-row flex-nowrap gap-4 align-middle justify-start  rounded-lg font-bold w-full md:w-100 md:max-w-[350px] text-lime-500">
              {!user ? (
                <Link to="/add-user">
                  No Managers Yet... :{"("}
                  <br /> Add A Manager
                </Link>
              ) : (
                <Link to="/add-client">
                  No Clients Yet... :{"("}
                  <br /> Add A Client
                </Link>
              )}
            </div>
          </div>
        )}
        {(user != "" && user[0]?.UserRole === "Admin") ||
        user[0]?.UserRole === "Manager" ? (
          <div>
            <div className="flex flex-col gap-4 mt-4">
              <h2>Account Managers:</h2>
              {user.map((item) => (
                <Link
                  to={`/user/${item.UserId}`}
                  className={`site-card ${
                    item.UserActive == 1
                      ? `bg-slate-400 !text-slate-500`
                      : `bg-slate-600`
                  } flex flex-row flex-nowrap gap-4 align-middle justify-start p-4 rounded-lg  font-bold w-full md:w-100 md:max-w-[350px]  md:hover:scale-105 hover:opacity-90 transition ease-in-out`}
                  key={item.UserId}>
                  {/* <img src="#" alt={item.ClientUsername} /> */}
                  <CgProfile className="text-4xl text-slate-900 " />
                  <h3 className="text-slate-900 ">{item.UserName}</h3>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

async function loader({ request: { signal }, params: { id } }) {
  const user = await getManagers({ signal });
  const client = await getClients(id, { signal });
  return { user: user, client: client };
}

export const ProfileRoute = {
  loader,
  element: <Profile />,
};
