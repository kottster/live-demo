import { defineConfig } from 'vite';
import { vitePlugin as kottster } from '@kottster/react';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  root: './app',
  server: {
    port: 5480,
    open: true,
  },
  build: {
    outDir: '../dist/client',
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000,
  },
  plugins: [
    react(),
    kottster(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': '/app'
    }
  },
});