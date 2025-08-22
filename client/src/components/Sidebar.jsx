import { Link } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { FaHouse } from "react-icons/fa6";
import { PiVaultFill } from "react-icons/pi";
import { FaGear } from "react-icons/fa6";
import { CiCirclePlus } from "react-icons/ci";

const Sidebar = () => {
  return (
    <div className="flex flex-col justify-between gap-4 bg-gray-900 py-8 p-2 h-screen w-full items-center">
      <div>
        <Link to="/login" title="Login">
          <FaCircleUser className="text-lime-500 text-[2em] p-0 hover:scale-[110%]" />
        </Link>
      </div>
      <div className="flex flex-col gap-8 text-center p-0">
        <Link to="/dashboard" title="Home">
          <FaHouse className="text-lime-500 text-[2em] p-0 hover:scale-[110%]" />
        </Link>
        <Link to="/vault" title="Vault">
          <PiVaultFill className="text-lime-500 text-[2em] p-0 hover:scale-[110%]" />
        </Link>
        <Link to="/settings" title="Settings">
          <FaGear className="text-lime-500 text-[2em] p-0 hover:scale-[110%]" />
        </Link>
      </div>
      <div>
        <Link to="/add" title="Add Password">
          <CiCirclePlus className="text-lime-500 text-[2.5em] p-0 hover:scale-[110%]" />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
