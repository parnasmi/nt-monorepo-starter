import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { type ElementRef, forwardRef } from 'react'
import { cn } from '../../lib/utils.ts'
import type { RadioGroupItemProps, RadioGroupProps } from './types.ts'

const RadioGroup = forwardRef<ElementRef<typeof RadioGroupPrimitive.Root>, RadioGroupProps>(
	({ className, ...props }, ref) => {
		return <RadioGroupPrimitive.Root className={cn('grid gap-2', className)} {...props} ref={ref} />
	}
)
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = forwardRef<ElementRef<typeof RadioGroupPrimitive.Item>, RadioGroupItemProps>(
	({ className, ...props }, ref) => {
		return (
			<RadioGroupPrimitive.Item
				ref={ref}
				className={cn(
					'text-success-600 aspect-square size-4 rounded-full border-2 border-gray-500 transition-[border] duration-75 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-5',
					className
				)}
				{...props}
			/>
		)
	}
)
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
