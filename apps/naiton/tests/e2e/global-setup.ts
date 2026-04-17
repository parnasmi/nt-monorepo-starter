import { expect, test as setup } from "@playwright/test";

import { mockNaitonApi } from "./support/mockApi";

const authFile = "tests/e2e/.auth/user.json";

setup("authenticate via the login flow", async ({ page }) => {
  await mockNaitonApi(page);
  await page.goto("/auth/login");

  await page.locator("#login-phone").fill("+998901234567");
  await page.locator("#login-password").fill("secret123");
  await page.locator('button[type="submit"]').click();

  await expect(page).toHaveURL(/\/app\/dashboard$/);
  await page.waitForLoadState("networkidle");

  await page.context().storageState({ path: authFile });
});
