import { Link } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdOutlineScreenSearchDesktop } from "react-icons/md";
import { RiUserSearchFill } from "react-icons/ri";
import { CiCirclePlus } from "react-icons/ci";
import { useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
  useOrganization,
} from "@clerk/clerk-react";

const Sidebar = () => {
  const [selectAdd, setSelectAdd] = useState();
  const auth = useUser().user.id;
  const { organization } = useOrganization();

  const showModal = () => {
    setSelectAdd((current) => !current);
  };

  return (
    <div className="flex flex-row flex-nowrap md:flex-col justify-center md:justify-between md:gap-4 bg-gray-900 md:py-8 md:p-2 py-2 md:min-h-full md:w-15 items-center fixed w-screen bottom-0 z-50 gap-10">
      <div>
        <SignedOut>
          <SignInButton className="!text-white" />
        </SignedOut>
        <SignedIn>
          <UserButton className="!min-w-[500px]" />
        </SignedIn>
      </div>
      <div className="flex flex-row flex-nowrap md:flex-col md:gap-8 text-center p-0 md:justify-between gap-10">
        <Link to={`/${organization.id}/profile`} title="Profile">
          <IoHomeSharp className="text-lime-500 text-[2em] p-0 hover:scale-[110%] transition ease-in-out" />
        </Link>
        <Link to={`/${organization.id}/client`} title="Clients">
          <RiUserSearchFill className="text-lime-500 text-[2em] p-0 hover:scale-[110%] transition ease-in-out" />
        </Link>
        <Link to={`/${organization.id}/sites`} title="Websites">
          <MdOutlineScreenSearchDesktop className="text-lime-500 text-[2em] p-0 hover:scale-[110%] transition ease-in-out" />
        </Link>
      </div>
      <div>
        <div title="Add Managers/Clients" onClick={showModal}>
          <CiCirclePlus className="text-lime-500 text-[2.5em] p-0 hover:scale-[110%] transition ease-in-out cursor-pointer" />
        </div>
        {selectAdd ? (
          <div className="flex flex-col justify-start border-lime-500 border-2 px-4 pb-8 pt-4 rounded-md w-40 bg-slate-900 fixed bottom-20 md:bottom-10 md:left-20 right-10">
            <div
              className="flex flex-row justify-end cursor-pointer absolute right-[-1.7rem] top-[-1.7rem]"
              onClick={showModal}>
              <IoMdCloseCircleOutline className="text-3xl" />
            </div>
            {auth == import.meta.env.VITE_DEV_TOKEN ||
            auth == import.meta.env.VITE_DEV_TOKEN2 ? (
              <div className="flex flex-col gap-4 text-center pt-4">
                <Link
                  to={`/${organization.id}/add-manager`}
                  onClick={showModal}>
                  Add Manager
                </Link>
                <Link to={`/${organization.id}/add-client`} onClick={showModal}>
                  Add Client
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-4 text-center pt-4">
                <Link to={`/${organization.id}/add-client`} onClick={showModal}>
                  Add Client
                </Link>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Sidebar;
