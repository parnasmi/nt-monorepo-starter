import {
  AppRoutes,
  AuthRoutesEnum,
  getRouteAccounting,
  getRouteCrm,
  getRouteDashboard,
  getRouteFms,
  getRouteHrm,
  getRouteProcurement,
  getRouteProduction,
  getRouteSales,
  getRouteWms,
} from "@/shared/const/router.const";
import type { AllowedProducts } from "@/shared/types/requests.types";
import { DashboardPage, RevenuePage } from "@/pages/dashboard";
import { SalesPage, OffersPage } from "@/pages/sales";
import { CrmPage, TasksPage } from "@/pages/crm";
import { WmsPage, ZonesPage } from "@/pages/wms";
import { ProcurementPage, SuppliersPage } from "@/pages/procurement";
import { ProductionPage, ProductionOrdersPage } from "@/pages/production";
import { AccountingPage, LogisticsPage } from "@/pages/accounting";
import { HrmPage, RecruitmentPage } from "@/pages/hrm";
import { FmsPage, FmsDashboardPage } from "@/pages/fms";

export type AppRoutesProps = {
  path: string;
  element: React.ReactNode;
  authOnly?: boolean;
  availableIn?: AllowedProducts[];
};

export const routes: Record<string, AppRoutesProps> = {
  [AppRoutes.DASHBOARD]: {
    path: getRouteDashboard(),
    element: <DashboardPage />,
    authOnly: true,
  },
  dashboard_revenue: {
    path: "dashboard/revenue",
    element: <RevenuePage />,
    authOnly: true,
  },
  [AppRoutes.SALES]: {
    path: getRouteSales(),
    element: <SalesPage />,
    authOnly: true,
    availableIn: ["sales"],
  },
  sales_offers: {
    path: "sales/offers",
    element: <OffersPage />,
    authOnly: true,
    availableIn: ["sales"],
  },
  [AppRoutes.CRM]: {
    path: getRouteCrm(),
    element: <CrmPage />,
    authOnly: true,
    availableIn: ["crm"],
  },
  crm_tasks: {
    path: "crm/tasks",
    element: <TasksPage />,
    authOnly: true,
    availableIn: ["crm"],
  },
  [AppRoutes.WMS]: {
    path: getRouteWms(),
    element: <WmsPage />,
    authOnly: true,
    availableIn: ["wms"],
  },
  wms_zones: {
    path: "wms/zones",
    element: <ZonesPage />,
    authOnly: true,
    availableIn: ["wms"],
  },
  [AppRoutes.PROCUREMENT]: {
    path: getRouteProcurement(),
    element: <ProcurementPage />,
    authOnly: true,
    availableIn: ["procurement"],
  },
  procurement_suppliers: {
    path: "procurement/suppliers",
    element: <SuppliersPage />,
    authOnly: true,
    availableIn: ["procurement"],
  },
  [AppRoutes.PRODUCTION]: {
    path: getRouteProduction(),
    element: <ProductionPage />,
    authOnly: true,
    availableIn: ["production"],
  },
  production_orders: {
    path: "production/orders",
    element: <ProductionOrdersPage />,
    authOnly: true,
    availableIn: ["production"],
  },
  [AppRoutes.ACCOUNTING]: {
    path: getRouteAccounting(),
    element: <AccountingPage />,
    authOnly: true,
    availableIn: ["accounting"],
  },
  accounting_logistics: {
    path: "accounting/logistics",
    element: <LogisticsPage />,
    authOnly: true,
    availableIn: ["accounting"],
  },
  [AppRoutes.HRM]: {
    path: getRouteHrm(),
    element: <HrmPage />,
    authOnly: true,
    availableIn: ["hrm"],
  },
  hrm_recruitment: {
    path: "hrm/recruitment",
    element: <RecruitmentPage />,
    authOnly: true,
    availableIn: ["hrm"],
  },
  [AppRoutes.FMS]: {
    path: getRouteFms(),
    element: <FmsPage />,
    authOnly: true,
    availableIn: ["fms"],
  },
  fms_dashboard: {
    path: "fms/dashboard",
    element: <FmsDashboardPage />,
    authOnly: true,
    availableIn: ["fms"],
  },
};

export const authRoutes: Record<AuthRoutesEnum, AppRoutesProps> = {
  [AuthRoutesEnum.LOGIN]: {
    path: AuthRoutesEnum.LOGIN,
    element: <></>,
  },
  [AuthRoutesEnum.REGISTER]: {
    path: AuthRoutesEnum.REGISTER,
    element: <></>,
  },
};
