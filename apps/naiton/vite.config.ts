import { defineConfig } from 'vite';
import viteReact from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => ({
  build: { sourcemap: true },
  plugins: [
    svgr({ svgrOptions: { exportType: 'default' } }),
    viteReact(),
    tailwindcss(),
  ],
  clearScreen: false,
  resolve: {
    alias: [
      { find: '@/config', replacement: '/config' },
      { find: '@', replacement: '/src' },
    ],
  },
  define: {
    __IS_DEV__: JSON.stringify(mode === 'development'),
    __PROJECT__: JSON.stringify('frontend'),
    'import.meta.env.VITE_APP_VERSION': JSON.stringify('1.0.0'),
  },
  server: { port: 5175 },
}));
