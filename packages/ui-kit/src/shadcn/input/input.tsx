import { forwardRef } from 'react'
import { cn } from '../../lib/utils.ts'
import type { InputProps } from './types.ts'

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type = 'text', ...props }, ref) => {
	return (
		<input
			type={type}
			className={cn(
				'aria-invalid:border-error-500 focus-visible:border-b-success-600 text-ssm flex w-full rounded border border-gray-200 bg-transparent px-3 py-2 transition-colors file:border-0 file:bg-transparent file:font-medium file:text-gray-900 placeholder:text-gray-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			ref={ref}
			{...props}
		/>
	)
})

Input.displayName = 'Input'
