import { Link, useLoaderData } from "react-router-dom";
import { getManagers } from "../api/managers";
import { CgProfile } from "react-icons/cg";
// import { capitalizeFirstWord } from "../utils/caps";
import { useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
const User = () => {
  const { user } = useLoaderData();
  const [editIcon, setEditIcon] = useState();
  const userActive = user[0]?.UserActive;

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex flex-col flex-nowrap justify-between bg-slate-300 pl-4 pr-8 pb-8 pt-4 rounded-2xl relative">
        <div className="flex flex-row flex-nowrap gap-4">
          <div
            className="flex flex-col align-middle justify-start cursor-pointer"
            onMouseEnter={() => {
              setEditIcon(true);
            }}
            onMouseLeave={() => {
              setEditIcon(false);
            }}>
            <Link
              to={`/user/${user[0]?.UserId}/edit`}
              className="text-red-900 text-[1rem] text-center hover:text-red-700 h-2 transition ease-in-out">
              <CgProfile className="text-6xl text-slate-900" />
              {editIcon ? <p className="text-red-900">edit</p> : null}
            </Link>
          </div>
          <div className="flex flex-col gap-1 text-2xl font-bold text-slate-950">
            {user[0]?.UserName || "Unknown"}{" "}
            <div>
              <p className="text-sm">
                Status: {userActive == 1 ? "Active" : "Deactivated"}
              </p>
            </div>
            <div>
              <h4 className="text-[1rem] text-slate-900">
                Role:{" "}
                <span className="text-[1rem] text-slate-700">
                  {user[0]?.UserRole}
                </span>
              </h4>
            </div>
            <Link
              to={`mailto:${user[0]?.UserEmail}`}
              className="text-[1rem] font-thin !text-lime-900 hover:!text-lime-700">
              {user[0]?.UserEmail || "Unknown"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

async function loader({ request: { signal } }) {
  const user = await getManagers({ signal });
  return { user: user };
}

export const UserRoute = {
  loader,
  element: <User />,
};
