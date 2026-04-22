import { ChevronDownRegular, ChevronLeftRegular, ChevronRightRegular } from '@fluentui/react-icons'
import { useEffect, useRef } from 'react'
import { DayPicker, getDefaultClassNames } from 'react-day-picker'
import { cn } from '../../lib/utils.ts'
import { Button, buttonVariants } from '../button'
import type { CalendarDayButtonProps, CalendarProps } from './types.ts'

export const Calendar = ({
	className,
	classNames,
	showOutsideDays = true,
	captionLayout = 'label',
	buttonVariant = 'ghost',
	formatters,
	components,
	...props
}: CalendarProps) => {
	const defaultClassNames = getDefaultClassNames()

	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			className={cn(
				'rounded-lg border border-gray-200 shadow-sm',
				String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
				String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
				className
			)}
			captionLayout={captionLayout}
			formatters={{
				formatMonthDropdown: (date) => date.toLocaleString('default', { month: 'short' }),
				...formatters
			}}
			classNames={{
				root: cn('w-fit', defaultClassNames.root),
				months: cn('relative h-full flex flex-col gap-4 md:flex-row rounded-[inherit]', defaultClassNames.months),
				month: cn('grow flex w-full flex-col', defaultClassNames.month),
				nav: cn(
					'bg-gray-50 absolute rounded-tr-[inherit] rounded-tl-[inherit] inset-x-0 top-0 flex w-full items-center justify-between gap-1 p-2',
					defaultClassNames.nav
				),
				button_previous: cn(
					buttonVariants({ variant: buttonVariant }),
					'h-[--cell-size] w-[--cell-size] select-none p-0.75 aria-disabled:opacity-50 z-1',
					defaultClassNames.button_previous
				),
				button_next: cn(
					buttonVariants({ variant: buttonVariant }),
					'h-[--cell-size] w-[--cell-size] select-none p-0.75 aria-disabled:opacity-50 z-1',
					defaultClassNames.button_next
				),
				month_caption: cn(
					'flex h-[--cell-size] w-full h-[48px] items-center justify-center px-[--cell-size] z-0',
					defaultClassNames.month_caption
				),
				dropdowns: cn(
					'flex h-[--cell-size] w-full items-center justify-center gap-1 text-sm font-medium',
					defaultClassNames.dropdowns
				),
				dropdown_root: cn(
					'has-focus:border-success-500 border border-gray-200 relative rounded-sm',
					defaultClassNames.dropdown_root
				),
				dropdown: cn('bg-white absolute inset-0 opacity-0 cursor-pointer', defaultClassNames.dropdown),
				caption_label: cn(
					'select-none font-medium',
					captionLayout === 'label'
						? 'text-ssm'
						: '[&>svg]:text-gray-400 flex items-center gap-x-3  rounded-[inherit] py-2 px-3 text-ssm [&>svg]:size-4',
					defaultClassNames.caption_label
				),
				table: 'w-full border-collapse',
				weekdays: cn('flex', defaultClassNames.weekdays),
				weekday: cn('text-gray-500 flex-1 select-none text-sm font-normal py-3 px-3.5', defaultClassNames.weekday),
				week: cn('flex w-full', defaultClassNames.week),
				week_number_header: cn('w-[53px] h-[42px] select-none', defaultClassNames.week_number_header),
				week_number: cn('w-[53px] h-[42px] text-gray-500 select-none text-ssm p-2', defaultClassNames.week_number),
				day: cn(
					'group/day relative aspect-square h-[42px] w-[53px] select-none p-0 text-center',
					defaultClassNames.day
				),
				range_start: cn('bg-success-500 text-white rounded-l-sm', defaultClassNames.range_start),
				range_middle: cn('rounded-none text-gray-500', defaultClassNames.range_middle),
				range_end: cn('bg-success-500 text-white rounded-r-sm', defaultClassNames.range_end),
				today: cn(
					"relative after:content-[''] after:absolute after:size-[5px] after:bg-success-500 after:left-1/2 after:-translate-x-1/2 after:rounded-full after:bottom-1.5",
					defaultClassNames.today
				),
				outside: cn('text-gray-300 aria-selected:text-gray-300', defaultClassNames.outside),
				disabled: cn('text-gray-500 opacity-50', defaultClassNames.disabled),
				hidden: cn('invisible', defaultClassNames.hidden),
				...classNames
			}}
			components={{
				Root: ({ className, rootRef, ...props }) => {
					return <div data-slot='calendar' ref={rootRef} className={cn(className)} {...props} />
				},
				Chevron: ({ className, orientation, ...props }) => {
					if (orientation === 'left') {
						return <ChevronLeftRegular fontSize={24} className={cn('text-gray-500', className)} {...props} />
					}

					if (orientation === 'right') {
						return <ChevronRightRegular fontSize={24} className={cn('text-gray-500', className)} {...props} />
					}

					return <ChevronDownRegular fontSize={24} className={cn('text-gray-500', className)} {...props} />
				},
				DayButton: CalendarDayButton,
				WeekNumber: ({ children, ...props }) => {
					return (
						<td {...props}>
							<div className='flex size-full items-center justify-center text-center text-gray-500'>{children}</div>
						</td>
					)
				},
				...components
			}}
			{...props}
		/>
	)
}

export const CalendarDayButton = ({ className, day, modifiers, ...props }: CalendarDayButtonProps) => {
	const defaultClassNames = getDefaultClassNames()

	const ref = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		if (modifiers.focused) ref.current?.focus()
	}, [modifiers.focused])

	return (
		<Button
			ref={ref}
			variant='outline'
			size='icon'
			data-day={day.date.toLocaleDateString()}
			data-selected-single={
				modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle
			}
			data-range-start={modifiers.range_start}
			data-range-end={modifiers.range_end}
			data-range-middle={modifiers.range_middle}
			className={cn(
				'data-[selected-single=true]:bg-success-500 data-[range-start=true]:bg-success-500 data-[range-end=true]:bg-success-500 flex aspect-square size-full flex-col gap-1 rounded-none border-transparent bg-transparent p-2 text-sm leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 data-[range-end=true]:rounded-sm data-[range-end=true]:text-white data-[range-middle=true]:bg-gray-100 data-[range-middle=true]:text-gray-500 data-[range-start=true]:rounded-sm data-[range-start=true]:text-white data-[selected-single=true]:rounded-sm data-[selected-single=true]:text-white [&>span]:text-xs [&>span]:opacity-70',
				defaultClassNames.day,
				className
			)}
			{...props}
		/>
	)
}
