import { forwardRef } from 'react'
import { cn } from '../../lib/utils.ts'
import type { TextareaProps } from './types.ts'

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
	return (
		<textarea
			className={cn(
				'aria-invalid:border-error-500 focus-visible:border-b-success-600 text-ssm flex max-h-64 min-h-15 w-full rounded border border-gray-200 bg-transparent px-3 py-2 transition-colors placeholder:text-gray-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			ref={ref}
			{...props}
		/>
	)
})

Textarea.displayName = 'Textarea'
