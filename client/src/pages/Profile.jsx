import { useLoaderData } from "react-router-dom";
import { getUsers } from "../api/users";

// eslint-disable-next-line react-refresh/only-export-components
const Profile = () => {
  const user = useLoaderData();

  return <div>Profile {user[0]?.UserName}</div>;
};

async function loader({ request: { signal } }) {
  const user = await getUsers({ signal });
  return user;
}

export const ProfileRoute = {
  loader,
  element: <Profile />,
};
