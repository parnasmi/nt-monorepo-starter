import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Checkbox } from '../checkbox'
import { Input } from '../input'
import { RadioGroup, RadioGroupItem } from '../radio-group'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../select'
import { Slider } from '../slider'
import { Textarea } from '../textarea'
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSeparator,
	FieldSet,
	FieldTitle
} from './field.tsx'

const meta = {
	title: 'UI/Field',
	component: Field,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'Combine labels, controls, and help text to compose accessible form fields and grouped inputs.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		orientation: {
			description: 'Layout direction of the field',
			control: 'select',
			options: ['vertical', 'horizontal', 'responsive'],
			table: {
				type: { summary: "'vertical' | 'horizontal' | 'responsive'" },
				defaultValue: { summary: 'vertical' }
			}
		}
	}
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

/**
 * ```tsx
 * import { Field, FieldDescription, FieldLabel, Input } from '@naiton/ui-kit'
 *
 * <Field>
 *   <FieldLabel htmlFor="name">Name</FieldLabel>
 *   <Input id="name" placeholder="Enter your name" />
 *   <FieldDescription>This is your public display name.</FieldDescription>
 * </Field>
 * ```
 */
export const Base: Story = {
	name: 'Usage',
	render: () => (
		<Field>
			<FieldLabel htmlFor='field-base'>Name</FieldLabel>
			<Input id='field-base' placeholder='Enter your name' />
			<FieldDescription>This is your public display name.</FieldDescription>
		</Field>
	),
	parameters: {
		docs: {
			source: {
				code: `
					import { Field, FieldDescription, FieldLabel, Input } from '@naiton/ui-kit'

					<Field>
						<FieldLabel htmlFor='name'>Name</FieldLabel>
						<Input id='name' placeholder='Enter your name' />
						<FieldDescription>This is your public display name.</FieldDescription>
					</Field>
				`
			}
		}
	}
}

export const InputField: Story = {
	name: 'Input',
	render: () => (
		<FieldGroup>
			<Field>
				<FieldLabel htmlFor='username'>Username</FieldLabel>
				<Input id='username' type='text' placeholder='Max Leiter' />
				<FieldDescription>Choose a unique username for your account.</FieldDescription>
			</Field>
			<Field>
				<FieldLabel htmlFor='password'>Password</FieldLabel>
				<Input id='password' type='password' placeholder='••••••••' />
				<FieldDescription>Must be at least 8 characters long.</FieldDescription>
			</Field>
		</FieldGroup>
	),
	parameters: {
		docs: {
			description: {
				story: 'Use `FieldGroup` to stack multiple `Field` components with consistent spacing.'
			},
			source: {
				code: `
					import { Field, FieldDescription, FieldGroup, FieldLabel, Input } from '@naiton/ui-kit'

					<FieldGroup>
						<Field>
							<FieldLabel htmlFor='username'>Username</FieldLabel>
							<Input id='username' type='text' placeholder='Max Leiter' />
							<FieldDescription>Choose a unique username for your account.</FieldDescription>
						</Field>
						<Field>
							<FieldLabel htmlFor='password'>Password</FieldLabel>
							<Input id='password' type='password' placeholder='••••••••' />
							<FieldDescription>Must be at least 8 characters long.</FieldDescription>
						</Field>
					</FieldGroup>
				`
			}
		}
	}
}

export const TextareaField: Story = {
	name: 'Textarea',
	render: () => (
		<Field>
			<FieldLabel htmlFor='feedback'>Feedback</FieldLabel>
			<Textarea id='feedback' placeholder='Your feedback helps us improve...' rows={4} />
			<FieldDescription>Share your thoughts about our service.</FieldDescription>
		</Field>
	),
	parameters: {
		docs: {
			description: {
				story: '`Field` can be used with any form control, including `Textarea` for longer text input.'
			},
			source: {
				code: `
					import { Field, FieldDescription, FieldLabel, Textarea } from '@naiton/ui-kit'

					<Field>
						<FieldLabel htmlFor='feedback'>Feedback</FieldLabel>
						<Textarea id='feedback' placeholder='Your feedback helps us improve...' rows={4} />
						<FieldDescription>Share your thoughts about our service.</FieldDescription>
					</Field>
				`
			}
		}
	}
}

