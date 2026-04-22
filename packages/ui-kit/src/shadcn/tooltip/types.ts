import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import type { ComponentProps, ComponentPropsWithoutRef } from 'react'

export type TooltipProps = ComponentProps<typeof TooltipPrimitive.Root>

export type TooltipTriggerProps = ComponentProps<typeof TooltipPrimitive.Trigger>

export type TooltipContentProps = ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
