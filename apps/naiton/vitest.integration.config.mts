import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [svgr({ svgrOptions: { exportType: "default" } }), react()],
  resolve: {
    alias: [
      { find: "@/config", replacement: fileURLToPath(new URL("./config", import.meta.url)) },
      { find: "@", replacement: fileURLToPath(new URL("./src", import.meta.url)) },
    ],
  },
  define: {
    __IS_DEV__: JSON.stringify(true),
    __PROJECT__: JSON.stringify("frontend"),
    "import.meta.env.VITE_PUBLIC_API_BASE_URL": JSON.stringify("http://localhost:3000/api"),
    "import.meta.env.VITE_PUBLIC_APP_VERSION": JSON.stringify("1.0.0-test"),
    "import.meta.env.VITE_USE_MSW": JSON.stringify("false"),
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./tests/integration/setup.ts"],
    include: ["tests/integration/**/*.test.{ts,tsx}"],
    css: false,
  },
});
