import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type { BadgeProps } from './types'

export const badgeConfig = {
	variants: {
		variant: {
			primary: 'border-success-600 bg-success-600 text-white',
			secondary: 'bg-gray-100 border-gray-100',
			destructive: 'bg-error-500 border-error-500 text-white',
			outline: 'border-gray-200 bg-white'
		}
	}
}

const badgeVariants = cva(
	'text-xxs! inline-flex gap-1 items-center rounded-sm border border-transparent px-2 py-1 font-medium focus:outline-none',
	badgeConfig
)

const Badge = ({ className, variant = 'primary', ...props }: BadgeProps) => {
	return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
