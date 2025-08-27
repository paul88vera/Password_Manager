import { useLoaderData } from "react-router-dom";
import { getClients } from "../api/clients";
import { getUsers } from "../api/users";

/* 
CLIENT = 0{ClientID: 1, ClientUsername: 'client_one', ClientEmail: 'client1@example.com', POC: 1, created_at: '2025-08-24T19:48:43.000Z'}

USER = 0{ UserActive: 1, UserEmail: "alice@example.com", UserID: 1, UserLogin: "alice123", UserName: "Alice Smith", UserRole: "Admin", created_at: "2025-08-24T19:48:43.000Z"}
*/

// eslint-disable-next-line react-refresh/only-export-components
const Dashboard = () => {
  const data = useLoaderData();

  return (
    <div className="flex flex-col">
      Vault:
      <br />
      <div>
        {data.client.map((item) => (
          <div key={item.ClientID}>{item.ClientUsername}</div>
        ))}
      </div>
    </div>
  );
};

async function loader({ request: { signal } }) {
  const client = getClients({ signal });
  const user = getUsers({ signal });
  return { client: await client, user: await user };
}

export const DashboardRoute = {
  loader,
  element: <Dashboard />,
};
