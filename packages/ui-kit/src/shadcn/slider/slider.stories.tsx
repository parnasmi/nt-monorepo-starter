import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Label } from '../label'
import { Slider } from './slider.tsx'

const meta = {
	title: 'UI/Slider',
	component: Slider,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'An input where the user selects a value from within a given range.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		defaultValue: {
			description: 'Initial value(s) for uncontrolled usage. Pass an array of numbers.',
			control: false,
			table: {
				type: { summary: 'number[]' },
				defaultValue: { summary: '[0]' }
			}
		},
		value: {
			description: 'Controlled value(s). Pass an array of numbers.',
			control: false,
			table: {
				type: { summary: 'number[]' }
			}
		},
		min: {
			description: 'Minimum value of the range',
			control: 'number',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '0' }
			}
		},
		max: {
			description: 'Maximum value of the range',
			control: 'number',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '100' }
			}
		},
		step: {
			description: 'Granularity of each step',
			control: 'number',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '1' }
			}
		},
		orientation: {
			description: 'Orientation of the slider',
			control: 'select',
			options: ['horizontal', 'vertical'],
			table: {
				type: { summary: "'horizontal' | 'vertical'" },
				defaultValue: { summary: 'horizontal' }
			}
		},
		disabled: {
			description: 'Disables the slider',
			control: 'boolean',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' }
			}
		},
		onValueChange: {
			description: 'Callback fired continuously as the thumb is dragged.',
			action: 'valueChanged',
			table: { type: { summary: '(value: number[]) => void' } }
		},
		onValueCommit: {
			description: 'Callback fired when the thumb is released.',
			action: 'valueCommitted',
			table: { type: { summary: '(value: number[]) => void' } }
		}
	}
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

/**
 * ```tsx
 * import { Slider } from '@naiton/ui-kit'
 *
 * <Slider defaultValue={[50]} max={100} step={1} />
 * ```
 */
export const Base: Story = {
	name: 'Usage',
	render: () => <Slider defaultValue={[50]} max={100} step={1} className='w-64' />,
	parameters: {
		docs: {
			source: {
				code: `
					import { Slider } from '@naiton/ui-kit'

					<Slider defaultValue={[50]} max={100} step={1} className='w-64' />
				`
			}
		}
	}
}

export const Range: Story = {
	render: () => <Slider defaultValue={[25, 75]} max={100} step={5} className='w-64' />,
	parameters: {
		docs: {
			description: {
				story: 'Use an array with two values for a range slider.'
			},
			source: {
				code: `
					import { Slider } from '@naiton/ui-kit'

					<Slider defaultValue={[25, 75]} max={100} step={1} className='w-64' />
				`
			}
		}
	}
}

export const MultipleThumbs: Story = {
	name: 'Multiple thumbs',
	render: () => <Slider defaultValue={[20, 50, 80]} max={100} step={1} className='w-64' />,
	parameters: {
		docs: {
			description: {
				story: 'Use an array with multiple values for multiple thumbs.'
			},
			source: {
				code: `
					import { Slider } from '@naiton/ui-kit'

					<Slider defaultValue={[20, 50, 80]} max={100} step={1} className='w-64' />
				`
			}
		}
	}
}

export const Vertical: Story = {
	render: () => (
		<div className='mx-auto flex w-full max-w-xs items-center justify-center gap-6'>
			<Slider defaultValue={[50]} max={100} step={1} orientation='vertical' className='h-40!' />
			<Slider defaultValue={[25]} max={100} step={1} orientation='vertical' className='h-40!' />
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Use `orientation="vertical"` for a vertical slider.'
			},
			source: {
				code: `
					import { Slider } from '@naiton/ui-kit'

					<div className='mx-auto flex w-full max-w-xs items-center justify-center gap-6'>
						<Slider defaultValue={[50]} max={100} step={1} orientation='vertical' className='h-40!' />
						<Slider defaultValue={[25]} max={100} step={1} orientation='vertical' className='h-40!' />
					</div>
				`
			}
		}
	}
}

export const Controlled: Story = {
	render: () => {
		const [value, setValue] = useState([0.3, 0.7])

		return (
			<div className='mx-auto grid w-full max-w-xs gap-3'>
				<div className='flex items-center justify-between gap-2'>
					<Label htmlFor='slider-demo-temperature'>Temperature</Label>
					<span className='text-sm text-gray-500'>{value.join(', ')}</span>
				</div>
				<Slider
					id='slider-demo-temperature'
					value={value}
					onValueChange={setValue}
					min={0}
					max={1}
					step={0.1}
					className='w-64'
				/>
			</div>
		)
	},
	parameters: {
		docs: {
			description: {
				story: 'Use the `value` and `onValueChange` props for controlled usage.'
			},
			source: {
				code: `
					import { useState } from 'react'
					import { Slider } from '@naiton/ui-kit'

					const [value, setValue] = useState([0.3])

					<div className='mx-auto grid w-full max-w-xs gap-3'>
						<div className='flex items-center justify-between gap-2'>
							<Label htmlFor='slider-demo-temperature'>Temperature</Label>
							<span className='text-gray-500 text-sm'>{value.join(', ')}</span>
						</div>
						<Slider
							id='slider-demo-temperature'
							value={value}
							onValueChange={setValue}
							min={0}
							max={1}
							step={0.1}
							className='w-64'
						/>
					</div>
				`
			}
		}
	}
}

export const Disabled: Story = {
	render: () => <Slider defaultValue={[50]} max={100} step={1} disabled className='w-64' />,
	parameters: {
		docs: {
			description: {
				story: 'Use the `disabled` prop to disable the slider.'
			},
			source: {
				code: `
					import { Slider } from '@naiton/ui-kit'

					<Slider defaultValue={[50]} max={100} step={1} disabled className='w-64' />
				`
			}
		}
	}
}
