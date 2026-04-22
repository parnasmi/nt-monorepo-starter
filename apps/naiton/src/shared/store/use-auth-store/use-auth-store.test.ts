import { useBoundStore } from '..'
import {
	ACCESSTOKEN_LOCALSTORAGE_KEY,
	COMPANYINFO_LOCALSTORAGE_KEY,
	REFRESHTOKEN_LOCALSTORAGE_KEY
} from '../../const/localstorage.const'

const resetStoreState = () => {
	useBoundStore.setState({
		accessToken: null,
		refreshToken: null,
		csrfToken: null,
		profile: null,
		companyInfo: null,
		allowedProducts: [],
		isAuthenticated: false,
		lng: 'en',
		theme: 'system',
		isSidebarCollapsed: false,
		pageTitle: null,
		pageBreadcrumbs: null,
		isGlobalLoading: false,
		isCommandPaletteOpen: false,
		activeModal: null
	})
}

describe('use-auth-store', () => {
	beforeEach(() => {
		localStorage.clear()
		resetStoreState()
	})

	it('login sets auth state and persists tokens', () => {
		useBoundStore.getState().login({
			accessToken: 'access-token',
			refreshToken: 'refresh-token',
			allowed: ['sales', 'crm']
		})

		const state = useBoundStore.getState()

		expect(state.isAuthenticated).toBe(true)
		expect(state.accessToken).toBe('access-token')
		expect(state.refreshToken).toBe('refresh-token')
		expect(state.allowedProducts).toEqual(['sales', 'crm'])
		expect(localStorage.getItem(ACCESSTOKEN_LOCALSTORAGE_KEY)).toBe('access-token')
		expect(localStorage.getItem(REFRESHTOKEN_LOCALSTORAGE_KEY)).toBe('refresh-token')
	})

	it('reset clears auth-related localStorage state', () => {
		useBoundStore.getState().setAccessToken('access-token')
		useBoundStore.getState().setRefreshToken('refresh-token')
		useBoundStore.getState().setCompanyInfo({
			company_name: 'Naiton',
			owner_phone: '+998901234567',
			inn: '123456789',
			slug: 'naiton',
			route: 'login'
		})

		useBoundStore.getState().reset()

		const state = useBoundStore.getState()

		expect(state.isAuthenticated).toBe(false)
		expect(state.accessToken).toBeNull()
		expect(state.refreshToken).toBeNull()
		expect(state.companyInfo).toBeNull()
		expect(localStorage.getItem(ACCESSTOKEN_LOCALSTORAGE_KEY)).toBeNull()
		expect(localStorage.getItem(REFRESHTOKEN_LOCALSTORAGE_KEY)).toBeNull()
		expect(localStorage.getItem(COMPANYINFO_LOCALSTORAGE_KEY)).toBeNull()
	})
})
