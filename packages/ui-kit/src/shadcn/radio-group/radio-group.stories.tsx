import type { Meta, StoryObj } from '@storybook/react-vite'
import { Field, FieldContent, FieldDescription, FieldLabel } from '../field'
import { RadioGroup, RadioGroupItem } from './radio-group.tsx'

const meta = {
	title: 'UI/RadioGroup',
	component: RadioGroup,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		defaultValue: {
			description: 'Initial selected value (uncontrolled)',
			control: 'text',
			table: {
				type: { summary: 'string' }
			}
		},
		value: {
			description: 'Controlled selected value',
			control: 'text',
			table: {
				type: { summary: 'string' }
			}
		},
		onValueChange: {
			description: 'Callback fired when the selected value changes.',
			action: 'changed',
			table: {
				type: { summary: '(value: string) => void' }
			}
		},
		disabled: {
			description: 'Disable all radio items in the group',
			control: 'boolean',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' }
			}
		},
		orientation: {
			description: 'Layout orientation of the radio group',
			control: 'select',
			options: ['horizontal', 'vertical'],
			table: {
				type: { summary: '"horizontal" | "vertical"' },
				defaultValue: { summary: 'vertical' }
			}
		}
	}
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

/**
 * ```tsx
 * import { RadioGroup, RadioGroupItem } from '@naiton/ui-kit'
 *
 * <RadioGroup defaultValue="option-1">
 *   <RadioGroupItem value="option-1" />
 *   <RadioGroupItem value="option-2" />
 * </RadioGroup>
 * ```
 */
export const Base: Story = {
	name: 'Usage',
	render: (args) => (
		<RadioGroup defaultValue='option-one' {...args}>
			<RadioGroupItem value='option-one' id='option-one' />
			<RadioGroupItem value='option-two' id='option-two' />
			<RadioGroupItem value='option-three' id='option-three' />
		</RadioGroup>
	),
	parameters: {
		docs: {
			source: {
				code: `
					import { RadioGroup, RadioGroupItem } from '@naiton/ui-kit'

					<RadioGroup defaultValue="option-1">
						<RadioGroupItem value="option-1" />
						<RadioGroupItem value="option-2" />
						<RadioGroupItem value="option-3" />
					</RadioGroup>
				`
			}
		}
	}
}

export const BasicRadioGroup: Story = {
	name: 'Basic',
	render: () => (
		<RadioGroup defaultValue='comfortable'>
			<Field orientation='horizontal'>
				<RadioGroupItem id='radio-1' value='default' />
				<FieldLabel htmlFor='radio-1'>Default</FieldLabel>
			</Field>
			<Field orientation='horizontal'>
				<RadioGroupItem id='radio-2' value='comfortable' />
				<FieldLabel htmlFor='radio-2'>Comfortable</FieldLabel>
			</Field>
			<Field orientation='horizontal'>
				<RadioGroupItem id='radio-3' value='compact' />
				<FieldLabel htmlFor='radio-3'>Compact</FieldLabel>
			</Field>
		</RadioGroup>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Pair each `RadioGroupItem` with a `Field` (horizontal orientation) and `FieldLabel` for proper layout and labeling.'
			},
			source: {
				code: `
					import { Field, FieldLabel, RadioGroup, RadioGroupItem } from '@naiton/ui-kit'

					<RadioGroup defaultValue="comfortable">
						<Field orientation="horizontal">
							<RadioGroupItem id="radio-1" value="default" />
							<FieldLabel htmlFor="radio-1">Default</FieldLabel>
						</Field>
						<Field orientation="horizontal">
							<RadioGroupItem id="radio-2" value="comfortable" />
							<FieldLabel htmlFor="radio-2">Comfortable</FieldLabel>
						</Field>
						<Field orientation="horizontal">
							<RadioGroupItem id="radio-3" value="compact" />
							<FieldLabel htmlFor="radio-3">Compact</FieldLabel>
						</Field>
					</RadioGroup>
				`
			}
		}
	}
}

export const DescriptionRadioGroup: Story = {
	name: 'Description',
	render: () => (
		<RadioGroup defaultValue='comfortable'>
			<Field orientation='horizontal'>
				<RadioGroupItem id='desc-radio-1' value='default' />
				<FieldContent>
					<FieldLabel htmlFor='desc-radio-1'>Default</FieldLabel>
					<FieldDescription>Standard spacing between items.</FieldDescription>
				</FieldContent>
			</Field>
			<Field orientation='horizontal'>
				<RadioGroupItem id='desc-radio-2' value='comfortable' />
				<FieldContent>
					<FieldLabel htmlFor='desc-radio-2'>Comfortable</FieldLabel>
					<FieldDescription>Extra space for a relaxed layout.</FieldDescription>
				</FieldContent>
			</Field>
			<Field orientation='horizontal'>
				<RadioGroupItem id='desc-radio-3' value='compact' />
				<FieldContent>
					<FieldLabel htmlFor='desc-radio-3'>Compact</FieldLabel>
					<FieldDescription>Minimal spacing to show more content.</FieldDescription>
				</FieldContent>
			</Field>
		</RadioGroup>
	),
	parameters: {
		docs: {
			description: {
				story: 'Use `FieldContent` and `FieldDescription` alongside each item to display helper text beneath the label.'
			},
			source: {
				code: `
					import { Field, FieldContent, FieldDescription, FieldLabel, RadioGroup, RadioGroupItem } from '@naiton/ui-kit'

					<RadioGroup defaultValue="comfortable">
						<Field orientation="horizontal">
							<RadioGroupItem id="desc-radio-1" value="default" />
							<FieldContent>
								<FieldLabel htmlFor="desc-radio-1">Default</FieldLabel>
								<FieldDescription>Standard spacing between items.</FieldDescription>
							</FieldContent>
						</Field>
						<Field orientation="horizontal">
							<RadioGroupItem id="desc-radio-2" value="comfortable" />
							<FieldContent>
								<FieldLabel htmlFor="desc-radio-2">Comfortable</FieldLabel>
								<FieldDescription>Extra space for a relaxed layout.</FieldDescription>
							</FieldContent>
						</Field>
						<Field orientation="horizontal">
							<RadioGroupItem id="desc-radio-3" value="compact" />
							<FieldContent>
								<FieldLabel htmlFor="desc-radio-3">Compact</FieldLabel>
								<FieldDescription>Minimal spacing to show more content.</FieldDescription>
							</FieldContent>
						</Field>
					</RadioGroup>
				`
			}
		}
	}
}

