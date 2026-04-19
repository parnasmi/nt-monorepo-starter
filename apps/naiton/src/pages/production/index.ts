import { lazy } from "react";

export const ProductionPage = lazy(() => import("./ui/ProductionPage"));
export const ProductionOrdersPage = lazy(() => import("./orders"));
