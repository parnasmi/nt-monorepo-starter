import { useLocation, useNavigate } from 'react-router'

export function useRoutingObjects() {
	const location = useLocation()
	const pathname = location.pathname
	const navigate = useNavigate()

	const goBack = () => navigate(-1)
	const goTo = (path: string) => navigate(path)

	return {
		pathname,
		navigate,
		location,
		goBack,
		goTo
	}
}
