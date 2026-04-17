import { Outlet } from "react-router";

import { useBoundStore } from "@/shared/store";
import { SidebarInset, SidebarProvider } from "@repo/ui-kit/shadcn/sidebar";
import { AppSidebar } from "@/widgets/app-sidebar";

export function InnerLayout() {
  const isSidebarCollapsed = useBoundStore((state) => state.isSidebarCollapsed);
  const setIsSidebarCollapsed = useBoundStore((state) => state.setIsSidebarCollapsed);

  return (
    <SidebarProvider
      defaultOpen={!isSidebarCollapsed}
      onOpenChange={(isOpen) => setIsSidebarCollapsed(!isOpen)}
      open={!isSidebarCollapsed}
    >
      <AppSidebar />
      <SidebarInset className="min-h-[calc(100vh-72px)] bg-transparent">
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
