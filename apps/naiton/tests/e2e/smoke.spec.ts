import { expect, test } from "@playwright/test";

import { mockNaitonApi } from "./support/mockApi";

test("supports the golden path across dashboard, sales, crm, and logout", async ({ page }) => {
  const customerName = `Playwright Order ${Date.now()}`;
  const pageErrors: string[] = [];
  const consoleErrors: string[] = [];

  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
  });
  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });

  await mockNaitonApi(page);
  await page.goto("/app/dashboard");

  await expect(page).toHaveURL(/\/app\/dashboard$/);
  await page.waitForLoadState("networkidle");
  expect(pageErrors, pageErrors.join("\n")).toEqual([]);
  expect(consoleErrors, consoleErrors.join("\n")).toEqual([]);
  await expect(page.getByRole("heading", { name: "Cross-module command center" })).toBeVisible({
    timeout: 15_000,
  });
  await expect(page.getByRole("button").filter({ hasText: "Dilshod Ergashev" })).toBeVisible();

  await page.getByRole("link", { name: "Sales", exact: true }).click();
  await expect(page).toHaveURL(/\/app\/sales$/);
  await expect(page.getByRole("heading", { name: "Orders" })).toBeVisible();

  await page.getByRole("button", { name: "New order" }).click();
  const createOrderDialog = page.getByRole("dialog");
  await expect(createOrderDialog).toBeVisible();
  await createOrderDialog.locator("#sales-order-customer").fill(customerName);
  await createOrderDialog.locator("#sales-order-amount").fill("450000");
  await createOrderDialog.locator("form").evaluate((form) => {
    (form as HTMLFormElement).requestSubmit();
  });

  await expect(page.getByText(customerName)).toBeVisible();

  await page.getByRole("link", { name: "CRM", exact: true }).click();
  await expect(page).toHaveURL(/\/app\/crm$/);
  await expect(page.getByRole("heading", { name: "Leads" })).toBeVisible();

  await page.getByRole("button").filter({ hasText: "Dilshod Ergashev" }).click();
  await page.getByRole("menuitem", { name: "Logout" }).click();

  await expect(page).toHaveURL(/\/auth\/login$/);
  await expect(page.locator("#login-phone")).toBeVisible();
});
