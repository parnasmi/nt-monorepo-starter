import type { ComponentProps } from 'react'
import { DayButton, DayPicker } from 'react-day-picker'
import { Button } from '@/components/ui/button'

export type CalendarProps = ComponentProps<typeof DayPicker> & {
	buttonVariant?: ComponentProps<typeof Button>['variant']
}

export type CalendarDayButtonProps = ComponentProps<typeof DayButton>
