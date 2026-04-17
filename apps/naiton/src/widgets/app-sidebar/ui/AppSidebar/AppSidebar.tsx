import {
  BadgeDollarSign,
  BookText,
  Boxes,
  Building2,
  CircleGauge,
  ClipboardList,
  FileText,
  House,
  LayoutDashboard,
  Mail,
  Map,
  MessageSquare,
  PackageSearch,
  Route,
  Shield,
  ShoppingCart,
  TestTube2,
  Truck,
  UserRoundCog,
  Users,
  Wrench,
} from "lucide-react";
import { memo, type ComponentType, useMemo } from "react";
import { NavLink, useLocation } from "react-router";

import { getAppsRoute } from "@/shared/const/router.const";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@repo/ui-kit/shadcn/sidebar";
import { cn } from "@repo/ui-kit/lib/utils";

type SidebarEntry = {
  label: string;
  icon: ComponentType<{ className?: string }>;
  to?: string;
  badge?: string;
};

type SidebarConfig = {
  heading: string;
  accent: string;
  items: SidebarEntry[];
};

const sidebarConfigByModule: Record<string, SidebarConfig> = {
  dashboard: {
    heading: "Workspace",
    accent: "from-emerald-500/20 to-sky-500/10",
    items: [
      { label: "Overview", icon: LayoutDashboard, to: `${getAppsRoute()}/dashboard` },
      { label: "Revenue", icon: BadgeDollarSign, badge: "4" },
      { label: "Operations", icon: ClipboardList, badge: "7" },
      { label: "Customers", icon: Users, badge: "12" },
    ],
  },
  sales: {
    heading: "Sales",
    accent: "from-sky-500/20 to-cyan-500/10",
    items: [
      { label: "Offers", icon: FileText, badge: "9" },
      { label: "Orders", icon: ShoppingCart, to: `${getAppsRoute()}/sales`, badge: "18" },
      { label: "Subscriptions", icon: BadgeDollarSign, badge: "3" },
    ],
  },
  crm: {
    heading: "CRM",
    accent: "from-emerald-500/20 to-green-500/10",
    items: [
      { label: "Company", icon: Building2, to: `${getAppsRoute()}/crm`, badge: "18" },
      { label: "Tasks", icon: ClipboardList, badge: "11" },
      { label: "Third tab", icon: Users, badge: "4" },
    ],
  },
  fms: {
    heading: "Fleet",
    accent: "from-orange-500/20 to-sky-500/10",
    items: [
      { label: "Map", icon: Map, to: `${getAppsRoute()}/fms` },
      { label: "Dashboard", icon: LayoutDashboard },
      { label: "Chat", icon: MessageSquare, badge: "6" },
      { label: "Maintenance", icon: Wrench, badge: "4" },
      { label: "Transport", icon: Truck, badge: "10" },
      { label: "Tasks", icon: ClipboardList, badge: "12" },
      { label: "Drivers", icon: UserRoundCog, badge: "36" },
      { label: "Tacho", icon: CircleGauge },
      { label: "Alerts", icon: Shield, badge: "5" },
      { label: "Reports", icon: BookText },
      { label: "Settings", icon: Wrench },
    ],
  },
  accounting: {
    heading: "Admin",
    accent: "from-violet-500/20 to-slate-500/10",
    items: [
      { label: "Accounting", icon: BadgeDollarSign, to: `${getAppsRoute()}/accounting` },
      { label: "Logistics", icon: Truck },
      { label: "CRM", icon: Users },
      { label: "HRM", icon: UserRoundCog },
      { label: "Email", icon: Mail },
      { label: "Inventory", icon: House },
      { label: "Production", icon: Boxes },
      { label: "Sales", icon: ShoppingCart },
      { label: "Security", icon: Shield },
      { label: "Scripts", icon: ClipboardList },
      { label: "System", icon: Wrench },
      { label: "Tests", icon: TestTube2 },
      { label: "Docs", icon: BookText },
    ],
  },
  wms: {
    heading: "Warehouse",
    accent: "from-amber-500/20 to-emerald-500/10",
    items: [
      { label: "Inventory flow", icon: Boxes, to: `${getAppsRoute()}/wms` },
      { label: "Zones", icon: House, badge: "12" },
      { label: "Transfers", icon: Route, badge: "8" },
      { label: "Quality checks", icon: Shield, badge: "3" },
    ],
  },
  procurement: {
    heading: "Procurement",
    accent: "from-cyan-500/20 to-emerald-500/10",
    items: [
      { label: "Requests", icon: ClipboardList, to: `${getAppsRoute()}/procurement` },
      { label: "Suppliers", icon: Building2, badge: "24" },
      { label: "Contracts", icon: FileText, badge: "7" },
      { label: "Spend map", icon: PackageSearch },
    ],
  },
  production: {
    heading: "Production",
    accent: "from-indigo-500/20 to-emerald-500/10",
    items: [
      { label: "Lines", icon: Wrench, to: `${getAppsRoute()}/production` },
      { label: "Orders", icon: ClipboardList, badge: "32" },
      { label: "Capacity", icon: CircleGauge, badge: "87%" },
      { label: "Output", icon: Boxes },
    ],
  },
  hrm: {
    heading: "People",
    accent: "from-pink-500/20 to-orange-500/10",
    items: [
      { label: "Headcount", icon: Users, to: `${getAppsRoute()}/hrm`, badge: "1245" },
      { label: "Recruitment", icon: UserRoundCog, badge: "9" },
      { label: "Payroll", icon: BadgeDollarSign },
      { label: "Policies", icon: BookText },
    ],
  },
};

