import { test, expect } from "./helpers.js";

test.describe("Tier 1 — pure API additions", () => {
    test("Jdm.use plugin riceve ctx con moduli", async ({ jdm: page }) => {
        const result = await page.evaluate(async () => {
            const { _core, _evt, _common, _animation } = await import("/src/jdm.js").then(() =>
                import("/src/_core.js").then(c => ({
                    _core: c._core,
                })),
            );
            let ok = false;
            window.Jdm.use(ctx => {
                ok = !!(ctx.Jdm && ctx._core && ctx._evt && ctx._common && ctx._animation);
            });
            return ok;
        });
        expect(result).toBe(true);
    });

    test("Jdm.use estende prototype + invalidate cache → nuovo nodo ha metodo", async ({ jdm: page }) => {
        const ok = await page.evaluate(() => {
            window.Jdm.use(({ Jdm }) => {
                Jdm.prototype.jdm_pluginPing = function () {
                    this.node.setAttribute("data-ping", "pong");
                    return this.node;
                };
            });
            window.Jdm._invalidateMethodCache();
            const el = new window.Jdm("<div></div>", document.body);
            el.jdm_pluginPing();
            return el.getAttribute("data-ping") === "pong";
        });
        expect(ok).toBe(true);
    });

    test("jdm_waitFor risolve con event", async ({ jdm: page }) => {
        const type = await page.evaluate(async () => {
            const el = new window.Jdm("<button></button>", document.body);
            const p = el.jdm_waitFor("click");
            queueMicrotask(() => el.dispatchEvent(new MouseEvent("click")));
            const e = await p;
            return e.type;
        });
        expect(type).toBe("click");
    });

    test("jdm_waitFor timeout reject", async ({ jdm: page }) => {
        const rejected = await page.evaluate(async () => {
            const el = new window.Jdm("<button></button>", document.body);
            try {
                await el.jdm_waitFor("click", { timeout: 30 });
                return false;
            } catch (e) {
                return /timeout/.test(e.message);
            }
        });
        expect(rejected).toBe(true);
    });

    test("jdm_waitFor abort reject", async ({ jdm: page }) => {
        const rejected = await page.evaluate(async () => {
            const el = new window.Jdm("<button></button>", document.body);
            const ctrl = new AbortController();
            const p = el.jdm_waitFor("click", { signal: ctrl.signal });
            ctrl.abort();
            try {
                await p;
                return false;
            } catch (e) {
                return /aborted/.test(e.message);
            }
        });
        expect(rejected).toBe(true);
    });

    test("jdm_delegate solo target che matcha", async ({ jdm: page }) => {
        const result = await page.evaluate(() => {
            const root = new window.Jdm('<div><button class="x">a</button><span>b</span></div>', document.body);
            let a = 0,
                b = 0;
            root.jdm_delegate("click", ".x", () => a++);
            root.querySelector("button").dispatchEvent(new MouseEvent("click", { bubbles: true }));
            root.querySelector("span").dispatchEvent(new MouseEvent("click", { bubbles: true }));
            return { a, b };
        });
        expect(result.a).toBe(1);
    });

    test("jdm_delegate unsubscribe", async ({ jdm: page }) => {
        const n = await page.evaluate(() => {
            const root = new window.Jdm('<div><button class="x">a</button></div>', document.body);
            let count = 0;
            const unsub = root.jdm_delegate("click", ".x", () => count++);
            unsub();
            root.querySelector("button").dispatchEvent(new MouseEvent("click", { bubbles: true }));
            return count;
        });
        expect(n).toBe(0);
    });

    test("jdm_batch esegue in rAF e risolve con nodo", async ({ jdm: page }) => {
        const result = await page.evaluate(async () => {
            const el = new window.Jdm("<div></div>", document.body);
            const r = await el.jdm_batch(n => {
                n.classList.add("a");
                n.classList.add("b");
            });
            return { same: r === el, classes: [...el.classList] };
        });
        expect(result.same).toBe(true);
        expect(result.classes).toEqual(["a", "b"]);
    });

    test("jdm_batch swallow errore + risolve", async ({ jdm: page }) => {
        const ok = await page.evaluate(async () => {
            const el = new window.Jdm("<div></div>", document.body);
            await el.jdm_batch(() => {
                throw new Error("inner");
            });
            return true;
        });
        expect(ok).toBe(true);
    });

    test("Jdm.inspect non crasha su null/valid", async ({ jdm: page }) => {
        const ok = await page.evaluate(() => {
            try {
                window.Jdm.inspect(null);
                const el = new window.Jdm('<div><span data-name="x">a</span></div>', document.body);
                window.Jdm.inspect(el);
                return true;
            } catch {
                return false;
            }
        });
        expect(ok).toBe(true);
    });

    test("Jdm.version match semver", async ({ jdm: page }) => {
        expect(await page.evaluate(() => window.Jdm.version)).toMatch(/^\d+\.\d+\.\d+/);
    });
});
