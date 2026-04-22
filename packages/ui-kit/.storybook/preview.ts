// @ts-ignore
import '../src/styles/_tailwind.css'
import type { Preview } from '@storybook/react-vite'

const preview: Preview = {
	parameters: {
		options: {
			storySort: {
				order: ['Welcome', '*']
			}
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		}
	}
}

export default preview
