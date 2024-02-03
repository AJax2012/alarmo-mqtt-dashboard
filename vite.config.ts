import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'build',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
  server: {
    watch: {
      usePolling: true,
    },
    port: 7070,
    strictPort: true,
    host: true,
    origin: 'http://0.0.0.0:7070',
  },
});
