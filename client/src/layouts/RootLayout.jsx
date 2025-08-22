import { Outlet, ScrollRestoration } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function RootLayout() {
  return (
    <div className="flex flex-row gap-0 flex-nowrap">
      <ScrollRestoration />
      <div id="sidebar" className="float-left p-0">
        <Sidebar />
      </div>
      <div className="main-container float-end p-8">
        <Outlet />
      </div>
    </div>
  );
}
