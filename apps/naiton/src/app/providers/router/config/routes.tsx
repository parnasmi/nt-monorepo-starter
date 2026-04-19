import { Navigate } from "react-router";

import {
  AppRoutes,
  AuthRoutesEnum,
  getAppsRoute,
  getRouteAccountingOverview,
  getRouteAccountingLogistics,
  getRouteCrmCompany,
  getRouteCrmTasks,
  getRouteDashboardOverview,
  getRouteDashboardRevenue,
  getRouteFmsMap,
  getRouteFmsDashboard,
  getRouteHrmHeadcount,
  getRouteHrmRecruitment,
  getRouteProcurementRequests,
  getRouteProcurementSuppliers,
  getRouteProductionLines,
  getRouteProductionOrders,
  getRouteSalesOrders,
  getRouteSalesOffers,
  getRouteWmsInventory,
  getRouteWmsZones,
  getPathLogin,
  getPathRegister,
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
    path: getRouteDashboardOverview(),
    element: <DashboardPage />,
    authOnly: true,
  },
  dashboard_revenue: {
    path: getRouteDashboardRevenue(),
    element: <RevenuePage />,
    authOnly: true,
  },
  [AppRoutes.SALES]: {
    path: getRouteSalesOrders(),
    element: <SalesPage />,
    authOnly: true,
    availableIn: ["sales"],
  },
  sales_offers: {
    path: getRouteSalesOffers(),
    element: <OffersPage />,
    authOnly: true,
    availableIn: ["sales"],
  },
  [AppRoutes.CRM]: {
    path: getRouteCrmCompany(),
    element: <CrmPage />,
    authOnly: true,
    availableIn: ["crm"],
  },
  crm_tasks: {
    path: getRouteCrmTasks(),
    element: <TasksPage />,
    authOnly: true,
    availableIn: ["crm"],
  },
  [AppRoutes.WMS]: {
    path: getRouteWmsInventory(),
    element: <WmsPage />,
    authOnly: true,
    availableIn: ["wms"],
  },
  wms_zones: {
    path: getRouteWmsZones(),
    element: <ZonesPage />,
    authOnly: true,
    availableIn: ["wms"],
  },
  [AppRoutes.PROCUREMENT]: {
    path: getRouteProcurementRequests(),
    element: <ProcurementPage />,
    authOnly: true,
    availableIn: ["procurement"],
  },
  procurement_suppliers: {
    path: getRouteProcurementSuppliers(),
    element: <SuppliersPage />,
    authOnly: true,
    availableIn: ["procurement"],
  },
  [AppRoutes.PRODUCTION]: {
    path: getRouteProductionLines(),
    element: <ProductionPage />,
    authOnly: true,
    availableIn: ["production"],
  },
  production_orders: {
    path: getRouteProductionOrders(),
    element: <ProductionOrdersPage />,
    authOnly: true,
    availableIn: ["production"],
  },
  [AppRoutes.ACCOUNTING]: {
    path: getRouteAccountingOverview(),
    element: <AccountingPage />,
    authOnly: true,
    availableIn: ["accounting"],
  },
  accounting_logistics: {
    path: getRouteAccountingLogistics(),
    element: <LogisticsPage />,
    authOnly: true,
    availableIn: ["accounting"],
  },
  [AppRoutes.HRM]: {
    path: getRouteHrmHeadcount(),
    element: <HrmPage />,
    authOnly: true,
    availableIn: ["hrm"],
  },
  hrm_recruitment: {
    path: getRouteHrmRecruitment(),
    element: <RecruitmentPage />,
    authOnly: true,
    availableIn: ["hrm"],
  },
  [AppRoutes.FMS]: {
    path: getRouteFmsMap(),
    element: <FmsPage />,
    authOnly: true,
    availableIn: ["fms"],
  },
  fms_dashboard: {
    path: getRouteFmsDashboard(),
    element: <FmsDashboardPage />,
    authOnly: true,
    availableIn: ["fms"],
  },

  // Module root redirects
  dashboard_root: {
    path: `${getAppsRoute()}/dashboard`,
    element: <Navigate replace to={getRouteDashboardOverview()} />,
    authOnly: true,
  },
  sales_root: {
    path: `${getAppsRoute()}/sales`,
    element: <Navigate replace to={getRouteSalesOrders()} />,
    authOnly: true,
  },
  crm_root: {
    path: `${getAppsRoute()}/crm`,
    element: <Navigate replace to={getRouteCrmCompany()} />,
    authOnly: true,
  },
  wms_root: {
    path: `${getAppsRoute()}/wms`,
    element: <Navigate replace to={getRouteWmsInventory()} />,
    authOnly: true,
  },
  procurement_root: {
    path: `${getAppsRoute()}/procurement`,
    element: <Navigate replace to={getRouteProcurementRequests()} />,
    authOnly: true,
  },
  production_root: {
    path: `${getAppsRoute()}/production`,
    element: <Navigate replace to={getRouteProductionLines()} />,
    authOnly: true,
  },
  accounting_root: {
    path: `${getAppsRoute()}/accounting`,
    element: <Navigate replace to={getRouteAccountingOverview()} />,
    authOnly: true,
  },
  hrm_root: {
    path: `${getAppsRoute()}/hrm`,
    element: <Navigate replace to={getRouteHrmHeadcount()} />,
    authOnly: true,
  },
  fms_root: {
    path: `${getAppsRoute()}/fms`,
    element: <Navigate replace to={getRouteFmsMap()} />,
    authOnly: true,
  },
};

export const authRoutes: Record<AuthRoutesEnum, AppRoutesProps> = {
  [AuthRoutesEnum.LOGIN]: {
    path: getPathLogin(),
    element: <></>,
  },
  [AuthRoutesEnum.REGISTER]: {
    path: getPathRegister(),
    element: <></>,
  },
};
