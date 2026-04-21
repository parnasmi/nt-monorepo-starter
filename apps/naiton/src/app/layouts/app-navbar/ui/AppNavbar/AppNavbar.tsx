import {
  Bell,
  ChevronDown,
  CircleHelp,
  Globe,
  LogOut,
  MonitorCog,
  Search,
  Settings,
  Share2,
  ShoppingBag,
} from "lucide-react";
import { useMemo } from "react";
import { NavLink, useLocation } from "react-router";
import { useTranslation } from "react-i18next";

import {
  getRouteAccountingOverview,
  getRouteCrmCompany,
  getRouteDashboardOverview,
  getRouteFmsMap,
  getRouteHrmHeadcount,
  getRouteLogout,
  getRouteProcurementRequests,
  getRouteProductionLines,
  getRouteSalesOrders,
  getRouteWmsInventory,
} from "@/shared/const/router.const";
import { useBoundStore } from "@/shared/store";
import type { AllowedProducts } from "@/shared/types/requests.types";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui-kit/shadcn/avatar";
import { Button } from "@repo/ui-kit/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui-kit/shadcn/dropdown-menu";
import { SidebarTrigger } from "@repo/ui-kit/shadcn/sidebar";
import { cn } from "@repo/ui-kit/lib/utils";

type NavbarModule = {
  key: AllowedProducts;
  label: string;
  to: string;
};

const modules: NavbarModule[] = [
  { key: "sales", label: "Sales", to: getRouteSalesOrders() },
  { key: "wms", label: "WMS", to: getRouteWmsInventory() },
  { key: "crm", label: "CRM", to: getRouteCrmCompany() },
  { key: "procurement", label: "Procurement", to: getRouteProcurementRequests() },
  { key: "production", label: "Production", to: getRouteProductionLines() },
  { key: "accounting", label: "Accounting", to: getRouteAccountingOverview() },
  { key: "hrm", label: "HRM", to: getRouteHrmHeadcount() },
  { key: "fms", label: "FMS", to: getRouteFmsMap() },
];

const actionIcons = [ShoppingBag, Share2, CircleHelp, Bell, Settings];

export function AppNavbar() {
  const location = useLocation();
  const { i18n } = useTranslation();
  const allowedProducts = useBoundStore((state) => state.allowedProducts);
  const profile = useBoundStore((state) => state.profile);
  const lng = useBoundStore((state) => state.lng);
  const setLng = useBoundStore((state) => state.setLng);

  const visibleModules = useMemo(() => {
    if (!allowedProducts.length) {
      return modules;
    }

    return modules.filter((moduleItem) => allowedProducts.includes(moduleItem.key));
  }, [allowedProducts]);

  const initials = useMemo(() => {
    const fullName = profile?.fullName ?? "Super Admin";
    return fullName
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [profile?.fullName]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-black/5 bg-primary text-primary-foreground shadow-[0_10px_30px_rgba(15,23,42,0.12)]">
      <div className="flex h-[72px] items-center gap-3 px-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <SidebarTrigger className="text-white hover:bg-white/10 md:hidden" />

          <NavLink
            className="hidden items-center gap-2 rounded-2xl border border-white/15 bg-white/4 px-3 py-2 sm:flex"
            to={getRouteDashboardOverview()}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-lg font-bold">
              N
            </div>
            <div className="leading-tight">
              <p className="text-[1.7rem] font-semibold tracking-tight">Naiton</p>
              <p className="text-[0.62rem] font-medium tracking-[0.24em] text-white/80 uppercase">
                Business Suite
              </p>
            </div>
          </NavLink>
        </div>

        <div className="hidden flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 lg:flex lg:max-w-xs">
          <Search className="h-4 w-4 text-white/80" />
          <input
            className="h-11 w-full border-0 bg-transparent text-sm text-white outline-none placeholder:text-white/65"
            placeholder="Search Naiton"
            type="search"
          />
        </div>

        <nav className="hidden min-w-0 flex-1 items-center justify-start gap-1 overflow-x-auto xl:flex">
          {visibleModules.map((moduleItem) => (
            <NavLink
              key={moduleItem.key}
              className={({ isActive }) =>
                cn(
                  "rounded-xl px-3 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white",
                  (isActive || location.pathname.startsWith(moduleItem.to)) &&
                    "bg-white/12 text-white shadow-inner",
                )
              }
              to={moduleItem.to}
            >
              {moduleItem.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5 text-white">
          {actionIcons.map((Icon, index) => (
            <button
              key={Icon.displayName ?? index}
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/7 transition hover:bg-white/14"
              type="button"
            >
              <Icon className="h-4 w-4" />
              {index === 3 ? (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                  3
                </span>
              ) : null}
            </button>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="h-10 rounded-full border border-white/10 bg-white/9 px-2 text-white hover:bg-white/14"
                variant="ghost"
              >
                <Globe className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase">{lng}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {["uz", "ru"].map((language) => (
                <DropdownMenuItem
                  key={language}
                  onClick={() => {
                    setLng(language as "uz" | "ru");
                    void i18n.changeLanguage(language);
                  }}
                >
                  {language.toUpperCase()}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-2 py-1.5 transition hover:bg-white/14"
                type="button"
              >
                <Avatar className="h-8 w-8 border border-white/20">
                  <AvatarImage alt={profile?.fullName ?? "User"} src={profile?.avatarUrl} />
                  <AvatarFallback className="bg-white/20 text-xs font-semibold text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden text-sm font-medium sm:block">
                  {profile?.fullName ?? "Super Admin"}
                </span>
                <ChevronDown className="h-4 w-4 text-white/80" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>{profile?.role ?? "Suite administrator"}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <NavLink to={getRouteDashboardOverview()}>Workspace overview</NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>Profile center arrives after auth flow</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <NavLink className="flex items-center gap-2" to={getRouteLogout()}>
                  <LogOut className="h-4 w-4" />
                  Logout
                </NavLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/7 transition hover:bg-white/14 sm:inline-flex"
            type="button"
          >
            <MonitorCog className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
