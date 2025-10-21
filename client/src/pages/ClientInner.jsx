import { Form, Link, useLoaderData, useNavigation } from "react-router-dom";
import { createPassword, getPasswords } from "../api/passwords";
import { CgProfile } from "react-icons/cg";
import { FaLock } from "react-icons/fa6";
import { FaLockOpen } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { IoIosTrash } from "react-icons/io";
import { deleteClient, getClient } from "../api/clients";
import { useState } from "react";
// import { capitalizeFirstWord } from "../utils/caps";
import { getManagers } from "../api/managers";
import { BiChevronLeftSquare } from "react-icons/bi";

// eslint-disable-next-line react-refresh/only-export-components
const ClientInner = () => {
  const { passwords, client, users } = useLoaderData();
  const [openCardId, setOpenCardId] = useState();
  const [modalOpened, setModalOpened] = useState();
  const [editIcon, setEditIcon] = useState();
  const isMobile = useNavigation();

  // Client Info
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
    (item) => item.Client === client[0]?.ClientId
  );

  // Filter Username from client
  const clientFilter = client.map((item) => item.Manager);
  const userFilter = users.filter((item) => clientFilter.includes(item.UserId));

  return (
    <div className="flex flex-col gap-4 md:mt-4 pb-8">
      <div className="flex flex-col flex-nowrap gap-4 align-middle justify-start">
        <Link to="../">
          <BiChevronLeftSquare className="text-3xl text-lime-500 hover:scale-115 transition-all ease-in-out cursor-pointer" />
        </Link>
      </div>
      <div className="flex flex-col flex-nowrap justify-between bg-slate-300 pl-4 pr-8 pb-8 pt-4 rounded-2xl relative">
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
                to={`/client/${client[0]?.ClientId}/edit`}
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
                className="text-[1rem] font-thin !text-lime-900 hover:!text-lime-700">
                {client[0]?.ClientEmail || "Unknown"}
              </Link>
            </p>
          </div>
          <div
            className="!text-slate-900 button flex flex-row gap-2 flex-nowrap align-middle justify-end mr-[-20px] hover:scale-105 transition ease-in-out p-0 cursor-pointer text-[1rem]"
            onClick={() => setModalOpened(true)}>
            {isMobile ? null : "Add Password "}
            <FaPlusCircle className="text-1xl mt-1 text-slate-900" />
          </div>
        </div>

        <div className="flex flex-row flex-wrap gap-4 mt-8">
          {modalOpened ? (
            <div className="flex flex-col align-middle justify-center">
              <Form
                method="post"
                onSubmit={toggleModal}
                className="form_container flex flex-col justify-between gap-4 max-w-100">
                <input
                  name="passClient"
                  id="passClient"
                  type="hidden"
                  defaultValue={passClient}
                />
                <div className="flex flex-row gap-2 flex-nowrap justify-between align-middle text-right">
                  <label htmlFor="siteName" className="w-40">
                    Site Name:
                  </label>
                  <input
                    type="text"
                    name="siteName"
                    id="siteName"
                    className="w-60"
                    defaultValue={siteName}
                    onChange={(e) => {
                      setSiteName(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-row gap-2 flex-nowrap justify-between align-middle text-right">
                  <label htmlFor="site_url" className="w-40">
                    Site URL:
                  </label>
                  <input
                    type="text"
                    name="site_url"
                    id="site_url"
                    className="w-60"
                    onChange={(e) => {
                      setSiteUrl(e.target.value);
                    }}
                    placeholder={siteUrl}
                  />
                </div>
                <div className="flex flex-row gap-2 flex-nowrap justify-between align-middle text-right">
                  <label htmlFor="username" className="w-40">
                    Username:
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="w-60"
                    defaultValue={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-row gap-2 flex-nowrap justify-between align-middle text-right">
                  <label htmlFor="password" className="w-40">
                    Password:
                  </label>
                  <input
                    type="text"
                    name="password"
                    id="password"
                    className="w-60"
                    defaultValue={password}
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
              className="site-card text-slate-300 flex flex-col flex-nowrap gap-4 align-middle justify-start p-4  pb-0 rounded-lg bg-slate-900 font-bold w-full md:max-w-[380px] hover:bg-slate-950 transition ease-in-out"
              key={pass.PassId}>
              <div
                className="flex flex-row gap-4 align-middle justify-start w-full relative cursor-pointer"
                onClick={() => toggleCard(pass.PassId)}>
                {openCardId === pass.PassId ? (
                  <FaLockOpen className="text-3xl flex flex-row justify-center align-middle mt-2" />
                ) : (
                  <FaLock className="text-3xl flex flex-row justify-center align-middle mt-2" />
                )}
                <div className="flex flex-col justify-start">
                  <h3 className=" ">{pass.PassSite}</h3>
                  <Link
                    to={
                      pass.PassHTML.includes("https://") ||
                      pass.PassHTML.includes("http://")
                        ? `${pass.PassHTML}`
                        : `https://${pass.PassHTML}`
                    }
                    className="text-[1rem] font-thin">
                    {pass.PassHTML}
                  </Link>
                </div>
                {openCardId === pass.PassId ? (
                  <Link to={`/password/${pass.PassId}/edit`}>
                    <MdEdit className="text-2xl text-lime-500 hover:text-slate-300 absolute right-0" />
                  </Link>
                ) : null}
              </div>
              <div className="p-0">
                {openCardId === pass.PassId ? (
                  <div
                    className="flex flex-col gap-4 pt-0 pb-8"
                    key={pass.PassId}>
                    <label
                      htmlFor="username"
                      className="flex flex-row flex-nowrap gap-4 justify-end">
                      Username:{" "}
                      <input
                        type="text"
                        name="username"
                        defaultValue={pass.PassUsername}
                        className="w-auto bg-slate-300 text-slate-900 pl-2 rounded-sm"
                      />
                    </label>
                    <label
                      htmlFor="Password"
                      className="flex flex-row flex-nowrap gap-4 justify-end">
                      Password:{" "}
                      <input
                        type="text"
                        name="password"
                        defaultValue={pass.PassPW}
                        className="w-auto bg-slate-300 text-slate-900 pl-2 rounded-sm"
                      />
                    </label>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
        <div className="text-slate-950 mt-4">
          <h3 className="font-bold">Account Manager:</h3>
          <p>{userFilter[0]?.UserName}</p>
        </div>
        {client[0]?.ClientNotes ? (
          <div className="text-slate-950 mt-4">
            <h3 className="font-bold">Client Notes:</h3>
            <p>{client[0]?.ClientNotes}</p>
          </div>
        ) : null}
        <div className="absolute right-1 bottom-2 text-slate-950">
          <IoIosTrash
            className="text-3xl text-red-900 hover:text-red-700 hover:animate-pulse cursor-pointer"
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you would like to delete this client?"
                ) === true
              ) {
                window.location.replace("/client");
                deleteClient(passClient);
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
  const Client = formData.get("passClient");

  await createPassword(
    {
      PassSite,
      PassUsername,
      PassHTML,
      PassPW,
      Client,
    },
    { signal: request.signal }
  );
}

async function loader({ request: { signal }, params: { id } }) {
  const passwords = await getPasswords({ signal });
  const client = await getClient(id, { signal });
  const users = await getManagers({ signal });
  return { passwords: passwords, client: client, users: users };
}

export const ClientInnerRoute = {
  loader,
  action,
  element: <ClientInner />,
};
