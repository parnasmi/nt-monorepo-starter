import { forwardRef, type HTMLAttributes } from 'react'

import { cn } from '../../lib/utils'

interface StackProps extends HTMLAttributes<HTMLDivElement> {
	gap?: number | string
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(({ className, gap = 4, style, ...props }, ref) => {
	return (
		<div
			ref={ref}
			className={cn('flex flex-col', className)}
			style={{ gap: typeof gap === 'number' ? `${gap * 0.25}rem` : gap, ...style }}
			{...props}
		/>
	)
})
Stack.displayName = 'Stack'
