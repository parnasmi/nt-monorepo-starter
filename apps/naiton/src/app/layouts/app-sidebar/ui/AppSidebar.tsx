import { cn } from '@repo/ui-kit/lib/utils'
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail
} from '@repo/ui-kit/shadcn/sidebar'
import {
	BadgeDollarSign,
	BookText,
	Boxes,
	Building2,
	CircleGauge,
	ClipboardList,
	FileText,
	House,
	LayoutDashboard,
	Mail,
	Map,
	MessageSquare,
	PackageSearch,
	Route,
	Shield,
	ShoppingCart,
	TestTube2,
	Truck,
	UserRoundCog,
	Users,
	Wrench
} from 'lucide-react'
import { memo, type ComponentType, useMemo } from 'react'
import { NavLink, useLocation } from 'react-router'
import {
	getRouteAccountingOverview,
	getRouteAccountingLogistics,
	getRouteCrmCompany,
	getRouteCrmTasks,
	getRouteDashboardOverview,
	getRouteDashboardRevenue,
	getRouteFmsMap,
	getRouteFmsDashboard,
	getRouteHrmHeadcount,
	getRouteHrmRecruitment,
	getRouteProcurementRequests,
	getRouteProcurementSuppliers,
	getRouteProductionLines,
	getRouteProductionOrders,
	getRouteSalesOrders,
	getRouteSalesOffers,
	getRouteWmsInventory,
	getRouteWmsZones
} from '@/shared/const/router.const'

type SidebarEntry = {
	label: string
	icon: ComponentType<{ className?: string }>
	to?: string
	badge?: string
}

type SidebarConfig = {
	heading: string
	accent: string
	items: SidebarEntry[]
}

const sidebarConfigByModule: Record<string, SidebarConfig> = {
	dashboard: {
		heading: 'Workspace',
		accent: 'from-emerald-500/20 to-sky-500/10',
		items: [
			{ label: 'Overview', icon: LayoutDashboard, to: getRouteDashboardOverview() },
			{
				label: 'Revenue',
				icon: BadgeDollarSign,
				to: getRouteDashboardRevenue(),
				badge: '4'
			},
			{ label: 'Operations', icon: ClipboardList, badge: '7' },
			{ label: 'Customers', icon: Users, badge: '12' }
		]
	},
	sales: {
		heading: 'Sales',
		accent: 'from-sky-500/20 to-cyan-500/10',
		items: [
			{ label: 'Offers', icon: FileText, to: getRouteSalesOffers(), badge: '9' },
			{ label: 'Orders', icon: ShoppingCart, to: getRouteSalesOrders(), badge: '18' },
			{ label: 'Subscriptions', icon: BadgeDollarSign, badge: '3' }
		]
	},
	crm: {
		heading: 'CRM',
		accent: 'from-emerald-500/20 to-green-500/10',
		items: [
			{ label: 'Company', icon: Building2, to: getRouteCrmCompany(), badge: '18' },
			{ label: 'Tasks', icon: ClipboardList, to: getRouteCrmTasks(), badge: '11' },
			{ label: 'Third tab', icon: Users, badge: '4' }
		]
	},
	fms: {
		heading: 'Fleet',
		accent: 'from-orange-500/20 to-sky-500/10',
		items: [
			{ label: 'Map', icon: Map, to: getRouteFmsMap() },
			{ label: 'Dashboard', icon: LayoutDashboard, to: getRouteFmsDashboard() },
			{ label: 'Chat', icon: MessageSquare, badge: '6' },
			{ label: 'Maintenance', icon: Wrench, badge: '4' },
			{ label: 'Transport', icon: Truck, badge: '10' },
			{ label: 'Tasks', icon: ClipboardList, badge: '12' },
			{ label: 'Drivers', icon: UserRoundCog, badge: '36' },
			{ label: 'Tacho', icon: CircleGauge },
			{ label: 'Alerts', icon: Shield, badge: '5' },
			{ label: 'Reports', icon: BookText },
			{ label: 'Settings', icon: Wrench }
		]
	},
	accounting: {
		heading: 'Admin',
		accent: 'from-violet-500/20 to-slate-500/10',
		items: [
			{ label: 'Accounting', icon: BadgeDollarSign, to: getRouteAccountingOverview() },
			{ label: 'Logistics', icon: Truck, to: getRouteAccountingLogistics() },
			{ label: 'CRM', icon: Users },
			{ label: 'HRM', icon: UserRoundCog },
			{ label: 'Email', icon: Mail },
			{ label: 'Inventory', icon: House },
			{ label: 'Production', icon: Boxes },
			{ label: 'Sales', icon: ShoppingCart },
			{ label: 'Security', icon: Shield },
			{ label: 'Scripts', icon: ClipboardList },
			{ label: 'System', icon: Wrench },
			{ label: 'Tests', icon: TestTube2 },
			{ label: 'Docs', icon: BookText }
		]
	},
	wms: {
		heading: 'Warehouse',
		accent: 'from-amber-500/20 to-emerald-500/10',
		items: [
			{ label: 'Inventory flow', icon: Boxes, to: getRouteWmsInventory() },
			{ label: 'Zones', icon: House, to: getRouteWmsZones(), badge: '12' },
			{ label: 'Transfers', icon: Route, badge: '8' },
			{ label: 'Quality checks', icon: Shield, badge: '3' }
		]
	},
	procurement: {
		heading: 'Procurement',
		accent: 'from-cyan-500/20 to-emerald-500/10',
		items: [
			{ label: 'Requests', icon: ClipboardList, to: getRouteProcurementRequests() },
			{
				label: 'Suppliers',
				icon: Building2,
				to: getRouteProcurementSuppliers(),
				badge: '24'
			},
			{ label: 'Contracts', icon: FileText, badge: '7' },
			{ label: 'Spend map', icon: PackageSearch }
		]
	},
	production: {
		heading: 'Production',
		accent: 'from-indigo-500/20 to-emerald-500/10',
		items: [
			{ label: 'Lines', icon: Wrench, to: getRouteProductionLines() },
			{
				label: 'Orders',
				icon: ClipboardList,
				to: getRouteProductionOrders(),
				badge: '32'
			},
			{ label: 'Capacity', icon: CircleGauge, badge: '87%' },
			{ label: 'Output', icon: Boxes }
		]
	},
	hrm: {
		heading: 'People',
		accent: 'from-pink-500/20 to-orange-500/10',
		items: [
			{ label: 'Headcount', icon: Users, to: getRouteHrmHeadcount(), badge: '1245' },
			{
				label: 'Recruitment',
				icon: UserRoundCog,
				to: getRouteHrmRecruitment(),
				badge: '9'
			},
			{ label: 'Payroll', icon: BadgeDollarSign },
			{ label: 'Policies', icon: BookText }
		]
	}
}