export const SelectField: Story = {
	name: 'Select',
	render: () => (
		<Field>
			<FieldLabel>Department</FieldLabel>
			<Select>
				<SelectTrigger>
					<SelectValue placeholder='Choose department' />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectItem value='engineering'>Engineering</SelectItem>
						<SelectItem value='design'>Design</SelectItem>
						<SelectItem value='marketing'>Marketing</SelectItem>
						<SelectItem value='sales'>Sales</SelectItem>
						<SelectItem value='support'>Customer Support</SelectItem>
						<SelectItem value='hr'>Human Resources</SelectItem>
						<SelectItem value='finance'>Finance</SelectItem>
						<SelectItem value='operations'>Operations</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
			<FieldDescription>Select your department or area of work.</FieldDescription>
		</Field>
	),
	parameters: {
		docs: {
			description: {
				story:
					'`Field` can also be used with custom select components, ensuring the label and description are properly associated with the select trigger for accessibility.'
			}
		},
		source: {
			code: `
				import { Checkbox, Field, FieldDescription, FieldLabel, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@naiton/ui-kit'

				<Field>
					<FieldLabel>Department</FieldLabel>
					<Select>
						<SelectTrigger>
							<SelectValue placeholder='Choose department' />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value='engineering'>Engineering</SelectItem>
								<SelectItem value='design'>Design</SelectItem>
								<SelectItem value='marketing'>Marketing</SelectItem>
								<SelectItem value='sales'>Sales</SelectItem>
								<SelectItem value='support'>Customer Support</SelectItem>
								<SelectItem value='hr'>Human Resources</SelectItem>
								<SelectItem value='finance'>Finance</SelectItem>
								<SelectItem value='operations'>Operations</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					<FieldDescription>Select your department or area of work.</FieldDescription>
				</Field>
			`
		}
	}
}

export const SliderField: Story = {
	name: 'Slider',
	render: () => {
		const [value, setValue] = useState([200, 800])

		return (
			<Field className='w-64'>
				<FieldTitle>Price Range</FieldTitle>
				<FieldDescription>
					Set your budget range ($
					<span className='font-medium tabular-nums'>{value[0]}</span> -{' '}
					<span className='font-medium tabular-nums'>{value[1]}</span>).
				</FieldDescription>
				<Slider
					value={value}
					onValueChange={(value: [number, number]) => setValue(value)}
					max={1000}
					min={0}
					step={10}
					className='mt-2'
					aria-label='Price Range'
				/>
			</Field>
		)
	},
	parameters: {
		docs: {
			description: {
				story:
					'`Field` can be used with any form control, including custom components like `Slider`. Just ensure to provide an accessible label and description for the slider control.'
			},
			source: {
				code: `
					import { useState } from 'react'
					import { Slider, Field, FieldDescription, FieldTitle } from '@naiton/ui-kit'

					const [value, setValue] = useState([200, 800])

					<Field className='w-64'>
						<FieldTitle>Price Range</FieldTitle>
						<FieldDescription>
							Set your budget range ($
							<span className='font-medium tabular-nums'>{value[0]}</span> -{' '}
							<span className='font-medium tabular-nums'>{value[1]}</span>).
						</FieldDescription>
						<Slider
							value={value}
							onValueChange={(value) => setValue(value as [number, number])}
							max={1000}
							min={0}
							step={10}
							className='mt-2'
							aria-label='Price Range'
						/>
					</Field>
				`
			}
		}
	}
}

