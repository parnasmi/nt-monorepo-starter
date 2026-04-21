import { Skeleton } from '../../../shadcn/skeleton'
import { TableBody, TableCell, TableRow } from '../../../shadcn/table'
import type { TableRowSkeletonProps } from './types'

export const TableRowSkeleton = (props: TableRowSkeletonProps) => {
	const { columns = 1, rows = 10 } = props

	return (
		<TableBody>
			{Array.from(new Array(rows), (_, i) => i + 0).map((row) => (
				<TableRow key={`row-${row}`}>
					{Array.from(new Array(columns), (_, i) => i + 0).map((col) => (
						<TableCell key={`col-${col}`}>
							<Skeleton className='min-h-4 w-full min-w-4' />
						</TableCell>
					))}
				</TableRow>
			))}
		</TableBody>
	)
}
