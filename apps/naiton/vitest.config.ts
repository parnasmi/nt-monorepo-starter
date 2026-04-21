import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [svgr({ svgrOptions: { exportType: 'default' } }), react()],
	resolve: {
		alias: [
			{ find: '@/config', replacement: fileURLToPath(new URL('./config', import.meta.url)) },
			{ find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }
		]
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./src/test/setup.ts'],
		include: ['src/**/*.test.{ts,tsx}'],
		css: false
	}
})
