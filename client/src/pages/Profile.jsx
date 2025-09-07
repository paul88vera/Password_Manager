import { useLoaderData } from "react-router-dom";
import { getUsers } from "../api/users";

// eslint-disable-next-line react-refresh/only-export-components
const Profile = () => {
  const user = useLoaderData();
  console.log(user);

  const url = window.location;
  const slug = url.pathname.split("/").filter(Boolean);

  const userFiltered = user.filter((item) => item.UserID == slug[1]);

  return <div>Profile {userFiltered[0]?.UserName}</div>;
};

async function loader({ request: { signal }, params: { id } }) {
  const user = await getUsers(id, { signal });
  return user;
}

export const ProfileRoute = {
  loader,
  element: <Profile />,
};
