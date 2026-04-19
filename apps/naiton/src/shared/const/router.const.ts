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
export const getRouteDashboardOverview = () => `${getAppsRoute()}/dashboard/overview`;
export const getRouteDashboardRevenue = () => `${getAppsRoute()}/dashboard/revenue`;

export const getRouteSalesOrders = () => `${getAppsRoute()}/sales/orders`;
export const getRouteSalesOffers = () => `${getAppsRoute()}/sales/offers`;

export const getRouteCrmCompany = () => `${getAppsRoute()}/crm/company`;
export const getRouteCrmTasks = () => `${getAppsRoute()}/crm/tasks`;

export const getRouteWmsInventory = () => `${getAppsRoute()}/wms/inventory`;
export const getRouteWmsZones = () => `${getAppsRoute()}/wms/zones`;

export const getRouteProcurementRequests = () => `${getAppsRoute()}/procurement/requests`;
export const getRouteProcurementSuppliers = () => `${getAppsRoute()}/procurement/suppliers`;

export const getRouteProductionLines = () => `${getAppsRoute()}/production/lines`;
export const getRouteProductionOrders = () => `${getAppsRoute()}/production/orders`;

export const getRouteAccountingOverview = () => `${getAppsRoute()}/accounting/overview`;
export const getRouteAccountingLogistics = () => `${getAppsRoute()}/accounting/logistics`;

export const getRouteHrmHeadcount = () => `${getAppsRoute()}/hrm/headcount`;
export const getRouteHrmRecruitment = () => `${getAppsRoute()}/hrm/recruitment`;

export const getRouteFmsMap = () => `${getAppsRoute()}/fms/map`;
export const getRouteFmsDashboard = () => `${getAppsRoute()}/fms/dashboard`;

export const getRouteUserProfile = () => `${getAppsRoute()}/user-profile`;
export const getRouteLogout = () => `${getAppsRoute()}/logout`;

// Relative paths (Internal use)
export const getPathLogin = () => "login";
export const getPathRegister = () => "register";
