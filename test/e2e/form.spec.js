import { test, expect } from "./helpers.js";

test.describe("Form: setValue / getValue / submit / validate / binding", () => {
    test("setValue su checkbox", async ({ jdm: page }) => {
        const checked = await page.evaluate(() => {
            const cb = new window.Jdm('<input type="checkbox">', document.body);
            cb.jdm_setValue(true);
            return cb.checked;
        });
        expect(checked).toBe(true);
    });

    test("setValue su radio", async ({ jdm: page }) => {
        const checked = await page.evaluate(() => {
            const r = new window.Jdm('<input type="radio">', document.body);
            r.jdm_setValue(true);
            return r.checked;
        });
        expect(checked).toBe(true);
    });

    test("setValue su number stringa", async ({ jdm: page }) => {
        const v = await page.evaluate(() => {
            const n = new window.Jdm('<input type="number">', document.body);
            n.jdm_setValue("42");
            return n.value;
        });
        expect(v).toBe("42");
    });

    test("setValue su number con stringa non-numerica skip+warn", async ({ jdm: page }) => {
        const result = await page.evaluate(() => {
            const n = new window.Jdm('<input type="number" value="10">', document.body);
            let warned = false;
            const origWarn = console.warn;
            console.warn = msg => {
                if (String(msg).includes("non-numeric")) warned = true;
            };
            n.jdm_setValue("banana");
            console.warn = origWarn;
            return { warned, value: n.value };
        });
        expect(result.warned).toBe(true);
        expect(result.value).not.toBe("NaN");
    });

    test("setValue form preserva 0", async ({ jdm: page }) => {
        const v = await page.evaluate(() => {
            const f = new window.Jdm('<form><input name="x" type="text"></form>', document.body);
            f.jdm_setValue({ x: 0 });
            return f.elements.x.value;
        });
        expect(v).toBe("0");
    });

    test("setValue form preserva false (string)", async ({ jdm: page }) => {
        const v = await page.evaluate(() => {
            const f = new window.Jdm('<form><input name="x" type="text"></form>', document.body);
            f.jdm_setValue({ x: false });
            return f.elements.x.value;
        });
        expect(v).toBe("false");
    });

    test("setValue form nested + array checkboxes", async ({ jdm: page }) => {
        const result = await page.evaluate(() => {
            const f = new window.Jdm(
                `<form>
                    <input name="name" type="text">
                    <input name="colors[]" type="checkbox" value="red">
                    <input name="colors[]" type="checkbox" value="green">
                    <input name="profile[email]" type="text">
                </form>`,
                document.body,
            );
            f.jdm_setValue({
                name: "Marco",
                colors: ["red"],
                profile: { email: "m@e.com" },
            });
            return {
                name: f.elements.name.value,
                red: f.querySelector('[value="red"]').checked,
                green: f.querySelector('[value="green"]').checked,
                email: f.elements["profile[email]"].value,
            };
        });
        expect(result).toEqual({ name: "Marco", red: true, green: false, email: "m@e.com" });
    });

    test("getValue checkbox ritorna boolean", async ({ jdm: page }) => {
        const v = await page.evaluate(() => {
            const cb = new window.Jdm('<input type="checkbox">', document.body);
            cb.checked = true;
            return cb.jdm_getValue();
        });
        expect(v).toBe(true);
    });

    test("getValue form complesso con array + nested", async ({ jdm: page }) => {
        const json = await page.evaluate(() => {
            const f = new window.Jdm(
                `<form>
                    <input name="name" value="A">
                    <input name="colors[]" type="checkbox" value="red" checked>
                    <input name="colors[]" type="checkbox" value="blue" checked>
                    <input name="profile[email]" value="x@y.z">
                </form>`,
                document.body,
            );
            return f.jdm_getValue();
        });
        expect(json.name).toBe("A");
        expect(json.colors).toEqual(["red", "blue"]);
        expect(json.profile.email).toBe("x@y.z");
    });

    test("setValueRaw bypassa coerce", async ({ jdm: page }) => {
        const v = await page.evaluate(() => {
            const i = new window.Jdm('<input type="text">', document.body);
            i.jdm_setValueRaw("true");
            return i.value;
        });
        expect(v).toBe("true");
    });

    test("getValueRaw su form ritorna FormData", async ({ jdm: page }) => {
        const result = await page.evaluate(() => {
            const f = new window.Jdm('<form><input name="a" value="1"></form>', document.body);
            const raw = f.jdm_getValueRaw();
            return { isFormData: raw instanceof FormData, a: raw.get("a") };
        });
        expect(result).toEqual({ isFormData: true, a: "1" });
    });

    test("getValueAsNumber su number ritorna Number", async ({ jdm: page }) => {
        const result = await page.evaluate(() => {
            const i = new window.Jdm('<input type="number" value="42">', document.body);
            const n = i.jdm_getValueAsNumber();
            return { type: typeof n, value: n };
        });
        expect(result).toEqual({ type: "number", value: 42 });
    });

    test("submit con preventDefault non lancia", async ({ jdm: page }) => {
        const ok = await page.evaluate(() => {
            const f = new window.Jdm("<form></form>", document.body);
            f.addEventListener("submit", e => e.preventDefault());
            try {
                f.jdm_submit();
                return true;
            } catch {
                return false;
            }
        });
        expect(ok).toBe(true);
    });

    test("submit ritorna node (chainable)", async ({ jdm: page }) => {
        const sameNode = await page.evaluate(() => {
            const f = new window.Jdm("<form></form>", document.body);
            f.addEventListener("submit", e => e.preventDefault());
            const r = f.jdm_submit();
            return r === f;
        });
        expect(sameNode).toBe(true);
    });

    test("validate su input required + non-form-control no-throw", async ({ jdm: page }) => {
        const result = await page.evaluate(() => {
            const i = new window.Jdm('<input type="text" required>', document.body);
            let validity = null;
            i.addEventListener("validate", e => {
                validity = e.detail;
            });
            i.jdm_validate();

            const div = new window.Jdm("<div></div>", document.body);
            let threw = false;
            try {
                div.jdm_validate();
            } catch {
                threw = true;
            }
            return { validity, threw };
        });
        expect(result.validity).toBe(false);
        expect(result.threw).toBe(false);
    });

    test("binding unidirezionale tra due input", async ({ jdm: page }) => {
        const target = await page.evaluate(() => {
            const i1 = new window.Jdm('<input type="text">', document.body);
            const i2 = new window.Jdm('<input type="text">', document.body);
            i1.jdm_binding(i2, "input", false);
            i1.value = "hello";
            i1.dispatchEvent(new Event("input"));
            return i2.value;
        });
        expect(target).toBe("hello");
    });

    test("binding bidirezionale", async ({ jdm: page }) => {
        const result = await page.evaluate(() => {
            const i1 = new window.Jdm('<input type="text">', document.body);
            const i2 = new window.Jdm('<input type="text">', document.body);
            i1.jdm_binding(i2);
            i1.value = "ab";
            i1.dispatchEvent(new Event("input"));
            const r1 = i2.value;
            i2.value = "cd";
            i2.dispatchEvent(new Event("input"));
            return { r1, r2: i1.value };
        });
        expect(result).toEqual({ r1: "ab", r2: "cd" });
    });
});

