import { lazy } from "react";

import {
  type AppRoute,
  AppRoutes,
  type AuthRoute,
  AuthRoutes,
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
const SalesPage = lazy(() => import("@/pages/sales"));
const CrmPage = lazy(() => import("@/pages/crm"));
const WmsPage = lazy(() => import("@/pages/wms"));
const ProcurementPage = lazy(() => import("@/pages/procurement"));
const ProductionPage = lazy(() => import("@/pages/production"));
const AccountingPage = lazy(() => import("@/pages/accounting"));
const HrmPage = lazy(() => import("@/pages/hrm"));
const FmsPage = lazy(() => import("@/pages/fms"));

export type AppRoutesProps = {
  path: string;
  element: React.ReactNode;
  authOnly?: boolean;
  availableIn?: AllowedProducts[];
};

type ModuleRoute = Exclude<AppRoute, typeof AppRoutes.USER_PROFILE | typeof AppRoutes.LOGOUT>;

export const routes: Record<ModuleRoute, AppRoutesProps> = {
  [AppRoutes.DASHBOARD]: {
    path: getRouteDashboard(),
    element: <DashboardPage />,
    authOnly: true,
  },
  [AppRoutes.SALES]: {
    path: getRouteSales(),
    element: <SalesPage />,
    authOnly: true,
    availableIn: ["sales"],
  },
  [AppRoutes.CRM]: {
    path: getRouteCrm(),
    element: <CrmPage />,
    authOnly: true,
    availableIn: ["crm"],
  },
  [AppRoutes.WMS]: {
    path: getRouteWms(),
    element: <WmsPage />,
    authOnly: true,
    availableIn: ["wms"],
  },
  [AppRoutes.PROCUREMENT]: {
    path: getRouteProcurement(),
    element: <ProcurementPage />,
    authOnly: true,
    availableIn: ["procurement"],
  },
  [AppRoutes.PRODUCTION]: {
    path: getRouteProduction(),
    element: <ProductionPage />,
    authOnly: true,
    availableIn: ["production"],
  },
  [AppRoutes.ACCOUNTING]: {
    path: getRouteAccounting(),
    element: <AccountingPage />,
    authOnly: true,
    availableIn: ["accounting"],
  },
  [AppRoutes.HRM]: {
    path: getRouteHrm(),
    element: <HrmPage />,
    authOnly: true,
    availableIn: ["hrm"],
  },
  [AppRoutes.FMS]: {
    path: getRouteFms(),
    element: <FmsPage />,
    authOnly: true,
    availableIn: ["fms"],
  },
};

export const authRoutes: Record<AuthRoute, AppRoutesProps> = {
  [AuthRoutes.LOGIN]: {
    path: AuthRoutes.LOGIN,
    element: <></>,
  },
  [AuthRoutes.REGISTER]: {
    path: AuthRoutes.REGISTER,
    element: <></>,
  },
};
