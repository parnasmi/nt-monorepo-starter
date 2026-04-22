import { cn } from '../../lib/utils.ts'
import type { SkeletonProps } from './types.ts'

export const Skeleton = ({ className, ...props }: SkeletonProps) => {
	return <div className={cn('animate-pulse rounded bg-gray-300', className)} {...props} />
}
