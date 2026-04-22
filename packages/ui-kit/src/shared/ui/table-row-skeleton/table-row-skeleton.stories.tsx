import type { Meta, StoryObj } from '@storybook/react-vite'
import { Table, TableHead, TableHeader, TableRow } from '../../../shadcn/table'
import { TableRowSkeleton } from './table-row-skeleton'

const meta = {
	title: 'Shared/TableRowSkeleton',
	component: TableRowSkeleton,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A convenience component that renders a `<TableBody>` filled with skeleton rows. Drop it inside a `<Table>` in place of the real `<TableBody>` while data is loading.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		columns: {
			description: 'Number of skeleton columns to render per row.',
			control: 'number',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '1' }
			}
		},
		rows: {
			description: 'Number of skeleton rows to render.',
			control: 'number',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '10' }
			}
		},
		avatarInColumns: {
			description: 'Zero-based column indices that should display an avatar-style (rounded) skeleton.',
			control: false,
			table: {
				type: { summary: 'number[]' }
			}
		},
		avatarProps: {
			description: 'Additional props forwarded to the `<Skeleton>` rendered in avatar columns.',
			control: false,
			table: {
				type: { summary: 'SkeletonProps' }
			}
		}
	}
} satisfies Meta<typeof TableRowSkeleton>

export default meta
type Story = StoryObj<typeof meta>

/**
 * ```tsx
 * import { TableRowSkeleton } from '@naiton/ui-kit'
 *
 * <Table>
 *   <TableHeader>...</TableHeader>
 *   <TableRowSkeleton columns={4} rows={5} />
 * </Table>
 * ```
 */
export const Base: Story = {
	name: 'Usage',
	args: {
		columns: 4,
		rows: 5
	},
	render: () => (
		<Table className='w-150'>
			<TableHeader>
				<TableRow>
					<TableHead>Invoice</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Method</TableHead>
					<TableHead>Amount</TableHead>
				</TableRow>
			</TableHeader>
			<TableRowSkeleton columns={4} rows={5} />
		</Table>
	),
	parameters: {
		docs: {
			source: {
				code: `
					import { TableRowSkeleton, Table, TableHead, TableHeader, TableRow } from '@naiton/ui-kit'

					<Table className="w-150">
						<TableHeader>
							<TableRow>
								<TableHead>Invoice</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Method</TableHead>
								<TableHead>Amount</TableHead>
							</TableRow>
						</TableHeader>
						<TableRowSkeleton columns={4} rows={5} />
					</Table>
				`
			}
		}
	}
}

export const Rows: Story = {
	name: 'Row count',
	render: () => (
		<Table className='w-150'>
			<TableHeader>
				<TableRow>
					<TableHead>Column 1</TableHead>
					<TableHead>Column 2</TableHead>
					<TableHead>Column 3</TableHead>
				</TableRow>
			</TableHeader>
			<TableRowSkeleton columns={3} rows={10} />
		</Table>
	),
	parameters: {
		docs: {
			description: {
				story: 'Use the `rows` prop to control how many skeleton rows are rendered while data is loading.'
			},
			source: {
				code: `
					import { TableRowSkeleton, Table, TableHead, TableHeader, TableRow } from "@naiton/ui-kit"

					<Table className="w-150">
						<TableHeader>
							<TableRow>
								<TableHead>Column 1</TableHead>
								<TableHead>Column 2</TableHead>
								<TableHead>Column 3</TableHead>
							</TableRow>
						</TableHeader>
						<TableRowSkeleton columns={3} rows={10} />
					</Table>
				`
			}
		}
	}
}

export const Columns: Story = {
	name: 'Column count',
	render: () => (
		<Table className='w-150'>
			<TableHeader>
				<TableRow>
					<TableHead>Column 1</TableHead>
					<TableHead>Column 2</TableHead>
					<TableHead>Column 3</TableHead>
					<TableHead>Column 4</TableHead>
					<TableHead>Column 5</TableHead>
					<TableHead>Column 6</TableHead>
					<TableHead>Column 7</TableHead>
					<TableHead>Column 8</TableHead>
					<TableHead>Column 9</TableHead>
					<TableHead>Column 10</TableHead>
				</TableRow>
			</TableHeader>
			<TableRowSkeleton columns={10} rows={3} />
		</Table>
	),
	decorators: [],
	parameters: {
		docs: {
			description: {
				story: 'Use the `columns` prop to match the number of columns in the real table header.'
			},
			source: {
				code: `
					import { TableRowSkeleton, Table, TableHead, TableHeader, TableRow } from '@naiton/ui-kit'

					<Table className='w-150'>
						<TableHeader>
							<TableRow>
								<TableHead>Column 1</TableHead>
								<TableHead>Column 2</TableHead>
								<TableHead>Column 3</TableHead>
								<TableHead>Column 4</TableHead>
								<TableHead>Column 5</TableHead>
								<TableHead>Column 6</TableHead>
								<TableHead>Column 7</TableHead>
								<TableHead>Column 8</TableHead>
								<TableHead>Column 9</TableHead>
								<TableHead>Column 10</TableHead>
							</TableRow>
						</TableHeader>
						<TableRowSkeleton columns={10} rows={3} />
					</Table>
				`
			}
		}
	}
}
