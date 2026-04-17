import { type JSX, useMemo } from "react";
import { Navigate, useLocation } from "react-router";

import { getRouteAuthLogin, getRouteForbidden } from "@/shared/const/router.const";
import { useBoundStore } from "@/shared/store";
import type { AllowedProducts } from "@/shared/types/requests.types";

type RequireAuthProps = {
  children: JSX.Element;
  availableIn?: AllowedProducts[];
};

export function RequireAuth({ children, availableIn }: RequireAuthProps) {
  const isAuthenticated = useBoundStore((state) => state.isAuthenticated);
  const allowedProducts = useBoundStore((state) => state.allowedProducts);
  const location = useLocation();

  const hasRequiredProducts = useMemo(() => {
    if (!availableIn?.length) {
      return true;
    }

    if (!allowedProducts.length) {
      return false;
    }

    return allowedProducts.some((product) => availableIn.includes(product));
  }, [allowedProducts, availableIn]);

  if (!isAuthenticated) {
    return <Navigate replace state={{ from: location }} to={getRouteAuthLogin()} />;
  }

  if (!hasRequiredProducts) {
    return <Navigate replace state={{ from: location }} to={getRouteForbidden()} />;
  }

  return children;
}
