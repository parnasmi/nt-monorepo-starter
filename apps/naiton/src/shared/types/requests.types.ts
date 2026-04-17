export type GetRequestResponse<T> = {
  success: boolean;
  message: unknown;
  data: T;
  meta: null | {
    count: number;
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
};

export type PaginationMeta = NonNullable<GetRequestResponse<unknown>["meta"]>;

export type AuthRoutes = "login" | "register" | "invitation" | "myid";

export type TCompanyInfo = {
  company_name: string;
  owner_phone: string;
  inn: string;
  slug: string;
  route: AuthRoutes;
};

export type PostRequestResponse<T = null> = {
  success: boolean;
  message: unknown;
  data: T;
  meta: unknown[];
};

export type ChallengeResponseType = {
  success: boolean;
  message: string | null;
  data: {
    challenge: string;
    ttl: number;
    status: number;
    message: string;
  };
  meta: unknown[];
};

export type CompanyInfoResponse = {
  success: boolean;
  message: null | string;
  data: TCompanyInfo;
  meta: unknown[];
};

export type CompanyRequest = {
  hash?: string;
  inn?: string;
};

export type AllowedProducts =
  | "sales"
  | "crm"
  | "wms"
  | "procurement"
  | "production"
  | "accounting"
  | "hrm"
  | "fms";

export type FormSubmitResponse = PostRequestResponse<LoginResponse>;

export type Session = {
  device: string;
  device_name: string;
  device_version: string;
};

export type FormSubmitRequest = {
  otp: string;
  phone: string;
  hash: string;
  session: Session;
};

export type LoginResponse = {
  token_type: "Bearer";
  expires_in: number;
  access_token: string;
  refresh_token: string;
  companyTin: string;
  csrf: string;
  start_pay_flow: boolean;
  allowed: AllowedProducts[];
};

export type SubscriptionMeta = {
  allowed: AllowedProducts[];
  start_pay_flow: boolean;
};

export type SalesOrderStatus = "draft" | "confirmed" | "fulfilled";

export type SalesOrder = {
  id: string;
  customer: string;
  amount: number;
  status: SalesOrderStatus;
  createdAt: string;
};

export type CreateSalesOrderRequest = {
  customer: string;
  amount: number;
  status: SalesOrderStatus;
};

export type CrmLeadStage = "new" | "qualified" | "proposal";
export type CrmLeadSource = "website" | "referral" | "campaign";

export type CrmLead = {
  id: string;
  name: string;
  company: string;
  stage: CrmLeadStage;
  source: CrmLeadSource;
  createdAt: string;
};

export type CreateCrmLeadRequest = {
  name: string;
  company: string;
  stage: CrmLeadStage;
  source: CrmLeadSource;
};
