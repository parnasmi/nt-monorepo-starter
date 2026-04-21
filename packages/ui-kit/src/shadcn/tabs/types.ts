import * as TabsPrimitive from '@radix-ui/react-tabs'
import type { ComponentProps, ComponentPropsWithoutRef } from 'react'

export type TabsProps = ComponentProps<typeof TabsPrimitive.Root>

export type TabsListProps = ComponentPropsWithoutRef<typeof TabsPrimitive.List>

export type TabsTriggerProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>

export type TabsContentProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
