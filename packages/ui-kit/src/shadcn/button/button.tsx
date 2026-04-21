import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils.ts'
import type { ButtonProps } from './types.ts'

export const buttonConfig = {
	variants: {
		variant: {
			primary: 'border-success-600 bg-success-600 text-white hover:bg-success-600/90',
			outline: 'border-gray-200 bg-white hover:bg-gray-100',
			ghost: 'text-success-600 hover:bg-gray-100 hover:border-gray-100',
			destructive: 'bg-error-500 border-error-500 text-white hover:bg-error-400 hover:border-error-400',
			secondary: 'bg-gray-100 border-gray-100 hover:bg-gray-200 hover:border-gray-200',
			link: 'text-success-600 underline-offset-4 hover:underline'
		},
		size: {
			sm: 'text-xs px-2 py-1',
			md: 'px-3 py-2',
			lg: 'py-3 px-4',
			icon: 'p-2'
		}
	}
} as const

export const buttonVariants = cva(
	'text-ssm border border-transparent inline-flex items-center justify-center gap-2 whitespace-nowrap rounded font-medium transition-colors cursor-pointer outline-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:shrink-0',
	buttonConfig
)

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant = 'primary', size = 'md', asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button'

		return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
	}
)

Button.displayName = 'Button'
