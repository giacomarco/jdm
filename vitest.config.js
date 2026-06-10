import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        environment: "jsdom",
        // exclude Playwright e2e specs (run via `npm run test:e2e` instead)
        exclude: ["**/node_modules/**", "**/test/e2e/**", "**/dist/**"],
        reporters: [
            ["json", { outputFile: "./test/test-results.json" }],
            ["junit", { outputFile: "./test/junit-report.xml" }],
        ],
        coverage: {
            provider: "v8",
            reporter: ["text", "html", "json"],
            reportsDirectory: "./test/coverage",
            include: ["src/**/*.js"],
        },
    },
});
