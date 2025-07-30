import { defineConfig } from 'vite';
import { vitePlugin as kottster } from '@kottster/react';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  root: './app',
  server: {
    port: 5480,
    open: false,
  },
  build: {
    outDir: '../dist/client',
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000,
  },
  plugins: [
    kottster(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': '/app'
    }
  },
});