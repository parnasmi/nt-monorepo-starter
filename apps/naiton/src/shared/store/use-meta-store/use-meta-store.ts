import type { StateCreator } from 'zustand'
import {
	LNG_LOCALSTORAGE_KEY,
	SIDEBAR_COLLAPSED_LOCALSTORAGE_KEY,
	THEME_LOCALSTORAGE_KEY
} from '../../const/localstorage.const'
import storage from '../../lib/storage'
import type { AuthState } from '../use-auth-store/use-auth-store'
import type { ModuleUiState } from '../use-module-ui-store/use-module-ui-store'

export type TLanguages = 'uz' | 'ru' | 'en'
export type TTheme = 'light' | 'dark' | 'system'

export interface PageBreadcrumb {
	label: string
	to?: string
}

export interface MetaState {
	lng: TLanguages
	theme: TTheme
	isSidebarCollapsed: boolean
	pageTitle: string | null
	pageBreadcrumbs: PageBreadcrumb[] | null
	setLng: (lng: TLanguages) => void
	setTheme: (theme: TTheme) => void
	setIsSidebarCollapsed: (collapsed: boolean) => void
	setPageTitle: (title: string | null) => void
	setPageBreadcrumbs: (crumbs: PageBreadcrumb[] | null) => void
}

type MetaSliceState = MetaState & Partial<AuthState> & Partial<ModuleUiState>

const initialLng = (storage.get(LNG_LOCALSTORAGE_KEY) ?? 'uz') as TLanguages
const initialTheme = (storage.get(THEME_LOCALSTORAGE_KEY) ?? 'system') as TTheme
const collapsedRaw = storage.get(SIDEBAR_COLLAPSED_LOCALSTORAGE_KEY)
const initialCollapsed = collapsedRaw ? (JSON.parse(collapsedRaw) as boolean) : false

export const createMetaSlice: StateCreator<MetaSliceState, [], [], MetaState> = (set) => ({
	lng: initialLng,
	theme: initialTheme,
	isSidebarCollapsed: initialCollapsed,
	pageTitle: null,
	pageBreadcrumbs: null,

	setLng: (lng) => {
		storage.set(LNG_LOCALSTORAGE_KEY, lng)
		set({ lng })
	},

	setTheme: (theme) => {
		storage.set(THEME_LOCALSTORAGE_KEY, theme)
		set({ theme })
	},

	setIsSidebarCollapsed: (isSidebarCollapsed) => {
		storage.set(SIDEBAR_COLLAPSED_LOCALSTORAGE_KEY, JSON.stringify(isSidebarCollapsed))
		set({ isSidebarCollapsed })
	},

	setPageTitle: (pageTitle) => set({ pageTitle }),
	setPageBreadcrumbs: (pageBreadcrumbs) => set({ pageBreadcrumbs })
})
