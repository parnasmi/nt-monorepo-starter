import { CheckmarkCircleRegular, CheckmarkRegular, ChevronRightRegular } from '@fluentui/react-icons'
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu'
import { type ElementRef, forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../lib/utils.ts'
import type {
	ContextMenuCheckboxItemProps,
	ContextMenuContentProps,
	ContextMenuItemProps,
	ContextMenuLabelProps,
	ContextMenuRadioItemProps,
	ContextMenuSeparatorProps,
	ContextMenuSubContentProps,
	ContextMenuSubTriggerProps
} from './types.ts'

const ContextMenu = ContextMenuPrimitive.Root

const ContextMenuTrigger = ContextMenuPrimitive.Trigger

const ContextMenuGroup = ContextMenuPrimitive.Group

const ContextMenuPortal = ContextMenuPrimitive.Portal

const ContextMenuSub = ContextMenuPrimitive.Sub

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

const ContextMenuSubTrigger = forwardRef<
	ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
	ContextMenuSubTriggerProps
>(({ className, inset, children, ...props }, ref) => (
	<ContextMenuPrimitive.SubTrigger
		ref={ref}
		className={cn(
			'text-ssm flex cursor-pointer items-center gap-2 bg-white px-3 py-2 outline-none select-none first:rounded-tl-md first:rounded-tr-md last:rounded-br-md last:rounded-bl-md focus:bg-gray-100 data-[state=open]:bg-gray-50',
			inset && 'pl-8',
			className
		)}
		{...props}
	>
		{children}
		<ChevronRightRegular fontSize={16} className='ml-auto' />
	</ContextMenuPrimitive.SubTrigger>
))
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName

const ContextMenuSubContent = forwardRef<
	ElementRef<typeof ContextMenuPrimitive.SubContent>,
	ContextMenuSubContentProps
>(({ className, ...props }, ref) => (
	<ContextMenuPrimitive.SubContent
		ref={ref}
		className={cn(
			'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-32 origin-[--radix-context-menu-content-transform-origin] overflow-hidden rounded-lg bg-gray-100 p-1.5 shadow-md',
			className
		)}
		{...props}
	/>
))
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName

const ContextMenuContent = forwardRef<ElementRef<typeof ContextMenuPrimitive.Content>, ContextMenuContentProps>(
	({ className, ...props }, ref) => (
		<ContextMenuPrimitive.Portal>
			<ContextMenuPrimitive.Content
				ref={ref}
				className={cn(
					'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-[--radix-context-menu-content-available-height] min-w-32 origin-[--radix-context-menu-content-transform-origin] overflow-x-hidden overflow-y-auto rounded-lg bg-gray-100 p-1.5 shadow-md',
					className
				)}
				{...props}
			/>
		</ContextMenuPrimitive.Portal>
	)
)
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName

const ContextMenuItem = forwardRef<ElementRef<typeof ContextMenuPrimitive.Item>, ContextMenuItemProps>(
	({ className, inset, ...props }, ref) => (
		<ContextMenuPrimitive.Item
			ref={ref}
			className={cn(
				'text-ssm relative flex cursor-pointer items-center gap-2 border-b border-b-gray-200 bg-white px-3 py-2 transition-colors outline-none select-none first:rounded-tl-md first:rounded-tr-md last:rounded-br-md last:rounded-bl-md last:border-b-0 focus:bg-gray-50 data-disabled:pointer-events-none data-disabled:opacity-50',
				inset && 'pl-8',
				className
			)}
			{...props}
		/>
	)
)
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName

const ContextMenuCheckboxItem = forwardRef<
	ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
	ContextMenuCheckboxItemProps
>(({ className, children, checked, ...props }, ref) => (
	<ContextMenuPrimitive.CheckboxItem
		ref={ref}
		className={cn(
			'text-ssm relative flex cursor-pointer items-center border-b border-b-gray-200 bg-white py-2 pr-9 pl-3 outline-none select-none first:rounded-tl-md first:rounded-tr-md last:rounded-br-md last:rounded-bl-md last:border-b-0 focus:bg-gray-50 data-disabled:pointer-events-none data-disabled:opacity-50',
			className
		)}
		checked={checked}
		{...props}
	>
		{children}
		<span className='absolute right-3 flex size-4 items-center justify-center'>
			<ContextMenuPrimitive.ItemIndicator>
				<CheckmarkRegular fontSize={16} />
			</ContextMenuPrimitive.ItemIndicator>
		</span>
	</ContextMenuPrimitive.CheckboxItem>
))
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName

const ContextMenuRadioItem = forwardRef<ElementRef<typeof ContextMenuPrimitive.RadioItem>, ContextMenuRadioItemProps>(
	({ className, children, ...props }, ref) => (
		<ContextMenuPrimitive.RadioItem
			ref={ref}
			className={cn(
				'text-ssm relative flex cursor-pointer items-center border-b border-b-gray-200 bg-white py-2 pr-9 pl-3 outline-none select-none first:rounded-tl-md first:rounded-tr-md last:rounded-br-md last:rounded-bl-md last:border-b-0 focus:bg-gray-50 data-disabled:pointer-events-none data-disabled:opacity-50',
				className
			)}
			{...props}
		>
			<span className='absolute right-3 flex size-4 items-center justify-center'>
				<ContextMenuPrimitive.ItemIndicator>
					<CheckmarkCircleRegular fontSize={16} />
				</ContextMenuPrimitive.ItemIndicator>
			</span>
			{children}
		</ContextMenuPrimitive.RadioItem>
	)
)
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName

const ContextMenuLabel = forwardRef<ElementRef<typeof ContextMenuPrimitive.Label>, ContextMenuLabelProps>(
	({ className, inset, ...props }, ref) => (
		<ContextMenuPrimitive.Label
			ref={ref}
			className={cn('px-2 py-1 text-xs font-medium text-gray-500', inset && 'pl-8', className)}
			{...props}
		/>
	)
)
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName

const ContextMenuSeparator = forwardRef<ElementRef<typeof ContextMenuPrimitive.Separator>, ContextMenuSeparatorProps>(
	({ className, ...props }, ref) => (
		<ContextMenuPrimitive.Separator ref={ref} className={cn('h-1.5', className)} {...props} />
	)
)
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName

const ContextMenuShortcut = ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => {
	return <span className={cn('ml-auto text-xs tracking-widest text-gray-500', className)} {...props} />
}
ContextMenuShortcut.displayName = 'ContextMenuShortcut'

export {
	ContextMenu,
	ContextMenuCheckboxItem,
	ContextMenuContent,
	ContextMenuGroup,
	ContextMenuItem,
	ContextMenuLabel,
	ContextMenuPortal,
	ContextMenuRadioGroup,
	ContextMenuRadioItem,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger
}
