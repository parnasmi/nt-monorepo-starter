import { Loading } from '@repo/ui-kit/shared/ui/loading'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuthActions } from '@/pages/auth/model/authStore'
import { getRouteAuthLogin } from '@/shared/const/router.const'

export function LogoutRoute() {
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const { reset } = useAuthActions()

	useEffect(() => {
		queryClient.clear()
		reset()
		navigate(getRouteAuthLogin(), { replace: true })
	}, [navigate, queryClient, reset])

	return <Loading loading={true} />
}
