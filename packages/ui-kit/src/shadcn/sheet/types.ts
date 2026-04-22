import * as SheetPrimitive from '@radix-ui/react-dialog'
import type { VariantProps } from 'class-variance-authority'
import type { ComponentProps, ComponentPropsWithoutRef, HTMLAttributes } from 'react'
import { SHEET_SIZES } from './constants.ts'
import { sheetVariants } from './sheet.tsx'

export type SheetSize = (typeof SHEET_SIZES)[number]

export type SheetProps = ComponentProps<typeof SheetPrimitive.Root>

export type SheetTriggerProps = ComponentProps<typeof SheetPrimitive.Trigger>

export type SheetCloseProps = ComponentProps<typeof SheetPrimitive.Close>

export type SheetPortalProps = ComponentProps<typeof SheetPrimitive.Portal>

export type SheetOverlayProps = ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>

export type SheetContentProps = ComponentPropsWithoutRef<typeof SheetPrimitive.Content> &
	VariantProps<typeof sheetVariants> & {
		sizes?: SheetSize[]
	}

export type SheetHeaderProps = HTMLAttributes<HTMLDivElement>

export type SheetFooterProps = HTMLAttributes<HTMLDivElement>

export type SheetTitleProps = ComponentPropsWithoutRef<typeof SheetPrimitive.Title>

export type SheetDescriptionProps = ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
