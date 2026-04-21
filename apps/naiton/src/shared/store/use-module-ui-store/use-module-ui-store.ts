import type { StateCreator } from 'zustand'
import type { AuthState } from '../use-auth-store/use-auth-store'
import type { MetaState } from '../use-meta-store/use-meta-store'

export interface ModuleUiState {
	isGlobalLoading: boolean
	isCommandPaletteOpen: boolean
	activeModal: string | null
	setIsGlobalLoading: (loading: boolean) => void
	setIsCommandPaletteOpen: (open: boolean) => void
	setActiveModal: (id: string | null) => void
	resetUi: () => void
}

type ModuleUiSliceState = ModuleUiState & Partial<AuthState> & Partial<MetaState>

const initialState = {
	isGlobalLoading: false,
	isCommandPaletteOpen: false,
	activeModal: null as string | null
}

export const createModuleUiSlice: StateCreator<ModuleUiSliceState, [], [], ModuleUiState> = (set) => ({
	...initialState,
	setIsGlobalLoading: (isGlobalLoading) => set({ isGlobalLoading }),
	setIsCommandPaletteOpen: (isCommandPaletteOpen) => set({ isCommandPaletteOpen }),
	setActiveModal: (activeModal) => set({ activeModal }),
	resetUi: () => set(initialState)
})
