import type { Meta, StoryObj } from '@storybook/react-vite'
import { Spinner } from '../../../shadcn/spinner'
import { Loading } from './loading'

const meta = {
	title: 'Shared/Loading',
	component: Loading,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A loading wrapper component that conditionally renders a spinner or custom loader. Supports two modes: `default` (replaces content) and `cover` (overlays content with a semi-transparent backdrop).'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		loading: {
			description: 'When true, the spinner (or custom loader) is displayed.',
			control: 'boolean',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' }
			}
		},
		type: {
			description:
				'`default` replaces children with the spinner; `cover` overlays the spinner on top of children with a translucent backdrop.',
			control: 'select',
			options: ['default', 'cover'],
			table: {
				type: { summary: "'default' | 'cover'" },
				defaultValue: { summary: 'default' }
			}
		},
		spinnerClass: {
			description: 'Additional Tailwind classes applied to the inner `<Spinner>`. Use `size-*` to control dimensions.',
			control: 'text',
			table: {
				type: { summary: 'string' }
			}
		},
		className: {
			description: 'Additional Tailwind classes applied to the wrapper element.',
			control: 'text',
			table: {
				type: { summary: 'string' }
			}
		},
		asElement: {
			description: 'The HTML element or component to render as the wrapper.',
			control: 'text',
			table: {
				type: { summary: 'ElementType' },
				defaultValue: { summary: 'div' }
			}
		}
	}
} satisfies Meta<typeof Loading>

export default meta
type Story = StoryObj<typeof meta>

/**
 * ```tsx
 * import { Loading } from '@naiton/ui-kit'
 *
 * <Loading loading={true} />
 * ```
 */
export const Base: Story = {
	name: 'Usage',
	args: {
		loading: true
	},
	parameters: {
		docs: {
			source: {
				code: `
					import { Loading } from '@naiton/ui-kit'

					<Loading loading />
				`
			}
		}
	}
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const Default: Story = {
	render: () => (
		<div className='flex flex-col gap-6'>
			<div>
				<p className='mb-2 text-sm font-semibold'>Loading</p>
				<div className='h-24 w-64 rounded border'>
					<Loading loading={true}>
						<p className='p-4'>Content goes here</p>
					</Loading>
				</div>
			</div>
			<div>
				<p className='mb-2 text-sm font-semibold'>Not loading (shows children)</p>
				<div className='h-24 w-64 rounded border'>
					<Loading loading={false}>
						<p className='p-4'>Content goes here</p>
					</Loading>
				</div>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'In `default` mode the spinner replaces children while `loading` is true; when false, children are rendered normally.'
			},
			source: {
				code: `
					import { Loading } from '@naiton/ui-kit'

					<div className='flex flex-col gap-6'>
						<div>
							<p className='mb-2 text-sm font-semibold'>Loading</p>
							<div className='h-24 w-64 rounded border'>
								<Loading loading={true}>
									<p className='p-4'>Content goes here</p>
								</Loading>
							</div>
						</div>
						<div>
							<p className='mb-2 text-sm font-semibold'>Not loading (shows children)</p>
							<div className='h-24 w-64 rounded border'>
								<Loading loading={false}>
									<p className='p-4'>Content goes here</p>
								</Loading>
							</div>
						</div>
					</div>
				`
			}
		}
	}
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const Cover: Story = {
	render: () => (
		<div className='flex flex-col gap-6'>
			<div>
				<p className='mb-2 text-sm font-semibold'>Loading (cover)</p>
				<div className='h-24 w-64 rounded border'>
					<Loading type='cover' loading={true}>
						<div className='p-4'>
							<p className='font-medium'>Card title</p>
							<p className='text-sm text-gray-500'>Some card content hidden behind the overlay.</p>
						</div>
					</Loading>
				</div>
			</div>
			<div>
				<p className='mb-2 text-sm font-semibold'>Not loading (cover)</p>
				<div className='h-24 w-64 rounded border'>
					<Loading type='cover' loading={false}>
						<div className='p-4'>
							<p className='font-medium'>Card title</p>
							<p className='text-sm text-gray-500'>Content visible when not loading.</p>
						</div>
					</Loading>
				</div>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'In `cover` mode children are always mounted; a semi-transparent white overlay and centered spinner are placed on top while `loading` is true.'
			},
			source: {
				code: `
					import { Loading } from '@naiton/ui-kit'

					<div className='flex flex-col gap-6'>
						<div>
							<p className='mb-2 text-sm font-semibold'>Loading (cover)</p>
							<div className='h-24 w-64 rounded border'>
								<Loading type='cover' loading={true}>
									<div className='p-4'>
										<p className='font-medium'>Card title</p>
										<p className='text-sm text-gray-500'>Some card content hidden behind the overlay.</p>
									</div>
								</Loading>
							</div>
							</div>
							<div>
								<p className='mb-2 text-sm font-semibold'>Not loading (cover)</p>
								<div className='h-24 w-64 rounded border'>
								<Loading type='cover' loading={false}>
									<div className='p-4'>
										<p className='font-medium'>Card title</p>
										<p className='text-sm text-gray-500'>Content visible when not loading.</p>
									</div>
								</Loading>
							</div>
						</div>
					</div>
				`
			}
		}
	}
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const CustomLoader: Story = {
	name: 'Custom loader',
	render: () => (
		<Loading
			loading={true}
			customLoader={
				<div className='flex flex-col items-center justify-center gap-2'>
					<Spinner className='text-success-600 size-8' />
					<span className='text-xs text-gray-500'>Loading…</span>
				</div>
			}
		>
			<p className='p-4'>Content</p>
		</Loading>
	),
	parameters: {
		docs: {
			description: {
				story: 'Pass a `customLoader` node to replace the default spinner with any custom loading indicator.'
			},
			source: {
				code: `
					import { Loading, Spinner } from '@naiton/ui-kit'

					<Loading
						loading={true}
						customLoader={
							<div className='flex flex-col items-center justify-center gap-2'>
								<Spinner className='text-success-600 size-8' />
								<span className='text-xs text-gray-500'>Loading...</span>
							</div>
						}>
						<p className='p-4'>Content</p>
					</Loading>
				`
			}
		}
	}
}
