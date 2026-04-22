import * as DialogPrimitive from '@radix-ui/react-dialog'
import type { ComponentProps, ComponentPropsWithoutRef, HTMLAttributes } from 'react'

export type DialogProps = ComponentProps<typeof DialogPrimitive.Root>

export type DialogTriggerProps = ComponentProps<typeof DialogPrimitive.Trigger>

export type DialogPortalProps = ComponentProps<typeof DialogPrimitive.Portal>

export type DialogCloseProps = ComponentProps<typeof DialogPrimitive.Close>

export type DialogOverlayProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>

export type DialogContentProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export type DialogHeaderProps = HTMLAttributes<HTMLDivElement>

export type DialogFooterProps = HTMLAttributes<HTMLDivElement>

export type DialogTitleProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Title>

export type DialogDescriptionProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
