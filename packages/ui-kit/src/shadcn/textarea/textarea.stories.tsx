import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../button'
import { Field, FieldDescription, FieldLabel } from '../field'
import { Textarea } from './textarea.tsx'

const meta = {
	title: 'UI/Textarea',
	component: Textarea,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'Displays a form textarea or a component that looks like a textarea.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		placeholder: {
			description: 'Placeholder text shown when the textarea is empty',
			control: 'text',
			table: {
				type: { summary: 'string' }
			}
		},
		disabled: {
			description: 'Disables the textarea',
			control: 'boolean',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' }
			}
		},
		'aria-invalid': {
			description: 'Indicates that the textarea has an error',
			control: 'boolean',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' }
			}
		},
		rows: {
			description: 'Number of visible text lines',
			control: 'number',
			table: {
				type: { summary: 'number' }
			}
		},
		onChange: {
			description: 'Callback fired when the value changes.',
			action: 'changed',
			table: { type: { summary: '(event: React.ChangeEvent<HTMLTextAreaElement>) => void' } }
		}
	}
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

/**
 * ```tsx
 * import { Textarea } from '@naiton/ui-kit'
 *
 * <Textarea placeholder="Type your message here." />
 * ```
 */
export const Base: Story = {
	name: 'Usage',
	args: {
		placeholder: 'Type your message here.'
	},
	parameters: {
		docs: {
			source: {
				code: `
					import { Textarea } from '@naiton/ui-kit'

					<Textarea placeholder="Type your message here." />
				`
			}
		}
	}
}

export const FieldTextarea: Story = {
	name: 'Field',
	render: () => (
		<Field>
			<FieldLabel htmlFor='textarea-1'>Your message</FieldLabel>
			<Textarea id='textarea-1' placeholder='Type your message here.' />
			<FieldDescription>Your message will be copied to the support team.</FieldDescription>
		</Field>
	),
	parameters: {
		docs: {
			description: {
				story: 'Use `Field`, `FieldLabel`, and `FieldDescription` to create a textarea with a label and description.'
			},
			source: {
				code: `
					import { Field, FieldDescription, FieldLabel, Textarea } from '@naiton/ui-kit'

					<Field>
						<FieldLabel htmlFor='textarea-1'>Your message</FieldLabel>
						<Textarea id='textarea-1' placeholder='Type your message here.' />
						<FieldDescription>Your message will be copied to the support team.</FieldDescription>
					</Field>
				`
			}
		}
	}
}

export const DisabledTextarea: Story = {
	name: 'Disabled',
	render: () => (
		<Field data-disabled>
			<FieldLabel htmlFor='textarea-2'>Your message</FieldLabel>
			<Textarea id='textarea-2' placeholder='Type your message here.' disabled />
			<FieldDescription>Your message will be copied to the support team.</FieldDescription>
		</Field>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Use the `disabled` prop to disable the textarea. To style the disabled state, add the `data-disabled` attribute to the `Field` component.'
			},
			source: {
				code: `
					import { Field, FieldDescription, FieldLabel, Textarea } from '@naiton/ui-kit'

					<Field data-disabled>
						<FieldLabel htmlFor='textarea-2'>Your message</FieldLabel>
						<Textarea id='textarea-2' placeholder='Type your message here.' disabled />
						<FieldDescription>Your message will be copied to the support team.</FieldDescription>
					</Field>
				`
			}
		}
	}
}

export const InvalidTextarea: Story = {
	name: 'Invalid',
	render: () => (
		<Field data-invalid>
			<FieldLabel htmlFor='textarea-3'>Your message</FieldLabel>
			<Textarea id='textarea-3' placeholder='Type your message here.' aria-invalid />
			<FieldDescription className='text-red-500'>Your message must be at least 10 characters.</FieldDescription>
		</Field>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Use the `aria-invalid` prop to mark the textarea as invalid. To style the invalid state, add the `data-invalid` attribute to the `Field` component.'
			},
			source: {
				code: `
					import { Field, FieldDescription, FieldLabel, Textarea } from '@naiton/ui-kit'

					<Field data-invalid>
						<FieldLabel htmlFor='textarea-3'>Your message</FieldLabel>
						<Textarea id='textarea-3' placeholder='Type your message here.' aria-invalid />
						<FieldDescription className='text-red-500'>
							Your message must be at least 10 characters.
						</FieldDescription>
					</Field>
				`
			}
		}
	}
}

export const WithButtonTextarea: Story = {
	name: 'With Button',
	render: () => (
		<div className='flex w-80 flex-col gap-2'>
			<Textarea placeholder='Type your message here.' />
			<Button>Send message</Button>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Pair with a `Button` to create a textarea with a submit action.'
			},
			source: {
				code: `
					import { Button, Textarea } from '@naiton/ui-kit'

					<div className='flex flex-col gap-2'>
						<Textarea placeholder='Type your message here.' />
						<Button>Send message</Button>
					</div>
				`
			}
		}
	}
}
