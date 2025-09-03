import { Form, Link, redirect, useLoaderData } from "react-router-dom";
import { createPassword, getPasswords } from "../api/passwords";
import { RiUserSearchFill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { getClient } from "../api/clients";
import { useState } from "react";
import Modal from "../components/Modal";

// eslint-disable-next-line react-refresh/only-export-components
const ClientInner = () => {
  const { passwords, client } = useLoaderData();
  const [openCardId, setOpenCardId] = useState();
  const [modalOpened, setModalOpened] = useState();

  const [passClient] = useState(client[0]?.ClientID);
  const [siteName, setSiteName] = useState("");
  const [siteUrl, setSiteUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const toggleCard = (id) => {
    setOpenCardId((current) => (current === id ? null : id));
  };

  const toggleModal = () => {
    setModalOpened((current) => !current);
  };

  const passwordFilter = passwords.filter(
    (item) => item.Client === client[0]?.ClientID
  );

  return (
    <div className="flex flex-col gap-4 md:mt-4 pb-8">
      {modalOpened ? (
        <Modal>
          <Form
            method="post"
            action={`/client/${passClient}`}
            onSubmit={toggleModal}
            className="form_container flex flex-col justify-between gap-4">
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
                type="password"
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
        </Modal>
      ) : null}
      <div className="flex flex-col flex-nowrap justify-between bg-slate-300 p-8 rounded-2xl">
        <div className="flex flex-row gap-4 justify-between relative w-full">
          <div className="flex flex-row flex-nowrap gap-8">
            <RiUserSearchFill className="text-7xl text-slate-900" />
            <p className="text-3xl font-bold text-slate-950">
              {client[0]?.ClientUsername || "Unknown"} <br />
              <span className="text-2xl font-normal">
                {client[0]?.ClientCompany || "Unknown"}
              </span>
            </p>
          </div>
          <button
            className="!text-slate-950 button flex flex-row gap-2 flex-nowrap align-middle hover:scale-105 transition ease-in-out"
            onClick={() => setModalOpened(true)}>
            Add Password <FaPlusCircle className="text-2xl text-slate-900" />
          </button>
        </div>

        <div className="flex flex-row flex-wrap gap-4 mt-8">
          {passwordFilter.map((pass) => (
            <div
              className="site-card text-slate-300 flex flex-col flex-nowrap gap-4 align-middle justify-start p-4  pb-0 rounded-lg bg-slate-900 font-bold w-full md:max-w-[380px] hover:bg-slate-950 transition ease-in-out"
              key={pass.PassID}>
              <div
                className="flex flex-row gap-4 align-middle justify-start w-full relative cursor-pointer"
                onClick={() => toggleCard(pass.PassID)}>
                <RiUserSearchFill className="text-6xl  " />
                <div className="flex flex-col justify-start">
                  <h3 className=" ">{pass.PassSite}</h3>
                  <Link to={pass.PassHTML} className="text-[1rem] font-thin">
                    {pass.PassHTML}
                  </Link>
                </div>
                {openCardId === pass.PassID ? (
                  <MdEdit className="text-2xl text-lime-500 hover:text-slate-300 absolute right-0" />
                ) : null}
              </div>
              <div className="p-0">
                {openCardId === pass.PassID ? (
                  <div
                    className="flex flex-col gap-4 pt-0 pb-8"
                    key={pass.PassID}>
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

  const password = await createPassword(
    {
      PassSite,
      PassUsername,
      PassHTML,
      PassPW,
      Client,
    },
    { signal: request.signal }
  );

  password;

  return redirect(`./`);
}

async function loader({ request: { signal }, params: { id } }) {
  const passwords = await getPasswords({ signal });
  const client = await getClient(id, { signal });
  return { passwords: passwords, client: client };
}

export const ClientInnerRoute = {
  loader,
  action,
  element: <ClientInner />,
};
