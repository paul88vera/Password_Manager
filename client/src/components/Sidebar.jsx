import { Link } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
// import { FaSignOutAlt } from "react-icons/fa";
import { RiUserSearchFill } from "react-icons/ri";
import { CgWebsite } from "react-icons/cg";
import { CiCirclePlus } from "react-icons/ci";

const Sidebar = () => {
  return (
    <div className="flex flex-col justify-between gap-4 bg-gray-900 py-8 p-2 h-screen w-full items-center">
      <div>
        <Link to="/login" title="Login">
          <FaCircleUser className="text-lime-500 text-[2em] p-0 hover:scale-[110%] transition ease-in-out" />
        </Link>
        {/* <Link to="/logout" title="Logout">
          <FaSignOutAlt className="text-lime-500 text-[2em] p-0 hover:scale-[110%] transition ease-in-out" />
        </Link> */}
      </div>
      <div className="flex flex-col gap-8 text-center p-0">
        <Link to="/client" title="Clients">
          <RiUserSearchFill className="text-lime-500 text-[2em] p-0 hover:scale-[110%] transition ease-in-out" />
        </Link>
        <Link to="/sites" title="Websites">
          <CgWebsite className="text-lime-500 text-[2em] p-0 hover:scale-[110%] transition ease-in-out" />
        </Link>
      </div>
      <div>
        <Link to="/add" title="Add Users/Clients">
          <CiCirclePlus className="text-lime-500 text-[2.5em] p-0 hover:scale-[110%] transition ease-in-out" />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
