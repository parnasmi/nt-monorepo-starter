import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

import { LNG_LOCALSTORAGE_KEY } from "@/shared/const/localstorage.const";

export const i18nNamespaces = ["common", "auth", "sales", "crm"] as const;
export const defaultI18nNamespace = "common";

if (!i18n.isInitialized) {
  i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: "uz",
      supportedLngs: ["uz", "ru"],
      ns: [...i18nNamespaces],
      defaultNS: defaultI18nNamespace,
      load: "languageOnly",
      interpolation: {
        escapeValue: false,
      },
      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json",
      },
      detection: {
        order: ["localStorage", "navigator", "htmlTag"],
        lookupLocalStorage: LNG_LOCALSTORAGE_KEY,
        caches: ["localStorage"],
      },
      react: {
        useSuspense: false,
      },
    })
    .catch((error: unknown) => {
      console.error("Failed to initialize i18n", error);
    });
}

export { i18n };
