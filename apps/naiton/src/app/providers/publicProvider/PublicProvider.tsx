import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { type ReactNode, useLayoutEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Toaster } from 'sonner'

import { apiSubscribe } from '@/shared/api/api'
import { getAppsRoute, getRouteAuth } from '@/shared/const/router.const'
import { useBoundStore } from '@/shared/store'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			staleTime: 60_000
		}
	}
})

useBoundStore.subscribe((state) => {
	apiSubscribe(state)
})

type PublicProviderProps = {
	children: ReactNode
}

export function PublicProvider({ children }: PublicProviderProps) {
	const navigate = useNavigate()
	const location = useLocation()
	const isAuthenticated = useBoundStore((state) => state.isAuthenticated)

	useLayoutEffect(() => {
		const isAuthRoute = location.pathname === getRouteAuth() || location.pathname.startsWith(`${getRouteAuth()}/`)

		if (isAuthenticated && isAuthRoute) {
			navigate(`${getAppsRoute()}/dashboard`, { replace: true })
		}
	}, [isAuthenticated, location.pathname, navigate])

	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			{children}
			<Toaster position='top-right' richColors />
		</QueryClientProvider>
	)
}
