import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import "@/shared/config/i18n/i18n";
import App from "./App";
import "@/app/styles/index.css";

const container = document.getElementById("root");

if (container === null) {
  throw new Error("Root container #root was not found.");
}

const bootstrap = async (): Promise<void> => {
  if (import.meta.env.DEV) {
    const { worker } = await import("@/shared/api/mocks/browser");
    await worker.start({ onUnhandledRequest: "bypass" });
  }

  createRoot(container).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  );
};

void bootstrap();
