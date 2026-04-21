import { LockKeyhole, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { z } from "zod";

import { useAuthActions } from "@/pages/auth/model/authStore";
import { endpoints } from "@/shared/const/endpoints.const";
import { getAppsRoute } from "@/shared/const/router.const";
import { useRhForm } from "@/shared/hooks/useRHForm/useRHForm";
import type { FormSubmitResponse } from "@/shared/types/requests.types";
import { Button } from "@repo/ui-kit/shadcn/button";
import { Input } from "@repo/ui-kit/shadcn/input";
import { cn } from "@repo/ui-kit/lib/utils";

const getLoginSchema = (requiredMessage: string) =>
  z.object({
    phone: z.string().trim().min(1, requiredMessage),
    password: z.string().trim().min(1, requiredMessage),
  });

export function LoginForm() {
  const navigate = useNavigate();
  const { t } = useTranslation("auth");
  const { login, setCsrfToken } = useAuthActions();

  const { errors, isSubmitting, onSubmit, register } = useRhForm<
    ReturnType<typeof getLoginSchema>,
    FormSubmitResponse,
    {
      phone: string;
      password: string;
    }
  >({
    initialValues: {
      phone: "",
      password: "",
    },
    successCallback: (_, response) => {
      const authPayload = response?.data.data;

      if (!authPayload) {
        return;
      }

      login({
        accessToken: authPayload.access_token,
        refreshToken: authPayload.refresh_token,
        allowed: authPayload.allowed,
      });
      setCsrfToken(authPayload.csrf);
      navigate(`${getAppsRoute()}/dashboard`, { replace: true });
    },
    fieldDataMapper: (formData) => ({
      phone: formData.phone.trim(),
      password: formData.password,
    }),
    url: endpoints.LOGIN,
    validationSchema: getLoginSchema(t("validation.required")),
  });

  return (
    <section className="w-full max-w-[246px] rounded-xl bg-slate-50/96 p-4 shadow-[0_14px_34px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/80">
      <div>
        <h1 className="text-[1.15rem] font-semibold tracking-tight text-slate-800">{t("title")}</h1>
      </div>

      <form className="mt-4 space-y-2.5" onSubmit={onSubmit}>
        <div>
          <label className="sr-only" htmlFor="login-phone">
            {t("phone")}
          </label>
          <div className="relative">
            <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              autoComplete="username"
              className={cn(
                "h-8 rounded-md border-slate-200 bg-white pl-9 text-sm shadow-none placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-primary",
                errors.phone && "border-red-300 focus-visible:ring-red-400",
              )}
              id="login-phone"
              placeholder={t("phone")}
              {...register("phone")}
            />
          </div>
          {errors.phone ? (
            <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
          ) : null}
        </div>

        <div>
          <label className="sr-only" htmlFor="login-password">
            {t("password")}
          </label>
          <div className="relative">
            <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              autoComplete="current-password"
              className={cn(
                "h-8 rounded-md border-slate-200 bg-white pl-9 text-sm shadow-none placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-primary",
                errors.password && "border-red-300 focus-visible:ring-red-400",
              )}
              id="login-password"
              placeholder={t("password")}
              type="password"
              {...register("password")}
            />
          </div>
          {errors.password ? (
            <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
          ) : null}
        </div>

        <div className="flex justify-end">
          <button className="text-xs font-medium text-primary hover:underline" type="button">
            {t("resetPassword")}
          </button>
        </div>

        <Button
          className="mt-1 h-9 rounded-md bg-slate-200 text-slate-500 hover:bg-slate-200"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? t("submitting") : t("submit")}
        </Button>
      </form>

      <p className="mt-4 text-xs leading-4 text-slate-500">
        {t("termsPrefix")}{" "}
        <button className="font-medium text-slate-500 underline underline-offset-2" type="button">
          {t("terms")}
        </button>{" "}
        {t("and")}{" "}
        <button className="font-medium text-slate-500 underline underline-offset-2" type="button">
          {t("privacy")}
        </button>
      </p>
    </section>
  );
}
