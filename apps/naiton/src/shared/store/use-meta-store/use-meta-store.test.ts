import { useBoundStore } from '..'
import { LNG_LOCALSTORAGE_KEY } from '../../const/localstorage.const'

const resetStoreState = () => {
	useBoundStore.setState({
		accessToken: null,
		refreshToken: null,
		csrfToken: null,
		profile: null,
		companyInfo: null,
		allowedProducts: [],
		isAuthenticated: false,
		lng: 'uz',
		theme: 'system',
		isSidebarCollapsed: false,
		pageTitle: null,
		pageBreadcrumbs: null,
		isGlobalLoading: false,
		isCommandPaletteOpen: false,
		activeModal: null
	})
}

describe('use-meta-store', () => {
	beforeEach(() => {
		localStorage.clear()
		resetStoreState()
	})

	it('setLng persists the language and updates state', () => {
		useBoundStore.getState().setLng('ru')

		expect(useBoundStore.getState().lng).toBe('ru')
		expect(localStorage.getItem(LNG_LOCALSTORAGE_KEY)).toBe('ru')
	})
})
