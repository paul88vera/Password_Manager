import { Form, Link, redirect, useLoaderData } from "react-router-dom";
import { useState } from "react";
import { createClient, getClients } from "../api/clients";
import { getUsers } from "../api/users";

// eslint-disable-next-line react-refresh/only-export-components
const AddClient = () => {
  const { users } = useLoaderData();
  // const [passClient] = useState(0);

  const [ClientUsername, setClientUsername] = useState("");
  const [ClientCompany, setClientCompany] = useState("");
  const [ClientNotes, setClientNotes] = useState("");
  const [POC, setPOC] = useState("");
  const [ClientEmail, setClientEmail] = useState("");
  /* 
USERS (PassUsers):
UserID, UserName, UserEmail, UserLogin, UserRole, UserActive

- - -

CLIENTS (PassClient):
ClientID, ClientUsername, ClientCompany, ClientEmail, ClientNotes, POC
*/

  return (
    <div className="flex flex-col gap-4 md:mt-4 pb-8">
      <Form
        method="post"
        action={`/client`}
        className="form_container flex flex-col justify-between gap-4 !h-full">
        <div className="flex flex-row gap-2 flex-nowrap justify-between align-middle text-right">
          <label htmlFor="ClientUsername" className="w-40">
            Username:
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
          <select name="ClientPOC" id="POC">
            {users.map((item) => (
              <option
                value={`${item.UserID}`}
                key={item.UserID}
                onSelect={(e) => setPOC(e.target.value)}>
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
            placeholder={ClientNotes}
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

async function action({ request }) {
  const formData = await request.formData();
  const ClientUsername = formData.get("ClientUsername");
  const ClientComplany = formData.get("ClientCompany");
  const ClientEmail = formData.get("ClientEmail");
  const ClientNotes = formData.get("ClientNotes");
  const Client = formData.get("passClient");

  const password = await createClient(
    {
      ClientUsername,
      ClientComplany,
      ClientEmail,
      ClientNotes,
      Client,
    },
    { signal: request.signal }
  );

  password;

  return redirect(`/client/`);
}

async function loader({ request: { signal } }) {
  const users = await getUsers({ signal });
  const client = await getClients({ signal });
  return { users: users, client: client };
}

export const AddClientRoute = {
  loader,
  action,
  element: <AddClient />,
};