test.describe("Form exhaustive: radio groups (real browser)", () => {
    test("radio group: getValue ritorna il radio checked", async ({ jdm: page }) => {
        const result = await page.evaluate(() => {
            const form = new window.Jdm(
                `<form>
                    <input type="radio" name="size" value="S">
                    <input type="radio" name="size" value="M" checked>
                    <input type="radio" name="size" value="L">
                </form>`,
                document.body,
            );
            return form.jdm_getValue().size;
        });
        expect(result).toBe("M");
    });

    test("radio group nessun checked → name assente da getValue", async ({ jdm: page }) => {
        const result = await page.evaluate(() => {
            const form = new window.Jdm(
                `<form>
                    <input type="radio" name="c" value="a">
                    <input type="radio" name="c" value="b">
                </form>`,
                document.body,
            );
            return form.jdm_getValue();
        });
        expect(result.c).toBeUndefined();
    });
});

test.describe("Form exhaustive: select (real browser)", () => {
    test("select-one setValue cambia option", async ({ jdm: page }) => {
        const v = await page.evaluate(() => {
            const sel = new window.Jdm(
                `<select>
                    <option value="a">A</option>
                    <option value="b">B</option>
                </select>`,
                document.body,
            );
            sel.jdm_setValue("b");
            return sel.value;
        });
        expect(v).toBe("b");
    });

    test("select-one getValue", async ({ jdm: page }) => {
        const v = await page.evaluate(() => {
            const sel = new window.Jdm(
                `<select>
                    <option value="a" selected>A</option>
                    <option value="b">B</option>
                </select>`,
                document.body,
            );
            return sel.jdm_getValue();
        });
        expect(v).toBe("a");
    });

    test("select-multiple getValue dentro form via FormData", async ({ jdm: page }) => {
        const result = await page.evaluate(() => {
            const form = new window.Jdm(
                `<form>
                    <select name="tags" multiple>
                        <option value="js" selected>JS</option>
                        <option value="ts" selected>TS</option>
                        <option value="py">PY</option>
                    </select>
                </form>`,
                document.body,
            );
            return form.jdm_getValue();
        });
        // FormData su select-multiple emette più entry — getValue aggrega
        expect(result.tags).toBeDefined();
    });

    test("select dentro form: setValue {choice: 'b'}", async ({ jdm: page }) => {
        const v = await page.evaluate(() => {
            const form = new window.Jdm(
                `<form>
                    <select name="choice">
                        <option value="a">A</option>
                        <option value="b">B</option>
                    </select>
                </form>`,
                document.body,
            );
            form.jdm_setValue({ choice: "b" });
            return form.elements.choice.value;
        });
        expect(v).toBe("b");
    });
});

