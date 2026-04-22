import { SidebarProvider } from '@repo/ui-kit/shadcn/sidebar'
import { CSSProperties } from 'react'
import { Outlet } from 'react-router'
import { useBoundStore } from '@/shared/store'
import { AppNavbar } from './app-navbar'

export const OuterLayout = () => {
	const { isSidebarCollapsed, setIsSidebarCollapsed } = useBoundStore()

	return (
		<SidebarProvider
			defaultOpen={!isSidebarCollapsed}
			onOpenChange={(isOpen) => setIsSidebarCollapsed(!isOpen)}
			open={!isSidebarCollapsed}
			style={{ '--sidebar-width': '88px' } as CSSProperties}
		>
			<AppNavbar />
			<Outlet />
		</SidebarProvider>
	)
}
