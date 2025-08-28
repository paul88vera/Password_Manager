import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

const Modal = ({ children }) => {
  return createPortal(
    <div id="modal-container">
      <form className="form_container flex flex-col justify-between gap-4">
        <div className="flex flex-row gap-2 flex-nowrap justify-between align-middle text-right">
          <label htmlFor="site_name" className="w-40">
            Site Name:
          </label>
          <input type="text" name="site_name" id="site_name" className="w-60" />
        </div>
        <div className="flex flex-row gap-2 flex-nowrap justify-between align-middle text-right">
          <label htmlFor="site_url" className="w-40">
            Site URL:
          </label>
          <input type="text" name="site_url" id="site_url" className="w-60" />
        </div>
        <div className="flex flex-row gap-2 flex-nowrap justify-between align-middle text-right">
          <label htmlFor="username" className="w-40">
            Username:
          </label>
          <input type="text" name="username" id="username" className="w-60" />
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
          />
        </div>

        <div className="flex flex-row gap-2 mt-2">
          <Link to={"/clients"} className="button cancel-btn">
            Cancel
          </Link>
          <Link to={"/clients"} className="button save-btn">
            Save
          </Link>
        </div>
      </form>
      {children}
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
