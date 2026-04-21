import { AddRegular, SoundWaveCircleRegular, SubtractRegular } from '@fluentui/react-icons'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../input-group'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../tooltip'
import { ButtonGroup, ButtonGroupSeparator } from './button-group.tsx'

const meta = {
	title: 'UI/ButtonGroup',
	component: ButtonGroup,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'A container that groups related buttons together with consistent styling.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		orientation: {
			description: 'Layout direction of the button group',
			control: 'select',
			options: ['horizontal', 'vertical'],
			table: {
				type: { summary: "'horizontal' | 'vertical'" },
				defaultValue: { summary: 'horizontal' }
			}
		}
	}
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

/**
 * ```tsx
 * import { ButtonGroup, Button } from '@naiton/ui-kit'
 *
 * <ButtonGroup>
 *   <Button variant="outline">Left</Button>
 *   <Button variant="outline">Middle</Button>
 *   <Button variant="outline">Right</Button>
 * </ButtonGroup>
 * ```
 */
export const Base: Story = {
	name: 'Usage',
	render: () => (
		<ButtonGroup>
			<Button variant='outline'>Left</Button>
			<Button variant='outline'>Middle</Button>
			<Button variant='outline'>Right</Button>
		</ButtonGroup>
	),
	parameters: {
		docs: {
			source: {
				code: `
					import { ButtonGroup, Button } from '@naiton/ui-kit'

					<ButtonGroup>
						<Button variant="outline">Left</Button>
						<Button variant="outline">Middle</Button>
						<Button variant="outline">Right</Button>
					</ButtonGroup>
				`
			}
		}
	}
}

export const Orientation: Story = {
	render: () => (
		<ButtonGroup orientation='vertical' className='h-fit'>
			<Button variant='outline' size='icon'>
				<AddRegular fontSize={16} />
			</Button>
			<Button variant='outline' size='icon'>
				<SubtractRegular fontSize={16} />
			</Button>
		</ButtonGroup>
	),
	parameters: {
		docs: {
			description: {
				story: 'Set the `orientation` prop to change the button group layout.'
			},
			source: {
				code: `
					import { AddRegular, SubtractRegular } from '@fluentui/react-icons'
					import { ButtonGroup, Button } from '@naiton/ui-kit'

					<ButtonGroup orientation='vertical' className='h-fit'>
						<Button variant='outline' size='icon'>
							<AddRegular fontSize={16} />
						</Button>
						<Button variant='outline' size='icon'>
							<SubtractRegular fontSize={16} />
						</Button>
					</ButtonGroup>
				`
			}
		}
	}
}

export const Size: Story = {
	render: () => (
		<div className='flex flex-col items-start gap-4'>
			<ButtonGroup>
				<Button variant='outline' size='sm'>
					Small
				</Button>
				<Button variant='outline' size='sm'>
					Button
				</Button>
				<Button variant='outline' size='sm'>
					Group
				</Button>
				<Button variant='outline' size='icon'>
					<AddRegular fontSize={16} />
				</Button>
			</ButtonGroup>
			<ButtonGroup>
				<Button variant='outline'>Default</Button>
				<Button variant='outline'>Button</Button>
				<Button variant='outline'>Group</Button>
				<Button variant='outline' size='icon'>
					<AddRegular fontSize={16} />
				</Button>
			</ButtonGroup>
			<ButtonGroup>
				<Button variant='outline' size='lg'>
					Large
				</Button>
				<Button variant='outline' size='lg'>
					Button
				</Button>
				<Button variant='outline' size='lg'>
					Group
				</Button>
				<Button variant='outline' size='icon'>
					<AddRegular fontSize={16} />
				</Button>
			</ButtonGroup>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Control the size of buttons using the `size` prop on individual buttons.'
			},
			source: {
				code: `
					import { AddRegular } from '@fluentui/react-icons'
					import { ButtonGroup, Button } from '@naiton/ui-kit'

					<div className='flex flex-col items-start gap-4'>
						<ButtonGroup>
							<Button variant='outline' size='sm'>
								Small
							</Button>
							<Button variant='outline' size='sm'>
								Button
							</Button>
							<Button variant='outline' size='sm'>
								Group
							</Button>
							<Button variant='outline' size='icon'>
								<AddRegular fontSize={16} />
							</Button>
						</ButtonGroup>
						<ButtonGroup>
							<Button variant='outline'>Default</Button>
							<Button variant='outline'>Button</Button>
							<Button variant='outline'>Group</Button>
							<Button variant='outline' size='icon'>
								<AddRegular fontSize={16} />
							</Button>
						</ButtonGroup>
						<ButtonGroup>
							<Button variant='outline' size='lg'>
								Large
							</Button>
							<Button variant='outline' size='lg'>
								Button
							</Button>
							<Button variant='outline' size='lg'>
								Group
							</Button>
							<Button variant='outline' size='icon'>
								<AddRegular fontSize={16} />
							</Button>
						</ButtonGroup>
					</div>
				`
			}
		}
	}
}

