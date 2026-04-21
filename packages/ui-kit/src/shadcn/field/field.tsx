import { cva } from 'class-variance-authority'
import { useMemo } from 'react'
import { cn } from '../../lib/utils.ts'
import { Label } from '../label'
import { Separator } from '../separator'
import type {
	FieldContentProps,
	FieldDescriptionProps,
	FieldErrorProps,
	FieldGroupProps,
	FieldLabelProps,
	FieldLegendProps,
	FieldProps,
	FieldSeparatorProps,
	FieldSetProps,
	FieldTitleProps
} from './types.ts'

const FieldSet = ({ className, ...props }: FieldSetProps) => {
	return (
		<fieldset
			data-slot='field-set'
			className={cn(
				'flex flex-col gap-6',
				'has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3',
				className
			)}
			{...props}
		/>
	)
}

const FieldLegend = ({ className, variant = 'legend', ...props }: FieldLegendProps) => {
	return (
		<legend
			data-slot='field-legend'
			data-variant={variant}
			className={cn('mb-3 font-medium', 'data-[variant=legend]:text-base', 'data-[variant=label]:text-ssm', className)}
			{...props}
		/>
	)
}

const FieldGroup = ({ className, ...props }: FieldGroupProps) => {
	return (
		<div
			data-slot='field-group'
			className={cn(
				'group/field-group flex w-full flex-col gap-4 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4',
				className
			)}
			{...props}
		/>
	)
}

export const fieldVariants = cva('group/field data-[invalid=true]:text-error-500 flex gap-2', {
	variants: {
		orientation: {
			vertical: ['flex-col [&>*]:w-full [&>.sr-only]:w-auto'],
			horizontal: [
				'flex-row items-center',
				'[&>[data-slot=field-label]]:flex-auto',
				'has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px has-[>[data-slot=field-content]]:items-start'
			],
			responsive: [
				'@md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto flex-col [&>*]:w-full [&>.sr-only]:w-auto',
				'@md/field-group:[&>[data-slot=field-label]]:flex-auto',
				'@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px'
			]
		}
	},
	defaultVariants: {
		orientation: 'vertical'
	}
})

const Field = ({ className, orientation = 'vertical', ...props }: FieldProps) => {
	return (
		<div
			role='group'
			data-slot='field'
			data-orientation={orientation}
			className={cn(fieldVariants({ orientation }), className)}
			{...props}
		/>
	)
}

const FieldContent = ({ className, ...props }: FieldContentProps) => {
	return (
		<div
			data-slot='field-content'
			className={cn('group/field-content flex flex-1 flex-col gap-1.5 leading-snug', className)}
			{...props}
		/>
	)
}

const FieldLabel = ({ className, ...props }: FieldLabelProps) => {
	return (
		<Label
			data-slot='field-label'
			className={cn(
				'group/field-label peer/field-label flex w-fit gap-2 group-data-[disabled=true]/field:opacity-50',
				'has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-sm has-[>[data-slot=field]]:border has-[>[data-slot=field]]:border-gray-100 has-[>[data-slot=field]]:transition-colors has-[>[data-slot=field]]:hover:bg-gray-200 *:data-[slot=field]:px-3 *:data-[slot=field]:py-2',
				'has-data-[state=checked]:border-gray-200 has-data-[state=checked]:bg-gray-100',
				className
			)}
			{...props}
		/>
	)
}

const FieldTitle = ({ className, ...props }: FieldTitleProps) => {
	return (
		<div
			data-slot='field-label'
			className={cn(
				'flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50',
				className
			)}
			{...props}
		/>
	)
}

const FieldDescription = ({ className, ...props }: FieldDescriptionProps) => {
	return (
		<p
			data-slot='field-description'
			className={cn(
				'text-xs leading-normal font-normal text-gray-500 group-has-data-[orientation=horizontal]/field:text-balance',
				'last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5',
				'[&>a:hover]:text-success-600 [&>a]:underline [&>a]:underline-offset-4',
				className
			)}
			{...props}
		/>
	)
}

const FieldSeparator = ({ children, className, ...props }: FieldSeparatorProps) => {
	return (
		<div
			data-slot='field-separator'
			data-content={!!children}
			className={cn('relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2', className)}
			{...props}
		>
			<Separator className='absolute inset-0 top-1/2' />
			{children && (
				<span className='relative mx-auto block w-fit bg-white px-2 text-gray-500' data-slot='field-separator-content'>
					{children}
				</span>
			)}
		</div>
	)
}

const FieldError = ({ className, children, errors, ...props }: FieldErrorProps) => {
	const content = useMemo(() => {
		if (children) {
			return children
		}

		if (!errors) {
			return null
		}

		if (errors?.length === 1 && errors[0]?.message) {
			return errors[0].message
		}

		return (
			<ul className='ml-4 flex list-disc flex-col gap-1'>
				{errors.map((error, index) => error?.message && <li key={index}>{error.message}</li>)}
			</ul>
		)
	}, [children, errors])

	if (!content) {
		return null
	}

	return (
		<div
			role='alert'
			data-slot='field-error'
			className={cn('text-error-500 text-sm font-normal', className)}
			{...props}
		>
			{content}
		</div>
	)
}

export {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSeparator,
	FieldSet,
	FieldTitle
}
