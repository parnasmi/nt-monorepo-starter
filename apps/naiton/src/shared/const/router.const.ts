export const AppRoutes = {
  DASHBOARD: "dashboard",
  SALES: "sales",
  CRM: "crm",
  WMS: "wms",
  PROCUREMENT: "procurement",
  PRODUCTION: "production",
  ACCOUNTING: "accounting",
  HRM: "hrm",
  FMS: "fms",
  USER_PROFILE: "user-profile",
  LOGOUT: "logout",
} as const;

export type AppRoute = (typeof AppRoutes)[keyof typeof AppRoutes];

export const AuthRoutes = {
  LOGIN: "login",
  REGISTER: "register",
} as const;

export type AuthRoute = (typeof AuthRoutes)[keyof typeof AuthRoutes];

const BaseRoutes = {
  APP: "/app",
  AUTH: "/auth",
  FORBIDDEN: "/forbidden",
} as const;

export const getAppsRoute = () => BaseRoutes.APP;
export const getRouteAuth = () => BaseRoutes.AUTH;
export const getRouteAuthLogin = () => `${BaseRoutes.AUTH}/${AuthRoutes.LOGIN}`;
export const getRouteForbidden = () => BaseRoutes.FORBIDDEN;
export const getRouteLogout = () => AppRoutes.LOGOUT;
export const getRouteDashboard = () => AppRoutes.DASHBOARD;
export const getRouteSales = () => AppRoutes.SALES;
export const getRouteCrm = () => AppRoutes.CRM;
export const getRouteWms = () => AppRoutes.WMS;
export const getRouteProcurement = () => AppRoutes.PROCUREMENT;
export const getRouteProduction = () => AppRoutes.PRODUCTION;
export const getRouteAccounting = () => AppRoutes.ACCOUNTING;
export const getRouteHrm = () => AppRoutes.HRM;
export const getRouteFms = () => AppRoutes.FMS;
