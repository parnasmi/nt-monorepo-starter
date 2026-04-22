import { SearchRegular } from '@fluentui/react-icons'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Field, FieldDescription, FieldLabel } from '../field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../input-group'
import { Input } from './input.tsx'

const types = ['text', 'email', 'password', 'number', 'search', 'tel', 'url'] as const

const meta = {
	title: 'UI/Input',
	component: Input,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A text input component for forms and user data entry with built-in styling and accessibility features.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		type: {
			description: 'Input field type',
			control: 'select',
			options: types,
			table: {
				type: { summary: types.join(' | ') },
				defaultValue: { summary: 'text' }
			}
		},
		placeholder: {
			description: 'Placeholder text',
			control: 'text',
			table: {
				type: { summary: 'string' }
			}
		},
		disabled: {
			control: 'boolean',
			description: 'Disable the input field',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' }
			}
		},
		'aria-invalid': {
			control: 'boolean',
			description: 'Indicates that the input field has an error',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' }
			}
		}
	}
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

/**
 * ```tsx
 * import { Input } from '@naiton/ui-kit'
 *
 * <Input type="text" placeholder="Введите текст..." />
 * ```
 */
export const Base: Story = {
	name: 'Usage',
	args: {
		type: 'text',
		placeholder: 'Enter text...'
	},
	parameters: {
		docs: {
			source: {
				code: `
					import { Input } from '@naiton/ui-kit'

					<Input type='text' placeholder='Введите текст...' />
				`
			}
		}
	}
}

export const FieldInput: Story = {
	name: 'Field',
	render: () => (
		<Field>
			<FieldLabel htmlFor='field-1'>Name</FieldLabel>
			<Input id='field-1' type='text' placeholder='Enter name' />
			<FieldDescription>Description text of name</FieldDescription>
		</Field>
	),
	parameters: {
		docs: {
			description: {
				story: 'Use `Field`, `FieldLabel`, and `FieldDescription` to create an input with a label and description.'
			},
			source: {
				code: `
					import { Field, FieldDescription, FieldLabel, Input } from '@naiton/ui-kit'

					<Field>
						<FieldLabel htmlFor='field-1'>Name</FieldLabel>
						<Input id='field-1' type='text' placeholder='Enter name' />
						<FieldDescription>Description text of name</FieldDescription>
					</Field>
				`
			}
		}
	}
}

export const FieldGroupInput: Story = {
	name: 'Field Group',
	render: () => (
		<Field>
			<InputGroup>
				<InputGroupAddon align='inline-start'>
					<SearchRegular fontSize={16} />
				</InputGroupAddon>
				<InputGroupInput placeholder='Search' />
			</InputGroup>
		</Field>
	),
	parameters: {
		docs: {
			description: {
				story: 'Use `FieldGroup` to show multiple Field blocks and to build forms.'
			},
			source: {
				code: `
					import { SearchRegular } from '@fluentui/react-icons'
					import { Field, InputGroup,InputGroupAddon, InputGroupInput } from '@naiton/ui-kit'

					<Field>
						<InputGroup>
							<InputGroupAddon align='inline-start'>
								<SearchRegular fontSize={16} />
							</InputGroupAddon>
							<InputGroupInput placeholder='Search' />
						</InputGroup>
					</Field>
				`
			}
		}
	}
}

export const DisabledInput: Story = {
	name: 'Disabled',
	render: () => (
		<Field aria-disabled>
			<FieldLabel htmlFor='field-2'>Name</FieldLabel>
			<Input id='field-2' type='text' placeholder='Enter name' disabled />
			<FieldDescription>Description text of name</FieldDescription>
		</Field>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Use the `disabled` prop to disable the input. To style the disabled state, add the `data-disabled` attribute to the `Field` component.'
			},
			source: {
				code: `
					import { Field, FieldDescription, FieldLabel, Input } from '@naiton/ui-kit'

					<Field aria-disabled>
						<FieldLabel htmlFor='field-2'>Name</FieldLabel>
						<Input id='field-2' type='text' placeholder='Enter name' disabled />
						<FieldDescription>Description text of name</FieldDescription>
					</Field>
				`
			}
		}
	}
}

export const InvalidInput: Story = {
	name: 'Invalid',
	render: () => (
		<Field data-invalid>
			<FieldLabel htmlFor='field-3'>Name</FieldLabel>
			<Input id='field-3' type='text' placeholder='Enter name' aria-invalid />
			<FieldDescription className='text-red-500'>Error text of name</FieldDescription>
		</Field>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Use the `aria-invalid` prop to mark the input as invalid. To style the invalid state, add the `data-invalid` attribute to the `Field` component.'
			},
			source: {
				code: `
					import { Field, FieldDescription, FieldLabel, Input } from '@naiton/ui-kit'

					<Field data-invalid>
						<FieldLabel htmlFor='field-3'>Name</FieldLabel>
						<Input id='field-3' type='text' placeholder='Enter name' aria-invalid />
						<FieldDescription className='text-red-500'>Error text of name</FieldDescription>
					</Field>
				`
			}
		}
	}
}

export const RequiredInput: Story = {
	name: 'Required',
	render: () => (
		<Field>
			<FieldLabel htmlFor='field-4'>
				Name <span className='text-error-500'>*</span>
			</FieldLabel>
			<Input id='field-4' type='text' placeholder='Enter name' />
			<FieldDescription>Description text of name</FieldDescription>
		</Field>
	),
	parameters: {
		docs: {
			description: {
				story: 'Use the `required` attribute to indicate required inputs.'
			},
			source: {
				code: `
					import { Field, FieldDescription, FieldLabel, Input } from '@naiton/ui-kit'

					<Field>
						<FieldLabel htmlFor='field-1'>
							Name <span className='text-error-500'>*</span>
						</FieldLabel>
						<Input id='field-1' type='text' placeholder='Enter name' />
						<FieldDescription>Description text of name</FieldDescription>
					</Field>
				`
			}
		}
	}
}
