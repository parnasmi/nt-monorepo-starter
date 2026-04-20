import { Outlet } from "react-router";

import { useBoundStore } from "@/shared/store";
import { AppNavbar } from "@/widgets/app-navbar";
import { SidebarProvider } from "@repo/ui-kit/shadcn/sidebar";

export function OuterLayout() {
  const isSidebarCollapsed = useBoundStore((state) => state.isSidebarCollapsed);
  const setIsSidebarCollapsed = useBoundStore((state) => state.setIsSidebarCollapsed);

  return (
    <SidebarProvider
      defaultOpen={!isSidebarCollapsed}
      onOpenChange={(isOpen) => setIsSidebarCollapsed(!isOpen)}
      open={!isSidebarCollapsed}
      style={{ "--sidebar-width": "88px" } as React.CSSProperties}
    >
      <AppNavbar />
      <Outlet />
    </SidebarProvider>
  );
}
