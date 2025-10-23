import { Form, Link, redirect, useLoaderData } from "react-router-dom";
import { useState } from "react";
import { editClient, getClient } from "../api/clients";
import { getManagers } from "../api/managers";
// import { capitalizeFirstWord } from "../utils/caps";

// eslint-disable-next-line react-refresh/only-export-components
const EditClient = () => {
  const { users, client } = useLoaderData();

  // Default State
  const [ClientUsername, setClientUsername] = useState(
    client[0]?.ClientUsername
  );
  const [ClientCompany, setClientCompany] = useState(
    client[0]?.ClientCompany || ""
  );
  const [ClientNotes, setClientNotes] = useState(client[0]?.ClientNotes || "");
  const [ClientEmail, setClientEmail] = useState(client[0]?.ClientEmail || "");
  const [POCs, setPOC] = useState(client[0]?.Manager || "");

  const clientID = client[0]?.ClientId;
  const clientOrg = client[0]?.OrgId;

  // Filters only Active Users
  const activeUserFilter = users.filter((item) => item.UserActive === 1);

  return (
    <div className="flex flex-col gap-4 md:mt-4 pb-8">
      <Form
        method="post"
        className="form_container flex flex-col justify-between gap-4 !h-full">
        <input type="hidden" name="clientId" defaultValue={clientID} />
        <input type="hidden" name="clientOrg" defaultValue={clientOrg} />
        <div className="flex flex-row gap-2 flex-nowrap justify-between align-middle text-right">
          <label htmlFor="ClientUsername" className="w-40">
            Full Name:
          </label>
          <input
            type="text"
            name="ClientUsername"
            id="ClientUsername"
            className="w-60"
            defaultValue={ClientUsername}
            onChange={(e) => {
              setClientUsername(e.target.value);
            }}
          />
        </div>

        <div className="flex flex-row gap-2 flex-nowrap justify-between align-middle text-right">
          <label htmlFor="ClientCompany" className="w-40">
            Company:
          </label>
          <input
            type="text"
            name="ClientCompany"
            id="ClientCompany"
            className="w-60"
            defaultValue={ClientCompany}
            onChange={(e) => {
              setClientCompany(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-row gap-2 flex-nowrap justify-between align-middle text-right">
          <label htmlFor="ClientEmail" className="w-40">
            Email:
          </label>
          <input
            type="email"
            name="ClientEmail"
            id="ClientEmail"
            className="w-60"
            defaultValue={ClientEmail}
            onChange={(e) => {
              setClientEmail(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-row gap-2 flex-nowrap justify-between align-middle text-right">
          <label htmlFor="ClientPOC" className="w-40">
            POC:
          </label>
          <select
            name="ClientPOC"
            id="ClientPOC"
            defaultValue={POCs}
            onChange={(e) => setPOC(e.target.value)}
            required>
            {activeUserFilter.map((item) => (
              <option value={item.UserId.toString()} key={item.UserId}>
                {item.UserName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-row gap-2 flex-nowrap justify-between align-middle text-right">
          <label htmlFor="ClientNotes" className="w-40">
            Notes:
          </label>
          <textarea
            name="ClientNotes"
            id="ClientNotes"
            className="w-60"
            onChange={(e) => {
              setClientNotes(e.target.value);
            }}
            defaultValue={ClientNotes}
          />
        </div>

        <div className="flex flex-row gap-2 mt-2">
          <Link to="/client" type="cancel" className="button cancel-btn">
            Cancel
          </Link>
          <button type="submit" className="button save-btn">
            Save
          </button>
        </div>
      </Form>
    </div>
  );
};

async function action({ request, params: { id } }) {
  const formData = await request.formData();
  const ClientUsername = formData.get("ClientUsername");
  const OrgId = formData.get("ClientOrg");
  const ClientCompany = formData.get("ClientCompany");
  const ClientEmail = formData.get("ClientEmail");
  const ClientNotes = formData.get("ClientNotes");
  const Manager = formData.get("ClientPOC");

  const client = await editClient(
    id,
    {
      ClientUsername,
      ClientCompany,
      ClientEmail,
      ClientNotes,
      Manager,
      OrgId,
    },
    { signal: request.signal }
  );

  client;

  return redirect(`/client/${id}`);
}

async function loader({ request: { signal }, params: { id } }) {
  const users = await getManagers({ signal });
  const client = await getClient(id, { signal });
  return { users: users, client: client };
}

export const EditClientRoute = {
  loader,
  action,
  element: <EditClient />,
};
