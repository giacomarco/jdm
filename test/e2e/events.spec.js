import { test, expect } from "./helpers.js";

test.describe("Event handlers (DOM)", () => {
    test("addEventListener + removeEventListener", async ({ jdm: page }) => {
        const calls = await page.evaluate(() => {
            const btn = new window.Jdm("<button></button>", document.body);
            let n = 0;
            const fn = () => n++;
            btn.jdm_addEventListener("click", fn);
            btn.dispatchEvent(new MouseEvent("click"));
            btn.jdm_removeEventListener("click", fn);
            btn.dispatchEvent(new MouseEvent("click"));
            return n;
        });
        expect(calls).toBe(1);
    });

    test("genEvent dispatcha CustomEvent con detail", async ({ jdm: page }) => {
        const detail = await page.evaluate(() => {
            const el = new window.Jdm("<div></div>", document.body);
            let payload = null;
            el.addEventListener("custom", e => {
                payload = e.detail;
            });
            el.jdm_genEvent("custom", { foo: 1 });
            return payload;
        });
        expect(detail).toEqual({ foo: 1 });
    });

    test("onInput / onChange / onSelect / onClick / onDoubleClick / onRightClick / onInvalid / onLoad / onError", async ({ jdm: page }) => {
        const result = await page.evaluate(async () => {
            const input = new window.Jdm('<input type="text">', document.body);
            const counts = { input: 0, change: 0, select: 0, click: 0, dblclick: 0, contextmenu: 0, invalid: 0 };
            input.jdm_onInput(() => counts.input++);
            input.jdm_onChange(() => counts.change++);
            input.jdm_onSelect(() => counts.select++);
            input.jdm_onClick(() => counts.click++);
            input.jdm_onDoubleClick(() => counts.dblclick++);
            input.jdm_onRightClick(() => counts.contextmenu++);
            input.jdm_onInvalid(() => counts.invalid++);

            input.dispatchEvent(new Event("input"));
            input.dispatchEvent(new Event("change"));
            input.dispatchEvent(new Event("select"));
            input.dispatchEvent(new MouseEvent("click"));
            input.dispatchEvent(new MouseEvent("dblclick"));
            input.dispatchEvent(new MouseEvent("contextmenu"));
            input.dispatchEvent(new Event("invalid"));
            return counts;
        });
        expect(result).toEqual({ input: 1, change: 1, select: 1, click: 1, dblclick: 1, contextmenu: 1, invalid: 1 });
    });

    test("onSubmit su form", async ({ jdm: page }) => {
        const fired = await page.evaluate(() => {
            const f = new window.Jdm("<form><button>x</button></form>", document.body);
            let n = 0;
            f.jdm_onSubmit(e => {
                e.preventDefault();
                n++;
            });
            f.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
            return n;
        });
        expect(fired).toBe(1);
    });

    test("onDebounce raggruppa chiamate", async ({ jdm: page }) => {
        const n = await page.evaluate(async () => {
            const input = new window.Jdm('<input type="text">', document.body);
            let count = 0;
            input.jdm_onDebounce(() => count++, 30);
            input.dispatchEvent(new Event("input"));
            input.dispatchEvent(new Event("input"));
            input.dispatchEvent(new Event("input"));
            await new Promise(r => setTimeout(r, 80));
            return count;
        });
        expect(n).toBe(1);
    });

    test("opt forward: preservePrevEvent=true accumula listener", async ({ jdm: page }) => {
        const result = await page.evaluate(() => {
            const btn = new window.Jdm("<button></button>", document.body);
            let a = 0,
                b = 0;
            btn.jdm_onClick(() => a++, { preservePrevEvent: true });
            btn.jdm_onClick(() => b++, { preservePrevEvent: true });
            btn.dispatchEvent(new MouseEvent("click"));
            return { a, b };
        });
        expect(result).toEqual({ a: 1, b: 1 });
    });

    test("opt forward: jdm_once fire una sola volta", async ({ jdm: page }) => {
        const n = await page.evaluate(() => {
            const btn = new window.Jdm("<button></button>", document.body);
            let count = 0;
            btn.jdm_onClick(() => count++, { jdm_once: true });
            btn.dispatchEvent(new MouseEvent("click"));
            btn.dispatchEvent(new MouseEvent("click"));
            return count;
        });
        expect(n).toBe(1);
    });
});
