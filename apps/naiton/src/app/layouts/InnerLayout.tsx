import { SidebarInset } from '@repo/ui-kit/shadcn/sidebar'
import { Outlet } from 'react-router'

import { AppSidebar } from '@/app/layouts/app-sidebar'

export function InnerLayout() {
	return (
		<>
			<AppSidebar />
			<SidebarInset className='min-h-[calc(100vh-72px)] bg-transparent pt-[72px] pl-[88px]'>
				<Outlet />
			</SidebarInset>
		</>
	)
}