test.describe("Form exhaustive: textarea (real browser)", () => {
    test("textarea preserve newline + tab", async ({ jdm: page }) => {
        const v = await page.evaluate(() => {
            const ta = new window.Jdm("<textarea></textarea>", document.body);
            ta.jdm_setValue("a\n\tb\nc");
            return ta.value;
        });
        expect(v).toBe("a\n\tb\nc");
    });

    test("textarea dentro form: setValue/getValue", async ({ jdm: page }) => {
        const result = await page.evaluate(() => {
            const form = new window.Jdm("<form><textarea name='notes'></textarea></form>", document.body);
            form.jdm_setValue({ notes: "line1\nline2" });
            return { written: form.elements.notes.value, read: form.jdm_getValue().notes };
        });
        expect(result.written).toBe("line1\nline2");
        expect(result.read).toBe("line1\nline2");
    });
});

test.describe("Form exhaustive: HTML5 input types (real browser)", () => {
    const cases = [
        ["password", "s3cret"],
        ["email", "user@example.com"],
        ["tel", "+39 333 1234567"],
        ["url", "https://example.com"],
        ["search", "query"],
        ["hidden", "payload"],
        ["color", "#ff0000"],
        ["date", "2026-05-13"],
        ["time", "14:30"],
        ["datetime-local", "2026-05-13T14:30"],
        ["month", "2026-05"],
        ["week", "2026-W20"],
    ];
    for (const [type, value] of cases) {
        test(`type="${type}" roundtrip`, async ({ jdm: page }) => {
            const result = await page.evaluate(
                ({ type, value }) => {
                    const form = new window.Jdm(`<form><input name="x" type="${type}"></form>`, document.body);
                    form.jdm_setValue({ x: value });
                    return { written: form.elements.x.value };
                },
                { type, value },
            );
            // accept exact match or case-normalized for color
            expect(
                result.written === value || result.written.toLowerCase() === value.toLowerCase(),
            ).toBe(true);
        });
    }
});

test.describe("Form exhaustive: disabled / readonly (real browser)", () => {
    test("disabled escluso da FormData", async ({ jdm: page }) => {
        const result = await page.evaluate(() => {
            const form = new window.Jdm(
                `<form>
                    <input name="a" value="ok">
                    <input name="b" value="skip" disabled>
                </form>`,
                document.body,
            );
            return form.jdm_getValue();
        });
        expect(result.a).toBe("ok");
        expect(result.b).toBeUndefined();
    });

    test("readonly incluso", async ({ jdm: page }) => {
        const v = await page.evaluate(() => {
            const form = new window.Jdm('<form><input name="x" value="lock" readonly></form>', document.body);
            return form.jdm_getValue().x;
        });
        expect(v).toBe("lock");
    });
});

