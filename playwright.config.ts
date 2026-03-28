import { defineConfig, devices } from '@playwright/test';

/** Local dev server (default). Set `E2E_BASE_URL` for deployed smoke (e.g. https://….web.app). */
const baseURL =
  process.env['E2E_BASE_URL']?.trim() || 'http://127.0.0.1:4311';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  workers: 1,
  retries: process.env['CI'] ? 2 : 0,
  reporter: process.env['CI'] ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL,
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
