import type { VariantProps } from 'class-variance-authority'
import { ComponentProps } from 'react'
import { TooltipContent } from '@/shadcn/tooltip'
import { sidebarMenuButtonVariants } from './sidebar.tsx'

export type SidebarContextProps = {
	state: 'expanded' | 'collapsed'
	open: boolean
	setOpen: (open: boolean) => void
	openMobile: boolean
	setOpenMobile: (open: boolean) => void
	isMobile: boolean
	toggleSidebar: () => void
}

export type SidebarProviderProps = ComponentProps<'div'> & {
	defaultOpen?: boolean
	open?: boolean
	onOpenChange?: (open: boolean) => void
}

export type SidebarProps = ComponentProps<'div'> & {
	side?: 'left' | 'right'
	variant?: 'sidebar' | 'floating' | 'inset'
	collapsible?: 'offcanvas' | 'icon' | 'none'
}

export type SidebarGroupLabelProps = ComponentProps<'div'> & { asChild?: boolean }

export type SidebarGroupActionProps = ComponentProps<'button'> & { asChild?: boolean }

export type SidebarMenuButtonProps = ComponentProps<'button'> & {
	asChild?: boolean
	isActive?: boolean
	tooltip?: string | ComponentProps<typeof TooltipContent>
} & VariantProps<typeof sidebarMenuButtonVariants>

export type SidebarMenuActionProps = ComponentProps<'button'> & {
	asChild?: boolean
	showOnHover?: boolean
}

export type SidebarMenuSkeletonProps = ComponentProps<'div'> & { showIcon?: boolean }

export type SidebarMenuSubButtonProps = ComponentProps<'a'> & {
	asChild?: boolean
	size?: 'sm' | 'md'
	isActive?: boolean
}
