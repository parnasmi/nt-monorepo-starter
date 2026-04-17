import type { Page, Route } from "@playwright/test";

type SalesOrderStatus = "draft" | "confirmed" | "fulfilled";
type SalesOrder = {
  id: string;
  customer: string;
  amount: number;
  status: SalesOrderStatus;
  createdAt: string;
};

type CrmLeadStage = "new" | "qualified" | "proposal";
type CrmLeadSource = "website" | "referral" | "campaign";
type CrmLead = {
  id: string;
  name: string;
  company: string;
  stage: CrmLeadStage;
  source: CrmLeadSource;
  createdAt: string;
};

const allowedProducts = [
  "sales",
  "crm",
  "wms",
  "procurement",
  "production",
  "accounting",
  "hrm",
  "fms",
] as const;

const companyInfo = {
  company_name: "Naiton Trading Group",
  owner_phone: "+998901234567",
  inn: "308765432",
  slug: "naiton-trading-group",
  route: "login",
};

const profilePayload = {
  id: "usr_001",
  fullName: "Dilshod Ergashev",
  email: "d.ergashev@naiton.local",
  phone: "+998901112233",
  role: "Sales Director",
  avatarUrl: "https://api.dicebear.com/9.x/initials/svg?seed=Dilshod%20Ergashev",
  allowed: [...allowedProducts],
  companyInfo,
};

const createSeedOrders = (): SalesOrder[] =>
  Array.from({ length: 12 }, (_, index) => {
    const orderNumber = index + 1;
    const statuses: SalesOrderStatus[] = ["draft", "confirmed", "fulfilled"];

    return {
      id: `SO-${String(orderNumber).padStart(4, "0")}`,
      customer: `Customer ${orderNumber}`,
      amount: 125000 + orderNumber * 8750,
      status: statuses[index % statuses.length],
      createdAt: `2026-03-${String((index % 28) + 1).padStart(2, "0")}T09:30:00.000Z`,
    };
  });

const createSeedLeads = (): CrmLead[] =>
  Array.from({ length: 12 }, (_, index) => {
    const leadNumber = index + 1;
    const stages: CrmLeadStage[] = ["new", "qualified", "proposal"];
    const sources: CrmLeadSource[] = ["website", "referral", "campaign"];

    return {
      id: `LD-${String(leadNumber).padStart(4, "0")}`,
      name: `Lead ${leadNumber}`,
      company: `Prospect ${leadNumber}`,
      stage: stages[index % stages.length],
      source: sources[index % sources.length],
      createdAt: `2026-02-${String((index % 28) + 1).padStart(2, "0")}T14:15:00.000Z`,
    };
  });

const json = async (route: Route, body: unknown, status = 200) => {
  await route.fulfill({
    status,
    contentType: "application/json",
    body: JSON.stringify(body),
  });
};

const readPositiveInteger = (value: string | null, fallbackValue: number): number => {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallbackValue;
  }

  return Math.floor(parsed);
};

const paginate = <T>(collection: T[], requestUrl: string) => {
  const url = new URL(requestUrl);
  const page = readPositiveInteger(url.searchParams.get("page"), 1);
  const perPage = readPositiveInteger(
    url.searchParams.get("per_page") ?? url.searchParams.get("perPage"),
    10,
  );
  const startIndex = (page - 1) * perPage;
  const sliced = collection.slice(startIndex, startIndex + perPage);
  const total = collection.length;

  return {
    data: sliced,
    meta: {
      count: sliced.length,
      current_page: page,
      from: sliced.length > 0 ? startIndex + 1 : 0,
      last_page: Math.max(1, Math.ceil(total / perPage)),
      per_page: perPage,
      to: sliced.length > 0 ? startIndex + sliced.length : 0,
      total,
    },
  };
};

export async function mockNaitonApi(page: Page) {
  const orders = createSeedOrders();
  const leads = createSeedLeads();

  await page.route("**/v1/auth/login", async (route) => {
    await json(route, {
      success: true,
      message: null,
      data: {
        token_type: "Bearer",
        expires_in: 3600,
        access_token: "playwright-access-token",
        refresh_token: "playwright-refresh-token",
        companyTin: companyInfo.inn,
        csrf: "playwright-csrf-token",
        start_pay_flow: false,
        allowed: [...allowedProducts],
      },
      meta: [],
    });
  });

  await page.route("**/v1/profile", async (route) => {
    await json(route, {
      success: true,
      message: null,
      data: profilePayload,
      meta: [],
    });
  });

  await page.route("**/v1/sales/orders**", async (route) => {
    if (route.request().method() === "POST") {
      const payload = route.request().postDataJSON() as {
        customer: string;
        amount: number;
        status: SalesOrderStatus;
      };
      const createdOrder: SalesOrder = {
        id: `SO-${String(orders.length + 1).padStart(4, "0")}`,
        customer: payload.customer,
        amount: payload.amount,
        status: payload.status,
        createdAt: new Date().toISOString(),
      };

      orders.unshift(createdOrder);

      await json(
        route,
        {
          success: true,
          message: "Order created",
          data: createdOrder,
          meta: [],
        },
        201,
      );

      return;
    }

    const { data, meta } = paginate(orders, route.request().url());

    await json(route, {
      success: true,
      message: null,
      data,
      meta,
    });
  });

  await page.route("**/v1/crm/leads**", async (route) => {
    if (route.request().method() === "POST") {
      const payload = route.request().postDataJSON() as {
        name: string;
        company: string;
        stage: CrmLeadStage;
        source: CrmLeadSource;
      };
      const createdLead: CrmLead = {
        id: `LD-${String(leads.length + 1).padStart(4, "0")}`,
        name: payload.name,
        company: payload.company,
        stage: payload.stage,
        source: payload.source,
        createdAt: new Date().toISOString(),
      };

      leads.unshift(createdLead);

      await json(
        route,
        {
          success: true,
          message: "Lead created",
          data: createdLead,
          meta: [],
        },
        201,
      );

      return;
    }

    const { data, meta } = paginate(leads, route.request().url());

    await json(route, {
      success: true,
      message: null,
      data,
      meta,
    });
  });
}
