import { lazy } from "react";

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

const DashboardPage = lazy(() => import("@/pages/dashboard"));
const RevenuePage = lazy(() => import("@/pages/dashboard/revenue"));
const SalesPage = lazy(() => import("@/pages/sales"));
const OffersPage = lazy(() => import("@/pages/sales/offers"));
const CrmPage = lazy(() => import("@/pages/crm"));
const TasksPage = lazy(() => import("@/pages/crm/tasks"));
const WmsPage = lazy(() => import("@/pages/wms"));
const ZonesPage = lazy(() => import("@/pages/wms/zones"));
const ProcurementPage = lazy(() => import("@/pages/procurement"));
const SuppliersPage = lazy(() => import("@/pages/procurement/suppliers"));
const ProductionPage = lazy(() => import("@/pages/production"));
const ProductionOrdersPage = lazy(() => import("@/pages/production/orders"));
const AccountingPage = lazy(() => import("@/pages/accounting"));
const LogisticsPage = lazy(() => import("@/pages/accounting/logistics"));
const HrmPage = lazy(() => import("@/pages/hrm"));
const RecruitmentPage = lazy(() => import("@/pages/hrm/recruitment"));
const FmsPage = lazy(() => import("@/pages/fms"));
const FmsDashboardPage = lazy(() => import("@/pages/fms/dashboard"));

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
