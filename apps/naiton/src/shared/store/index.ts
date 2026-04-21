import { create, type StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'
import { useShallow } from 'zustand/react/shallow'
import { createAuthSlice, type AuthState } from './use-auth-store/use-auth-store'
import { createMetaSlice, type MetaState } from './use-meta-store/use-meta-store'
import { createModuleUiSlice, type ModuleUiState } from './use-module-ui-store/use-module-ui-store'

export type { AuthState, MetaState, ModuleUiState }

export type SharedStoreState = AuthState & MetaState & ModuleUiState

const createSharedStore: StateCreator<SharedStoreState, [], [], SharedStoreState> = (...a) => ({
	...createAuthSlice(...a),
	...createMetaSlice(...a),
	...createModuleUiSlice(...a)
})

export const useBoundStore = create<SharedStoreState>()(
	devtools(createSharedStore, {
		name: 'naiton-store',
		enabled: import.meta.env.MODE === 'development'
	})
)

export const useAuth = () =>
	useBoundStore(
		useShallow((s) => ({
			accessToken: s.accessToken,
			isAuthenticated: s.isAuthenticated,
			profile: s.profile,
			allowedProducts: s.allowedProducts,
			companyInfo: s.companyInfo,
			login: s.login,
			reset: s.reset
		}))
	)

export const useMeta = () =>
	useBoundStore(
		useShallow((s) => ({
			lng: s.lng,
			theme: s.theme,
			isSidebarCollapsed: s.isSidebarCollapsed,
			setLng: s.setLng,
			setTheme: s.setTheme,
			setIsSidebarCollapsed: s.setIsSidebarCollapsed
		}))
	)

export const useModuleUi = () =>
	useBoundStore(
		useShallow((s) => ({
			isGlobalLoading: s.isGlobalLoading,
			isCommandPaletteOpen: s.isCommandPaletteOpen,
			activeModal: s.activeModal,
			setIsGlobalLoading: s.setIsGlobalLoading,
			setIsCommandPaletteOpen: s.setIsCommandPaletteOpen,
			setActiveModal: s.setActiveModal
		}))
	)
