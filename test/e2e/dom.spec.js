import { test, expect } from "./helpers.js";

test.describe("DOM insertion", () => {
    test("append singolo + lista", async ({ jdm: page }) => {
        const tags = await page.evaluate(() => {
            const root = new window.Jdm("<div></div>", document.body);
            const a = new window.Jdm("<span>a</span>");
            const b = new window.Jdm("<span>b</span>");
            root.jdm_append(a);
            root.jdm_append([b]);
            return [...root.children].map(c => c.textContent);
        });
        expect(tags).toEqual(["a", "b"]);
    });

    test("prepend lista mantiene ordine", async ({ jdm: page }) => {
        const order = await page.evaluate(() => {
            const root = new window.Jdm("<div><p>x</p></div>", document.body);
            const a = new window.Jdm("<span>a</span>");
            const b = new window.Jdm("<span>b</span>");
            root.jdm_prepend([a, b]);
            return [...root.children].map(c => c.textContent);
        });
        expect(order).toEqual(["b", "a", "x"]);
    });

    test("appendBefore inserisce prima del nodo", async ({ jdm: page }) => {
        const order = await page.evaluate(() => {
            const parent = new window.Jdm("<div></div>", document.body);
            const ref = new window.Jdm("<span>ref</span>", parent);
            const newEl = new window.Jdm("<span>new</span>");
            ref.jdm_appendBefore(newEl);
            return [...parent.children].map(c => c.textContent);
        });
        expect(order).toEqual(["new", "ref"]);
    });

    test("appendAfter inserisce dopo (Round 3 fix)", async ({ jdm: page }) => {
        const order = await page.evaluate(() => {
            const parent = new window.Jdm("<div></div>", document.body);
            const first = new window.Jdm("<span>first</span>", parent);
            const second = new window.Jdm("<span>second</span>", parent);
            const newEl = new window.Jdm("<span>new</span>");
            first.jdm_appendAfter(newEl);
            return [...parent.children].map(c => c.textContent);
        });
        expect(order).toEqual(["first", "new", "second"]);
    });

    test("appendAfter lista preserva ordine", async ({ jdm: page }) => {
        const order = await page.evaluate(() => {
            const parent = new window.Jdm("<div></div>", document.body);
            const first = new window.Jdm("<span>first</span>", parent);
            const second = new window.Jdm("<span>second</span>", parent);
            const n1 = new window.Jdm("<span>n1</span>");
            const n2 = new window.Jdm("<span>n2</span>");
            first.jdm_appendAfter([n1, n2]);
            return [...parent.children].map(c => c.textContent);
        });
        expect(order).toEqual(["first", "n1", "n2", "second"]);
    });

    test("appendAfter su ultimo figlio appende in coda", async ({ jdm: page }) => {
        const last = await page.evaluate(() => {
            const parent = new window.Jdm("<div></div>", document.body);
            const only = new window.Jdm("<span>only</span>", parent);
            const tail = new window.Jdm("<span>tail</span>");
            only.jdm_appendAfter(tail);
            return parent.children[parent.children.length - 1].textContent;
        });
        expect(last).toBe("tail");
    });

    test("empty pulisce div", async ({ jdm: page }) => {
        const count = await page.evaluate(() => {
            const el = new window.Jdm("<div><p>x</p><p>y</p></div>", document.body);
            el.jdm_empty();
            return el.children.length;
        });
        expect(count).toBe(0);
    });

    test("empty resetta input value", async ({ jdm: page }) => {
        const v = await page.evaluate(() => {
            const el = new window.Jdm('<input type="text" value="x">', document.body);
            el.jdm_empty();
            return el.value;
        });
        expect(v).toBe("");
    });

    test("empty resetta form completo", async ({ jdm: page }) => {
        const v = await page.evaluate(() => {
            const form = new window.Jdm(
                '<form><input name="a" value="x"><input name="b" type="checkbox" checked></form>',
                document.body,
            );
            form.jdm_empty();
            return { a: form.elements.a.value, b: form.elements.b.checked };
        });
        expect(v).toEqual({ a: "", b: false });
    });

    test("destroy rimuove dal DOM", async ({ jdm: page }) => {
        const connected = await page.evaluate(() => {
            const el = new window.Jdm("<div>x</div>", document.body);
            el.jdm_destroy();
            return el.isConnected;
        });
        expect(connected).toBe(false);
    });

    test("innerHTML scrive markup", async ({ jdm: page }) => {
        const html = await page.evaluate(() => {
            const el = new window.Jdm("<div></div>", document.body);
            el.jdm_innerHTML("<p>foo</p>");
            return el.querySelector("p")?.textContent;
        });
        expect(html).toBe("foo");
    });

    test("setStyle imposta proprietà inline", async ({ jdm: page }) => {
        const color = await page.evaluate(() => {
            const el = new window.Jdm("<div></div>", document.body);
            el.jdm_setStyle("color", "red");
            return el.style.color;
        });
        expect(color).toBe("red");
    });

    test("extendNode aggiunge prop arbitraria", async ({ jdm: page }) => {
        const v = await page.evaluate(() => {
            const el = new window.Jdm("<div></div>", document.body);
            el.jdm_extendNode("foo", { x: 1 });
            return el.foo;
        });
        expect(v).toEqual({ x: 1 });
    });

    test("extendNode rifiuta __proto__ (security)", async ({ jdm: page }) => {
        const ok = await page.evaluate(() => {
            const el = new window.Jdm("<div></div>", document.body);
            el.jdm_extendNode("__proto__", { polluted: true });
            return {}.polluted === undefined;
        });
        expect(ok).toBe(true);
    });
});
