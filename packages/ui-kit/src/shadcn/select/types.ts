import * as SelectPrimitive from '@radix-ui/react-select'
import type { ComponentProps, ComponentPropsWithoutRef } from 'react'

export type SelectProps = ComponentProps<typeof SelectPrimitive.Root>

export type SelectGroupProps = ComponentProps<typeof SelectPrimitive.Group>

export type SelectValueProps = ComponentProps<typeof SelectPrimitive.Value>

export type SelectTriggerProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>

export type SelectScrollUpButtonProps = ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>

export type SelectScrollDownButtonProps = ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>

export type SelectContentProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Content>

export type SelectLabelProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Label>

export type SelectItemProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Item>

export type SelectSeparatorProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
