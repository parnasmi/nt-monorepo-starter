import { envConfig } from "@/config/env/env.config";
import { endpoints } from "@/shared/const/endpoints.const";
import type {
  AllowedProducts,
  AuthRoutes,
  CrmLead,
  CreateCrmLeadRequest,
  CreateSalesOrderRequest,
  SalesOrder,
  TCompanyInfo,
} from "@/shared/types/requests.types";
import { delay, http, HttpResponse } from "msw";

type PaginationMeta = {
  count: number;
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
};

const allowedProducts: AllowedProducts[] = [
  "sales",
  "crm",
  "wms",
  "procurement",
  "production",
  "accounting",
  "hrm",
  "fms",
];

const companyInfo: TCompanyInfo = {
  company_name: "Naiton Trading Group",
  owner_phone: "+998901234567",
  inn: "308765432",
  slug: "naiton-trading-group",
  route: "login" satisfies AuthRoutes,
};

const mockProfile = {
  id: "usr_001",
  fullName: "Dilshod Ergashev",
  email: "d.ergashev@naiton.local",
  phone: "+998901112233",
  role: "Sales Director",
  avatarUrl: "https://api.dicebear.com/9.x/initials/svg?seed=Dilshod%20Ergashev",
  allowed: allowedProducts,
  companyInfo,
};

const mockOrders: SalesOrder[] = Array.from({ length: 50 }, (_, index) => {
  const orderNumber = index + 1;
  const statuses: SalesOrder["status"][] = ["draft", "confirmed", "fulfilled"];

  return {
    id: `SO-${String(orderNumber).padStart(4, "0")}`,
    customer: `Customer ${orderNumber}`,
    amount: 125000 + orderNumber * 8750,
    status: statuses[index % statuses.length],
    createdAt: `2026-03-${String((index % 28) + 1).padStart(2, "0")}T09:30:00.000Z`,
  };
});

const mockLeads: CrmLead[] = Array.from({ length: 50 }, (_, index) => {
  const leadNumber = index + 1;
  const stages: CrmLead["stage"][] = ["new", "qualified", "proposal"];
  const sources: CrmLead["source"][] = ["website", "referral", "campaign"];

  return {
    id: `LD-${String(leadNumber).padStart(4, "0")}`,
    name: `Lead ${leadNumber}`,
    company: `Prospect ${leadNumber}`,
    stage: stages[index % stages.length],
    source: sources[index % sources.length],
    createdAt: `2026-02-${String((index % 28) + 1).padStart(2, "0")}T14:15:00.000Z`,
  };
});

const getApiBasePath = (): string => {
  const fallbackOrigin =
    typeof window === "undefined" ? "http://localhost" : window.location.origin;
  const pathname = new URL(envConfig.API_ROOT, fallbackOrigin).pathname.replace(/\/$/, "");

  return pathname === "/" ? "" : pathname;
};

const apiBasePath = getApiBasePath();

const buildApiPath = (endpoint: string): string => {
  if (apiBasePath.length === 0) {
    return endpoint;
  }

  return `${apiBasePath}${endpoint}`;
};

const readPositiveInteger = (value: string | null, fallbackValue: number): number => {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallbackValue;
  }

  return Math.floor(parsed);
};

const paginate = <T>(collection: T[], url: URL): { data: T[]; meta: PaginationMeta } => {
  const page = readPositiveInteger(url.searchParams.get("page"), 1);
  const perPage = readPositiveInteger(
    url.searchParams.get("per_page") ?? url.searchParams.get("perPage"),
    10,
  );
  const startIndex = (page - 1) * perPage;
  const pagedCollection = collection.slice(startIndex, startIndex + perPage);
  const total = collection.length;

  return {
    data: pagedCollection,
    meta: {
      count: pagedCollection.length,
      current_page: page,
      from: pagedCollection.length > 0 ? startIndex + 1 : 0,
      last_page: Math.max(1, Math.ceil(total / perPage)),
      per_page: perPage,
      to: pagedCollection.length > 0 ? startIndex + pagedCollection.length : 0,
      total,
    },
  };
};

export const handlers = [
  http.post(buildApiPath(endpoints.LOGIN), async () => {
    await delay(600);

    return HttpResponse.json({
      success: true,
      message: null,
      data: {
        token_type: "Bearer" as const,
        expires_in: 60 * 60,
        access_token: "mock-access-token",
        refresh_token: "mock-refresh-token",
        companyTin: companyInfo.inn,
        csrf: "mock-csrf-token",
        start_pay_flow: false,
        allowed: allowedProducts,
      },
      meta: [],
    });
  }),

  http.get(buildApiPath(endpoints.PROFILE), async () => {
    await delay(400);

    return HttpResponse.json({
      success: true,
      message: null,
      data: mockProfile,
      meta: [],
    });
  }),

  http.get(buildApiPath(endpoints.SALES_ORDERS), async ({ request }) => {
    await delay(500);

    const { data, meta } = paginate(mockOrders, new URL(request.url));

    return HttpResponse.json({
      success: true,
      message: null,
      data,
      meta,
    });
  }),

  http.post(buildApiPath(endpoints.SALES_ORDERS), async ({ request }) => {
    await delay(450);

    const payload = (await request.json()) as CreateSalesOrderRequest;
    const createdOrder: SalesOrder = {
      id: `SO-${String(mockOrders.length + 1).padStart(4, "0")}`,
      customer: payload.customer,
      amount: payload.amount,
      status: payload.status,
      createdAt: new Date().toISOString(),
    };

    mockOrders.unshift(createdOrder);

    return HttpResponse.json(
      {
        success: true,
        message: "Order created",
        data: createdOrder,
        meta: [],
      },
      { status: 201 },
    );
  }),

  http.get(buildApiPath(endpoints.CRM_LEADS), async ({ request }) => {
    await delay(500);

    const { data, meta } = paginate(mockLeads, new URL(request.url));

    return HttpResponse.json({
      success: true,
      message: null,
      data,
      meta,
    });
  }),

  http.post(buildApiPath(endpoints.CRM_LEADS), async ({ request }) => {
    await delay(450);

    const payload = (await request.json()) as CreateCrmLeadRequest;
    const createdLead: CrmLead = {
      id: `LD-${String(mockLeads.length + 1).padStart(4, "0")}`,
      name: payload.name,
      company: payload.company,
      stage: payload.stage,
      source: payload.source,
      createdAt: new Date().toISOString(),
    };

    mockLeads.unshift(createdLead);

    return HttpResponse.json(
      {
        success: true,
        message: "Lead created",
        data: createdLead,
        meta: [],
      },
      { status: 201 },
    );
  }),
];
