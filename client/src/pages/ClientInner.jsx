import {
  Form,
  Link,
  useLoaderData,
  useNavigation,
  useNavigate,
} from "react-router-dom";
import { createPassword, getPasswords } from "../api/passwords";
import { CgProfile } from "react-icons/cg";
import { FaLock } from "react-icons/fa6";
import { FaLockOpen } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { IoIosTrash } from "react-icons/io";
import { deleteClient, getClient } from "../api/clients";
import React, { useState } from "react";
// import { capitalizeFirstWord } from "../utils/caps";
import { getManagers } from "../api/managers";
import { BiChevronLeftSquare } from "react-icons/bi";

const ClientInner = () => {
  const { passwords, client, users } = useLoaderData();
  const [openCardId, setOpenCardId] = useState();
  const [modalOpened, setModalOpened] = useState();
  const [editIcon, setEditIcon] = useState();
  const isMobile = useNavigation();
  const navigate = useNavigate();

  // Client Info
  const organization = client[0]?.OrgId;
  const [passClient] = useState(client[0]?.ClientId);
  const [siteName, setSiteName] = useState("");
  const [siteUrl, setSiteUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Card Toggle
  const toggleCard = (id) => {
    setOpenCardId((current) => (current === id ? null : id));
  };

  const toggleModal = () => {
    setModalOpened((current) => !current);
  };

  // Filter passwords with current ClientId
  const passwordFilter = passwords.filter(
    (item) => item.ClientId === client[0]?.ClientId && client[0]?.OrgId
  );

  // Filter Username from client
  const clientFilter = client.map((item) => item.ManagerId);
  const userFilter = users.filter((item) => clientFilter.includes(item.UserId));

  return (
    <div className="flex flex-col gap-4 lg:mt-4 pb-8">
      <div className="flex flex-col flex-nowrap gap-4 align-middle justify-start w-20">
        <Link to="../">
          <BiChevronLeftSquare className="text-3xl text-lime-500 hover:scale-115 transition-all ease-in-out cursor-pointer" />
        </Link>
      </div>
      <div className="flex flex-col flex-nowrap justify-between bg-slate-300 px-2 md:pl-4 md:pr-8 pb-8 pt-4 rounded-2xl relative">
        <div className="flex flex-row md:gap-60 justify-between relative w-full">
          <div className="flex flex-row flex-nowrap gap-2">
            <div
              className="flex flex-col align-middle justify-start cursor-pointer"
              onMouseEnter={() => {
                setEditIcon(true);
              }}
              onMouseLeave={() => {
                setEditIcon(false);
              }}>
              <Link
                to={`/${organization}/client/${passClient}/edit`}
                title="Edit Client Info"
                className="text-red-900 text-[1rem] text-center hover:text-red-700 h-2 transition ease-in-out">
                <CgProfile className="text-6xl text-slate-900" />
                {editIcon ? <p className="text-red-900">edit</p> : null}
              </Link>
            </div>
            <p className="flex flex-col gap-0 text-2xl font-bold text-slate-950">
              {client[0]?.ClientUsername || "Unknown"} <br />
              <span className="text-[1.2rem] font-normal">
                {client[0]?.ClientCompany || "Unknown"}
              </span>
              <Link
                to={`mailto:${client[0]?.ClientEmail}`}
                title={`Click to email ${client[0]?.ClientUsername}`}
                className="text-[1rem] font-thin !text-lime-900 hover:!text-lime-700">
                {client[0]?.ClientEmail || "Unknown"}
              </Link>
            </p>
          </div>
          <div
            className="!text-slate-900 button flex flex-row gap-2 flex-nowrap align-middle justify-end lg:mr-[-20px] transition ease-in-out p-0 cursor-pointer text-[1rem]"
            onClick={() => setModalOpened(true)}>
            {isMobile ? null : "Add Password "}
            <FaPlusCircle
              className="text-2xl mt-2 mr-2 text-slate-900 hover:text-slate-700"
              title="Add a password"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 mx-0 lg:ml-4 min-w-auto">
          {modalOpened ? (
            <div className="grid grid-cols-1 align-middle absolute z-10 top-10 left-10 transform -translate-x-1/2 -translate-y-1/2 bg-slate-200 p-0 rounded-lg shadow-lg w-100">
              <Form
                method="post"
                onSubmit={toggleModal}
                className="form_container flex flex-col justify-between gap-4 max-w-100 overflow-hidden">
                <input name="orgId" type="hidden" defaultValue={organization} />
                <input
                  name="passClient"
                  id="passClient"
                  type="hidden"
                  defaultValue={passClient}
                />
                <div className="flex flex-col gap-2 flex-nowrap justify-between align-middle text-left">
                  <label htmlFor="siteName" className="w-40">
                    Site Name:
                  </label>
                  <input
                    type="text"
                    name="siteName"
                    id="siteName"
                    className="w-60"
                    placeholder={siteName}
                    onChange={(e) => {
                      setSiteName(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2 flex-nowrap justify-between align-middle text-left overflow-hidden text-overflow-ellipsis whitespace-nowrap">
                  <label htmlFor="site_url" className="w-40">
                    Site URL:
                  </label>
                  <input
                    type="text"
                    name="site_url"
                    id="site_url"
                    className="w-60"
                    placeholder={siteUrl}
                    onChange={(e) => {
                      setSiteUrl(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2 flex-nowrap justify-between align-middle text-left">
                  <label htmlFor="username" className="w-40">
                    Username:
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="w-60"
                    placeholder={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2 flex-nowrap justify-between align-middle text-left">
                  <label htmlFor="password" className="w-40">
                    Password:
                  </label>
                  <input
                    type="text"
                    name="password"
                    id="password"
                    className="w-60"
                    placeholder={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>

                <div className="flex flex-row gap-2 mt-2">
                  <button
                    type="button"
                    className="button cancel-btn"
                    onClick={toggleModal}>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="button save-btn"
                    onSubmitCapture={toggleModal}>
                    Save
                  </button>
                </div>
              </Form>
            </div>
          ) : null}
          {passwordFilter.map((pass) => (
            <div
              className="site-card text-slate-300 flex flex-col flex-nowrap gap-0 align-middle justify-start p-0 pb-0 rounded-xl font-bold transition ease-in-out items-stretch"
              key={pass.PassId}>
              <div
                className="grid grid-rows-1 grid-cols-2 justify-start relative cursor-pointer bg-slate-900 p-4 rounded-xl"
                onClick={() => toggleCard(pass.PassId)}>
                {openCardId === pass.PassId ? (
                  <FaLockOpen className="text-3xl flex flex-row justify-center align-middle mt-1 pb-2 col-span-1" />
                ) : (
                  <FaLock className="text-3xl flex flex-row justify-center align-middle mt-1 col-span-1 pb-2" />
                )}
                <div className="grid grid-cols-1 grid-rows-2 justify-start overflow-hidden text-overflow-ellipsis whitespace-nowrap col-span-2">
                  <h3 className=" ">{pass.PassSite}</h3>
                  <Link
                    target="_blank"
                    to={
                      pass.PassHTML.includes("https://") ||
                      pass.PassHTML.includes("http://")
                        ? `${pass.PassHTML}`
                        : `https://${pass.PassHTML}`
                    }
                    className="text-[1rem] font-thin overflow-hidden text-overflow-ellipsis whitespace-nowrap">
                    {pass.PassHTML}
                  </Link>
                </div>
                {openCardId === pass.PassId ? (
                  <Link to={`/${organization}/password/${pass.PassId}/edit`}>
                    <MdEdit className="text-2xl text-lime-500 hover:text-slate-300 absolute right-4 top-6 grid grid-cols-1" />
                  </Link>
                ) : null}
              </div>
              <div className="z-10">
                {openCardId === pass.PassId ? (
                  <div
                    className="grid grid-cols-1 gap-4 pt-0 pb-8 bg-slate-900 p-4 pt-4 rounded-bl-xl rounded-br-xl mt-[-1.5rem]"
                    key={pass.PassId}>
                    <label
                      htmlFor="username"
                      className="flex flex-row flex-nowrap gap-4 justify-start">
                      Username:{" "}
                    </label>
                    <input
                      type="text"
                      name="username"
                      defaultValue={pass.PassUsername}
                      className="w-auto bg-slate-300 text-slate-900 pl-2 rounded-sm"
                    />
                    <label
                      htmlFor="Password"
                      className="flex flex-row flex-nowrap gap-4 justify-start">
                      Password:{" "}
                    </label>
                    <input
                      type="text"
                      name="password"
                      defaultValue={pass.PassPW.split(
                        import.meta.env.VITE_ENCRYPTION_KEY
                      ).join("")}
                      className="psw w-auto bg-slate-300 text-slate-900 pl-2 rounded-sm"
                    />
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
        <div className="text-slate-950 mt-4">
          <h3 className="font-bold">Account Manager:</h3>
          <a
            href={`mailto:${userFilter[0]?.UserEmail}`}
            className="!text-lime-900"
            title={`Click to email ${userFilter[0]?.UserName}`}>
            {userFilter[0]?.UserName}
          </a>
        </div>
        {client[0]?.ClientNotes ? (
          <div className="text-slate-950 mt-4">
            <h3 className="font-bold">Client Notes:</h3>
            <p>{client[0]?.ClientNotes}</p>
          </div>
        ) : null}
        <div className="absolute right-1 bottom-2 text-slate-950">
          <IoIosTrash
            title={`Delete ${client[0]?.ClientCompany}`}
            className="text-3xl text-red-900 hover:text-red-700 hover:animate-pulse cursor-pointer"
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you would like to delete this client?"
                ) === true
              ) {
                deleteClient(passClient);
                navigate(`/${client[0]?.OrgId}/client`);
              } else {
                return;
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

async function action({ request }) {
  const formData = await request.formData();
  const PassSite = formData.get("siteName");
  const PassUsername = formData.get("username");
  const PassHTML = formData.get("site_url");
  const PassPW = formData.get("password");
  const ClientId = formData.get("passClient");
  const OrgId = formData.get("orgId");

  await createPassword(
    {
      PassSite,
      PassUsername,
      PassHTML,
      PassPW,
      ClientId,
      OrgId,
    },
    { signal: request.signal }
  );

  return null;
}

async function loader({ request: { signal }, params: { id } }) {
  const passwords = await getPasswords({ signal });
  const client = await getClient(id, { signal });
  const users = await getManagers({ signal });
  return { passwords: passwords, client: client, users: users };
}

// eslint-disable-next-line react-refresh/only-export-components
export const ClientInnerRoute = {
  loader,
  action,
  element: <ClientInner />,
};

export default React.memo(ClientInner);
