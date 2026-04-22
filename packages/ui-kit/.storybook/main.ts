import path from 'path'
import { fileURLToPath } from 'url'
import type { StorybookConfig } from '@storybook/react-vite'
import tailwindcss from '@tailwindcss/vite'
import { mergeConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const config: StorybookConfig = {
	docs: {
		// @ts-ignore
		autodocs: 'tag'
	},
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: ['@storybook/addon-a11y', '@storybook/addon-docs', '@storybook/addon-onboarding', '@storybook/addon-designs'],
	framework: '@storybook/react-vite',
	async viteFinal(config) {
		return mergeConfig(config, {
			plugins: [svgr({ svgrOptions: { exportType: 'default' } }), tailwindcss()],
			resolve: {
				alias: {
					'@': path.resolve(__dirname, '../src')
				}
			}
		})
	}
}

export default config
