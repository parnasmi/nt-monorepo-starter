import * as SeparatorPrimitive from '@radix-ui/react-separator'
import { type ElementRef, forwardRef } from 'react'
import { cn } from '../../lib/utils.ts'
import type { SeparatorProps } from './types.ts'

export const Separator = forwardRef<ElementRef<typeof SeparatorPrimitive.Root>, SeparatorProps>(
	({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => (
		<SeparatorPrimitive.Root
			ref={ref}
			decorative={decorative}
			orientation={orientation}
			className={cn('shrink-0 bg-gray-200', orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px', className)}
			{...props}
		/>
	)
)

Separator.displayName = SeparatorPrimitive.Root.displayName
