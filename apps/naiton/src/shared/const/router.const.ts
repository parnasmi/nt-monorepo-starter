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
export const getRouteAuthRegister = () => "/auth/register";
export const getRouteForbidden = () => "/forbidden";

// App routes (Absolute)
export const getRouteDashboard = () => `${getAppsRoute()}/dashboard`;
export const getRouteDashboardRevenue = () => `${getRouteDashboard()}/revenue`;

export const getRouteSales = () => `${getAppsRoute()}/sales`;
export const getRouteSalesOffers = () => `${getRouteSales()}/offers`;

export const getRouteCrm = () => `${getAppsRoute()}/crm`;
export const getRouteCrmTasks = () => `${getRouteCrm()}/tasks`;

export const getRouteWms = () => `${getAppsRoute()}/wms`;
export const getRouteWmsZones = () => `${getRouteWms()}/zones`;

export const getRouteProcurement = () => `${getAppsRoute()}/procurement`;
export const getRouteProcurementSuppliers = () => `${getRouteProcurement()}/suppliers`;

export const getRouteProduction = () => `${getAppsRoute()}/production`;
export const getRouteProductionOrders = () => `${getRouteProduction()}/orders`;

export const getRouteAccounting = () => `${getAppsRoute()}/accounting`;
export const getRouteAccountingLogistics = () => `${getRouteAccounting()}/logistics`;

export const getRouteHrm = () => `${getAppsRoute()}/hrm`;
export const getRouteHrmRecruitment = () => `${getRouteHrm()}/recruitment`;

export const getRouteFms = () => `${getAppsRoute()}/fms`;
export const getRouteFmsDashboard = () => `${getRouteFms()}/dashboard`;

export const getRouteUserProfile = () => `${getAppsRoute()}/user-profile`;
export const getRouteLogout = () => `${getAppsRoute()}/logout`;

// Relative paths (Internal use)
export const getPathLogin = () => "login";
export const getPathRegister = () => "register";
