import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.pw.ts',
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  timeout: 45_000,
  use: {
    baseURL: 'http://127.0.0.1:3101',
    browserName: 'chromium',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'node node_modules/next/dist/bin/next dev --hostname 127.0.0.1 --port 3101',
    url: 'http://127.0.0.1:3101/ui-test',
    timeout: 120_000,
    reuseExistingServer: false,
    env: {
      POKEORI_UI_TEST: '1',
      POKEORI_TEST_DIST_DIR: '.next-e2e',
      DATABASE_URI: 'mongodb://127.0.0.1:27028/pokeori_e2e_test?replicaSet=audit-rs&directConnection=true',
      REDIS_URL: 'redis://127.0.0.1:6399',
      PAYLOAD_SECRET: 'isolated-browser-test-secret-not-for-production',
      RESEND_API_KEY: 're_isolated_test',
      BETA_INVITATION_SECRET: 'isolated-browser-invitation-secret-not-for-production',
      CSP_ENFORCE: 'true',
    },
  },
})