export const DisabledRadioGroup: Story = {
	name: 'Disabled',
	render: () => (
		<RadioGroup defaultValue='comfortable'>
			<Field orientation='horizontal' data-disabled>
				<RadioGroupItem id='dis-radio-1' value='default' disabled />
				<FieldLabel htmlFor='dis-radio-1'>Default</FieldLabel>
			</Field>
			<Field orientation='horizontal' data-disabled>
				<RadioGroupItem id='dis-radio-2' value='comfortable' disabled />
				<FieldLabel htmlFor='dis-radio-2'>Comfortable</FieldLabel>
			</Field>
			<Field orientation='horizontal' data-disabled>
				<RadioGroupItem id='dis-radio-3' value='compact' disabled />
				<FieldLabel htmlFor='dis-radio-3'>Compact</FieldLabel>
			</Field>
		</RadioGroup>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Use the `disabled` prop on `RadioGroupItem` to prevent interaction and add `data-disabled` to each `<Field>` wrapper for disabled styles.'
			},
			source: {
				code: `
					import { Field, FieldLabel, RadioGroup, RadioGroupItem } from '@naiton/ui-kit'

					<RadioGroup defaultValue="comfortable">
						<Field orientation="horizontal" data-disabled>
							<RadioGroupItem id="dis-radio-1" value="default" disabled />
							<FieldLabel htmlFor="dis-radio-1">Default</FieldLabel>
						</Field>
						<Field orientation="horizontal" data-disabled>
							<RadioGroupItem id="dis-radio-2" value="comfortable" disabled />
							<FieldLabel htmlFor="dis-radio-2">Comfortable</FieldLabel>
						</Field>
						<Field orientation="horizontal" data-disabled>
							<RadioGroupItem id="dis-radio-3" value="compact" disabled />
							<FieldLabel htmlFor="dis-radio-3">Compact</FieldLabel>
						</Field>
					</RadioGroup>
				`
			}
		}
	}
}

export const InvalidRadioGroup: Story = {
	name: 'Invalid',
	render: () => (
		<RadioGroup>
			<Field orientation='horizontal' data-invalid>
				<RadioGroupItem id='inv-radio-1' value='default' aria-invalid />
				<FieldLabel htmlFor='inv-radio-1'>Default</FieldLabel>
			</Field>
			<Field orientation='horizontal' data-invalid>
				<RadioGroupItem id='inv-radio-2' value='comfortable' aria-invalid />
				<FieldLabel htmlFor='inv-radio-2'>Comfortable</FieldLabel>
			</Field>
			<Field orientation='horizontal' data-invalid>
				<RadioGroupItem id='inv-radio-3' value='compact' aria-invalid />
				<FieldLabel htmlFor='inv-radio-3'>Compact</FieldLabel>
			</Field>
			<FieldDescription className='text-error-500'>Please select an option.</FieldDescription>
		</RadioGroup>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Set `aria-invalid` on each `RadioGroupItem` and `data-invalid` on the `<Field>` wrapper to show the invalid styles.'
			},
			source: {
				code: `
					import { Field, FieldDescription, FieldLabel, RadioGroup, RadioGroupItem } from '@naiton/ui-kit'

					<RadioGroup>
						<Field orientation="horizontal" data-invalid>
							<RadioGroupItem id="inv-radio-1" value="default" aria-invalid />
							<FieldLabel htmlFor="inv-radio-1">Default</FieldLabel>
						</Field>
						<Field orientation="horizontal" data-invalid>
							<RadioGroupItem id="inv-radio-2" value="comfortable" aria-invalid />
							<FieldLabel htmlFor="inv-radio-2">Comfortable</FieldLabel>
						</Field>
						<Field orientation="horizontal" data-invalid>
							<RadioGroupItem id="inv-radio-3" value="compact" aria-invalid />
							<FieldLabel htmlFor="inv-radio-3">Compact</FieldLabel>
						</Field>
						<FieldDescription className="text-error-500">Please select an option.</FieldDescription>
					</RadioGroup>
				`
			}
		}
	}
}
