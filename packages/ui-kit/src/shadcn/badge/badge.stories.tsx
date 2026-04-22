import { BookmarkRegular, CheckmarkStarburstRegular } from '@fluentui/react-icons'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Spinner } from '../spinner'
import { Badge, badgeConfig } from './badge'

const allVariants = Object.keys(badgeConfig.variants.variant) as Array<keyof typeof badgeConfig.variants.variant>

const meta = {
	title: 'UI/Badge',
	component: Badge,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'Displays a badge or a component that looks like a badge.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			description: 'Badge visual style',
			control: 'select',
			options: allVariants,
			table: {
				type: { summary: allVariants.join(' | ') },
				defaultValue: { summary: 'primary' }
			}
		},
		children: {
			description: 'Badge label content',
			control: 'text',
			table: {
				type: { summary: 'React.ReactNode' }
			}
		}
	}
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

/**
 * ```tsx
 * import { Badge } from '@naiton/ui-kit'
 *
 * <Badge>Badge</Badge>
 * ```
 */
export const Base: Story = {
	name: 'Usage',
	args: {
		variant: 'primary',
		children: 'Badge'
	},
	parameters: {
		docs: {
			source: {
				code: `
					import { Badge } from '@naiton/ui-kit'

					<Badge>Badge</Badge>
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
				<Badge key={variant} variant={variant}>
					{variant.charAt(0).toUpperCase() + variant.slice(1)}
				</Badge>
			))}
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Use the `variant` prop to change the variant of the badge.'
			},
			source: {
				code: allVariants
					.map((variant) => `<Badge variant="${variant}">${variant.charAt(0).toUpperCase() + variant.slice(1)}</Badge>`)
					.join('\n')
			}
		}
	}
}

export const Icons: Story = {
	name: 'Icon',
	render: () => (
		<div className='flex flex-col gap-4'>
			<div className='flex flex-wrap items-center gap-2'>
				<Badge variant='outline'>
					<CheckmarkStarburstRegular fontSize={13} />
					<span>Verified</span>
				</Badge>
				<Badge variant='outline'>
					<span>Bookmark</span>
					<BookmarkRegular fontSize={13} />
				</Badge>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'You can include icons in the badge by adding them as children. Use the `fontSize` prop to adjust the icon size to fit well within the badge.'
			},
			source: {
				code: `
					import { BookmarkRegular, CheckmarkStarburstRegular } from '@fluentui/react-icons'
					import { Badge } from '@naiton/ui-kit'

					<Badge variant='outline'>
						<CheckmarkStarburstRegular fontSize={13} />
						<span>Verified</span>
					</Badge>
					<Badge variant='outline'>
						<span>Bookmark</span>
						<BookmarkRegular fontSize={13} />
					</Badge>
				`
			}
		}
	}
}

export const Spinners: Story = {
	name: 'Spinner',
	render: () => (
		<div className='flex flex-col gap-4'>
			<div className='flex flex-wrap items-center gap-2'>
				<Badge variant='destructive'>
					<Spinner className='size-3.25' />
					<span>Deleting</span>
				</Badge>
				<Badge variant='secondary'>
					<span>Generating</span>
					<Spinner className='size-3.25' />
				</Badge>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'You can also include spinners in the badge to indicate loading states. Adjust the spinner size using the `className` prop to ensure it fits well within the badge.'
			},
			source: {
				code: `
					import { Badge, Spinner } from '@naiton/ui-kit'

					<Badge variant='destructive'>
						<Spinner className='size-3.25' />
						<span>Deleting</span>
					</Badge>
					<Badge variant='secondary'>
						<span>Generating</span>
						<Spinner className='size-3.25' />
					</Badge>
				`
			}
		}
	}
}
