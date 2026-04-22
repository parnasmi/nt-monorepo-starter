import { forwardRef } from 'react'
import SortDownIcon from '@/shared/assets/icons/sort-down.svg'
import SortUpIcon from '@/shared/assets/icons/sort-up.svg'
import SortIcon from '@/shared/assets/icons/sort.svg'
import { cn } from '../../lib/utils.ts'
import { SvgIcon } from '../../shared/ui/svg-icon'
import type {
	TableBodyProps,
	TableCaptionProps,
	TableCellProps,
	TableFooterProps,
	TableHeaderProps,
	TableHeadProps,
	TableProps,
	TableRowProps,
	TableSorterProps
} from './types.ts'

const Table = forwardRef<HTMLTableElement, TableProps>(({ className, ...props }, ref) => (
	<table ref={ref} className={cn('text-ssm w-full caption-bottom bg-white', className)} {...props} />
))
Table.displayName = 'Table'

const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(({ className, ...props }, ref) => (
	<thead ref={ref} className={cn('bg-gray-100 [&_tr]:border-b', className)} {...props} />
))
TableHeader.displayName = 'TableHeader'

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(({ className, ...props }, ref) => (
	<tbody ref={ref} className={cn('relative [&_tr:last-child]:border-0', className)} {...props} />
))
TableBody.displayName = 'TableBody'

const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(({ className, ...props }, ref) => (
	<tfoot
		ref={ref}
		className={cn('border-t border-t-gray-200 bg-gray-100 font-medium [&>tr]:last:border-b-0', className)}
		{...props}
	/>
))
TableFooter.displayName = 'TableFooter'

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(({ className, ...props }, ref) => (
	<tr
		ref={ref}
		className={cn(
			'border-b border-b-gray-200 transition-colors last:border-b-0 data-[state=selected]:bg-gray-100',
			className
		)}
		{...props}
	/>
))
TableRow.displayName = 'TableRow'

const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(({ className, ...props }, ref) => (
	<th
		ref={ref}
		className={cn(
			'relative border-r border-r-gray-200 px-3 py-2 text-left align-middle font-medium text-nowrap text-gray-900 last:border-r-0 [&:has([role=checkbox])]:p-2 *:[[role=checkbox]]:translate-y-0.5',
			className
		)}
		{...props}
	/>
))
TableHead.displayName = 'TableHead'

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(({ className, ...props }, ref) => (
	<td
		ref={ref}
		className={cn('px-3 py-2 align-middle [&:has([role=checkbox])]:p-2 *:[[role=checkbox]]:translate-y-0.5', className)}
		{...props}
	/>
))
TableCell.displayName = 'TableCell'

const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(({ className, ...props }, ref) => (
	<caption ref={ref} className={cn('mt-4 text-sm text-gray-500', className)} {...props} />
))
TableCaption.displayName = 'TableCaption'

const TableSorter = ({ sort, className }: TableSorterProps) => {
	switch (sort) {
		case 'asc':
			return <SvgIcon icon={<SortUpIcon />} width={8} height={14} className={cn('text-gray-400', className)} />
		case 'desc':
			return <SvgIcon icon={<SortDownIcon />} width={8} height={14} className={cn('text-gray-400', className)} />
		default:
			return <SvgIcon icon={<SortIcon />} width={8} height={14} className={cn('text-gray-300', className)} />
	}
}

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, TableSorter }