export const Nested: Story = {
	render: () => (
		<ButtonGroup>
			<ButtonGroup>
				<Button variant='outline' size='icon'>
					<AddRegular fontSize={16} />
				</Button>
			</ButtonGroup>
			<ButtonGroup>
				<InputGroup>
					<InputGroupInput placeholder='Send a message...' />
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<InputGroupAddon align='inline-end'>
									<SoundWaveCircleRegular fontSize={16} />
								</InputGroupAddon>
							</TooltipTrigger>
							<TooltipContent>Voice Mode</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</InputGroup>
			</ButtonGroup>
		</ButtonGroup>
	),
	parameters: {
		docs: {
			description: {
				story: 'Nest `<ButtonGroup>` components to create button groups with spacing.'
			},
			source: {
				code: `
					import { AddRegular, SoundWaveCircleRegular } from '@fluentui/react-icons'
					import { Button, ButtonGroup, InputGroup, InputGroupAddon, InputGroupInput, Tooltip, TooltipContent, TooltipTrigger } from '@naiton/ui-kit'

					<ButtonGroup>
						<ButtonGroup>
							<Button variant='outline' size='icon'>
								<AddRegular fontSize={16} />
							</Button>
						</ButtonGroup>

						<ButtonGroup>
							<InputGroup>
								<InputGroupInput placeholder='Send a message...' />
								<Tooltip>
									<TooltipTrigger asChild>
										<InputGroupAddon align='inline-end'>
										<SoundWaveCircleRegular fontSize={16} />
									</InputGroupAddon>
									</TooltipTrigger>
									<TooltipContent>Voice Mode</TooltipContent>
								</Tooltip>
							</InputGroup>
						</ButtonGroup>
					</ButtonGroup>
				`
			}
		}
	}
}

export const Separator: Story = {
	render: () => (
		<ButtonGroup>
			<Button variant='secondary' size='sm'>
				Copy
			</Button>
			<ButtonGroupSeparator />
			<Button variant='secondary' size='sm'>
				Paste
			</Button>
		</ButtonGroup>
	),
	parameters: {
		docs: {
			description: {
				story: 'The `ButtonGroupSeparator` component visually divides buttons within a group.'
			},
			source: {
				code: `
					import { ButtonGroup, ButtonGroupSeparator, Button } from '@naiton/ui-kit'

					<ButtonGroup>
						<Button variant='secondary' size='sm'>
							Copy
						</Button>
						<ButtonGroupSeparator />
						<Button variant='secondary' size='sm'>
							Paste
						</Button>
					</ButtonGroup>
				`
			}
		}
	}
}

export const Split: Story = {
	render: () => (
		<ButtonGroup>
			<Button variant='secondary'>Button</Button>
			<ButtonGroupSeparator />
			<Button size='icon' variant='secondary'>
				<AddRegular fontSize={16} />
			</Button>
		</ButtonGroup>
	),
	parameters: {
		docs: {
			description: {
				story: 'Create a split button group by adding two buttons separated by a `ButtonGroupSeparator`.'
			},
			source: {
				code: `
					import { AddRegular } from '@fluentui/react-icons'
					import { ButtonGroup, ButtonGroupSeparator, Button } from '@naiton/ui-kit'

					<ButtonGroup>
						<Button variant='secondary'>Button</Button>
						<ButtonGroupSeparator />
						<Button size='icon' variant='secondary'>
							<AddRegular fontSize={16} />
						</Button>
					</ButtonGroup>
				`
			}
		}
	}
}
