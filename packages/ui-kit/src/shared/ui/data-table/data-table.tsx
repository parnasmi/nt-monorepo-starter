import {
	type Column,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	type Row,
	type RowSelectionState,
	useReactTable
} from '@tanstack/react-table'
import {
	type ForwardedRef,
	forwardRef,
	type KeyboardEvent,
	type MouseEvent,
	useImperativeHandle,
	useMemo,
	useState
} from 'react'
import { cn } from '../../../lib/utils'
import { Checkbox } from '../../../shadcn/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableSorter } from '../../../shadcn/table'
import { Loading } from '../loading'
import { TableRowSkeleton } from '../table-row-skeleton'
import { ActionColumnHeader } from './ActionColumnHeader'
import type { ColumnDef, ColumnMeta, DataTableProps, DataTableResetHandle } from './types'

function _DataTable<T>(props: DataTableProps<T>, ref: ForwardedRef<DataTableResetHandle>) {
	const {
		data = [],
		columns = [],
		loading = false,
		fetching = false,
		selectable = false,
		className,
		containerClassName,
		sorting,
		columnVisibility,
		columnOrder,
		columnSizing,
		setSorting,
		setColumnVisibility,
		setColumnOrder,
		setColumnSizing
	} = props

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null)
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [anchorRowIndex, setAnchorRowIndex] = useState<number | null>(null)

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const finalColumns: ColumnDef<T>[] = useMemo(() => {
		if (selectable) {
			return [
				{
					id: 'select',
					header: ({ table }) => (
						<Checkbox
							checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
							onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
							aria-label='Select all'
							className='cursor-pointer'
						/>
					),
					enableSorting: false,
					enableResizing: false,
					size: 34,
					cell: ({ row }) => (
						<Checkbox
							checked={row.getIsSelected()}
							disabled={!row.getCanSelect()}
							onCheckedChange={(value) => row.toggleSelected(!!value)}
							aria-label='Select row'
							className='cursor-pointer'
						/>
					)
				},
				...columns,
				{
					id: 'actions',
					header: ({ table }) => <ActionColumnHeader table={table} />,
					enableSorting: false,
					enableResizing: false,
					size: 34,
					meta: {
						thClassName: 'sticky w-[34px] bg-gray-100 right-0 p-0 z-1',
						tdClassName:
							'sticky w-[34px] group-data-[state=false]:bg-white group-data-[state=selected]:bg-gray-100 right-0 p-0 z-1'
					}
				}
			]
		}

		return [
			...columns,
			{
				id: 'actions',
				header: ({ table }) => <ActionColumnHeader table={table} />,
				enableSorting: false,
				enableResizing: false,
				size: 34,
				meta: {
					thClassName: 'sticky w-[34px] bg-gray-100 right-0 p-0 z-1',
					tdClassName:
						'sticky w-[34px] group-data-[state=false]:bg-white group-data-[state=selected]:bg-gray-100 right-0 p-0 z-1'
				}
			}
		]
	}, [columns, selectable])

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const table = useReactTable<T>({
		data,
		columns: finalColumns,
		state: {
			columnVisibility,
			columnOrder,
			columnSizing,
			sorting,
			rowSelection
		},
		columnResizeMode: 'onChange',
		columnResizeDirection: 'ltr',
		enableRowSelection: true,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onColumnOrderChange: setColumnOrder,
		onColumnSizingChange: setColumnSizing,
		onSortingChange: setSorting,
		onRowSelectionChange: setRowSelection
	})

	const buildRangeSelection = (rows: Row<T>[], from: number, to: number) => {
		const start = Math.min(from, to)
		const end = Math.max(from, to)
		const selection: RowSelectionState = {}

		for (let i = start; i <= end; i++) {
			selection[rows[i].id] = true
		}

		return selection
	}

	const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return
		if (!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()) return

		e.preventDefault()

		const rows = table.getRowModel().rows
		if (rows.length === 0) return

		const currentIndex = activeRowIndex ?? rows.findIndex((r) => r.getIsSelected())
		if (currentIndex === -1) return

		const nextIndex =
			e.key === 'ArrowDown' ? Math.min(currentIndex + 1, rows.length - 1) : Math.max(currentIndex - 1, 0)

		if (nextIndex === currentIndex) return

		if (e.shiftKey) {
			const anchor = anchorRowIndex ?? currentIndex
			setRowSelection(buildRangeSelection(rows, anchor, nextIndex))
		} else {
			setAnchorRowIndex(nextIndex)
			setRowSelection({ [rows[nextIndex].id]: true })
		}

		setActiveRowIndex(nextIndex)
	}

	const handleSelectRow = (row: Row<T>, e: MouseEvent<HTMLTableRowElement>) => {
		console.log('selected row', row)
		e.preventDefault()
		const rows = table.getRowModel().rows
		const rowIndex = rows.findIndex((r) => r.id === row.id)

		if (e.shiftKey && activeRowIndex !== null) {
			const anchor = anchorRowIndex ?? activeRowIndex
			setRowSelection(buildRangeSelection(rows, anchor, rowIndex))
		} else {
			const isSelected = row.getIsSelected()
			const selectedCount = Object.keys(rowSelection).length

			if (isSelected && selectedCount > 1) {
				setRowSelection({ [row.id]: true })
			} else if (isSelected && selectedCount === 1) {
				setRowSelection({})
				setActiveRowIndex(null)
				setAnchorRowIndex(null)

				return
			} else {
				setRowSelection({ [row.id]: true })
			}

			setAnchorRowIndex(rowIndex)
		}

		setActiveRowIndex(rowIndex)
	}

	const resetSorting = () => table.resetSorting()

	const resetSelected = () => {
		setRowSelection({})
		setActiveRowIndex(null)
		setAnchorRowIndex(null)
	}

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useImperativeHandle(ref, () => ({ resetSorting, resetSelected }))

	const getColMeta = (col: Column<T, unknown>): ColumnMeta => {
		return col.columnDef.meta || {}
	}

	return (
		<div
			tabIndex={0}
			onKeyDown={handleKeyDown}
			className={cn(
				'relative w-full overflow-auto rounded border border-gray-200 outline-none select-none',
				containerClassName
			)}
		>
			<Loading loading={loading} className='text-success-600'>
				<Table className={cn('min-w-full', className)} style={{ width: table.getCenterTotalSize() }}>
					<TableHeader className='sticky top-0 z-2'>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									const m = getColMeta(header.column)

									return (
										<TableHead
											key={header.id}
											colSpan={header.colSpan}
											className={cn(m.thClassName, {
												'cursor-pointer flex-nowrap items-center gap-2 select-none hover:[&>svg]:text-gray-400':
													header.column.getCanSort()
											})}
											style={{ ...m.thStyle, minWidth: header.getSize() }}
										>
											<div
												className={cn({
													'flex cursor-pointer flex-nowrap items-center gap-2 select-none': header.column.getCanSort()
												})}
												onClick={header.column.getToggleSortingHandler()}
											>
												<span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
												{header.column.getCanSort() && <TableSorter sort={header.column.getIsSorted()} />}
											</div>

											{header.column.getCanResize() && (
												<div
													onDoubleClick={() => header.column.resetSize()}
													onMouseDown={header.getResizeHandler()}
													onTouchStart={header.getResizeHandler()}
													className={cn(
														'absolute top-0 h-full w-0.75 cursor-col-resize bg-gray-300 opacity-0 hover:opacity-100',
														{
															'bg-gray-400 opacity-100': header.column.getIsResizing(),
															'right-0': table.options.columnResizeDirection === 'ltr',
															'left-0': table.options.columnResizeDirection === 'rtl'
														}
													)}
												/>
											)}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>

					{fetching ? (
						<TableRowSkeleton columns={table.getAllLeafColumns().length} rows={table.getRowModel().rows.length} />
					) : (
						<TableBody>
							{table.getRowModel().rows.map((row, index) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
									data-active={index === activeRowIndex}
									data-anchor={index === anchorRowIndex}
									className='group hover:bg-gray-50'
									onClick={(e) => handleSelectRow(row, e)}
								>
									{row.getVisibleCells().map((cell) => {
										const m = getColMeta(cell.column)

										return (
											<TableCell
												key={cell.id}
												className={cn(m.tdClassName)}
												style={{ ...m.tdStyle, minWidth: cell.column.getSize() }}
											>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</TableCell>
										)
									})}
								</TableRow>
							))}
						</TableBody>
					)}
				</Table>
			</Loading>
		</div>
	)
}

export const DataTable = forwardRef(_DataTable) as <T>(
	props: DataTableProps<T> & { ref?: ForwardedRef<DataTableResetHandle> }
) => ReturnType<typeof _DataTable>
