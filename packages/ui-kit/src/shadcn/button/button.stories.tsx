import { MailRegular, SpinnerIosRegular } from '@fluentui/react-icons'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, buttonConfig } from './button.tsx'

const allVariants = Object.keys(buttonConfig.variants.variant) as Array<keyof typeof buttonConfig.variants.variant>
const allSizes = Object.keys(buttonConfig.variants.size) as Array<keyof typeof buttonConfig.variants.size>

const meta = {
	title: 'UI/Button',
	component: Button,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'Displays a button or a component that looks like a button.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			description: 'Button visual style',
			control: 'select',
			options: allVariants,
			table: {
				type: { summary: allVariants.join(' | ') },
				defaultValue: { summary: 'primary' }
			}
		},
		size: {
			control: 'select',
			options: allSizes,
			description: 'Button size',
			table: {
				type: { summary: allSizes.join(' | ') },
				defaultValue: { summary: 'md' }
			}
		},
		disabled: {
			control: 'boolean',
			description: 'Disable button',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' }
			}
		},
		asChild: {
			control: 'boolean',
			description: 'Render as child component',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' }
			}
		}
	}
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

/**
 * ```tsx
 * import { Button } from "@naiton/ui-kit"
 *
 * <Button variant="primary">Button</Button>
 * ```
 */
export const Base: Story = {
	name: 'Usage ',
	args: {
		variant: 'primary',
		size: 'md',
		children: 'Button'
	},
	parameters: {
		docs: {
			source: {
				code: `
					import { Button } from "@naiton/ui-kit"

					<Button variant="primary">Button</Button>
				`
			}
		}
	}
}

export const Variants: Story = {
	name: 'Variant',
	render: () => (
		<div className='flex flex-wrap gap-2'>
			{allVariants.map((variant) => (
				<Button key={variant} variant={variant}>
					{variant.charAt(0).toUpperCase() + variant.slice(1)}
				</Button>
			))}
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Use the `variant` prop to change the visual of the button.'
			},
			source: {
				code: allVariants
					.map(
						(variant) => `<Button variant="${variant}">${variant.charAt(0).toUpperCase() + variant.slice(1)}</Button>`
					)
					.join('\n')
			}
		}
	}
}

export const Sizes: Story = {
	name: 'Size',
	render: () => (
		<div className='flex flex-wrap items-center gap-2'>
			{allSizes.map((size) => (
				<Button key={size} size={size}>
					{size === 'icon' ? <MailRegular fontSize={16} /> : size.toUpperCase()}
				</Button>
			))}
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Use the `size` prop to change the size of the button.'
			},
			source: {
				code: `
					import { Button } from "@naiton/ui-kit"

					<Button size="sm">SM</Button>
					<Button size="md">MD</Button>
					<Button size="lg">LG</Button>
					<Button size="icon">
						<MailRegular fontSize={16} />
					</Button>
				`
			}
		}
	}
}

export const AllCombinations: Story = {
	name: 'All combinations',
	render: () => (
		<div className='flex flex-col gap-4'>
			{allVariants.map((variant) => (
				<div key={variant} className='flex flex-col gap-2'>
					<h3 className='text-sm font-semibold capitalize'>{variant}</h3>
					<div className='flex flex-wrap items-center gap-2'>
						{allSizes.map((size) => (
							<Button key={`${variant}-${size}`} variant={variant} size={size}>
								{size === 'icon' ? <MailRegular fontSize={16} /> : `${size}`}
							</Button>
						))}
					</div>
				</div>
			))}
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Displays all combinations of button variants and sizes for comprehensive testing and visualization.'
			},
			source: {
				state: 'none',
				code: null
			}
		}
	}
}

export const Icons: Story = {
	name: 'Icon',
	render: () => (
		<div className='flex flex-col gap-4'>
			<div className='flex flex-wrap items-center gap-2'>
				<Button size='icon'>
					<MailRegular fontSize={16} />
				</Button>
				<Button>
					<MailRegular fontSize={16} />
					<span>Email</span>
				</Button>
				<Button>
					<span>Email</span>
					<MailRegular fontSize={16} />
				</Button>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Demonstrates how to use icons within buttons, including an icon-only button and buttons with icons positioned before or after the text.'
			},
			source: {
				code: `
					import { MailRegular } from "@fluentui/react-icons"
					import { Button } from "@naiton/ui-kit"

					<Button size="icon">
						<MailRegular fontSize={16} />
					</Button>
					<Button>
						<MailRegular fontSize={16} />
						<span>Email</span>
					</Button>
					<Button>
						<span>Email</span>
						<MailRegular fontSize={16} />
					</Button>
				`
			}
		}
	}
}

export const States: Story = {
	name: 'State',
	render: () => (
		<div className='flex flex-col gap-4'>
			<div className='flex flex-col gap-2'>
				<h3 className='text-sm font-semibold'>Disabled</h3>
				<div className='flex flex-wrap gap-2'>
					{allVariants.map((variant) => (
						<Button key={variant} variant={variant} disabled>
							{variant}
						</Button>
					))}
				</div>
			</div>
			<div className='flex flex-col gap-2'>
				<h3 className='text-sm font-semibold'>Loading</h3>
				<div className='flex flex-wrap gap-2'>
					{allVariants.map((variant) => (
						<Button key={variant} variant={variant}>
							<SpinnerIosRegular fontSize={16} className='animate-spin' />
							<span>{variant}</span>
						</Button>
					))}
				</div>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Showcases different button states, including disabled and loading states, to illustrate how the button appears and behaves under these conditions.'
			},
			source: {
				code: `
					import { SpinnerIosRegular } from "@fluentui/react-icons"
					import { Button } from "@naiton/ui-kit"

					<Button disabled>Disabled</Button>
					<Button>
						<SpinnerIosRegular fontSize={16} className="animate-spin" />
						<span>Loading</span>
					</Button>
				`
			}
		}
	}
}
