import { useBoundStore } from "..";

const resetStoreState = () => {
  useBoundStore.setState({
    accessToken: null,
    refreshToken: null,
    csrfToken: null,
    profile: null,
    companyInfo: null,
    allowedProducts: [],
    isAuthenticated: false,
    lng: "uz",
    theme: "system",
    isSidebarCollapsed: false,
    pageTitle: null,
    pageBreadcrumbs: null,
    isGlobalLoading: false,
    isCommandPaletteOpen: false,
    activeModal: null,
  });
};

describe("use-module-ui-store", () => {
  beforeEach(() => {
    localStorage.clear();
    resetStoreState();
  });

  it("resetUi restores the initial ui state", () => {
    useBoundStore.getState().setIsGlobalLoading(true);
    useBoundStore.getState().setIsCommandPaletteOpen(true);
    useBoundStore.getState().setActiveModal("sales-order-modal");

    useBoundStore.getState().resetUi();

    const state = useBoundStore.getState();

    expect(state.isGlobalLoading).toBe(false);
    expect(state.isCommandPaletteOpen).toBe(false);
    expect(state.activeModal).toBeNull();
  });
});
