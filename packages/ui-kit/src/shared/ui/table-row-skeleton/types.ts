import type { SkeletonProps } from '../../../shadcn/skeleton'

export type TableRowSkeletonProps = {
	columns?: number
	rows?: number
	avatarInColumns?: number[]
	avatarProps?: SkeletonProps
}
