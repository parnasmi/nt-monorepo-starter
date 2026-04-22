import { CheckmarkRegular, ChevronRightRegular, CircleRegular } from '@fluentui/react-icons'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { type ElementRef, forwardRef } from 'react'
import { cn } from '../../lib/utils.ts'
import type {
	DropdownMenuCheckboxItemProps,
	DropdownMenuContentProps,
	DropdownMenuItemProps,
	DropdownMenuLabelProps,
	DropdownMenuRadioItemProps,
	DropdownMenuSeparatorProps,
	DropdownMenuShortcutProps,
	DropdownMenuSubContentProps,
	DropdownMenuSubTriggerProps
} from './types.ts'

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = forwardRef<
	ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
	DropdownMenuSubTriggerProps
>(({ className, inset, children, ...props }, ref) => (
	<DropdownMenuPrimitive.SubTrigger
		ref={ref}
		className={cn(
			'flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none focus:bg-gray-100 data-[state=open]:bg-gray-100 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
			inset && 'pl-8',
			className
		)}
		{...props}
	>
		{children}
		<ChevronRightRegular fontSize={16} className='ml-auto' />
	</DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = forwardRef<
	ElementRef<typeof DropdownMenuPrimitive.SubContent>,
	DropdownMenuSubContentProps
>(({ className, ...props }, ref) => (
	<DropdownMenuPrimitive.SubContent
		ref={ref}
		className={cn(
			'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-32 origin-[--radix-dropdown-menu-content-transform-origin] overflow-hidden rounded bg-white p-1 text-gray-900 shadow-lg',
			className
		)}
		{...props}
	/>
))
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = forwardRef<ElementRef<typeof DropdownMenuPrimitive.Content>, DropdownMenuContentProps>(
	({ className, sideOffset = 4, ...props }, ref) => (
		<DropdownMenuPrimitive.Portal>
			<DropdownMenuPrimitive.Content
				ref={ref}
				sideOffset={sideOffset}
				className={cn(
					'z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-32 overflow-x-hidden overflow-y-auto rounded bg-white text-gray-900 shadow-lg',
					'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]',
					className
				)}
				{...props}
			/>
		</DropdownMenuPrimitive.Portal>
	)
)
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = forwardRef<ElementRef<typeof DropdownMenuPrimitive.Item>, DropdownMenuItemProps>(
	({ className, inset, ...props }, ref) => (
		<DropdownMenuPrimitive.Item
			ref={ref}
			className={cn(
				'relative flex cursor-pointer items-center gap-2 border-b border-b-gray-200 px-3 py-2 transition-colors outline-none select-none last:border-b-0 focus:bg-gray-50 data-disabled:pointer-events-none data-disabled:opacity-50 [&>svg]:shrink-0',
				inset && 'pl-8',
				className
			)}
			{...props}
		/>
	)
)
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = forwardRef<
	ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
	DropdownMenuCheckboxItemProps
>(({ className, children, checked, ...props }, ref) => (
	<DropdownMenuPrimitive.CheckboxItem
		ref={ref}
		className={cn(
			'relative flex cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm transition-colors outline-none select-none focus:bg-gray-100 focus:text-gray-900 data-disabled:pointer-events-none data-disabled:opacity-50',
			className
		)}
		checked={checked}
		{...props}
	>
		<span className='absolute left-2 flex size-3.5 items-center justify-center'>
			<DropdownMenuPrimitive.ItemIndicator>
				<CheckmarkRegular fontSize={16} />
			</DropdownMenuPrimitive.ItemIndicator>
		</span>
		{children}
	</DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = forwardRef<
	ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
	DropdownMenuRadioItemProps
>(({ className, children, ...props }, ref) => (
	<DropdownMenuPrimitive.RadioItem
		ref={ref}
		className={cn(
			'relative flex cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm transition-colors outline-none select-none focus:bg-gray-100 focus:text-gray-900 data-disabled:pointer-events-none data-disabled:opacity-50',
			className
		)}
		{...props}
	>
		<span className='absolute left-2 flex size-3.5 items-center justify-center'>
			<DropdownMenuPrimitive.ItemIndicator>
				<CircleRegular fontSize={8} className='fill-current' />
			</DropdownMenuPrimitive.ItemIndicator>
		</span>
		{children}
	</DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = forwardRef<ElementRef<typeof DropdownMenuPrimitive.Label>, DropdownMenuLabelProps>(
	({ className, inset, ...props }, ref) => (
		<DropdownMenuPrimitive.Label
			ref={ref}
			className={cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)}
			{...props}
		/>
	)
)
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = forwardRef<
	ElementRef<typeof DropdownMenuPrimitive.Separator>,
	DropdownMenuSeparatorProps
>(({ className, ...props }, ref) => (
	<DropdownMenuPrimitive.Separator ref={ref} className={cn('-mx-1 my-1 h-px bg-gray-50', className)} {...props} />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({ className, ...props }: DropdownMenuShortcutProps) => {
	return <span className={cn('ml-auto text-xs tracking-widest opacity-60', className)} {...props} />
}
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut'

export {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger
}
