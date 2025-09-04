import { Outlet, ScrollRestoration } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function RootLayout() {
  return (
    <div className="flex flex-col-reverse md:flex-row gap-0 flex-nowrap">
      <ScrollRestoration />
      <div
        id="sidebar"
        className="md:float-left float-none p-0 md:w-15 w-screen">
        <Sidebar />
      </div>
      <div className="main-container md:float-end md:p-8 p-4 pb-10 w-full">
        <Outlet />
      </div>
    </div>
  );
}
