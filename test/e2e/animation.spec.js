import { test, expect } from "./helpers.js";

test.describe("Animation (browser-real)", () => {
    test("jdm_hide imposta visibility=hidden + opacity=0", async ({ jdm: page }) => {
        const result = await page.evaluate(() => {
            const el = new window.Jdm("<div>x</div>", document.body);
            el.jdm_hide();
            return { vis: el.style.visibility, op: el.style.opacity };
        });
        expect(result).toEqual({ vis: "hidden", op: "0" });
    });

    test("jdm_show ripristina visibility + opacity (Round 3 fix)", async ({ jdm: page }) => {
        const result = await page.evaluate(() => {
            const el = new window.Jdm("<div>x</div>", document.body);
            el.jdm_hide();
            el.jdm_show();
            return { vis: el.style.visibility, op: el.style.opacity };
        });
        expect(result).toEqual({ vis: "visible", op: "1" });
    });

    test("jdm_fadeIn invoca animate() e callback al termine", async ({ jdm: page }) => {
        const result = await page.evaluate(async () => {
            const el = new window.Jdm("<div>x</div>", document.body);
            let done = false;
            await new Promise(resolve => {
                el.jdm_fadeIn(
                    () => {
                        done = true;
                        resolve();
                    },
                    { duration: 30 },
                );
            });
            return done;
        });
        expect(result).toBe(true);
    });

    test("jdm_rotation 2 keyframes (Lista C)", async ({ jdm: page }) => {
        const result = await page.evaluate(async () => {
            const { keyframe } = await import("/src/_animation.js");
            const frames = keyframe.rotation(90);
            return { len: frames.length, start: frames[0].transform, end: frames[1].transform };
        });
        expect(result).toEqual({ len: 2, start: "rotate(0deg)", end: "rotate(90deg)" });
    });

    test("jdm_clearAnimations cancella animazioni attive", async ({ jdm: page }) => {
        const result = await page.evaluate(async () => {
            const el = new window.Jdm("<div>x</div>", document.body);
            el.jdm_fadeIn(() => {}, { duration: 5000 });
            const beforeCount = el.getAnimations().length;
            el.jdm_clearAnimations();
            const afterCount = el.getAnimations().filter(a => a.playState === "running").length;
            return { beforeCount, afterCount };
        });
        expect(result.beforeCount).toBeGreaterThan(0);
        expect(result.afterCount).toBe(0);
    });

    test("jdm_cancelAnimations preserva transform/opacity (Tier 1)", async ({ jdm: page }) => {
        const result = await page.evaluate(() => {
            const el = new window.Jdm("<div>x</div>", document.body);
            el.style.transform = "rotate(45deg)";
            el.style.opacity = "0.5";
            el.jdm_cancelAnimations();
            return { transform: el.style.transform, opacity: el.style.opacity };
        });
        expect(result.transform).toContain("rotate");
        expect(result.opacity).toBe("0.5");
    });

    test("jdm_resetStyles rimuove attributo style", async ({ jdm: page }) => {
        const result = await page.evaluate(() => {
            const el = new window.Jdm("<div></div>", document.body);
            el.style.color = "red";
            const before = el.hasAttribute("style");
            const fnType = typeof el.jdm_resetStyles;
            el.jdm_resetStyles();
            const after = el.hasAttribute("style");
            const afterColor = el.style.color;
            return { before, fnType, after, afterColor };
        });
        expect(result.fnType).toBe("function");
        expect(result.before).toBe(true);
        expect(result.afterColor).toBe("");
        expect(result.after).toBe(false);
    });

    test.each = undefined;

    for (const method of [
        "fadeIn",
        "fadeInDown",
        "fadeInUp",
        "fadeInLeft",
        "fadeInRight",
        "fadeOut",
        "fadeOutDown",
        "fadeOutUp",
        "fadeOutLeft",
        "fadeOutRight",
        "bounce",
        "tada",
        "zoomIn",
        "zoomOut",
    ]) {
        test(`jdm_${method} chiama animate + callback`, async ({ jdm: page }) => {
            const ok = await page.evaluate(async m => {
                const el = new window.Jdm("<div>x</div>", document.body);
                let fired = false;
                await new Promise(resolve => {
                    el[`jdm_${m}`](
                        () => {
                            fired = true;
                            resolve();
                        },
                        { duration: 20 },
                    );
                });
                return fired;
            }, method);
            expect(ok).toBe(true);
        });
    }

    test("jdm_rotation chiama animate + callback", async ({ jdm: page }) => {
        const ok = await page.evaluate(async () => {
            const el = new window.Jdm("<div>x</div>", document.body);
            let fired = false;
            await new Promise(resolve => {
                el.jdm_rotation(
                    () => {
                        fired = true;
                        resolve();
                    },
                    180,
                    { duration: 30 },
                );
            });
            return fired;
        });
        expect(ok).toBe(true);
    });
});
