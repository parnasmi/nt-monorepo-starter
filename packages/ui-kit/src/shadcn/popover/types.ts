import * as PopoverPrimitive from '@radix-ui/react-popover'
import type { ComponentProps, ComponentPropsWithoutRef } from 'react'

export type PopoverProps = ComponentProps<typeof PopoverPrimitive.Root> & {
	backdrop?: boolean
}

export type PopoverTriggerProps = ComponentProps<typeof PopoverPrimitive.Trigger>

export type PopoverContentProps = ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
