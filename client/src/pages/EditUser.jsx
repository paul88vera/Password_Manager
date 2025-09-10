import { Form, Link, redirect, useLoaderData } from "react-router-dom";
import { useState } from "react";
import { deleteUser, editUser, getUser } from "../api/users";

// eslint-disable-next-line react-refresh/only-export-components
const EditUser = () => {
  const { users } = useLoaderData();

  const [userName, setUserName] = useState(users[0]?.UserName);
  const [userEmail, setUserEmail] = useState(users[0]?.UserEmail);
  const [userLogin, setUserLogin] = useState(users[0]?.UserLogin);
  const [userActive] = useState(users[0]?.UserActive);
  const [userRole, setUserRole] = useState(users[0]?.UserRole);
  const userID = users[0]?.UserID;

  return (
    <div className="flex flex-col gap-4 md:mt-4 pb-8">
      <Form
        method="post"
        className="form_container flex flex-col justify-between gap-4 !h-full">
        <div className="flex flex-row gap-2 flex-nowrap justify-between align-middle text-right">
          <input type="hidden" name="userId" defaultValue={userID} />
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
          <label htmlFor="userLogin" className="w-40">
            Password:
          </label>
          <input
            type="text"
            name="userLogin"
            id="userLogin"
            className="w-60"
            defaultValue={userLogin}
            onChange={(e) => {
              setUserLogin(e.target.value);
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
            className="flex flex-row flex-nowrap gap-2 w-40 justify-start align-middle">
            Active:
            <select name="userActive" id="userActive" defaultValue={userActive}>
              <option value="1">Active</option>
              <option value="0">Deactivated</option>
            </select>
          </label>
        </div>

        <div className="flex flex-row gap-2 mt-2">
          <Link to="/dashboard" type="cancel" className="button cancel-btn">
            Cancel
          </Link>
          <button type="submit" className="button save-btn">
            Save
          </button>
        </div>
      </Form>
      <div
        className="flex flex-col justify-center align-middle text-center mt-2 text-red-500 hover:text-lime-500 cursor-pointer"
        onClick={() => {
          if (
            window.confirm(
              "Are you sure you would like to delete this users?"
            ) == true
          ) {
            deleteUser(users[0]?.UserID);
            window.location.replace(`/dashboard`);
          } else {
            return;
          }
        }}>
        Delete User
      </div>
    </div>
  );
};

async function action({ request }) {
  const formData = await request.formData();
  const UserID = formData.get("userId");
  const UserName = formData.get("userName");
  const UserEmail = formData.get("userEmail");
  const UserLogin = formData.get("userLogin");
  const UserRole = formData.get("userRole");
  const UserActive = formData.get("userActive");

  await editUser(
    UserID,
    {
      UserName,
      UserEmail,
      UserLogin,
      UserRole,
      UserActive,
    },
    { signal: request.signal }
  );

  return redirect(`/dashboard`);
}

async function loader({ request: { signal }, params: { id } }) {
  const users = await getUser(id, { signal });
  return { users: users };
}

export const EditUserRoute = {
  loader,
  action,
  element: <EditUser />,
};
