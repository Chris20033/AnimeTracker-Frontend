import { defineConfig, devices } from '@playwright/test'

const frontendUrl = process.env.E2E_FRONTEND_URL ?? 'http://localhost:5173'
const backendUrl = process.env.E2E_BACKEND_URL ?? 'http://localhost:3000'

export default defineConfig({
  testDir: './e2e',
  timeout: 60_000,
  expect: {
    timeout: 15_000,
  },
  fullyParallel: false,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: frontendUrl,
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1',
    url: frontendUrl,
    reuseExistingServer: true,
    timeout: 120_000,
    env: {
      VITE_API_URL: `${backendUrl}/api`,
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
