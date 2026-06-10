import { test, expect } from "./helpers.js";

test.describe("Attribute & ClassList", () => {
    test("setAttribute / getAttribute", async ({ jdm: page }) => {
        const v = await page.evaluate(() => {
            const el = new window.Jdm("<div></div>", document.body);
            el.jdm_setAttribute("data-x", "y");
            return el.jdm_getAttribute("data-x");
        });
        expect(v).toBe("y");
    });

    test("setAttribute senza valore → '' (non 'null')", async ({ jdm: page }) => {
        const v = await page.evaluate(() => {
            const el = new window.Jdm("<div></div>", document.body);
            el.jdm_setAttribute("data-flag");
            return el.getAttribute("data-flag");
        });
        expect(v).toBe("");
    });

    test("setAttribute nome vuoto non lancia", async ({ jdm: page }) => {
        const ok = await page.evaluate(() => {
            const el = new window.Jdm("<div></div>", document.body);
            try {
                el.jdm_setAttribute("", "v");
                return true;
            } catch {
                return false;
            }
        });
        expect(ok).toBe(true);
    });

    test("addId imposta id", async ({ jdm: page }) => {
        const id = await page.evaluate(() => {
            const el = new window.Jdm("<div></div>", document.body);
            el.jdm_addId("myid");
            return el.id;
        });
        expect(id).toBe("myid");
    });

    test("removeAttribute rimuove", async ({ jdm: page }) => {
        const has = await page.evaluate(() => {
            const el = new window.Jdm('<div data-x="y"></div>', document.body);
            el.jdm_removeAttribute("data-x");
            return el.hasAttribute("data-x");
        });
        expect(has).toBe(false);
    });

    test("addClassList singolo + array", async ({ jdm: page }) => {
        const list = await page.evaluate(() => {
            const el = new window.Jdm("<div></div>", document.body);
            el.jdm_addClassList("foo");
            el.jdm_addClassList(["bar", "baz"]);
            return [...el.classList];
        });
        expect(list).toEqual(["foo", "bar", "baz"]);
    });

    test("removeClassList", async ({ jdm: page }) => {
        const list = await page.evaluate(() => {
            const el = new window.Jdm('<div class="a b c"></div>', document.body);
            el.jdm_removeClassList(["a", "c"]);
            return [...el.classList];
        });
        expect(list).toEqual(["b"]);
    });

    test("toggleClassList", async ({ jdm: page }) => {
        const list = await page.evaluate(() => {
            const el = new window.Jdm('<div class="a"></div>', document.body);
            el.jdm_toggleClassList(["a", "b"]);
            return [...el.classList];
        });
        expect(list).toEqual(["b"]);
    });

    test("findClassList every (default)", async ({ jdm: page }) => {
        const result = await page.evaluate(() => {
            const el = new window.Jdm('<div class="a b"></div>', document.body);
            return {
                bothPresent: el.jdm_findClassList(["a", "b"]),
                missingOne: el.jdm_findClassList(["a", "x"]),
                someMissing: el.jdm_findClassList(["a", "x"], true),
            };
        });
        expect(result.bothPresent).toBe(true);
        expect(result.missingOne).toBe(false);
        expect(result.someMissing).toBe(true);
    });
});
