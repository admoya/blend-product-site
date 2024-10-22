import { sentrySvelteKit } from '@sentry/sveltekit';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { enhancedImages } from '@sveltejs/enhanced-img';
import createAppThemeManifest from './createAppThemeManifest';

export default defineConfig({
  plugins: [
    sentrySvelteKit({
      sourceMapsUploadOptions: {
        org: 'csma-technology',
        project: 'blend-product-site',
      },
    }),
    enhancedImages(),
    sveltekit(),
    createAppThemeManifest(),
  ],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
    setupFiles: ['tests/vitest-setup.ts'],
    restoreMocks: true,
    coverage: {
      enabled: true,
      reporter: ['text'],
      include: ['src/routes/api/**/+server.{js,ts}'], // We're using Vitest to test API routes only for now, so that is all we want coverage reports fo
    },
  },
});
