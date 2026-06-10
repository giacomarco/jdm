import { test, expect } from "./helpers.js";

test.describe("Event bus globale + per-elemento", () => {
    test("Jdm.on + Jdm.emit", async ({ jdm: page }) => {
        const payload = await page.evaluate(() => {
            let received = null;
            window.Jdm.on("test", d => {
                received = d;
            });
            window.Jdm.emit("test", { x: 1 });
            return received;
        });
        expect(payload).toEqual({ x: 1 });
    });

    test("Jdm.off rimuove listener", async ({ jdm: page }) => {
        const n = await page.evaluate(() => {
            let count = 0;
            const fn = () => count++;
            window.Jdm.on("off_test", fn);
            window.Jdm.off("off_test", fn);
            window.Jdm.emit("off_test");
            return count;
        });
        expect(n).toBe(0);
    });

    test("Jdm.once fire una sola volta", async ({ jdm: page }) => {
        const n = await page.evaluate(() => {
            let count = 0;
            window.Jdm.once("once_test", () => count++);
            window.Jdm.emit("once_test");
            window.Jdm.emit("once_test");
            return count;
        });
        expect(n).toBe(1);
    });

    test("emit snapshot: off durante emit non skippa successivi", async ({ jdm: page }) => {
        const order = await page.evaluate(() => {
            const acc = [];
            const h1 = () => {
                acc.push("h1");
                window.Jdm.off("snap", h1);
            };
            window.Jdm.on("snap", h1);
            window.Jdm.on("snap", () => acc.push("h2"));
            window.Jdm.on("snap", () => acc.push("h3"));
            window.Jdm.emit("snap");
            return acc;
        });
        expect(order).toEqual(["h1", "h2", "h3"]);
    });

    test("onceElement auto-remove dopo primo fire (multi-dispatch)", async ({ jdm: page }) => {
        const n = await page.evaluate(async () => {
            const { _evt } = await import("/src/_evt.js");
            const el = new window.Jdm("<button></button>", document.body);
            let count = 0;
            _evt.jdm_onceElement(el, "click", () => count++);
            el.dispatchEvent(new MouseEvent("click"));
            el.dispatchEvent(new MouseEvent("click"));
            el.dispatchEvent(new MouseEvent("click"));
            return count;
        });
        expect(n).toBe(1);
    });

    test("offElement con fn rimuove solo quello", async ({ jdm: page }) => {
        const result = await page.evaluate(async () => {
            const { _evt } = await import("/src/_evt.js");
            const el = new window.Jdm("<button></button>", document.body);
            let a = 0,
                b = 0;
            const fnA = () => a++;
            const fnB = () => b++;
            _evt.jdm_onElement(el, "click", fnA, { preservePrevEvent: true });
            _evt.jdm_onElement(el, "click", fnB, { preservePrevEvent: true });
            _evt.jdm_offElement(el, "click", fnA);
            el.dispatchEvent(new MouseEvent("click"));
            return { a, b };
        });
        expect(result).toEqual({ a: 0, b: 1 });
    });
});
