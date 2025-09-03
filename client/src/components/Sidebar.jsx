import { Link } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
// import { FaSignOutAlt } from "react-icons/fa";
import { RiUserSearchFill } from "react-icons/ri";
import { CgWebsite } from "react-icons/cg";
import { CiCirclePlus } from "react-icons/ci";
import Modal from "./Modal";
import { useState } from "react";

const Sidebar = () => {
  const [selectAdd, setSelectAdd] = useState();

  const showModal = () => {
    setSelectAdd((current) => !current);
  };

  return (
    <div className="flex flex-row flex-nowrap md:flex-col justify-center md:justify-between md:gap-4 bg-gray-900 md:py-8 md:p-2 py-2 md:min-h-screen md:w-15 items-center fixed w-screen bottom-0 z-50 gap-10">
      <div>
        <Link to="/login" title="Login">
          <FaCircleUser className="text-lime-500 text-[2em] p-0 hover:scale-[110%] transition ease-in-out" />
        </Link>
        {/* <Link to="/logout" title="Logout">
          <FaSignOutAlt className="text-lime-500 text-[2em] p-0 hover:scale-[110%] transition ease-in-out" />
        </Link> */}
      </div>
      <div className="flex flex-row flex-nowrap md:flex-col md:gap-8 text-center p-0 md:justify-between gap-10">
        <Link to="/client" title="Clients">
          <RiUserSearchFill className="text-lime-500 text-[2em] p-0 hover:scale-[110%] transition ease-in-out" />
        </Link>
        <Link to="/sites" title="Websites">
          <CgWebsite className="text-lime-500 text-[2em] p-0 hover:scale-[110%] transition ease-in-out" />
        </Link>
      </div>
      <div>
        <div title="Add Users/Clients" onClick={showModal}>
          <CiCirclePlus className="text-lime-500 text-[2.5em] p-0 hover:scale-[110%] transition ease-in-out cursor-pointer" />
        </div>
        {selectAdd ? (
          <Modal className="justify-center align-middle h-screen">
            <div className="flex flex-col justify-start border-lime-500 border-2 px-4 pb-8 pt-4 rounded-md absolute md:top-70 top-100 w-50 bg-slate-900">
              <div
                className="flex flex-row justify-end cursor-pointer"
                onClick={showModal}>
                X
              </div>
              <div className="flex flex-col gap-4 text-center">
                <Link to="/add-user" onClick={showModal}>
                  Add A User
                </Link>
                <Link to="/add-client" onClick={showModal}>
                  Add A Client
                </Link>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

export default Sidebar;
