import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [sveltekit()],
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
