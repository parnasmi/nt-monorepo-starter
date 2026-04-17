import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { useAuthActions } from "@/features/auth/model/authStore";
import { getRouteAuthLogin } from "@/shared/const/router.const";
import { PageLoader } from "@repo/ui-kit/shared/ui/PageLoader";

export function LogoutRoute() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { reset } = useAuthActions();

  useEffect(() => {
    queryClient.clear();
    reset();
    navigate(getRouteAuthLogin(), { replace: true });
  }, [navigate, queryClient, reset]);

  return <PageLoader />;
}
