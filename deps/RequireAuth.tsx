// Source: apps/dashboard/src/app/providers/router/components/RequireAuth.tsx
// Target: apps/naiton/src/app/providers/router/components/RequireAuth.tsx
// Adapt: use useBoundStore directly instead of useAuth/useProfile hooks,
//        replace getRouteDocuments with getRouteForbidden for missing products.

import { JSX, useMemo } from "react";
import { Navigate, useLocation } from "react-router";
import { getRouteAuth, getRouteForbidden } from "@/shared/const/router.const";
import { useBoundStore } from "@/shared/store";
import { AllowedProducts } from "@/shared/types/requests.types";

type RequireAuthProps = {
  children: JSX.Element;
  availableIn?: AllowedProducts[];
};

export function RequireAuth({ children, availableIn }: RequireAuthProps) {
  const isAuthenticated = useBoundStore((s) => s.isAuthenticated);
  const allowedProducts = useBoundStore((s) => s.allowedProducts);
  const location = useLocation();

  const hasRequiredProducts = useMemo(() => {
    if (!availableIn?.length) {
      return true;
    }
    if (!allowedProducts?.length) {
      return false;
    }
    return allowedProducts.some((p) => availableIn.includes(p));
  }, [allowedProducts, availableIn]);

  if (!isAuthenticated) {
    return <Navigate to={getRouteAuth()} state={{ from: location }} replace />;
  }

  if (!hasRequiredProducts) {
    return <Navigate to={getRouteForbidden()} state={{ from: location }} replace />;
  }

  return children;
}
