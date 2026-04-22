import { CheckmarkFilled } from '@fluentui/react-icons'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { type ElementRef, forwardRef } from 'react'
import { cn } from '../../lib/utils.ts'
import type { CheckboxProps } from './types.ts'

export const Checkbox = forwardRef<ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
	({ className, ...props }, ref) => (
		<CheckboxPrimitive.Root
			ref={ref}
			className={cn(
				'data-[state=unchecked]:aria-invalid:border-error-500 peer grid size-4! shrink-0 place-content-center rounded border-2 border-gray-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-gray-500 data-[state=checked]:text-white',
				className
			)}
			{...props}
		>
			<CheckboxPrimitive.Indicator className={cn('grid place-content-center text-current')}>
				<CheckmarkFilled fontSize={12} />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	)
)

Checkbox.displayName = CheckboxPrimitive.Root.displayName
