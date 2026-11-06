import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import pkg from './package.json';

export default defineConfig({
  plugins: [vue()],
  envPrefix: ['VITE_', 'DEBUGFAST_API_KEY'],
  build: { sourcemap: 'hidden' },
  define: { __RELEASE__: JSON.stringify(pkg.version) },
});
