export enum AppRoutes {
  DASHBOARD = "dashboard",
  SALES = "sales",
  CRM = "crm",
  WMS = "wms",
  PROCUREMENT = "procurement",
  PRODUCTION = "production",
  ACCOUNTING = "accounting",
  HRM = "hrm",
  FMS = "fms",
  USER_PROFILE = "user-profile",
  LOGOUT = "logout",
}

export enum AuthRoutesEnum {
  LOGIN = "login",
  REGISTER = "register",
}

export const getAppsRoute = () => "/app";
export const getRouteAuth = () => "/auth";
export const getRouteAuthLogin = () => "/auth/login";
export const getRouteForbidden = () => "/forbidden";
export const getRouteLogout = () => "logout";
export const getRouteDashboard = () => "dashboard";
export const getRouteSales = () => "sales";
export const getRouteCrm = () => "crm";
export const getRouteWms = () => "wms";
export const getRouteProcurement = () => "procurement";
export const getRouteProduction = () => "production";
export const getRouteAccounting = () => "accounting";
export const getRouteHrm = () => "hrm";
export const getRouteFms = () => "fms";
