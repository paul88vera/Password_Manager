import { Form, redirect } from "react-router-dom";
import Modal from "../components/Modal";
// import { useState } from "react";
import { getPassword } from "../api/passwords";
import { createClient, getClient } from "../api/clients";

// eslint-disable-next-line react-refresh/only-export-components
const AddClient = () => {
  // const { client, passwords } = useState();

  // const [siteName, setSiteName] = useState("");
  // const [siteUrl, setSiteUrl] = useState("");
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  /* 
USERS (PassUsers):
UserID, UserName, UserEmail, UserLogin, UserRole, UserActive

- - -

CLIENTS (PassClient):
ClientID, ClientUsername, ClientCompany, ClientEmail, ClientNotes, POC
*/
  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* <Modal>
        <Form
          method="post"
          action={`/client/${client[0]?.ClientID}`}
          className="form_container flex flex-col justify-between gap-4">
          <input
            name="passClient"
            id="passClient"
            type="hidden"
            value={client[0]?.ClientID}
          />
          <div className="flex flex-row gap-2 flex-nowrap justify-between align-middle text-right">
            <label htmlFor="siteName" className="w-40">
              Site Name: {passwords}
            </label>
            <input
              type="text"
              name="siteName"
              id="siteName"
              className="w-60"
              defaultValue={siteName}
              onChange={(e) => {
                setSiteName(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-row gap-2 flex-nowrap justify-between align-middle text-right">
            <label htmlFor="site_url" className="w-40">
              Site URL:
            </label>
            <input
              type="text"
              name="site_url"
              id="site_url"
              className="w-60"
              onChange={(e) => {
                setSiteUrl(e.target.value);
              }}
              placeholder={siteUrl}
            />
          </div>
          <div className="flex flex-row gap-2 flex-nowrap justify-between align-middle text-right">
            <label htmlFor="username" className="w-40">
              Username:
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="w-60"
              defaultValue={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-row gap-2 flex-nowrap justify-between align-middle text-right">
            <label htmlFor="password" className="w-40">
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-60"
              defaultValue={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-row gap-2 mt-2">
            <button
              type="cancel"
              className="button cancel-btn"
              onClick={toggleModal}>
              Cancel
            </button>
            <button type="submit" className="button save-btn">
              Save
            </button>
          </div>
        </Form>
      </Modal> */}
    </div>
  );
};

async function action({ request }) {
  const formData = await request.formData();
  const PassSite = formData.get("siteName");
  const PassUsername = formData.get("username");
  const PassHTML = formData.get("site_url");
  const PassPW = formData.get("password");
  const Client = formData.get("passClient");

  const password = await createClient(
    {
      PassSite,
      PassUsername,
      PassHTML,
      PassPW,
      Client,
    },
    { signal: request.signal }
  );

  password;

  return redirect(`/client/${password.Client}`);
}

async function loader({ request: { signal }, params: { id } }) {
  const passwords = await getPassword(id, { signal });
  const client = await getClient(id, { signal });
  return { passwords: passwords, client: client };
}

export const AddClientRoute = {
  loader,
  action,
  element: <AddClient />,
};
