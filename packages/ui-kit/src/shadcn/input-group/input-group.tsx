import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils.ts'
import { Button } from '../button'
import { Input } from '../input'
import { Textarea } from '../textarea'
import type {
	InputGroupAddonProps,
	InputGroupButtonProps,
	InputGroupInputProps,
	InputGroupProps,
	InputGroupTextareaProps,
	InputGroupTextProps
} from './types.ts'

const InputGroup = ({ className, ...props }: InputGroupProps) => {
	return (
		<div
			data-slot='input-group'
			role='group'
			className={cn(
				'group/input-group relative flex w-full items-center rounded border border-gray-200 transition-colors outline-none',
				'has-[>textarea]:h-auto',

				// Variants based on alignment.
				'has-[>[data-align=inline-start]]:[&>input]:pl-2',
				'has-[>[data-align=inline-end]]:[&>input]:pr-2',
				'has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3',
				'has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3',

				// Focus state.
				'has-[[data-slot=input-group-control]:focus-visible]:border-b-success-600',

				// Error state.
				'has-[[data-slot][aria-invalid=true]]:border-error-500',

				className
			)}
			{...props}
		/>
	)
}

export const inputGroupAddonVariants = cva(
	"flex h-full cursor-text select-none items-center justify-center gap-2 text-sm font-medium group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[5px] [&>svg:not([class*='size-'])]:size-4",
	{
		variants: {
			align: {
				'inline-start': 'order-first pl-3',
				'inline-end': 'order-last pr-3',
				'block-start':
					'[.border-b]:pb-3 order-first w-full justify-start px-3 pt-3 group-has-[>input]/input-group:pt-2.5',
				'block-end': '[.border-t]:pt-3 order-last w-full justify-start px-3 pb-3 group-has-[>input]/input-group:pb-2.5'
			}
		},
		defaultVariants: {
			align: 'inline-start'
		}
	}
)

const InputGroupAddon = ({ className, align = 'inline-start', ...props }: InputGroupAddonProps) => {
	return (
		<div
			role='group'
			data-slot='input-group-addon'
			data-align={align}
			className={cn(inputGroupAddonVariants({ align }), className)}
			onClick={(e) => {
				if ((e.target as HTMLElement).closest('button')) {
					return
				}
				e.currentTarget.parentElement?.querySelector('input')?.focus()
			}}
			{...props}
		/>
	)
}

export const inputGroupButtonVariants = cva(
	'flex items-center gap-2 text-ssm text-gray-400 hover:text-success-600 transition-colors shadow-none p-0 hover:bg-transparent hover:border-transparent hover:opacity-70 transition-opacity',
	{
		variants: {
			size: {
				xs: 'gap-1 rounded-[5px]',
				sm: 'gap-1.5 rounded-md',
				'icon-xs': 'rounded-[5px]',
				'icon-sm': ''
			}
		},
		defaultVariants: {
			size: 'xs'
		}
	}
)

const InputGroupButton = ({
	className,
	type = 'button',
	variant = 'ghost',
	size = 'xs',
	...props
}: InputGroupButtonProps) => {
	return (
		<Button
			type={type}
			data-size={size}
			variant={variant}
			className={cn(inputGroupButtonVariants({ size }), className)}
			{...props}
		/>
	)
}

const InputGroupText = ({ className, ...props }: InputGroupTextProps) => {
	return (
		<span
			className={cn(
				"flex items-center gap-2 text-sm text-gray-500 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
				className
			)}
			{...props}
		/>
	)
}

const InputGroupInput = ({ className, readOnly, ...props }: InputGroupInputProps) => {
	return (
		<Input
			data-slot='input-group-control'
			readOnly={readOnly}
			className={cn(
				'flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent',
				{
					'text-gray-500': readOnly
				},
				className
			)}
			{...props}
		/>
	)
}

const InputGroupTextarea = ({ className, ...props }: InputGroupTextareaProps) => {
	return (
		<Textarea
			data-slot='input-group-control'
			className={cn(
				'flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 dark:bg-transparent',
				className
			)}
			{...props}
		/>
	)
}

export { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea }
