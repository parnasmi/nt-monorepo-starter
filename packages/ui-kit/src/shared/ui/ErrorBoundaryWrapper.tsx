import { useEffect } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";

export const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  const { t } = useTranslation();

  useEffect(() => {
    console.error("ErrorBoundary caught:", error);
  }, [error]);

  const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred!";

  const isMissedJsFileError = errorMessage.includes("Failed to fetch dynamically imported module");

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-2xl font-bold">
        {isMissedJsFileError ? t("Обновление приложения") : t("Упс! Что-то пошло не так")}
      </h1>
      <p className="text-muted-foreground max-w-md text-center">
        {isMissedJsFileError
          ? t("Чтобы всё работало корректно, пожалуйста, перезагрузите страницу")
          : errorMessage}
      </p>
      <button
        onClick={resetErrorBoundary}
        className="bg-primary text-primary-foreground rounded-md px-4 py-2"
      >
        {t("Перезагрузить")}
      </button>
    </div>
  );
};

type ErrorBoundaryWrapperProps = {
  children: React.ReactNode;
  onReset?: () => void;
};

export const ErrorBoundaryWrapper: React.FC<ErrorBoundaryWrapperProps> = ({
  children,
  onReset,
}) => {
  const location = useLocation();

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => {
        console.error("ErrorBoundary caught an error:", error, info);
      }}
      onReset={onReset}
      resetKeys={[location.pathname]}
    >
      {children}
    </ErrorBoundary>
  );
};
