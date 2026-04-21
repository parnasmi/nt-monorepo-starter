import { useShallow } from 'zustand/react/shallow'

import { useBoundStore } from '@/shared/store'

export const useAuthSession = () =>
	useBoundStore(
		useShallow((state) => ({
			accessToken: state.accessToken,
			refreshToken: state.refreshToken,
			csrfToken: state.csrfToken,
			profile: state.profile,
			companyInfo: state.companyInfo,
			allowedProducts: state.allowedProducts,
			isAuthenticated: state.isAuthenticated
		}))
	)

export const useAuthActions = () =>
	useBoundStore(
		useShallow((state) => ({
			login: state.login,
			reset: state.reset,
			setCsrfToken: state.setCsrfToken,
			setProfile: state.setProfile,
			setAllowedProducts: state.setAllowedProducts,
			setCompanyInfo: state.setCompanyInfo
		}))
	)

export const useIsAuthenticated = () => useBoundStore((state) => state.isAuthenticated)
