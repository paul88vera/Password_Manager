import { Link, useLoaderData } from "react-router-dom";
import { getManagers } from "../api/managers";
import { CgProfile } from "react-icons/cg";
import { getClients } from "../api/clients";
import ClientCard from "../components/ClientCard";
import ManagerCard from "../components/ManagerCard";
import * as React from "react";

// eslint-disable-next-line react-refresh/only-export-components
const Profile = () => {
  const { user, client } = useLoaderData();

  const memoUser = React.useMemo(() => user, [user]);
  const memoClient = React.useMemo(() => client, [client]);
  const organization = memoUser[0]?.OrgId;

  const [userName, setUserName] = React.useState("");

  // Clerk username
  // const userName = useUser().user.fullName;

  React.useEffect(() => {
    if (memoUser.fulName) {
      setUserName(userName.fullName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memoUser]);

  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        Welcome, <b className="text-lime-500">{userName || "Admin User"}!</b>
      </div>
      <div className="flex flex-col-reverse md:flex-row gap-4">
        {memoClient != "" ? (
          <div className="flex flex-col gap-4 mt-4">
            <h2>Clients:</h2>
            {memoClient.map((item, index) => (
              <ClientCard
                key={index}
                id={item.ClientId}
                organization={organization}>
                <CgProfile className="text-4xl text-slate-900 " />
                <h3 className="text-slate-900 ">{item.ClientUsername}</h3>
              </ClientCard>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4 mt-4">
            <h2>Clients:</h2>
            <div className="site-card flex flex-row flex-nowrap gap-4 align-middle justify-start  rounded-lg font-bold w-full md:w-100 md:max-w-[350px] text-lime-500">
              {memoUser == "" && memoClient == "" ? (
                <Link to={`/${organization}/add-manager`}>
                  No Clients or Managers Yet... :{"("}
                  <br /> Add A Manager
                </Link>
              ) : (
                <Link to={`/${organization}/add-client`}>
                  No Clients Yet... :{"("}
                  <br /> Add A Client
                </Link>
              )}
            </div>
          </div>
        )}
        {memoUser !== "" ? (
          <div>
            <div className="flex flex-col gap-4 mt-4">
              <h2>Account Managers:</h2>
              {memoUser.map((item, index) => (
                <ManagerCard
                  key={index}
                  id={item.UserId}
                  organization={organization}
                  active={item.UserActive}>
                  <CgProfile className="text-4xl text-slate-900 " />
                  <h3 className="text-slate-900 ">{item.UserName}</h3>
                </ManagerCard>
              ))}
            </div>
          </div>
        ) : (
          <Link to={`/${organization}/add-manager`}>
            No Clients or Managers Yet... :{"("}
            <br /> Add A Manager
          </Link>
        )}
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

// export default React.memo(Profile);
