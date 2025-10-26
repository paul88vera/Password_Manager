import { useOrganization } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const ManagerCard = ({ children, id, active }) => {
  const { organization } = useOrganization();
  return (
    <Link
      to={`/${organization.id}/manager/${id}`}
      className={`site-card ${
        active == 1 ? `bg-slate-400 !text-slate-500` : `bg-slate-600`
      } flex flex-row flex-nowrap gap-4 align-middle justify-start p-4 rounded-lg  font-bold w-full md:w-100 md:max-w-[350px]  md:hover:scale-105 hover:opacity-90 transition ease-in-out`}
      key={id}>
      {children}
    </Link>
  );
};

export default ManagerCard;
