import { Form, redirect, useLoaderData } from "react-router-dom";
import { deletePassword, editPassword, getPassword } from "../api/passwords";
import { capitalizeFirstWord } from "../utils/caps"; // Just makes the stuff Capitalized
import { useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
const EditPassword = () => {
  const { password } = useLoaderData();

  // Default State
  const [siteName, setSiteName] = useState(password[0]?.PassSite || "");
  const [siteUrl, setSiteUrl] = useState(password[0]?.PassHTML || "");
  const [username, setUsername] = useState(password[0]?.PassUsername || "");
  const [newPassword, setNewPassword] = useState(password[0]?.PassPW || "");

  // Needed for password/client identification
  const passID = password[0]?.PassID;
  const passClient = password[0]?.Client;

  return (
    <div className="flex flex-row flex-wrap gap-4 mt-8">
      <div className="flex flex-col align-middle justify-center">
        <Form
          method="post"
          action={`/password/${passID}/edit`}
          className="form_container flex flex-col justify-between gap-4 max-w-100">
          <input name="passClient" type="hidden" defaultValue={passClient} />
          <input name="passID" type="hidden" defaultValue={passID} />
          <div className="flex flex-row gap-2 flex-nowrap justify-between align-middle text-right">
            <label htmlFor="siteName" className="w-40">
              Site Name:
            </label>
            <input
              type="text"
              name="siteName"
              id="siteName"
              className="w-60"
              defaultValue={capitalizeFirstWord(siteName)}
              onChange={(e) => {
                capitalizeFirstWord(setSiteName(e.target.value));
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
                capitalizeFirstWord(setSiteUrl(e.target.value));
              }}
              defaultValue={capitalizeFirstWord(siteUrl)}
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
              defaultValue={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-row gap-2 mt-2">
            <button
              type="button"
              className="button cancel-btn"
              onClick={() => {
                window.location.replace(`/client/${passClient}`);
              }}>
              Cancel
            </button>
            <button type="submit" id="submit-btn" className="button save-btn">
              Save
            </button>
          </div>
        </Form>
        <div
          className="flex flex-col justify-center align-middle text-center mt-2 text-red-500 hover:text-lime-500 cursor-pointer"
          onClick={() => {
            if (
              window.confirm(
                "Are you sure you would like to delete this password?"
              ) == true
            ) {
              deletePassword(password[0]?.PassID, passClient);
              window.location.replace(`/client/${password[0]?.Client}`);
            } else {
              return;
            }
          }}>
          Delete Password
        </div>
      </div>
    </div>
  );
};

async function action({ request }) {
  const formData = await request.formData();
  const PassID = await formData.get("passID");
  const PassSite = formData.get("siteName");
  const PassUsername = formData.get("username");
  const PassHTML = formData.get("site_url");
  const PassPW = formData.get("password");
  const Client = formData.get("passClient");

  await editPassword(
    PassID,
    {
      PassSite,
      PassUsername,
      PassHTML,
      PassPW,
      Client,
    },
    { signal: request.signal }
  );

  return redirect(`/client/${Client}`);
}

async function loader({ request: { signal }, params: { id } }) {
  const password = await getPassword(id, { signal });
  return { password: password };
}

export const EditPasswordRoute = {
  action,
  loader,
  element: <EditPassword />,
};
