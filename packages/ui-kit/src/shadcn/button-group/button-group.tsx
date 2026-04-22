import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils.ts'
import { Separator } from '../separator'
import type { ButtonGroupProps, ButtonGroupSeparatorProps, ButtonGroupTextProps } from './types.ts'

const buttonGroupVariants = cva(
	"flex w-fit items-stretch has-[>[data-slot=button-group]]:gap-2 [&>*]:focus-visible:relative [&>*]:focus-visible:z-10 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
	{
		variants: {
			orientation: {
				horizontal:
					'[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none',
				vertical:
					'flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none'
			}
		},
		defaultVariants: {
			orientation: 'horizontal'
		}
	}
)

const ButtonGroup = ({ className, orientation, ...props }: ButtonGroupProps) => {
	return (
		<div
			role='group'
			data-slot='button-group'
			data-orientation={orientation}
			className={cn(buttonGroupVariants({ orientation }), className)}
			{...props}
		/>
	)
}

const ButtonGroupText = ({ className, asChild = false, ...props }: ButtonGroupTextProps) => {
	const Comp = asChild ? Slot : 'div'

	return (
		<Comp
			className={cn(
				"flex items-center gap-2 rounded-md border bg-gray-50 px-4 text-sm font-medium [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
				className
			)}
			{...props}
		/>
	)
}

const ButtonGroupSeparator = ({ className, orientation = 'vertical', ...props }: ButtonGroupSeparatorProps) => {
	return (
		<Separator
			data-slot='button-group-separator'
			orientation={orientation}
			className={cn('relative m-0! self-stretch bg-gray-200 data-[orientation=vertical]:h-auto', className)}
			{...props}
		/>
	)
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants }
