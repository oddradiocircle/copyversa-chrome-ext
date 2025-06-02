import { defineConfig, devices } from '@playwright/test';
import path from 'path';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests/playwright',
  fullyParallel: false, // Disable parallel execution for extension tests
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, // Use single worker for extension tests
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    headless: false, // Extensions require headed mode
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        channel: 'chrome', // Use actual Chrome instead of Chromium
        launchOptions: {
          args: [
            `--disable-extensions-except=${path.resolve('./dist')}`,
            `--load-extension=${path.resolve('./dist')}`,
            '--no-first-run',
            '--no-default-browser-check',
            '--disable-dev-shm-usage',
            '--no-sandbox',
            '--disable-web-security',
            '--disable-blink-features=AutomationControlled',
          ],
        },
      },
    },
  ],
});
