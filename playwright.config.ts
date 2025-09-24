import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  use: { baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://localhost:5173" },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: "pnpm -C apps/blog dev",
    cwd: process.cwd(),
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
    timeout: 120000
  }
});
