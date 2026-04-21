import * as LabelPrimitive from '@radix-ui/react-label'
import type { VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithoutRef } from 'react'
import { labelVariants } from './label.tsx'

export type LabelProps = ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
