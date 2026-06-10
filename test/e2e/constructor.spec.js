import { test, expect } from "./helpers.js";

test.describe("Constructor / init", () => {
    test("crea da tag string", async ({ jdm: page }) => {
        const tag = await page.evaluate(() => {
            const el = window.Jdm.prototype.constructor.length;
            const node = new window.Jdm("span", document.body);
            return node.tagName;
        });
        expect(tag).toBe("SPAN");
    });

    test("crea da stringa HTML completa", async ({ jdm: page }) => {
        const result = await page.evaluate(() => {
            const node = new window.Jdm("<p>paragrafo</p>", document.body);
            return { tag: node.tagName, text: node.textContent };
        });
        expect(result).toEqual({ tag: "P", text: "paragrafo" });
    });

    test("wrappa elemento DOM esistente", async ({ jdm: page }) => {
        const tag = await page.evaluate(() => {
            const existing = document.createElement("section");
            document.body.appendChild(existing);
            const node = new window.Jdm(existing);
            return node.tagName;
        });
        expect(tag).toBe("SECTION");
    });

    test("classList passata al costruttore", async ({ jdm: page }) => {
        const classes = await page.evaluate(() => {
            const node = new window.Jdm("<div></div>", document.body, ["foo", "bar"]);
            return [...node.classList];
        });
        expect(classes).toEqual(["foo", "bar"]);
    });

    test("deep=true popola jdm_childNode", async ({ jdm: page }) => {
        const has = await page.evaluate(() => {
            const node = new window.Jdm('<div><span data-name="titolo">X</span></div>', document.body);
            return !!node.jdm_childNode?.titolo;
        });
        expect(has).toBe(true);
    });

    test("deep=false non processa figli", async ({ jdm: page }) => {
        const has = await page.evaluate(() => {
            const node = new window.Jdm('<div><span data-name="x">X</span></div>', document.body, null, false);
            return node.jdm_childNode === undefined || Object.keys(node.jdm_childNode).length === 0;
        });
        expect(has).toBe(true);
    });

    test("crea SVG path", async ({ jdm: page }) => {
        const tag = await page.evaluate(() => {
            const node = new window.Jdm('<path d="M0 0 L10 10"/>', document.body);
            return node.tagName.toLowerCase();
        });
        expect(tag).toBe("path");
    });

    test("JDM(null) crea jdm-element custom element", async ({ jdm: page }) => {
        const tag = await page.evaluate(() => {
            const node = new window.Jdm(null, document.body);
            return node.tagName;
        });
        expect(tag).toBe("JDM-ELEMENT");
    });

    test("Jdm.version esposto", async ({ jdm: page }) => {
        const v = await page.evaluate(() => window.Jdm.version);
        expect(v).toMatch(/^\d+\.\d+\.\d+/);
    });
});
