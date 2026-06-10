// shared helpers for jdm3 playwright specs
import { test as base, expect } from "@playwright/test";

export const test = base.extend({
    /** auto-navigates to fixture and waits for window.Jdm */
    jdm: async ({ page }, use) => {
        await page.goto("/test/e2e/fixture.html");
        await page.waitForFunction(() => window.__jdmReady === true);
        await use(page);
    },
});

export { expect };
