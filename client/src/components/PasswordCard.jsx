import { useOrganization } from "@clerk/clerk-react";
import { memo } from "react";
import { Link } from "react-router-dom";

const PasswordCard = ({ children, id, name }) => {
  const { organization } = useOrganization();

  const newName = name.replace(/\s+/g, "").toLowerCase();

  return (
    <Link
      to={`/${organization.id}/sites/${newName}`}
      className="site-card bg-slate-300 flex flex-row flex-nowrap gap-4 align-middle justify-start p-4 rounded-lg text-slate-900 font-bold w-full md:w-100 md:max-w-[350px] md:hover:scale-105 hover:opacity-90 transition ease-in-out"
      key={id}>
      {children}
    </Link>
  );
};

export default memo(PasswordCard);