const baseConfig = sidebarConfigByModule.dashboard;

function SidebarBody() {
  const location = useLocation();

  const currentModule = useMemo(() => {
    const segment = location.pathname.split("/")[2];
    return segment || "dashboard";
  }, [location.pathname]);

  const moduleConfig = useMemo(
    () => sidebarConfigByModule[currentModule] ?? baseConfig,
    [currentModule],
  );

  return (
    <Sidebar
      className="top-[72px] h-[calc(100vh-72px)] border-r border-sidebar-border/60"
      collapsible="icon"
    >
      <SidebarHeader className="border-b border-sidebar-border/70 bg-gradient-to-b from-white/8 to-transparent">
        <div
          className={cn(
            "rounded-2xl border border-white/8 bg-gradient-to-br p-4",
            moduleConfig.accent,
          )}
        >
          <p className="text-xs font-semibold tracking-[0.24em] text-sidebar-foreground/65 uppercase">
            {moduleConfig.heading}
          </p>
          <p className="mt-1 text-lg font-semibold text-sidebar-foreground">
            {moduleConfig.heading} module
          </p>
          <p className="mt-1 text-sm text-sidebar-foreground/72">
            Persistent domain navigation for the current workspace.
          </p>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {moduleConfig.items.map((item) => {
                const isActive = Boolean(item.to && location.pathname === item.to);
                const content = (
                  <>
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </>
                );

                return (
                  <SidebarMenuItem key={item.label}>
                    {item.to ? (
                      <SidebarMenuButton asChild isActive={isActive} tooltip={item.label}>
                        <NavLink to={item.to}>{content}</NavLink>
                      </SidebarMenuButton>
                    ) : (
                      <SidebarMenuButton
                        aria-disabled="true"
                        className="cursor-default opacity-80"
                        tooltip={item.label}
                      >
                        {content}
                      </SidebarMenuButton>
                    )}
                    {item.badge ? <SidebarMenuBadge>{item.badge}</SidebarMenuBadge> : null}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="rounded-2xl border border-white/8 bg-white/6 p-3 text-sm text-sidebar-foreground/75">
          <p className="font-medium text-sidebar-foreground">Phase 8 shell</p>
          <p className="mt-1">
            Layouts and route persistence are live. Forms and API flows land next.
          </p>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export const AppSidebar = memo(SidebarBody);