export const CheckboxField: Story = {
	name: 'Checkbox',
	render: () => (
		<FieldGroup className='w-full max-w-xs'>
			<FieldSet>
				<FieldLegend variant='label'>Show these items on the desktop</FieldLegend>
				<FieldDescription>Select the items you want to show on the desktop.</FieldDescription>
				<FieldGroup className='gap-3'>
					<Field orientation='horizontal'>
						<Checkbox id='finder-pref-9k2-hard-disks-ljj' />
						<FieldLabel htmlFor='finder-pref-9k2-hard-disks-ljj' className='font-normal' defaultChecked>
							Hard disks
						</FieldLabel>
					</Field>
					<Field orientation='horizontal'>
						<Checkbox id='finder-pref-9k2-external-disks-1yg' />
						<FieldLabel htmlFor='finder-pref-9k2-external-disks-1yg' className='font-normal'>
							External disks
						</FieldLabel>
					</Field>
					<Field orientation='horizontal'>
						<Checkbox id='finder-pref-9k2-cds-dvds-fzt' />
						<FieldLabel htmlFor='finder-pref-9k2-cds-dvds-fzt' className='font-normal'>
							CDs, DVDs, and iPods
						</FieldLabel>
					</Field>
					<Field orientation='horizontal'>
						<Checkbox id='finder-pref-9k2-connected-servers-6l2' />
						<FieldLabel htmlFor='finder-pref-9k2-connected-servers-6l2' className='font-normal'>
							Connected servers
						</FieldLabel>
					</Field>
				</FieldGroup>
			</FieldSet>
			<FieldSeparator />
			<Field orientation='horizontal'>
				<Checkbox id='finder-pref-9k2-sync-folders-nep' defaultChecked />
				<FieldContent>
					<FieldLabel htmlFor='finder-pref-9k2-sync-folders-nep'>Sync Desktop & Documents folders</FieldLabel>
					<FieldDescription>
						Your Desktop & Documents folders are being synced with iCloud Drive. You can access them from other devices.
					</FieldDescription>
				</FieldContent>
			</Field>
		</FieldGroup>
	),
	parameters: {
		docs: {
			description:
				'Use `FieldSet` with `FieldLegend` to semantically group related checkbox or radio fields under a shared heading. Use `orientation="horizontal"` to place the checkbox side-by-side with its label, and wrap the label and description in `FieldContent` for proper spacing.'
		},
		source: {
			code: `
				import { Checkbox, Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from '@naiton/ui-kit'

				<FieldGroup className='w-full max-w-xs'>
					<FieldSet>
						<FieldLegend variant='label'>Show these items on the desktop</FieldLegend>
						<FieldDescription>Select the items you want to show on the desktop.</FieldDescription>
						<FieldGroup className='gap-3'>
							<Field orientation='horizontal'>
								<Checkbox id='finder-pref-9k2-hard-disks-ljj' />
								<FieldLabel htmlFor='finder-pref-9k2-hard-disks-ljj' className='font-normal' defaultChecked>
									Hard disks
								</FieldLabel>
							</Field>
							<Field orientation='horizontal'>
								<Checkbox id='finder-pref-9k2-external-disks-1yg' />
								<FieldLabel htmlFor='finder-pref-9k2-external-disks-1yg' className='font-normal'>
									External disks
								</FieldLabel>
							</Field>
							<Field orientation='horizontal'>
								<Checkbox id='finder-pref-9k2-cds-dvds-fzt' />
								<FieldLabel htmlFor='finder-pref-9k2-cds-dvds-fzt' className='font-normal'>
									CDs, DVDs, and iPods
								</FieldLabel>
							</Field>
							<Field orientation='horizontal'>
								<Checkbox id='finder-pref-9k2-connected-servers-6l2' />
								<FieldLabel htmlFor='finder-pref-9k2-connected-servers-6l2' className='font-normal'>
									Connected servers
								</FieldLabel>
							</Field>
						</FieldGroup>
					</FieldSet>
					<FieldSeparator />
					<Field orientation='horizontal'>
						<Checkbox id='finder-pref-9k2-sync-folders-nep' defaultChecked />
						<FieldContent>
							<FieldLabel htmlFor='finder-pref-9k2-sync-folders-nep'>
								Sync Desktop & Documents folders
							</FieldLabel>
							<FieldDescription>
								Your Desktop & Documents folders are being synced with iCloud Drive. You can access them
								from other devices.
							</FieldDescription>
						</FieldContent>
					</Field>
				</FieldGroup>
			`
		}
	}
}

export const RadioField: Story = {
	name: 'Radio',
	render: () => (
		<FieldSet className='w-full max-w-xs'>
			<FieldLegend variant='label'>Subscription Plan</FieldLegend>
			<FieldDescription>Yearly and lifetime plans offer significant savings.</FieldDescription>
			<RadioGroup defaultValue='monthly'>
				<Field orientation='horizontal'>
					<RadioGroupItem value='monthly' id='plan-monthly' />
					<FieldLabel htmlFor='plan-monthly' className='font-normal'>
						Monthly ($9.99/month)
					</FieldLabel>
				</Field>
				<Field orientation='horizontal'>
					<RadioGroupItem value='yearly' id='plan-yearly' />
					<FieldLabel htmlFor='plan-yearly' className='font-normal'>
						Yearly ($99.99/year)
					</FieldLabel>
				</Field>
				<Field orientation='horizontal'>
					<RadioGroupItem value='lifetime' id='plan-lifetime' />
					<FieldLabel htmlFor='plan-lifetime' className='font-normal'>
						Lifetime ($299.99)
					</FieldLabel>
				</Field>
			</RadioGroup>
		</FieldSet>
	),
	parameters: {
		docs: {
			description:
				'Use `FieldSet` with `FieldLegend` to group related radio fields under a shared heading. Use `orientation="horizontal"` to place the radio button side-by-side with its label.'
		},
		source: {
			code: `
				import { Field, FieldDescription, FieldLabel, FieldLegend, FieldSet, RadioGroup, RadioGroupItem } from '@naiton/ui-kit'

				<FieldSet className='w-full max-w-xs'>
					<FieldLegend variant='label'>Subscription Plan</FieldLegend>
					<FieldDescription>Yearly and lifetime plans offer significant savings.</FieldDescription>
					<RadioGroup defaultValue='monthly'>
						<Field orientation='horizontal'>
							<RadioGroupItem value='monthly' id='plan-monthly' />
							<FieldLabel htmlFor='plan-monthly' className='font-normal'>
								Monthly ($9.99/month)
							</FieldLabel>
						</Field>
						<Field orientation='horizontal'>
							<RadioGroupItem value='yearly' id='plan-yearly' />
							<FieldLabel htmlFor='plan-yearly' className='font-normal'>
								Yearly ($99.99/year)
							</FieldLabel>
						</Field>
						<Field orientation='horizontal'>
							<RadioGroupItem value='lifetime' id='plan-lifetime' />
							<FieldLabel htmlFor='plan-lifetime' className='font-normal'>
								Lifetime ($299.99)
							</FieldLabel>
						</Field>
					</RadioGroup>
				</FieldSet>
			`
		}
	}
}
