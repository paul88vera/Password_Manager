import { Form, Link, redirect } from "react-router-dom";
import { useState } from "react";
import { createManager } from "../api/managers";

// eslint-disable-next-line react-refresh/only-export-components
const AddUser = () => {
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userActive] = useState(1);
  const [userRole, setUserRole] = useState("Staff");

  return (
    <div className="flex flex-col gap-4 md:mt-4 pb-8">
      <Form
        method="post"
        className="form_container flex flex-col justify-between gap-4 !h-full">
        <div className="flex flex-row gap-2 flex-nowrap justify-between align-middle text-right">
          <label htmlFor="UserName" className="w-40">
            Full Name:
          </label>
          <input
            type="text"
            name="userName"
            id="userName"
            className="w-60"
            defaultValue={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>

        <div className="flex flex-row gap-2 flex-nowrap justify-between align-middle text-right">
          <label htmlFor="userEmail" className="w-40">
            Email:
          </label>
          <input
            type="email"
            name="userEmail"
            id="userEmail"
            className="w-60"
            defaultValue={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-row gap-2 flex-nowrap justify-between align-middle text-right">
          <label htmlFor="userRole" className="w-40">
            Role:
          </label>
          <select
            name="userRole"
            id="role"
            onChange={(e) => setUserRole(e.target.value)}
            defaultValue={userRole}>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Staff">Staff</option>
          </select>
        </div>

        <div className="flex flex-row gap-2 justify-end flex-nowrap text-right">
          <label
            htmlFor="userActive"
            className="flex flex-row flex-nowrap gap-0 w-40 justify-start align-middle">
            Active:
            <input
              type="checkbox"
              name="userActive"
              id="userActive"
              className="w-40"
              defaultValue={userActive}
              defaultChecked
            />
          </label>
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
  const UserName = formData.get("userName");
  const UserEmail = formData.get("userEmail");
  const UserRole = formData.get("userRole");
  const UserActive = formData.get("userActive");

  await createManager(
    {
      UserName,
      UserEmail,
      UserRole,
      UserActive,
    },
    { signal: request.signal }
  );

  return redirect(`/dashboard`);
}

export const AddUserRoute = {
  action,
  element: <AddUser />,
};
