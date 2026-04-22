import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import type { ComponentProps, ComponentPropsWithoutRef, HTMLAttributes } from 'react'

export type DropdownMenuProps = ComponentProps<typeof DropdownMenuPrimitive.Root>

export type DropdownMenuTriggerProps = ComponentProps<typeof DropdownMenuPrimitive.Trigger>

export type DropdownMenuGroupProps = ComponentProps<typeof DropdownMenuPrimitive.Group>

export type DropdownMenuPortalProps = ComponentProps<typeof DropdownMenuPrimitive.Portal>

export type DropdownMenuSubProps = ComponentProps<typeof DropdownMenuPrimitive.Sub>

export type DropdownMenuRadioGroupProps = ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>

export type DropdownMenuSubTriggerProps = ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
	inset?: boolean
}

export type DropdownMenuSubContentProps = ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>

export type DropdownMenuContentProps = ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>

export type DropdownMenuItemProps = ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
	inset?: boolean
}

export type DropdownMenuCheckboxItemProps = ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>

export type DropdownMenuRadioItemProps = ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>

export type DropdownMenuLabelProps = ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
	inset?: boolean
}

export type DropdownMenuSeparatorProps = ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>

export type DropdownMenuShortcutProps = HTMLAttributes<HTMLSpanElement>
