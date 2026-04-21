import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../button'
import { Spinner } from './spinner.tsx'

const allSizes = ['size-4', 'size-6', 'size-8', 'size-10', 'size-12'] as const

const meta = {
	title: 'UI/Spinner',
	component: Spinner,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'An indicator that can be used to show a loading state.'
			}
		}
	},
	args: {
		className: 'size-4'
	},
	tags: ['autodocs'],
	argTypes: {
		className: {
			description:
				'Tailwind classes applied to the spinner. Use `size-*` to control dimensions and `text-*` to control color.',
			control: 'text',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'size-4' }
			}
		}
	}
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

/**
 * ```tsx
 * import { Spinner } from '@naiton/ui-kit'
 *
 * <Spinner />
 * ```
 */
export const Base: Story = {
	name: 'Usage',
	args: {},
	parameters: {
		docs: {
			source: {
				code: `
					import { Spinner } from '@naiton/ui-kit'

					<Spinner />
				`
			}
		}
	}
}

export const Sizes: Story = {
	name: 'Size',
	render: () => (
		<div className='flex items-center gap-6'>
			{allSizes.map((size) => (
				<Spinner key={size} className={size} />
			))}
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Use the `size-*` utility class to change the size of the spinner.'
			},
			source: {
				code: `
					import { Spinner } from '@naiton/ui-kit'

					<div className="flex items-center gap-6">
						<Spinner className="size-4" />
						<Spinner className="size-6" />
						<Spinner className="size-8" />
						<Spinner className="size-10" />
						<Spinner className="size-12" />
					</div>
				`
			}
		}
	}
}

export const ButtonSpinner: Story = {
	name: 'Button',
	render: () => (
		<div className='flex flex-wrap gap-4'>
			<Button>
				<Spinner className='size-4' />
				<span>Loading</span>
			</Button>
			<Button variant='outline' size='icon'>
				<Spinner className='size-4' />
			</Button>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'The spinner can be used inside other components, such as buttons, to indicate a loading state.'
			},
			source: {
				code: `
					import { Button, Spinner } from '@naiton/ui-kit'

					<div className='flex flex-wrap gap-4'>
						<Button>
							<Spinner className='size-4' />
							<span>Loading</span>
						</Button>
						<Button variant='outline' size='icon'>
							<Spinner className='size-4' />
						</Button>
					</div>
				`
			}
		}
	}
}
