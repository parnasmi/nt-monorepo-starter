import { CheckmarkRegular, ChevronDownRegular, ChevronUpRegular } from '@fluentui/react-icons'
import * as SelectPrimitive from '@radix-ui/react-select'
import { type ElementRef, forwardRef } from 'react'
import { cn } from '../../lib/utils.ts'
import type {
	SelectContentProps,
	SelectItemProps,
	SelectLabelProps,
	SelectScrollDownButtonProps,
	SelectScrollUpButtonProps,
	SelectSeparatorProps,
	SelectTriggerProps
} from './types.ts'

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = forwardRef<ElementRef<typeof SelectPrimitive.Trigger>, SelectTriggerProps>(
	({ className, children, ...props }, ref) => (
		<SelectPrimitive.Trigger
			ref={ref}
			className={cn(
				'aria-invalid:border-error-500 text-ssm inline-flex cursor-pointer items-center justify-between gap-1 rounded border border-gray-200 bg-white px-3 py-2 whitespace-nowrap outline-none disabled:cursor-not-allowed disabled:opacity-50 data-placeholder:text-gray-500 data-[state=open]:[&_svg]:rotate-180 [&>span]:line-clamp-1',
				className
			)}
			{...props}
		>
			{children}
			<SelectPrimitive.Icon asChild>
				<ChevronDownRegular fontSize={16} className='ml-1 opacity-50' />
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
	)
)
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = forwardRef<ElementRef<typeof SelectPrimitive.ScrollUpButton>, SelectScrollUpButtonProps>(
	({ className, ...props }, ref) => (
		<SelectPrimitive.ScrollUpButton
			ref={ref}
			className={cn('flex cursor-default items-center justify-center py-1', className)}
			{...props}
		>
			<ChevronUpRegular fontSize={16} />
		</SelectPrimitive.ScrollUpButton>
	)
)
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = forwardRef<
	ElementRef<typeof SelectPrimitive.ScrollDownButton>,
	SelectScrollDownButtonProps
>(({ className, ...props }, ref) => (
	<SelectPrimitive.ScrollDownButton
		ref={ref}
		className={cn('flex cursor-default items-center justify-center py-1', className)}
		{...props}
	>
		<ChevronDownRegular fontSize={16} />
	</SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName

const SelectContent = forwardRef<ElementRef<typeof SelectPrimitive.Content>, SelectContentProps>(
	({ className, children, position = 'popper', ...props }, ref) => (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Content
				ref={ref}
				className={cn(
					'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-[--radix-select-content-available-height] origin-[--radix-select-content-transform-origin] overflow-x-hidden overflow-y-auto rounded bg-white text-gray-900 shadow-lg',
					position === 'popper' &&
						'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
					className
				)}
				position={position}
				{...props}
			>
				<SelectScrollUpButton />
				<SelectPrimitive.Viewport
					className={cn(
						'p-0',
						position === 'popper' && 'h-(--radix-select-trigger-height) w-full min-w-(--radix-select-trigger-width)'
					)}
				>
					{children}
				</SelectPrimitive.Viewport>
				<SelectScrollDownButton />
			</SelectPrimitive.Content>
		</SelectPrimitive.Portal>
	)
)
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = forwardRef<ElementRef<typeof SelectPrimitive.Label>, SelectLabelProps>(
	({ className, ...props }, ref) => (
		<SelectPrimitive.Label ref={ref} className={cn('text-ssm px-2 py-1.5 font-semibold', className)} {...props} />
	)
)
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = forwardRef<ElementRef<typeof SelectPrimitive.Item>, SelectItemProps>(
	({ className, children, ...props }, ref) => (
		<SelectPrimitive.Item
			ref={ref}
			className={cn(
				'text-ssm relative flex w-full cursor-pointer items-center border-b border-b-gray-200 px-3 py-2 outline-none select-none last:border-b-0 focus:bg-gray-50 data-disabled:pointer-events-none data-disabled:opacity-50 data-[state=checked]:bg-gray-50',
				className
			)}
			{...props}
		>
			<span className='absolute right-2 flex size-3.5 items-center justify-center'>
				<SelectPrimitive.ItemIndicator>
					<CheckmarkRegular fontSize={16} />
				</SelectPrimitive.ItemIndicator>
			</span>
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
		</SelectPrimitive.Item>
	)
)
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = forwardRef<ElementRef<typeof SelectPrimitive.Separator>, SelectSeparatorProps>(
	({ className, ...props }, ref) => (
		<SelectPrimitive.Separator ref={ref} className={cn('-mx-1 my-1 h-px bg-gray-50', className)} {...props} />
	)
)
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectSeparator,
	SelectTrigger,
	SelectValue
}
