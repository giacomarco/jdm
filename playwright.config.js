// @ts-check
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    testDir: "./test/e2e",
    testMatch: /.*\.spec\.js$/,
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 2 : undefined,
    reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",

    use: {
        baseURL: "http://127.0.0.1:5173",
        trace: "on-first-retry",
        screenshot: "only-on-failure",
    },

    projects: [
        { name: "chromium", use: { ...devices["Desktop Chrome"] } },
        { name: "firefox", use: { ...devices["Desktop Firefox"] } },
        { name: "webkit", use: { ...devices["Desktop Safari"] } },
    ],

    webServer: {
        command: "npx http-server -p 5173 -c-1 --silent",
        url: "http://127.0.0.1:5173/test/e2e/fixture.html",
        reuseExistingServer: !process.env.CI,
        timeout: 30_000,
    },
});
