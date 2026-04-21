import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { Calendar } from './calendar.tsx'

const meta = {
	title: 'UI/Calendar',
	component: Calendar,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'A calendar component that allows users to select a date or a range of dates.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		mode: {
			description: 'Date selection mode',
			control: 'select',
			options: ['single', 'range', 'multiple'],
			table: {
				type: { summary: "'single' | 'range' | 'multiple'" },
				defaultValue: { summary: 'single' }
			}
		},
		captionLayout: {
			description: 'Navigation header layout — label shows a static month/year, dropdown adds selectors',
			control: 'select',
			options: ['label', 'dropdown', 'dropdown-months', 'dropdown-years'],
			table: {
				type: { summary: "'label' | 'dropdown' | 'dropdown-months' | 'dropdown-years'" },
				defaultValue: { summary: 'label' }
			}
		},
		showOutsideDays: {
			description: 'Show days from adjacent months in the current month grid',
			control: 'boolean',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'true' }
			}
		},
		showWeekNumber: {
			description: 'Show ISO week numbers in the leftmost column',
			control: 'boolean',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' }
			}
		},
		numberOfMonths: {
			description: 'Number of months to display side by side',
			control: 'number',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '1' }
			}
		},
		buttonVariant: {
			description: 'Variant applied to the previous/next navigation buttons',
			control: 'select',
			options: ['ghost', 'outline', 'secondary', 'primary'],
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'ghost' }
			}
		},
		disabled: {
			description: 'Dates (or a matcher function) to disable',
			control: false,
			table: {
				type: { summary: 'Matcher | Matcher[]' }
			}
		},
		onSelect: {
			description: 'Callback fired when the selected date changes.',
			action: 'selected',
			table: { type: { summary: '(date: Date | undefined) => void' } }
		}
	}
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

/**
 * ```tsx
 * import { useState } from 'react'
 * import { Calendar } from '@naiton/ui-kit'
 *
 * const [date, setDate] = useState<Date | undefined>(new Date())
 *
 * <Calendar mode="single" selected={date} onSelect={setDate} />
 * ```
 */
export const Base: Story = {
	name: 'Usage',
	render: () => {
		const [date, setDate] = useState<Date | undefined>(new Date())

		return <Calendar mode='single' selected={date} onSelect={setDate} captionLayout='dropdown' />
	},
	parameters: {
		docs: {
			source: {
				code: `
					import { useState } from 'react'
					import { Calendar } from '@naiton/ui-kit'

					const [date, setDate] = useState<Date | undefined>(new Date())

					<Calendar mode='single' selected={date} onSelect={setDate} captionLayout='dropdown' />
				`
			}
		}
	}
}

export const Range: Story = {
	render: () => {
		const [range, setRange] = useState<DateRange | undefined>()

		return <Calendar mode='range' selected={range} onSelect={setRange} />
	},
	parameters: {
		docs: {
			description: {
				story: 'Use `mode="range"` to allow the user to select a start and end date.'
			},
			source: {
				code: `
					import { useState } from 'react'
					import type { DateRange } from 'react-day-picker'
					import { Calendar } from '@naiton/ui-kit'

					const [range, setRange] = useState<DateRange | undefined>()

					<Calendar mode="range" selected={range} onSelect={setRange} />
				`
			}
		}
	}
}

export const MultipleMonths: Story = {
	name: 'Multiple months',
	render: () => {
		const [range, setRange] = useState<DateRange | undefined>()

		return <Calendar mode='range' selected={range} onSelect={setRange} numberOfMonths={2} />
	},
	parameters: {
		docs: {
			description: {
				story: 'Use `numberOfMonths` to display multiple months side by side — useful for range selection.'
			},
			source: {
				code: `
					import { useState } from 'react'
					import type { DateRange } from 'react-day-picker'
					import { Calendar } from '@naiton/ui-kit'

					const [range, setRange] = useState<DateRange | undefined>()

					<Calendar mode="range" selected={range} onSelect={setRange} numberOfMonths={2} />
				`
			}
		}
	}
}

export const Dropdown: Story = {
	render: () => {
		const [date, setDate] = useState<Date | undefined>(new Date())

		return (
			<Calendar
				mode='single'
				selected={date}
				onSelect={setDate}
				captionLayout='dropdown'
				startMonth={new Date(2020, 0)}
				endMonth={new Date(2030, 11)}
			/>
		)
	},
	parameters: {
		docs: {
			description: {
				story:
					'Use `captionLayout="dropdown"` to show month and year selectors for quick navigation. Provide `startMonth` and `endMonth` to bound the dropdown range.'
			},
			source: {
				code: `
					import { useState } from 'react'
					import { Calendar } from '@naiton/ui-kit'

					const [date, setDate] = useState<Date | undefined>(new Date())

					<Calendar
						mode="single"
						selected={date}
						onSelect={setDate}
						captionLayout="dropdown"
						startMonth={new Date(2020, 0)}
						endMonth={new Date(2030, 11)}
					/>
				`
			}
		}
	}
}

export const WeekNumbers: Story = {
	name: 'Week numbers',
	render: () => {
		const [date, setDate] = useState<Date | undefined>(new Date())

		return <Calendar mode='single' selected={date} onSelect={setDate} showWeekNumber />
	},
	parameters: {
		docs: {
			description: {
				story: 'Use `showWeekNumber` to display ISO week numbers in the leftmost column of the calendar.'
			},
			source: {
				code: `
					import { useState } from 'react'
					import { Calendar } from '@naiton/ui-kit'

					const [date, setDate] = useState<Date | undefined>(new Date())

					<Calendar mode="single" selected={date} onSelect={setDate} showWeekNumber />
				`
			}
		}
	}
}

export const DisabledDates: Story = {
	name: 'Disabled dates',
	render: () => {
		const [date, setDate] = useState<Date | undefined>()
		const today = new Date()
		const yesterday = new Date(today)
		yesterday.setDate(today.getDate() - 1)

		return <Calendar mode='single' selected={date} onSelect={setDate} disabled={{ before: today }} />
	},
	parameters: {
		docs: {
			description: {
				story:
					'Use the `disabled` prop with a matcher object to prevent selecting certain dates — for example, all dates before today.'
			},
			source: {
				code: `
					import { useState } from 'react'
					import { Calendar } from '@naiton/ui-kit'

					const [date, setDate] = useState<Date | undefined>()

					<Calendar
						mode="single"
						selected={date}
						onSelect={setDate}
						disabled={{ before: new Date() }}
					/>
				`
			}
		}
	}
}
