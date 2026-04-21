import type { SortDirection } from '@tanstack/react-table'
import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react'

export type TableProps = HTMLAttributes<HTMLTableElement>

export type TableHeaderProps = HTMLAttributes<HTMLTableSectionElement>

export type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>

export type TableFooterProps = HTMLAttributes<HTMLTableSectionElement>

export type TableRowProps = HTMLAttributes<HTMLTableRowElement>

export type TableHeadProps = ThHTMLAttributes<HTMLTableCellElement>

export type TableCellProps = TdHTMLAttributes<HTMLTableCellElement>

export type TableCaptionProps = HTMLAttributes<HTMLTableCaptionElement>

export type TableSorterProps = {
	sort: false | SortDirection
	className?: string
}
