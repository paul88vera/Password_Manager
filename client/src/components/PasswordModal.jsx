import { useState } from "react";

const PasswordModal = ({ toggle, id }) => {
  const [siteName, setSiteName] = useState("");
  const [siteUrl, setSiteUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const PORT = import.meta.VITE_API_URL;

  return (
    <Form
      method="post"
      action="."
      className="form_container flex flex-col justify-between gap-4">
      <input id="passClient" name="passClient" type="hidden" value={id} />
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
        <button type="cancel" className="button cancel-btn" onClick={toggle}>
          Cancel
        </button>
        <button type="submit" className="button save-btn">
          Save
        </button>
      </div>
    </Form>
  );
};

export default PasswordModal;