const baseConfig = sidebarConfigByModule.dashboard
const getCurrentModule = (pathname: string) => pathname.split('/')[2] || 'dashboard'

function SidebarBody() {
	const location = useLocation()
	const currentModule = useMemo(() => getCurrentModule(location.pathname), [location.pathname])
	const moduleConfig = useMemo(() => sidebarConfigByModule[currentModule] ?? baseConfig, [currentModule])

	const activeItem = useMemo(() => {
		return [...moduleConfig.items]
			.filter((i) => i.to)
			.sort((a, b) => (b.to?.length ?? 0) - (a.to?.length ?? 0))
			.find((i) => location.pathname === i.to || location.pathname.startsWith(`${i.to}/`))
	}, [moduleConfig.items, location.pathname])

	return (
		<Sidebar className='!z-30 border-r-0 pt-[72px]'>
			<SidebarContent className='mt-4 gap-0'>
				<SidebarGroup className='p-0'>
					<SidebarGroupContent>
						<SidebarMenu className='gap-2'>
							{moduleConfig.items.map((item) => {
								const isActive = item === activeItem

								return (
									<SidebarMenuItem key={item.label}>
										{item.to ? (
											<SidebarMenuButton
												asChild
												tooltip={item.label}
												className={cn(
													'h-[76px] flex-col items-center justify-center gap-0 rounded-l-xl p-0 ml-2.5',
													isActive
														? 'rounded-r-none bg-[#f1f5f9] text-slate-900 shadow-[-2px_0_5px_rgba(0,0,0,0.05)] hover:bg-[#f1f5f9] hover:text-slate-900'
														: 'text-slate-400 hover:text-white hover:bg-white/10 rounded-r-xl mr-2.5'
												)}
											>
												<NavLink to={item.to}>
													<item.icon
														className={cn(
															'!h-6 !w-6 transition-colors',
															isActive ? '!text-emerald-600' : 'text-slate-400'
														)}
													/>
													<span className='mt-1.5 px-1 text-center text-[10px] leading-tight font-medium tracking-wide text-inherit transition-colors'>
														{item.label}
													</span>
												</NavLink>
											</SidebarMenuButton>
										) : (
											<SidebarMenuButton className='mr-2.5 ml-2.5 h-[76px] cursor-default flex-col items-center justify-center gap-0 rounded-xl p-0 opacity-60 hover:bg-transparent hover:text-inherit'>
												<item.icon className='!h-6 !w-6 text-slate-500' />
												<span className='mt-1.5 px-1 text-center text-[10px] leading-tight font-medium tracking-wide text-slate-500'>
													{item.label}
												</span>
											</SidebarMenuButton>
										)}
										{item.badge && !isActive && (
											<SidebarMenuBadge className='top-1.5 right-3 h-4 min-w-4 rounded-full bg-orange-500 px-1 text-[9px] font-bold text-white'>
												{item.badge}
											</SidebarMenuBadge>
										)}
									</SidebarMenuItem>
								)
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	)
}

export const AppSidebar = memo(SidebarBody)
