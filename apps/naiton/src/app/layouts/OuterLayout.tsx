import { Outlet } from "react-router";

import { AppNavbar } from "@/widgets/app-navbar";

export function OuterLayout() {
  return (
    <div className="min-h-screen bg-transparent">
      <AppNavbar />
      <div className="pt-[72px]">
        <Outlet />
      </div>
    </div>
  );
}
