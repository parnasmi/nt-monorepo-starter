import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ColumnOrderState, ColumnSizingState, SortingState, VisibilityState } from '@tanstack/react-table'
import { type ComponentType, useState } from 'react'
import { DataTable } from './data-table'
import type { ColumnDef } from './types'

type Person = {
	id: string
	name: string
	email: string
	role: string
	status: string
}

const PEOPLE: Person[] = [
	{ id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
	{ id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active' },
	{ id: '3', name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive' },
	{ id: '4', name: 'David Brown', email: 'david@example.com', role: 'Editor', status: 'Active' },
	{ id: '5', name: 'Eve Davis', email: 'eve@example.com', role: 'Viewer', status: 'Pending' }
]

const COLUMNS: ColumnDef<Person>[] = [
	{ accessorKey: 'name', header: 'Name', size: 180 },
	{ accessorKey: 'email', header: 'Email', size: 220 },
	{ accessorKey: 'role', header: 'Role', size: 120 },
	{ accessorKey: 'status', header: 'Status', size: 100 }
]

type DataTableWrapperProps = {
	data?: Person[]
	columns?: ColumnDef<Person>[]
	loading?: boolean
	fetching?: boolean
	selectable?: boolean
	className?: string
	containerClassName?: string
}

function DataTableWrapper({ data = PEOPLE, columns = COLUMNS, ...rest }: DataTableWrapperProps) {
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
	const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([])
	const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({})

	return (
		<DataTable<Person>
			data={data}
			columns={columns}
			sorting={sorting}
			setSorting={setSorting}
			columnVisibility={columnVisibility}
			setColumnVisibility={setColumnVisibility}
			columnOrder={columnOrder}
			setColumnOrder={setColumnOrder}
			columnSizing={columnSizing}
			setColumnSizing={setColumnSizing}
			{...rest}
		/>
	)
}

const meta = {
	title: 'Shared/DataTable',
	component: DataTable as ComponentType<any>,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A feature-rich data table built on TanStack Table with column sorting, column resizing, multi-row selection (click, Shift+click, arrow keys), and dedicated `loading` / `fetching` states.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		data: {
			description: 'Array of row data objects.',
			control: false,
			table: { type: { summary: 'T[]' }, defaultValue: { summary: '[]' } }
		},
		columns: {
			description:
				'Column definitions following the TanStack Table `ColumnDef` format, extended with an optional `meta` field for custom `thClassName`, `tdClassName`, `thStyle`, and `tdStyle`.',
			control: false,
			table: { type: { summary: 'ColumnDef<T>[]' }, defaultValue: { summary: '[]' } }
		},
		loading: {
			description: 'When `true`, renders a full-table loading overlay.',
			control: 'boolean',
			table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } }
		},
		fetching: {
			description:
				'When `true`, replaces the table body with skeleton rows while new data is being fetched in the background.',
			control: 'boolean',
			table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } }
		},
		selectable: {
			description:
				'Enables multi-row selection via checkboxes and keyboard navigation (Arrow keys + Shift for range selection).',
			control: 'boolean',
			table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } }
		},
		className: {
			description: 'Additional CSS classes applied to the inner `<Table>` element.',
			control: 'text',
			table: { type: { summary: 'string' } }
		},
		containerClassName: {
			description: 'Additional CSS classes applied to the outer scrollable container `<div>`.',
			control: 'text',
			table: { type: { summary: 'string' } }
		},
		sorting: {
			description: 'Controlled sorting state (`SortingState` from TanStack Table).',
			control: false,
			table: { type: { summary: 'SortingState' } }
		},
		columnVisibility: {
			description: 'Controlled column visibility state.',
			control: false,
			table: { type: { summary: 'VisibilityState' } }
		},
		columnOrder: {
			description: 'Controlled column order state.',
			control: false,
			table: { type: { summary: 'ColumnOrderState' } }
		},
		columnSizing: {
			description: 'Controlled column sizing state (updated while dragging column resize handles).',
			control: false,
			table: { type: { summary: 'ColumnSizingState' } }
		},
		setSorting: {
			description: 'Updater called when the user clicks a sortable column header.',
			action: 'setSorting',
			table: { type: { summary: '(updater: Updater<SortingState>) => void' } }
		},
		setColumnVisibility: {
			description: 'Updater called when column visibility changes.',
			action: 'setColumnVisibility',
			table: { type: { summary: '(updater: Updater<VisibilityState>) => void' } }
		},
		setColumnOrder: {
			description: 'Updater called when column order changes.',
			action: 'setColumnOrder',
			table: { type: { summary: '(updater: Updater<ColumnOrderState>) => void' } }
		},
		setColumnSizing: {
			description: 'Updater called while the user drags a column resize handle.',
			action: 'setColumnSizing',
			table: { type: { summary: '(updater: Updater<ColumnSizingState>) => void' } }
		}
	}
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

