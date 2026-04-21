import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { type ElementRef, forwardRef } from 'react'
import { cn } from '../../lib/utils.ts'
import type { TooltipContentProps } from './types.ts'

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = forwardRef<ElementRef<typeof TooltipPrimitive.Content>, TooltipContentProps>(
	({ className, sideOffset = 4, ...props }, ref) => (
		<TooltipPrimitive.Portal>
			<TooltipPrimitive.Content
				ref={ref}
				sideOffset={sideOffset}
				className={cn(
					'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 text-xxs z-50 origin-[--radix-tooltip-content-transform-origin] overflow-hidden rounded bg-gray-700 px-2 py-1 text-white!',
					className
				)}
				{...props}
			/>
		</TooltipPrimitive.Portal>
	)
)

TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
