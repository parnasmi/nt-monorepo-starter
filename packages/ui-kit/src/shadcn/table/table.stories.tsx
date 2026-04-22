import type { Meta, StoryObj } from '@storybook/react-vite'
import { INVOICES } from './constants.ts'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
	TableSorter
} from './table.tsx'

const meta = {
	title: 'UI/Table',
	component: Table,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'A responsive table component.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		className: {
			description: 'Additional CSS classes for the table element',
			control: 'text',
			table: {
				type: { summary: 'string' }
			}
		}
	}
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

/**
 * ```tsx
 * import {
 *   Table,
 *   TableBody,
 *   TableCell,
 *   TableHead,
 *   TableHeader,
 *   TableRow,
 * } from '@naiton/ui-kit'
 *
 * <Table>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Invoice</TableHead>
 *       <TableHead>Status</TableHead>
 *       <TableHead>Method</TableHead>
 *       <TableHead>Amount</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>INV-001</TableCell>
 *       <TableCell>Paid</TableCell>
 *       <TableCell>Credit Card</TableCell>
 *       <TableCell>$250.00</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 */
export const Base: Story = {
	name: 'Usage',
	render: () => (
		<div className='w-150'>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Invoice</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Method</TableHead>
						<TableHead>Amount</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{INVOICES.map((inv) => (
						<TableRow key={inv.invoice}>
							<TableCell>{inv.invoice}</TableCell>
							<TableCell>{inv.status}</TableCell>
							<TableCell>{inv.method}</TableCell>
							<TableCell>{inv.amount}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	),
	parameters: {
		docs: {
			source: {
				code: `
					import {
						Table,
						TableBody,
						TableCell,
						TableHead,
						TableHeader,
						TableRow,
					} from '@naiton/ui-kit'

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Invoice</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Method</TableHead>
								<TableHead>Amount</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell>INV-001</TableCell>
								<TableCell>Paid</TableCell>
								<TableCell>Credit Card</TableCell>
								<TableCell>$250.00</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				`
			}
		}
	}
}

export const Footer: Story = {
	render: () => (
		<div className='w-150'>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Invoice</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Method</TableHead>
						<TableHead>Amount</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{INVOICES.map((inv) => (
						<TableRow key={inv.invoice}>
							<TableCell>{inv.invoice}</TableCell>
							<TableCell>{inv.status}</TableCell>
							<TableCell>{inv.method}</TableCell>
							<TableCell>{inv.amount}</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell colSpan={3}>Total</TableCell>
						<TableCell>$1,750.00</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Use `TableFooter` to add a footer row that summarises the table data, such as totals.'
			},
			source: {
				code: `
					import {
						Table,
						TableBody,
						TableCell,
						TableFooter,
						TableHead,
						TableHeader,
						TableRow,
					} from '@naiton/ui-kit'

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Invoice</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Method</TableHead>
								<TableHead>Amount</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell>INV-001</TableCell>
								<TableCell>Paid</TableCell>
								<TableCell>Credit Card</TableCell>
								<TableCell>$250.00</TableCell>
							</TableRow>
						</TableBody>
						<TableFooter>
							<TableRow>
								<TableCell colSpan={3}>Total</TableCell>
								<TableCell>$1,750.00</TableCell>
							</TableRow>
						</TableFooter>
					</Table>
				`
			}
		}
	}
}

export const Caption: Story = {
	render: () => (
		<div className='w-150'>
			<Table>
				<TableCaption>A list of recent invoices.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Invoice</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Method</TableHead>
						<TableHead>Amount</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{INVOICES.map((inv) => (
						<TableRow key={inv.invoice}>
							<TableCell>{inv.invoice}</TableCell>
							<TableCell>{inv.status}</TableCell>
							<TableCell>{inv.method}</TableCell>
							<TableCell>{inv.amount}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Use `TableCaption` to add an accessible caption that describes the table contents.'
			},
			source: {
				code: `
					import {
						Table,
						TableBody,
						TableCaption,
						TableCell,
						TableHead,
						TableHeader,
						TableRow,
					} from '@naiton/ui-kit'

					<Table>
						<TableCaption>A list of recent invoices.</TableCaption>
						<TableHeader>
							<TableRow>
								<TableHead>Invoice</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Method</TableHead>
								<TableHead>Amount</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell>INV-001</TableCell>
								<TableCell>Paid</TableCell>
								<TableCell>Credit Card</TableCell>
								<TableCell>$250.00</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				`
			}
		}
	}
}

export const Sorter: Story = {
	render: () => (
		<div className='w-150'>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>
							<span className='flex items-center gap-1'>
								Invoice
								<TableSorter sort={false} />
							</span>
						</TableHead>
						<TableHead>
							<span className='flex items-center gap-1'>
								Status
								<TableSorter sort='asc' />
							</span>
						</TableHead>
						<TableHead>
							<span className='flex items-center gap-1'>
								Method
								<TableSorter sort='desc' />
							</span>
						</TableHead>
						<TableHead>Amount</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{INVOICES.map((inv) => (
						<TableRow key={inv.invoice}>
							<TableCell>{inv.invoice}</TableCell>
							<TableCell>{inv.status}</TableCell>
							<TableCell>{inv.method}</TableCell>
							<TableCell>{inv.amount}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Use `TableSorter` inside a `TableHead` to indicate column sort direction. Accepts `false` (unsorted), `"asc"`, or `"desc"` as the `sort` prop.'
			},
			source: {
				code: `
					import {
						Table,
						TableBody,
						TableCell,
						TableHead,
						TableHeader,
						TableRow,
						TableSorter
					} from '@naiton/ui-kit'

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>
									<span className='flex items-center gap-1'>
										Invoice
										<TableSorter sort={false} />
									</span>
								</TableHead>
								<TableHead>
									<span className="flex items-center gap-1">
										Status
										<TableSorter sort="asc" />
									</span>
								</TableHead>
								<TableHead>
									<span className="flex items-center gap-1">
										Method
										<TableSorter sort="desc" />
									</span>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{rows.map((row) => (
								<TableRow key={row.id}>
									<TableCell>{row.invoice}</TableCell>
									<TableCell>{row.status}</TableCell>
									<TableCell>{row.method}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				`
			}
		}
	}
}
