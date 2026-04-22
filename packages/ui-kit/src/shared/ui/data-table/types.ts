import type {
	ColumnDef as TanstackColumnDef,
	ColumnOrderState,
	ColumnSizingState,
	SortingState,
	Updater,
	VisibilityState
} from '@tanstack/react-table'
import type { CSSProperties } from 'react'

export type ColumnMeta = {
	thClassName?: string
	tdClassName?: string
	thStyle?: CSSProperties
	tdStyle?: CSSProperties
}

export type ColumnDef<TData, TValue = unknown> = TanstackColumnDef<TData, TValue> & {
	meta?: ColumnMeta
}

export type DataTableProps<T> = {
	data?: T[]
	columns: ColumnDef<T>[]
	loading?: boolean
	fetching?: boolean
	selectable?: boolean
	className?: string
	containerClassName?: string

	sorting: SortingState
	columnVisibility: VisibilityState
	columnOrder: ColumnOrderState
	columnSizing: ColumnSizingState
	setSorting: (updater: Updater<SortingState>) => void
	setColumnVisibility: (updater: Updater<VisibilityState>) => void
	setColumnOrder: (updater: Updater<ColumnOrderState>) => void
	setColumnSizing: (updater: Updater<ColumnSizingState>) => void
}

export type DataTableResetHandle = {
	resetSorting: () => void
	resetSelected: () => void
}
