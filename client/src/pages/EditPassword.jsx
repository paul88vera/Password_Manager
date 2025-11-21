import { Form, useNavigate, redirect, useLoaderData } from "react-router-dom";
import { deletePassword, editPassword, getPassword } from "../api/passwords";
// import { capitalizeFirstWord } from "../utils/caps"; // Just makes the stuff Capitalized
import * as React from "react";

const EditPassword = () => {
  const { password } = useLoaderData();
  const navigate = useNavigate();

  const defaultValues = React.useMemo(() => {
    const pwd = password || {};
    return {
      organization: pwd[0]?.OrgId || "",
      siteName: pwd[0]?.PassSite || "",
      siteUrl: pwd[0]?.PassHTML || "",
      username: pwd[0]?.PassUsername || "",
      newPassword: pwd[0]?.PassPW
        ? pwd[0]?.PassPW.split(import.meta.env.VITE_ENCRYPTION_KEY).join("")
        : "",
      passID: pwd[0]?.PassId,
      passClient: pwd[0]?.ClientId,
    };
  }, [password]);

  // Default State
  const [siteName, setSiteName] = React.useState(defaultValues.siteName);
  const [siteUrl, setSiteUrl] = React.useState(defaultValues.siteUrl || "");
  const [username, setUsername] = React.useState(defaultValues.username || "");
  const [newPassword, setNewPassword] = React.useState(
    defaultValues.newPassword
      .split(import.meta.env.VITE_ENCRYPTION_KEY)
      .join("") || ""
  );

  // Needed for password/client identification

  return (
    <div className="flex flex-row flex-wrap gap-4 mt-8">
      <div className="flex flex-col align-middle justify-center">
        <h2>Editing Password:</h2>
        <Form
          method="post"
          action={`/${defaultValues.organization}/password/${defaultValues.passID}/edit`}
          className="form_container flex flex-col justify-between gap-4 max-w-100">
          <input
            name="passClient"
            type="hidden"
            defaultValue={defaultValues.passClient}
          />
          <input
            name="passID"
            type="hidden"
            defaultValue={defaultValues.passID}
          />
          <input
            type="hidden"
            name="orgId"
            defaultValue={defaultValues.organization}
          />
          <div className="flex flex-row gap-2 flex-nowrap justify-between align-middle text-right">
            <label htmlFor="siteName" className="w-40">
              Site Name:
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
              defaultValue={siteUrl}
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
              type="text"
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
              onClick={() =>
                navigate(
                  `/${defaultValues.organization}/client/${defaultValues.passClient}`
                )
              }>
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
              deletePassword(defaultValues.passID, defaultValues.passClient);
              window.location.redirect(
                `/${defaultValues.organization}/client/${defaultValues.passClient}`
              );
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
  const ClientId = formData.get("passClient");
  const OrgId = formData.get("orgId");

  await editPassword(
    PassID,
    {
      PassSite,
      PassUsername,
      PassHTML,
      PassPW,
      ClientId,
      OrgId,
    },
    { signal: request.signal }
  );

  return redirect(`/${OrgId}/client/${ClientId}`);
}

async function loader({ request: { signal }, params: { id } }) {
  const password = await getPassword(id, { signal });
  return { password: password };
}

// eslint-disable-next-line react-refresh/only-export-components
export const EditPasswordRoute = {
  action,
  loader,
  element: <EditPassword />,
};

export default React.memo(EditPassword);
