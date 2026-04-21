import * as ContextMenuPrimitive from '@radix-ui/react-context-menu'
import type { ComponentProps, ComponentPropsWithoutRef } from 'react'

export type ContextMenuProps = ComponentProps<typeof ContextMenuPrimitive.Root>

export type ContextMenuTriggerProps = ComponentProps<typeof ContextMenuPrimitive.Trigger>

export type ContextMenuGroupProps = ComponentProps<typeof ContextMenuPrimitive.Group>

export type ContextMenuPortalProps = ComponentProps<typeof ContextMenuPrimitive.Portal>

export type ContextMenuSubProps = ComponentProps<typeof ContextMenuPrimitive.Sub>

export type ContextMenuRadioGroupProps = ComponentProps<typeof ContextMenuPrimitive.RadioGroup>

export type ContextMenuSubTriggerProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
	inset?: boolean
}

export type ContextMenuSubContentProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>

export type ContextMenuContentProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>

export type ContextMenuItemProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
	inset?: boolean
}

export type ContextMenuCheckboxItemProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>

export type ContextMenuRadioItemProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>

export type ContextMenuLabelProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
	inset?: boolean
}

export type ContextMenuSeparatorProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
