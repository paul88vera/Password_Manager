import { Form, Link, redirect } from "react-router-dom";
import { createOrg } from "../api/org";
import { useState } from "react";
import { useOrganization } from "@clerk/clerk-react";

// eslint-disable-next-line react-refresh/only-export-components
const Settings = () => {
  const [orgName, setOrgName] = useState("");
  const { organization } = useOrganization();

  return (
    <div>
      Settings
      <h2>Create An Organization:</h2>
      <Form
        method="post"
        className="form_container flex flex-col justify-between gap-4 !h-full">
        <input type="hidden" name="orgId" defaultValue={organization.id} />
        <div className="flex flex-row gap-2 flex-nowrap justify-between align-middle text-right">
          <label htmlFor="org-name" className="w-40">
            Org Name:
          </label>
          <input
            type="text"
            name="org-name"
            id="org-name"
            className="w-60"
            defaultValue={orgName}
            onChange={(e) => {
              setOrgName(e.target.value);
            }}
          />
        </div>

        <div className="flex flex-row gap-2 mt-2">
          <Link
            to={`/${organization.id}/profile`}
            type="cancel"
            className="button cancel-btn">
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
  const OrgName = await formData.get("org-name");
  const OrgId = formData.get("orgId");

  await createOrg(
    {
      OrgName,
    },
    { signal: request.signal }
  );

  return redirect(`/${OrgId}/profile`);
}

export const SettingsRoute = {
  action,
  element: <Settings />,
};
