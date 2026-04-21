import * as LabelPrimitive from '@radix-ui/react-label'
import { cva } from 'class-variance-authority'
import { type ElementRef, forwardRef } from 'react'
import { cn } from '../../lib/utils.ts'
import type { LabelProps } from './types.ts'

export const labelVariants = cva('text-ssm peer-disabled:cursor-not-allowed peer-disabled:opacity-70')

export const Label = forwardRef<ElementRef<typeof LabelPrimitive.Root>, LabelProps>(({ className, ...props }, ref) => (
	<LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
))

Label.displayName = LabelPrimitive.Root.displayName
