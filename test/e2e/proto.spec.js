import { test, expect } from "./helpers.js";

test.describe("Proto patches (String/Number)", () => {
    test("'true'.toBoolean → true", async ({ jdm: page }) => {
        expect(await page.evaluate(() => "true".toBoolean())).toBe(true);
    });

    test("'false'.toBoolean → false", async ({ jdm: page }) => {
        expect(await page.evaluate(() => "false".toBoolean())).toBe(false);
    });

    test("'yes'/'no'/'1'/'0' supportati", async ({ jdm: page }) => {
        const res = await page.evaluate(() => [
            "yes".toBoolean(),
            "no".toBoolean(),
            "1".toBoolean(),
            "0".toBoolean(),
        ]);
        expect(res).toEqual([true, false, true, false]);
    });

    test("toBoolean throw su input invalido", async ({ jdm: page }) => {
        const threw = await page.evaluate(() => {
            try {
                "maybe".toBoolean();
                return false;
            } catch (e) {
                return /Invalid boolean string/.test(e.message);
            }
        });
        expect(threw).toBe(true);
    });

    test("toCapitalize prima lettera maiuscola", async ({ jdm: page }) => {
        expect(await page.evaluate(() => "ciao".toCapitalize())).toBe("Ciao");
    });

    test("(1).toBoolean → true, (0).toBoolean → false", async ({ jdm: page }) => {
        const res = await page.evaluate(() => [(1).toBoolean(), (0).toBoolean()]);
        expect(res).toEqual([true, false]);
    });

    test("Number.toBoolean throw su altri", async ({ jdm: page }) => {
        const threw = await page.evaluate(() => {
            try {
                (2).toBoolean();
                return false;
            } catch {
                return true;
            }
        });
        expect(threw).toBe(true);
    });
});
