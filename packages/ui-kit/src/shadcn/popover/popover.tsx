import * as PopoverPrimitive from '@radix-ui/react-popover'
import * as Portal from '@radix-ui/react-portal'
import { type ComponentPropsWithoutRef, createContext, type ElementRef, forwardRef, useContext, useState } from 'react'
import { cn } from '../../lib/utils.ts'
import type { PopoverContentProps, PopoverProps } from './types.ts'

type PopoverContextValue = {
	open: boolean
	backdrop: boolean
}

const PopoverContext = createContext<PopoverContextValue>({ open: false, backdrop: false })

const Popover = ({
	onOpenChange,
	open: controlledOpen,
	defaultOpen,
	backdrop = false,
	children,
	...props
}: PopoverProps) => {
	const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false)
	const open = controlledOpen ?? internalOpen

	const handleOpenChange = (value: boolean) => {
		setInternalOpen(value)
		onOpenChange?.(value)
	}

	return (
		<PopoverContext.Provider value={{ open, backdrop }}>
			<PopoverPrimitive.Root {...props} open={open} onOpenChange={handleOpenChange} defaultOpen={defaultOpen}>
				{children}
			</PopoverPrimitive.Root>
		</PopoverContext.Provider>
	)
}

const PopoverTrigger = forwardRef<
	ElementRef<typeof PopoverPrimitive.Trigger>,
	ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>
>(({ className, ...props }, ref) => {
	const { open, backdrop } = useContext(PopoverContext)

	return (
		<PopoverPrimitive.Trigger ref={ref} className={cn(className, { 'relative z-50': backdrop && open })} {...props} />
	)
})
PopoverTrigger.displayName = PopoverPrimitive.Trigger.displayName

const PopoverContent = forwardRef<ElementRef<typeof PopoverPrimitive.Content>, PopoverContentProps>(
	({ className, align = 'center', sideOffset = 4, ...props }, ref) => {
		const { open, backdrop } = useContext(PopoverContext)

		return (
			<>
				{backdrop && open && (
					<Portal.Root>
						<div className='animate-in fade-in-0 fixed inset-0 z-40 bg-black/60' />
					</Portal.Root>
				)}
				<PopoverPrimitive.Portal>
					<PopoverPrimitive.Content
						ref={ref}
						align={align}
						sideOffset={sideOffset}
						className={cn(
							'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 grid origin-[--radix-popover-content-transform-origin] gap-4 rounded-lg bg-white p-4 text-gray-900 shadow-sm outline-none',
							className
						)}
						{...props}
					/>
				</PopoverPrimitive.Portal>
			</>
		)
	}
)
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverContent, PopoverTrigger }
