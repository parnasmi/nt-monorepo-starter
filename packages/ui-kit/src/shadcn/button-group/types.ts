import type { VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { Separator } from '../separator'
import { buttonGroupVariants } from './button-group.tsx'

export type ButtonGroupProps = ComponentProps<'div'> & VariantProps<typeof buttonGroupVariants>

export type ButtonGroupTextProps = ComponentProps<'div'> & {
	asChild?: boolean
}

export type ButtonGroupSeparatorProps = ComponentProps<typeof Separator>
