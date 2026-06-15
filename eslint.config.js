import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";

export default [
    {
        ignores: ["dist/**", "docs/**", "test/coverage/**", "test-results/**", "node_modules/**", "playwright-report/**"],
    },
    js.configs.recommended,
    {
        files: ["src/**/*.js", "index.js"],
        languageOptions: {
            ecmaVersion: 2024,
            sourceType: "module",
            // JDM/Jdm are registered as window globals at module load (jdm.js bottom).
            globals: { ...globals.browser, ...globals.node, JDM: "readonly", Jdm: "readonly" },
        },
        rules: {
            "no-unused-vars": ["warn", { args: "none", varsIgnorePattern: "^_" }],
            "no-empty": ["warn", { allowEmptyCatch: true }],
            "no-prototype-builtins": "off",
        },
    },
    {
        files: ["test/**/*.js", "test/**/*.spec.js"],
        languageOptions: {
            ecmaVersion: 2024,
            sourceType: "module",
            // JDM global is set in the test bootstrap; Playwright injects page/expect via imports.
            globals: { ...globals.browser, ...globals.node, JDM: "readonly", Jdm: "readonly" },
        },
        rules: {
            "no-unused-vars": "off",
        },
    },
    {
        files: ["scripts/**/*.mjs", "*.config.js", "*.config.mjs"],
        languageOptions: {
            ecmaVersion: 2024,
            sourceType: "module",
            globals: { ...globals.node },
        },
    },
    prettier,
];
