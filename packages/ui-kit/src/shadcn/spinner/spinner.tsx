import { SpinnerIosRegular } from '@fluentui/react-icons'
import { cn } from '../../lib/utils.ts'
import type { SpinnerProps } from './types.ts'

export const Spinner = ({ show = true, className, ...props }: SpinnerProps) => {
	if (!show) return null

	return (
		<SpinnerIosRegular role='status' aria-label='Loading' className={cn('size-4 animate-spin', className)} {...props} />
	)
}
