/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_API_BASE_URL: string;
  readonly VITE_PUBLIC_APP_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
