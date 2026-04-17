import type { StateCreator } from "zustand";

import {
  ACCESSTOKEN_LOCALSTORAGE_KEY,
  COMPANYINFO_LOCALSTORAGE_KEY,
  REFRESHTOKEN_LOCALSTORAGE_KEY,
} from "../../const/localstorage.const";
import storage from "../../lib/storage";
import type { AllowedProducts, TCompanyInfo } from "../../types/requests.types";
import type { MetaState } from "../use-meta-store/use-meta-store";
import type { ModuleUiState } from "../use-module-ui-store/use-module-ui-store";

export interface UserProfile {
  id: string | number;
  fullName: string;
  email?: string;
  phone?: string;
  role?: string;
  avatarUrl?: string;
}

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  csrfToken: string | null;
  profile: UserProfile | null;
  companyInfo: TCompanyInfo | null;
  allowedProducts: AllowedProducts[];
  isAuthenticated: boolean;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  setCsrfToken: (token: string | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setCompanyInfo: (info: TCompanyInfo | null) => void;
  setAllowedProducts: (products: AllowedProducts[]) => void;
  login: (payload: {
    accessToken: string;
    refreshToken: string;
    allowed: AllowedProducts[];
  }) => void;
  reset: () => void;
}

type AuthSliceState = AuthState & Partial<MetaState> & Partial<ModuleUiState>;

const companyRaw = storage.get(COMPANYINFO_LOCALSTORAGE_KEY);
const initialCompany = companyRaw ? (JSON.parse(companyRaw) as TCompanyInfo) : null;

const initialState = {
  accessToken: storage.get(ACCESSTOKEN_LOCALSTORAGE_KEY) ?? null,
  refreshToken: storage.get(REFRESHTOKEN_LOCALSTORAGE_KEY) ?? null,
  csrfToken: null,
  profile: null,
  companyInfo: initialCompany,
  allowedProducts: [] as AllowedProducts[],
  isAuthenticated: Boolean(storage.get(ACCESSTOKEN_LOCALSTORAGE_KEY)),
};

export const createAuthSlice: StateCreator<AuthSliceState, [], [], AuthState> = (set) => ({
  ...initialState,

  setAccessToken: (accessToken) => {
    if (accessToken) {
      storage.set(ACCESSTOKEN_LOCALSTORAGE_KEY, accessToken);
    } else {
      storage.remove(ACCESSTOKEN_LOCALSTORAGE_KEY);
    }

    set({ accessToken, isAuthenticated: Boolean(accessToken) });
  },

  setRefreshToken: (refreshToken) => {
    if (refreshToken) {
      storage.set(REFRESHTOKEN_LOCALSTORAGE_KEY, refreshToken);
    } else {
      storage.remove(REFRESHTOKEN_LOCALSTORAGE_KEY);
    }

    set({ refreshToken });
  },

  setCsrfToken: (csrfToken) => set({ csrfToken }),

  setProfile: (profile) => set({ profile }),

  setCompanyInfo: (companyInfo) => {
    if (companyInfo) {
      storage.set(COMPANYINFO_LOCALSTORAGE_KEY, JSON.stringify(companyInfo));
    } else {
      storage.remove(COMPANYINFO_LOCALSTORAGE_KEY);
    }

    set({ companyInfo });
  },

  setAllowedProducts: (allowedProducts) => set({ allowedProducts }),

  login: ({ accessToken, refreshToken, allowed }) => {
    storage.set(ACCESSTOKEN_LOCALSTORAGE_KEY, accessToken);
    storage.set(REFRESHTOKEN_LOCALSTORAGE_KEY, refreshToken);

    set({
      accessToken,
      refreshToken,
      allowedProducts: allowed,
      isAuthenticated: true,
    });
  },

  reset: () => {
    storage.remove(ACCESSTOKEN_LOCALSTORAGE_KEY);
    storage.remove(REFRESHTOKEN_LOCALSTORAGE_KEY);
    storage.remove(COMPANYINFO_LOCALSTORAGE_KEY);

    set({
      ...initialState,
      accessToken: null,
      refreshToken: null,
      csrfToken: null,
      profile: null,
      companyInfo: null,
      allowedProducts: [],
      isAuthenticated: false,
    });
  },
});
