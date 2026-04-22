import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from '../badge'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'

const meta = {
	title: 'UI/Avatar',
	component: Avatar,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'An image element with a fallback for representing the user.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		className: {
			description: 'Additional CSS classes to apply to the avatar root',
			control: 'text',
			table: {
				type: { summary: 'string' }
			}
		}
	}
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

/**
 * ```tsx
 * import { Avatar, AvatarFallback, AvatarImage } from "@naiton/ui-kit"
 *
 * <Avatar>
 *   <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
 *   <AvatarFallback>CN</AvatarFallback>
 * </Avatar>
 * ```
 */
export const Base: Story = {
	name: 'Usage',
	render: () => (
		<Avatar>
			<AvatarImage src='https://github.com/shadcn.png' alt='Avatar' />
			<AvatarFallback>CN</AvatarFallback>
		</Avatar>
	),
	parameters: {
		docs: {
			source: {
				code: `
					import { Avatar, AvatarFallback, AvatarImage } from "@naiton/ui-kit"

					<Avatar>
						<AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				`
			}
		}
	}
}

export const Badges: Story = {
	name: 'Badge',
	render: () => (
		<Avatar>
			<AvatarImage src='https://github.com/shadcn.png' alt='Avatar' />
			<AvatarFallback>CN</AvatarFallback>
			<Badge className='absolute right-0 bottom-0 z-1 size-2.5 border border-gray-900 p-0' />
		</Avatar>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Position a `Badge` inside the `Avatar` to indicate status or notifications. Use absolute positioning to place it in the desired location.'
			},
			source: {
				code: `
					import { Avatar, AvatarFallback, AvatarImage, Badge } from "@naiton/ui-kit"
					
					<Avatar>
						<AvatarImage src='https://github.com/shadcn.png' alt='Avatar' />
						<AvatarFallback>CN</AvatarFallback>
						<Badge className='absolute right-0 bottom-0 z-1 size-2.5 border border-gray-900 p-0' />
					</Avatar>
				`
			}
		}
	}
}

export const Fallbacks: Story = {
	name: 'Fallback',
	render: () => (
		<Avatar>
			<AvatarImage src='/broken-image.png' alt='Avatar' />
			<AvatarFallback>JD</AvatarFallback>
		</Avatar>
	),
	parameters: {
		docs: {
			description: {
				story:
					'If the image fails to load, the `AvatarFallback` will be displayed instead. This can be used to show user initials or a default icon.'
			},
			source: {
				code: `
					import { Avatar, AvatarFallback, AvatarImage } from "@naiton/ui-kit"

					<Avatar>
						<AvatarImage src="/broken-image.png" alt="Avatar" />
						<AvatarFallback>JD</AvatarFallback>
					</Avatar>
				`
			}
		}
	}
}

export const Sizes: Story = {
	name: 'Size',
	render: () => (
		<div className='flex items-center gap-4'>
			<Avatar className='size-6'>
				<AvatarImage src='https://github.com/shadcn.png' alt='Avatar' />
				<AvatarFallback className='text-xs'>SM</AvatarFallback>
			</Avatar>
			<Avatar>
				<AvatarImage src='https://github.com/shadcn.png' alt='Avatar' />
				<AvatarFallback>MD</AvatarFallback>
			</Avatar>
			<Avatar className='size-14'>
				<AvatarImage src='https://github.com/shadcn.png' alt='Avatar' />
				<AvatarFallback>LG</AvatarFallback>
			</Avatar>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Override the default size (`size-10`) by passing a `className` with a Tailwind size utility such as `size-6` or `size-14`.'
			},
			source: {
				code: `
					import { Avatar, AvatarFallback, AvatarImage } from "@naiton/ui-kit"

					<Avatar className="size-6">
						<AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
						<AvatarFallback className="text-xs">SM</AvatarFallback>
					</Avatar>

					<Avatar>
						<AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
						<AvatarFallback>MD</AvatarFallback>
					</Avatar>

					<Avatar className="size-14">
						<AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
						<AvatarFallback>LG</AvatarFallback>
					</Avatar>
				`
			}
		}
	}
}

export const Groups: Story = {
	name: 'Group',
	render: () => (
		<div className='flex -space-x-2'>
			{[
				{ src: 'https://github.com/shadcn.png', alt: 'Avatar', fallback: 'CN' },
				{ src: '/broken-1.png', alt: 'alice', fallback: 'AL' },
				{ src: '/broken-2.png', alt: 'bob', fallback: 'BO' },
				{ src: '/broken-3.png', alt: 'carol', fallback: 'CA' }
			].map(({ src, alt, fallback }) => (
				<Avatar key={alt} className='border border-gray-400'>
					<AvatarImage src={src} alt={alt} />
					<AvatarFallback>{fallback}</AvatarFallback>
				</Avatar>
			))}
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Stack multiple avatars into a group using negative spacing and a ring to visually separate them.'
			},
			source: {
				code: `
					import { Avatar, AvatarFallback, AvatarImage } from "@naiton/ui-kit"

					<div className="flex -space-x-2">
						<Avatar className="border border-gray-400">
							<AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<Avatar className="border border-gray-400">
							<AvatarImage src="..." alt="alice" />
							<AvatarFallback>AL</AvatarFallback>
						</Avatar>
						<Avatar className="border border-gray-400">
							<AvatarImage src="..." alt="bob" />
							<AvatarFallback>BO</AvatarFallback>
						</Avatar>
					</div>
				`
			}
		}
	}
}
