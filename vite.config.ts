import { defineConfig } from 'vite';
import { vitePlugin as remix } from '@remix-run/dev';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_lazyRouteDiscovery: false,
        v3_singleFetch: false,
      },
      routes(defineRoutes) {
        return defineRoutes((route) => {
          route('/auth/*', 'service-route.js', { id: 'auth' }),
          route('/-/*', 'service-route.js', { id: 'service' })
        });
      },
    }),
    tailwindcss(),
    tsconfigPaths(),
    viteCommonjs({
      include: ['util'],
    }),
  ],
  optimizeDeps: {
    include: ['react', 'react-dom', '@kottster/common', '@kottster/server'],
    exclude: ['@kottster/react'],
  },
});