test.describe("Form exhaustive: nesting + array misti (real browser)", () => {
    test("3 livelli a[b][c]", async ({ jdm: page }) => {
        const result = await page.evaluate(() => {
            const form = new window.Jdm('<form><input name="a[b][c]"></form>', document.body);
            form.jdm_setValue({ a: { b: { c: "deep" } } });
            return { written: form.elements["a[b][c]"].value, read: form.jdm_getValue().a.b.c };
        });
        expect(result).toEqual({ written: "deep", read: "deep" });
    });

    test("user[settings][theme] nested + getValue", async ({ jdm: page }) => {
        const result = await page.evaluate(() => {
            const form = new window.Jdm(
                `<form>
                    <input name="user[name]" type="text">
                    <input name="user[settings][theme]" type="text">
                </form>`,
                document.body,
            );
            form.jdm_setValue({ user: { name: "Marco", settings: { theme: "dark" } } });
            const r = form.jdm_getValue();
            return { name: r.user.name, theme: r.user.settings.theme };
        });
        expect(result).toEqual({ name: "Marco", theme: "dark" });
    });

    test("checkbox array: setValue parziale", async ({ jdm: page }) => {
        const checks = await page.evaluate(() => {
            const form = new window.Jdm(
                `<form>
                    <input name="opts[]" type="checkbox" value="a">
                    <input name="opts[]" type="checkbox" value="b">
                    <input name="opts[]" type="checkbox" value="c">
                </form>`,
                document.body,
            );
            form.jdm_setValue({ opts: ["b"] });
            return [...form.querySelectorAll('[name="opts[]"]')].map(c => c.checked);
        });
        expect(checks).toEqual([false, true, false]);
    });

    test("checkbox array: array vuoto → tutti unchecked", async ({ jdm: page }) => {
        const checks = await page.evaluate(() => {
            const form = new window.Jdm(
                `<form>
                    <input name="opts[]" type="checkbox" value="a" checked>
                    <input name="opts[]" type="checkbox" value="b" checked>
                </form>`,
                document.body,
            );
            form.jdm_setValue({ opts: [] });
            return [...form.querySelectorAll('[name="opts[]"]')].map(c => c.checked);
        });
        expect(checks).toEqual([false, false]);
    });
});

test.describe("Form exhaustive: edge cases (real browser)", () => {
    test("form vuoto getValue → {}", async ({ jdm: page }) => {
        const v = await page.evaluate(() => {
            const form = new window.Jdm("<form></form>", document.body);
            return form.jdm_getValue();
        });
        expect(v).toEqual({});
    });

    test("setValue su form vuoto no-throw", async ({ jdm: page }) => {
        const ok = await page.evaluate(() => {
            const form = new window.Jdm("<form></form>", document.body);
            try {
                form.jdm_setValue({ x: 1 });
                return true;
            } catch {
                return false;
            }
        });
        expect(ok).toBe(true);
    });

    test("unicode + emoji preservation", async ({ jdm: page }) => {
        const v = await page.evaluate(() => {
            const form = new window.Jdm('<form><input name="x"></form>', document.body);
            form.jdm_setValue({ x: "日本語 🚀 العربية" });
            return form.elements.x.value;
        });
        expect(v).toBe("日本語 🚀 العربية");
    });

    test("setValue su name inesistente non lancia", async ({ jdm: page }) => {
        const ok = await page.evaluate(() => {
            const form = new window.Jdm('<form><input name="known"></form>', document.body);
            try {
                form.jdm_setValue({ ghost: "x", deep: { nope: "y" } });
                return true;
            } catch {
                return false;
            }
        });
        expect(ok).toBe(true);
    });
});

test.describe("Form exhaustive: form con TUTTI i tipi (real browser)", () => {
    test("getValue su form mega multi-tipo", async ({ jdm: page }) => {
        const r = await page.evaluate(() => {
            const form = new window.Jdm(
                `<form>
                    <input name="text" type="text" value="t">
                    <input name="email" type="email" value="e@e.com">
                    <input name="number" type="number" value="42">
                    <input name="checkbox" type="checkbox" checked>
                    <input name="radio" type="radio" value="r1" checked>
                    <input name="radio" type="radio" value="r2">
                    <input name="hidden" type="hidden" value="h">
                    <textarea name="notes">line1\nline2</textarea>
                    <select name="select">
                        <option value="opt1" selected>O1</option>
                        <option value="opt2">O2</option>
                    </select>
                    <input name="tags[]" value="a">
                    <input name="tags[]" value="b">
                </form>`,
                document.body,
            );
            return form.jdm_getValue();
        });
        expect(r.text).toBe("t");
        expect(r.email).toBe("e@e.com");
        expect(r.number).toBe("42");
        expect(r.radio).toBe("r1");
        expect(r.hidden).toBe("h");
        expect(r.select).toBe("opt1");
        expect(r.tags).toEqual(["a", "b"]);
    });
});
