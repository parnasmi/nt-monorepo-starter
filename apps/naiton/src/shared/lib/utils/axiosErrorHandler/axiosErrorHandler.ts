import axios from "axios";

type AxiosErrorType<T> = {
  type: "axios-error";
  error: import("axios").AxiosError<T>;
};

type UnknownErrorType = { type: "unknown"; error: unknown };

export function axiosErrorHandler<T>({
  error,
  callback,
}: {
  error: unknown;
  callback: (e: AxiosErrorType<T> | UnknownErrorType) => void;
}) {
  if (axios.isAxiosError<T, Record<string, unknown>>(error)) {
    callback({ type: "axios-error", error });
  } else {
    callback({ type: "unknown", error });
  }
}
