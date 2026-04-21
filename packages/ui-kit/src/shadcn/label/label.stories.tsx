import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from '../checkbox'
import { Field, FieldLabel } from '../field'
import { Input } from '../input'
import { Label } from './label.tsx'

const meta = {
	title: 'UI/Label',
	component: Label,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'Renders an accessible label associated with controls.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		htmlFor: {
			description: 'The id of the form element the label is associated with',
			control: 'text',
			table: {
				type: { summary: 'string' }
			}
		}
	}
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

/**
 * ```tsx
 * import { Checkbox, Label } from '@naiton/ui-kit'
 *
 * <div className="flex gap-2">
 *   <Checkbox id="terms" />
 *   <Label htmlFor="terms">Accept terms and conditions</Label>
 * </div>
 * ```
 */
export const Base: Story = {
	name: 'Usage',
	render: () => (
		<div className='flex gap-2'>
			<Checkbox id='terms' />
			<Label htmlFor='terms'>Accept terms and conditions</Label>
		</div>
	),
	parameters: {
		docs: {
			source: {
				code: `
					import { Checkbox, Label } from '@naiton/ui-kit'

					<div className="flex gap-2">
						<Checkbox id="terms" />
						<Label htmlFor="terms">Accept terms and conditions</Label>
					</div>
				`
			}
		}
	}
}

export const FieldInLabel: Story = {
	name: 'Label in Field',
	render: () => (
		<Field>
			<FieldLabel htmlFor='label-input'>Email address</FieldLabel>
			<Input id='label-input' type='email' placeholder='Enter your email' />
		</Field>
	),
	parameters: {
		docs: {
			description: {
				story:
					'For form fields, use the `Field` component which includes built-in `FieldLabel`, `FieldDescription`, and `FieldError` components.'
			},
			source: {
				code: `
					import { Field, FieldLabel, Input } from '@naiton/ui-kit'

					<Field>
						<FieldLabel htmlFor='label-input'>Email address</FieldLabel>
						<Input id='label-input' type='email' placeholder='Enter your email' />
					</Field>
				`
			}
		}
	}
}
