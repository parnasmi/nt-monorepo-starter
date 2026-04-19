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
  getRouteAuth,
  getRouteAuthLogin,
  getRouteDashboard,
  getRouteForbidden,
  getRouteLogout,
} from "@/shared/const/router.const";
import { PageLoader } from "@repo/ui-kit/shared/ui/PageLoader";
import { authRoutes, routes as routePaths, type AppRoutesProps } from "../../config/routes";
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
        <Route element={<AuthLoginPage />} path={authRoutes.login.path} />
        <Route element={<RegisterPage />} path={authRoutes.register.path} />
      </Route>

      <Route element={<OuterLayout />} path={getAppsRoute()}>
        <Route element={<InnerLayout />}>
          <Route element={<AuthProvider />}>
            <Route
              element={
                <ScrollContainer>
                  <RequireAuth>
                    <Navigate replace to={getRouteDashboard()} />
                  </RequireAuth>
                </ScrollContainer>
              }
              index
            />
            <Route element={<LogoutRoute />} path={getRouteLogout()} />
            {Object.values(routePaths).map(renderWithWrapper)}
          </Route>
        </Route>
      </Route>

      <Route element={<ForbiddenPage />} path={getRouteForbidden()} />
      <Route element={<NotFoundPage />} path="*" />
    </Routes>
  );
}
