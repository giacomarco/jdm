import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        environment: "jsdom",
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
