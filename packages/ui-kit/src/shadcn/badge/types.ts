import type { VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'react'
import { badgeVariants } from './badge'

export type BadgeProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>
