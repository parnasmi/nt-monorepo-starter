import type { Meta, StoryObj } from '@storybook/react-vite'
import { Field, FieldContent, FieldDescription, FieldLabel } from '../field'
import { Checkbox } from './checkbox.tsx'

const meta = {
	title: 'UI/Checkbox',
	component: Checkbox,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'A control that allows the user to toggle between checked and not checked.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		checked: {
			description: 'Controlled checked state',
			control: 'boolean',
			table: {
				type: { summary: 'boolean | "indeterminate"' },
				defaultValue: { summary: 'undefined' }
			}
		},
		onCheckedChange: {
			description: 'Callback fired when the checkbox value changes.',
			action: 'changed',
			table: {
				type: { summary: '(checked: boolean | "indeterminate") => void' }
			}
		},
		defaultChecked: {
			description: 'Initial checked state (uncontrolled)',
			control: 'boolean',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' }
			}
		},
		disabled: {
			description: 'Disable the checkbox',
			control: 'boolean',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' }
			}
		}
	}
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

/**
 * ```tsx
 * import { Checkbox } from '@naiton/ui-kit'
 *
 * <Checkbox defaultChecked />
 * ```
 */
export const Base: Story = {
	name: 'Usage',
	args: {
		defaultChecked: true
	},
	parameters: {
		docs: {
			source: {
				code: `
					import { Checkbox } from '@naiton/ui-kit'

					<Checkbox defaultChecked />
				`
			}
		}
	}
}

export const BasicCheckbox: Story = {
	name: 'Basic',
	render: () => (
		<Field orientation='horizontal'>
			<Checkbox id='checkbox-1' name='checkbox-1' />
			<FieldLabel htmlFor='checkbox-1'>Accept terms and conditions</FieldLabel>
		</Field>
	),
	parameters: {
		docs: {
			description: {
				story: 'Pair the checkbox with `Field` and `FieldLabel` for proper layout and labeling.'
			},
			source: {
				code: `
					import { Field, FieldLabel, Checkbox } from '@naiton/ui-kit'

					<Field orientation='horizontal'>
						<Checkbox id='checkbox-1' name='checkbox-1' />
						<FieldLabel htmlFor='checkbox-1'>Accept terms and conditions</FieldLabel>
					</Field>
				`
			}
		}
	}
}

export const DescriptionCheckbox: Story = {
	name: 'Description',
	render: () => (
		<Field orientation='horizontal'>
			<Checkbox id='checkbox-2' name='checkbox-2' defaultChecked />
			<FieldContent>
				<FieldLabel htmlFor='checkbox-2'>Accept terms and conditions</FieldLabel>
				<FieldDescription>By clicking this checkbox, you agree to the terms and conditions.</FieldDescription>
			</FieldContent>
		</Field>
	),
	parameters: {
		docs: {
			description: {
				story: 'Use `FieldContent` and `FieldDescription` for helper text.'
			},
			source: {
				code: `
					import { Field, FieldContent, FieldDescription, FieldLabel, Checkbox } from '@naiton/ui-kit'

					<Field orientation='horizontal'>
						<Checkbox id='checkbox-2' name='checkbox-2' defaultChecked />
						<FieldContent>
							<FieldLabel htmlFor='checkbox-2'>Accept terms and conditions</FieldLabel>
							<FieldDescription>
								By clicking this checkbox, you agree to the terms and conditions.
							</FieldDescription>
						</FieldContent>
					</Field>
				`
			}
		}
	}
}

export const DisabledCheckbox: Story = {
	name: 'Disabled',
	render: () => (
		<Field orientation='horizontal' data-disabled>
			<Checkbox id='checkbox-3' name='checkbox-3' disabled />
			<FieldLabel htmlFor='checkbox-3'>Enable notifications</FieldLabel>
		</Field>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Use the `disabled` prop to prevent interaction and add the `data-disabled` attribute to the `<Field>` component for disabled styles.'
			},
			source: {
				code: `
					import { Field, FieldLabel, Checkbox } from '@naiton/ui-kit'

					<Field orientation='horizontal' data-disabled>
						<Checkbox id='checkbox-3' name='checkbox-3' disabled />
						<FieldLabel htmlFor='checkbox-3'>Enable notifications</FieldLabel>
					</Field>
				`
			}
		}
	}
}

export const InvalidCheckbox: Story = {
	name: 'Invalid',
	render: () => (
		<Field orientation='horizontal' data-invalid>
			<Checkbox id='checkbox-4' name='checkbox-4' aria-invalid />
			<FieldLabel htmlFor='checkbox-4'>Accept terms and conditions</FieldLabel>
		</Field>
	),
	parameters: {
		docs: {
			description: {
				story: 'Set `aria-invalid` on the checkbox and `data-invalid` on the field wrapper to show the invalid styles.'
			},
			source: {
				code: `
					import { Field, FieldLabel, Checkbox } from '@naiton/ui-kit'

					<Field orientation='horizontal' data-invalid>
						<Checkbox id='checkbox-4' name='checkbox-4' aria-invalid />
						<FieldLabel htmlFor='checkbox-4'>Accept terms and conditions</FieldLabel>
					</Field>
				`
			}
		}
	}
}
