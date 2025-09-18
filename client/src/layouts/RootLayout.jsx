import { Outlet, ScrollRestoration } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { getUser } from "../api/users";
import { SignedOut, SignedIn, RedirectToSignIn } from "@clerk/clerk-react";

// eslint-disable-next-line react-refresh/only-export-components
const RootLayout = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row gap-0 flex-nowrap">
      <ScrollRestoration />

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <SignedIn>
        <div
          id="sidebar"
          className="md:float-left float-none p-0 md:w-15 w-screen">
          <Sidebar />
        </div>
        <div className="main-container md:float-end md:p-8 p-4 pb-10 w-full">
          <Outlet />
        </div>
      </SignedIn>
    </div>
  );
};

async function loader({ request: { signal }, params: { id } }) {
  const user = await getUser(id, { signal });
  return { user: user };
}

export const LayoutRoute = {
  loader,
  element: <RootLayout />,
};
