import { keepPreviousData, useQuery, type UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useToastNotif } from "@/shared/hooks/useToastNotif/useToastNotif";
import type { GetRequestResponse } from "@/shared/types/requests.types";
import { request } from "../api";

type QueryFetchProps<T> = {
  url: string;
  params?: Record<string, string | null | undefined | number>;
  initialData?: T;
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
  keepPrevious?: boolean;
  retry?: boolean | number;
  showNotification?: boolean;
} & Omit<UseQueryOptions<T>, "queryKey" | "queryFn">;

export const useFetchQueries = <T>(options: QueryFetchProps<T>) => {
  const {
    url,
    params = {},
    initialData,
    enabled = true,
    refetchOnWindowFocus = true,
    keepPrevious,
    retry = false,
    showNotification = true,
    ...queryOptions
  } = options;
  const { showToast } = useToastNotif();
  const stringifiedParams = Object.entries(params).reduce(
    (acc, [key, value]) => `${acc}-${key}-${value}`,
    "",
  );
  const computedQueryKey = `${url}-${stringifiedParams}`;
  const cachedQueryKey = useMemo(() => [computedQueryKey], [computedQueryKey]);
  const { t } = useTranslation();
  const query = useQuery({
    queryKey: cachedQueryKey,
    queryFn: async (): Promise<T> => {
      const { data } = await request.get<T>(url, { params });
      return data;
    },
    // @ts-expect-error - placeholderData typing mismatch
    placeholderData: keepPrevious ? keepPreviousData : initialData,
    enabled,
    refetchOnWindowFocus,
    retry,
    ...queryOptions,
  });

  useEffect(() => {
    if (query.error) {
      const message = t("Что-то пошло не так");
      let errorMessage = "";

      if (axios.isAxiosError<GetRequestResponse<T>, Record<string, string>>(query.error)) {
        errorMessage = query.error.response?.data?.message as string;
      }

      if (showNotification) {
        showToast({
          message: errorMessage || message,
          type: "error",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.error, showToast]);

  return query;
};
