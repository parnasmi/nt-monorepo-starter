import { Suspense, useCallback } from "react";
import { Navigate, Route, Routes } from "react-router";

import { AuthProvider } from "@/app/providers/authProvider/AuthProvider";
import { AuthLayout } from "@/app/layouts/AuthLayout";
import { InnerLayout } from "@/app/layouts/InnerLayout";
import { OuterLayout } from "@/app/layouts/OuterLayout";
import { LogoutRoute } from "@/features/auth";
import { AuthLoginPage, RegisterPage } from "@/pages/auth";
import { ForbiddenPage } from "@/pages/forbidden";
import { NotFoundPage } from "@/pages/notfound";
import {
  getAppsRoute,
  getRouteAccountingOverview,
  getRouteAuth,
  getRouteAuthLogin,
  getRouteCrmCompany,
  getRouteDashboardOverview,
  getRouteFmsMap,
  getRouteForbidden,
  getRouteHrmHeadcount,
  getRouteLogout,
  getRouteProcurementRequests,
  getRouteProductionLines,
  getRouteSalesOrders,
  getRouteWmsInventory,
  getPathLogin,
  getPathRegister,
} from "@/shared/const/router.const";
import { PageLoader } from "@repo/ui-kit/shared/ui/PageLoader";
import { routes as routePaths, type AppRoutesProps } from "../../config/routes";
import { RequireAuth } from "../RequireAuth";
import { ScrollContainer } from "../ScrollContainer/ScrollContainer";

export default function AppRouter() {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = (
      <Suspense fallback={<PageLoader />}>
        <ScrollContainer>{route.element}</ScrollContainer>
      </Suspense>
    );

    return (
      <Route
        key={route.path}
        element={
          route.authOnly ? (
            <RequireAuth availableIn={route.availableIn}>{element}</RequireAuth>
          ) : (
            element
          )
        }
        path={route.path}
      />
    );
  }, []);

  return (
    <Routes>
      <Route element={<Navigate replace to={getRouteAuthLogin()} />} path="/" />

      <Route element={<AuthLayout />} path={getRouteAuth()}>
        <Route element={<Navigate replace to={getRouteAuthLogin()} />} index />
        <Route element={<AuthLoginPage />} path={getPathLogin()} />
        <Route element={<RegisterPage />} path={getPathRegister()} />
      </Route>

      <Route element={<OuterLayout />} path={getAppsRoute()}>
        <Route element={<InnerLayout />}>
          <Route element={<AuthProvider />}>
            <Route
              element={
                <ScrollContainer>
                  <RequireAuth>
                    <Navigate replace to={getRouteDashboardOverview()} />
                  </RequireAuth>
                </ScrollContainer>
              }
              index
            />
            <Route element={<LogoutRoute />} path={getRouteLogout()} />
            <Route
              element={<Navigate replace to={getRouteDashboardOverview()} />}
              path={`${getAppsRoute()}/dashboard`}
            />
            <Route
              element={<Navigate replace to={getRouteSalesOrders()} />}
              path={`${getAppsRoute()}/sales`}
            />
            <Route
              element={<Navigate replace to={getRouteCrmCompany()} />}
              path={`${getAppsRoute()}/crm`}
            />
            <Route
              element={<Navigate replace to={getRouteWmsInventory()} />}
              path={`${getAppsRoute()}/wms`}
            />
            <Route
              element={<Navigate replace to={getRouteProcurementRequests()} />}
              path={`${getAppsRoute()}/procurement`}
            />
            <Route
              element={<Navigate replace to={getRouteProductionLines()} />}
              path={`${getAppsRoute()}/production`}
            />
            <Route
              element={<Navigate replace to={getRouteAccountingOverview()} />}
              path={`${getAppsRoute()}/accounting`}
            />
            <Route
              element={<Navigate replace to={getRouteHrmHeadcount()} />}
              path={`${getAppsRoute()}/hrm`}
            />
            <Route
              element={<Navigate replace to={getRouteFmsMap()} />}
              path={`${getAppsRoute()}/fms`}
            />
            {Object.values(routePaths).map(renderWithWrapper)}
          </Route>
        </Route>
      </Route>

      <Route element={<ForbiddenPage />} path={getRouteForbidden()} />
      <Route element={<NotFoundPage />} path="*" />
    </Routes>
  );
}
