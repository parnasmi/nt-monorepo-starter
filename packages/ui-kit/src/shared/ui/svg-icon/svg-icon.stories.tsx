import type { Meta, StoryObj } from '@storybook/react-vite'
import SortIcon from '@/shared/assets/icons/sort.svg?react'
import { Button } from '../../../shadcn/button'
import { SvgIcon } from './svg-icon'

const meta = {
	title: 'Shared/SvgIcon',
	component: SvgIcon,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
A wrapper component for rendering custom SVG icons with consistent sizing and styling control.

## When to use

Use \`SvgIcon\` when you need to display custom SVG files that are **not available** in \`@fluentui/react-icons\`.
This component allows you to:
- Control icon size dynamically
- Apply Tailwind classes for colors and other styles
- Maintain consistent icon rendering across your app

## Setup Requirements

### 1. Install vite-plugin-svgr

\`\`\`bash
npm install vite-plugin-svgr -D
\`\`\`

### 2. Configure Vite

Add the plugin to your \`vite.config.ts\`:

\`\`\`typescript
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    svgr(),
    // ... other plugins
  ]
})
\`\`\`

### 3. Type safe your SVG imports

Add the file into your \`src\` folder \`vite-env.d.ts\`:

\`\`\`typescript
/// <reference types="vite-plugin-svgr/client" />
\`\`\`

### 4. Clean SVG files before use

**Critical:** Remove hardcoded styles from your SVG files to allow dynamic styling:

**❌ Before (won't accept colors):**
\`\`\`svg
<svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="..." fill="#D0D5DD"/>
  <path d="..." fill="#D0D5DD"/>
</svg>
\`\`\`

**✅ After (accepts colors via className):**
\`\`\`svg
<svg viewBox="0 0 8 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="..."/>
  <path d="..."/>
</svg>
\`\`\`

**What to remove/change:**
- Remove \`width\` and \`height\` attributes from \`<svg>\` (keep only \`viewBox\`)
- Remove \`fill="#..."\` from \`<path>\` elements
- Change \`fill="none"\` to \`fill="currentColor"\` on \`<svg>\` (or add it to paths if needed)
- Remove any \`stroke="#..."\` attributes
- Remove inline \`style\` attributes

This allows the icon to inherit color from parent elements via Tailwind's \`text-*\` classes.

### 5. Import SVG files correctly

**Important:** Always append \`?react\` to your SVG imports:

\`\`\`tsx
// ✅ Correct
import SortIcon from '@/assets/icons/sort.svg?react'

// ❌ Wrong
import SortIcon from '@/assets/icons/sort.svg'
\`\`\`

### 6. Usage

Pass the imported SVG as a JSX element to the \`icon\` prop:

\`\`\`tsx
import SortIcon from '@/assets/icons/sort.svg?react'
import { SvgIcon } from '@naiton/ui-kit'

<SvgIcon icon={<SortIcon />} width={24} height={24} className="text-gray-500" />
\`\`\`

        `
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		icon: {
			description: 'SVG React element imported with ?react suffix. Must be cleaned of hardcoded styles.',
			table: {
				type: { summary: 'ReactElement<SVGProps<SVGSVGElement>>' }
			},
			control: false
		},
		width: {
			description: 'Width of the icon in pixels',
			control: 'number',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '24' }
			}
		},
		height: {
			description: 'Height of the icon in pixels',
			control: 'number',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '24' }
			}
		},
		className: {
			description: 'CSS class names for styling. Use Tailwind text-* classes for colors (e.g., text-blue-500)',
			control: 'text',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: '""' }
			}
		}
	}
} satisfies Meta<typeof SvgIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
	name: 'Usage',
	args: {
		icon: <SortIcon />,
		width: 24,
		height: 24,
		className: 'text-gray-500'
	},
	parameters: {
		docs: {
			description: {
				story: 'Basic usage with default 24x24 size.'
			},
			source: {
				code: `
					import SortIcon from '@/shared/assets/icons/sort.svg?react'
					import { SvgIcon } from '@naiton/ui-kit'

					<SvgIcon icon={<SortIcon />} width={24} height={24} className='text-gray-500' />
				`
			}
		}
	}
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const SizeSvgIcon: Story = {
	name: 'Size',
	render: () => (
		<div className='flex flex-wrap items-end gap-4'>
			<SvgIcon icon={<SortIcon />} width={16} height={16} />
			<SvgIcon icon={<SortIcon />} width={24} height={24} />
			<SvgIcon icon={<SortIcon />} width={32} height={32} />
			<SvgIcon icon={<SortIcon />} width={48} height={48} />
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Icons can be rendered in different sizes by adjusting `width` and `height` props.'
			},
			source: {
				code: `
					import SortIcon from '@/shared/assets/icons/sort.svg?react'
					import { SvgIcon } from '@naiton/ui-kit'

					<SvgIcon icon={<SortIcon />} width={16} height={16} />
					<SvgIcon icon={<SortIcon />} width={24} height={24} />
					<SvgIcon icon={<SortIcon />} width={32} height={32} />
					<SvgIcon icon={<SortIcon />} width={48} height={48} />
				`
			}
		}
	}
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const ColorsSvgIcon: Story = {
	name: 'Colors using Tailwind classes',
	render: () => (
		<div className='flex items-center gap-4'>
			<SvgIcon icon={<SortIcon />} className='text-blue-500' />
			<SvgIcon icon={<SortIcon />} className='text-green-600' />
			<SvgIcon icon={<SortIcon />} className='text-red-500' />
			<SvgIcon icon={<SortIcon />} className='text-purple-600' />
			<SvgIcon icon={<SortIcon />} className='text-gray-400' />
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Apply Tailwind color classes via the `className` prop. The SVG should use `currentColor` for fill/stroke to inherit text color. You can also give via `style={{ color: "..." }}` if needed.'
			},
			source: {
				code: `
					import SortIcon from '@/shared/assets/icons/sort.svg?react'
					import { SvgIcon } from '@naiton/ui-kit'

					<SvgIcon icon={<SortIcon />} className="text-blue-500" />
					<SvgIcon icon={<SortIcon />} className="text-green-600" />
					<SvgIcon icon={<SortIcon />} className="text-red-500" />
				`
			}
		}
	}
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const ButtonSvgIcon: Story = {
	render: () => (
		<div className='flex items-center gap-3'>
			<Button>
				<SvgIcon icon={<SortIcon />} width={16} height={16} />
				<span>Sort</span>
			</Button>
			<Button variant='outline' className='text-gray-500'>
				<span>Sort</span>
				<SvgIcon icon={<SortIcon />} width={16} height={16} />
			</Button>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Common use case: placing icons inside buttons with text labels.'
			},
			source: {
				code: `
					import SortIcon from '@/shared/assets/icons/sort.svg?react'
					import { Button, SvgIcon } from '@naiton/ui-kit'

					<Button>
						<SvgIcon icon={<SortIcon />} width={16} height={16} />
						<span>Sort</span>
					</Button>
					<Button variant="outline" className="text-gray-500">
						<span>Sort</span>
						<SvgIcon icon={<SortIcon />} width={16} height={16} />
					</Button>
				`
			}
		}
	}
}