/**
 * ```tsx
 * import { DataTable } from '@naiton/ui-kit'
 * import type { ColumnDef } from '@naiton/ui-kit'
 *
 * const columns: ColumnDef<Person>[] = [
 *   { accessorKey: 'name', header: 'Name' },
 *   { accessorKey: 'email', header: 'Email' },
 * ]
 *
 * <DataTable
 *   data={people}
 *   columns={columns}
 *   sorting={sorting}
 *   setSorting={setSorting}
 *   columnVisibility={columnVisibility}
 *   setColumnVisibility={setColumnVisibility}
 *   columnOrder={columnOrder}
 *   setColumnOrder={setColumnOrder}
 *   columnSizing={columnSizing}
 *   setColumnSizing={setColumnSizing}
 * />
 * ```
 */
export const Base: Story = {
	name: 'Usage',
	render: () => (
		<div className='w-[700px]'>
			<DataTableWrapper />
		</div>
	),
	parameters: {
		docs: {
			source: {
				code: `
					import { useState } from 'react'
					import type { ColumnOrderState, ColumnSizingState, SortingState, VisibilityState } from '@tanstack/react-table'
					import { DataTable, type ColumnDef } from '@naiton/ui-kit'

					type Person = { id: string; name: string; email: string; role: string; status: string }

					const columns: ColumnDef<Person>[] = [
						{ accessorKey: 'name', header: 'Name' },
						{ accessorKey: 'email', header: 'Email' },
						{ accessorKey: 'role', header: 'Role' },
						{ accessorKey: 'status', header: 'Status' },
					]

					function MyTable({ data }: { data: Person[] }) {
						const [sorting, setSorting] = useState<SortingState>([])
						const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
						const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([])
						const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({})

						return (
							<DataTable<Person>
								data={data}
								columns={columns}
								sorting={sorting}
								setSorting={setSorting}
								columnVisibility={columnVisibility}
								setColumnVisibility={setColumnVisibility}
								columnOrder={columnOrder}
								setColumnOrder={setColumnOrder}
								columnSizing={columnSizing}
								setColumnSizing={setColumnSizing}
							/>
						)
					}
				`
			}
		}
	}
}

export const Loading: Story = {
	render: () => (
		<div className='w-[700px]'>
			<DataTableWrapper loading />
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Set `loading={true}` to display a full-table loading overlay. Use this for the initial data fetch before any rows are available.'
			},
			source: {
				code: `
					import { DataTable } from '@naiton/ui-kit'

					<DataTable
						data={[]}
						columns={columns}
						loading
						sorting={sorting}
						setSorting={setSorting}
						columnVisibility={columnVisibility}
						setColumnVisibility={setColumnVisibility}
						columnOrder={columnOrder}
						setColumnOrder={setColumnOrder}
						columnSizing={columnSizing}
						setColumnSizing={setColumnSizing}
					/>
				`
			}
		}
	}
}

export const Fetching: Story = {
	render: () => (
		<div className='w-[700px]'>
			<DataTableWrapper fetching />
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Set `fetching={true}` to replace the table body with skeleton rows. Use this when refreshing data while the previous set of rows is still shown.'
			},
			source: {
				code: `
					import { DataTable } from '@naiton/ui-kit'

					<DataTable
						data={people}
						columns={columns}
						fetching
						sorting={sorting}
						setSorting={setSorting}
						columnVisibility={columnVisibility}
						setColumnVisibility={setColumnVisibility}
						columnOrder={columnOrder}
						setColumnOrder={setColumnOrder}
						columnSizing={columnSizing}
						setColumnSizing={setColumnSizing}
					/>
				`
			}
		}
	}
}

export const Selectable: Story = {
	render: () => (
		<div className='w-[700px]'>
			<DataTableWrapper selectable />
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Set `selectable={true}` to add a checkbox column. Rows can be selected by clicking, Shift+clicking for range selection, or using Arrow keys after focusing the table.'
			},
			source: {
				code: `
					import { DataTable } from '@naiton/ui-kit'7

					<DataTable
						data={people}
						columns={columns}
						selectable
						sorting={sorting}
						setSorting={setSorting}
						columnVisibility={columnVisibility}
						setColumnVisibility={setColumnVisibility}
						columnOrder={columnOrder}
						setColumnOrder={setColumnOrder}
						columnSizing={columnSizing}
						setColumnSizing={setColumnSizing}
					/>
				`
			}
		}
	}
}

export const Empty: Story = {
	render: () => (
		<div className='w-[700px]'>
			<DataTableWrapper data={[]} />
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'When `data` is an empty array the table renders the header but no body rows.'
			},
			source: {
				code: `
					import { DataTable } from '@naiton/ui-kit'

					<DataTable
						data={[]}
						columns={columns}
						sorting={sorting}
						setSorting={setSorting}
						columnVisibility={columnVisibility}
						setColumnVisibility={setColumnVisibility}
						columnOrder={columnOrder}
						setColumnOrder={setColumnOrder}
						columnSizing={columnSizing}
						setColumnSizing={setColumnSizing}
					/>
				`
			}
		}
	}
}
