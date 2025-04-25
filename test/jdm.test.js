import { describe, it, expect, beforeEach, vi } from "vitest";
import { Jdm } from "../src/jdm.js";
import { _common } from "../src/_common.js";
import { _animation, AnimationOption, keyframe } from "../src/_animation.js";
import { Proto } from "../src/proto"; // aggiorna il path se necessario

// Alias globale per compatibilità
globalThis.JDM = (...args) => new Jdm(...args);

let div;
let animationMock;

beforeEach(() => {
    document.body.innerHTML = "";
    div = JDM("<div>Test</div>", document.body);

    animationMock = {
        play: vi.fn(),
        cancel: vi.fn(),
        onfinish: null,
    };

    HTMLElement.prototype.animate = vi.fn(() => animationMock);
});

describe("JDM - Class", () => {
    it("aggiunge una singola classe", () => {
        div.jdm_addClassList("foo");
        expect(div.classList.contains("foo")).toBe(true);
    });

    it("aggiunge un array di classi", () => {
        div.jdm_addClassList(["foo", "bar"]);
        expect(div.classList.contains("foo") && div.classList.contains("bar")).toBe(true);
    });

    it("rimuove una singola classe", () => {
        div.classList.add("foo", "bar");
        div.jdm_removeClassList("foo");
        expect(div.classList.contains("foo")).toBe(false);
    });

    it("rimuove un array di classi", () => {
        div.classList.add("foo", "bar");
        div.jdm_removeClassList(["foo", "bar"]);
        expect(div.classList.contains("foo") && div.classList.contains("bar")).toBe(false);
    });

    it("toggle di una singola classe", () => {
        div.jdm_toggleClassList("bar");
        expect(div.classList.contains("bar")).toBe(true);
        div.jdm_toggleClassList("bar");
        expect(div.classList.contains("bar")).toBe(false);
    });

    it("toggle di un array di classi", () => {
        div.jdm_toggleClassList(["bar", "foo"]);
        expect(div.classList.contains("foo") && div.classList.contains("bar")).toBe(true);
        div.jdm_toggleClassList(["bar", "foo"]);
        expect(div.classList.contains("foo") && div.classList.contains("bar")).toBe(false);
    });

    it("verifico se c'è una stringa nella classe", () => {
        div.jdm_addClassList(["bar", "foo"]);
        const resultFindTrue = div.jdm_findClassList("bar");
        const resultFindFalse = div.jdm_findClassList("test");
        expect(resultFindTrue).toBe(true);
        expect(resultFindFalse).toBe(false);
    });

    it("verifico se c'è un array di stringhe in AND nella classe", () => {
        div.jdm_addClassList(["bar", "foo"]);
        const resultFindTrue = div.jdm_findClassList(["bar", "foo"]);
        const resultFindFalse = div.jdm_findClassList(["bar", "test"]);
        const resultFindFalse2 = div.jdm_findClassList(["alt", "test"]);
        expect(resultFindTrue).toBe(true);
        expect(resultFindFalse).toBe(false);
        expect(resultFindFalse2).toBe(false);
    });

    it("verifico se c'è un array di stringhe in OR nella classe", () => {
        div.jdm_addClassList(["bar", "foo"]);
        const resultFindTrue = div.jdm_findClassList(["bar", "foo"], true);
        const resultFindFalse = div.jdm_findClassList(["bar", "test"], true);
        const resultFindFalse2 = div.jdm_findClassList(["alt", "test"], true);
        expect(resultFindTrue).toBe(true);
        expect(resultFindFalse).toBe(true);
        expect(resultFindFalse2).toBe(false);
    });
});

describe("JDM - Base", () => {
    it("crea un elemento partendo da un selector", () => {
        const el = document.createElement("div");
        el.id = "foo";
        div.appendChild(el);
        const newEl = JDM(document.querySelector("#foo"));
        expect(newEl.tagName).toBe("DIV");
        expect(document.body.contains(div)).toBe(true);
    });

    it("crea un elemento jdm-element", () => {
        const newEl = JDM(null, div);
        expect(newEl.tagName).toBe("JDM-ELEMENT");
        expect(document.body.contains(div)).toBe(true);
    });

    it("crea un elemento e lo aggiunge al body", () => {
        expect(div.tagName).toBe("DIV");
        expect(document.body.contains(div)).toBe(true);
    });

    it("aggiunge un singolo elemento come figli", () => {
        const child = document.createElement("p");
        div.jdm_append(child);
        expect(div.contains(child)).toBe(true);
    });

    it("aggiunge un array di elementi come figli", () => {
        const child = document.createElement("p");
        const child2 = document.createElement("p");
        div.jdm_append([child, child2]);
        expect(div.contains(child)).toBe(true);
        expect(div.contains(child2)).toBe(true);
    });

    it("preprende un singolo elemento", () => {
        const firstElement = document.createElement("div");
        firstElement.innerHTML = "<p>primo</p>";
        div.appendChild(firstElement);

        const prependElement = document.createElement("div");
        prependElement.innerHTML = "<p>prependElement</p>";
        div.jdm_prepend(prependElement);

        expect(div.children[0]).toBe(prependElement);
        expect(div.children[1]).toBe(firstElement);
    });

    it("preprende una lista di elementi", () => {
        const firstElement = document.createElement("div");
        firstElement.innerHTML = "<p>primo</p>";
        div.appendChild(firstElement);

        const prependElement1 = document.createElement("div");
        prependElement1.innerHTML = "<b>prependElement1</b>";
        const prependElement2 = document.createElement("div");
        prependElement2.innerHTML = "<i>prependElement2</i>";

        div.jdm_prepend([prependElement1, prependElement2]);

        expect(div.children[0]).toBe(prependElement2);
        expect(div.children[1]).toBe(prependElement1);
        expect(div.children[2]).toBe(firstElement);
    });

    it("svuota un div (o elemento)", () => {
        const element = document.createElement("p");
        div.appendChild(element);
        expect(div.children[0]).toBe(element);
        div.jdm_empty();
        expect(div.children.length === 0).toBe(true);
    });

    it("distrugge un elemento", () => {
        const el = JDM("<div>foo</div>", div);
        expect(div.contains(el)).toBe(true);
        expect(el.isConnected).toBe(true);
        expect(el.parentNode).toBe(div);
        el.jdm_destroy();
        expect(div.contains(el)).toBe(false);
        expect(el.isConnected).toBe(false);
        expect(el.parentNode).toBe(null);
    });

    it("imposta uno stile inline sull'elemento", () => {
        const el = JDM("<div></div>", div);

        el.jdm_setStyle("color", "red");
        expect(el.style.color).toBe("red");

        el.jdm_setStyle("backgroundColor", "blue");
        expect(el.style.backgroundColor).toBe("blue");
        expect(el.getAttribute("style")).toContain("color: red");
        expect(el.getAttribute("style")).toContain("background-color: blue");
    });

    it("estende il nodo con una proprietà personalizzata", () => {
        const data = { id: 1, label: "Test" };
        expect(div.myData).toEqual(undefined);
        div.jdm_extendNode("myData", data);
        expect(div.myData).toEqual({ id: 1, label: "Test" });
        expect("myData" in div).toBe(true);
        expect(div.hasOwnProperty("myData")).toBe(true);
    });

    it("imposta il contenuto HTML interno dell'elemento", () => {
        expect(div.innerHTML).toBe("Test");
        div.jdm_innerHTML("<p>foo</p>");
        expect(div.innerHTML).toBe("<p>foo</p>");
        expect(div.querySelector("p")?.textContent).toBe("foo");
    });

    it("propaga innerHTML su elementi non form", () => {
        const input = JDM('<input type="text" />', div);
        const target = JDM("<div></div>", div);

        input.jdm_binding(target, "input", false);

        input.value = "test binding";
        input.dispatchEvent(new Event("input"));

        expect(target.innerHTML).toBe("test binding");
    });

    it("aggiunge un event listener all'elemento", () => {
        const el = JDM("<button>Click</button>", div);
        const spy = vi.fn();
        el.jdm_addEventListener("click", spy);
        el.click();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("rimuove un event listener dall'elemento", () => {
        const el = JDM("<button>Remove</button>", div);
        const spy = vi.fn();

        // Aggiungi → Rimuovi → Esegui evento → Verifica che NON venga chiamato
        el.addEventListener("click", spy);
        el.jdm_removeEventListener("click", spy);

        el.click();

        expect(spy).not.toHaveBeenCalled();
    });

    it("estende il nodo con i riferimenti presenti in jdm_childNode", () => {
        const parent = JDM("<div></div>", div);

        // Crea due nodi figli da associare manualmente
        const child1 = document.createElement("span");
        const child2 = document.createElement("p");

        parent.jdm_childNode = {
            titolo: child1,
            descrizione: child2,
        };

        // Applica l'estensione
        parent.jdm_extendChildNode();

        // Verifica che le proprietà siano state aggiunte
        expect(parent.titolo).toBe(child1);
        expect(parent.descrizione).toBe(child2);
    });

    it("non estende nulla se jdm_childNode è assente o vuoto", () => {
        const el = JDM("<div></div>", div);

        // Non c'è jdm_childNode
        expect(() => el.jdm_extendChildNode()).not.toThrow();

        // jdm_childNode vuoto
        el.jdm_childNode = {};
        expect(() => el.jdm_extendChildNode()).not.toThrow();
    });
});

describe("JDM - Attribute", () => {
    it("imposta  un attributo", () => {
        div.jdm_setAttribute("data-test", "value");
        expect(div.getAttribute("data-test")).toBe("value");
    });

    it("legge un attributo", () => {
        div.setAttribute("data-test", "value");
        expect(div.jdm_getAttribute("data-test")).toBe("value");
    });

    it("imposta un id", () => {
        div.jdm_addId("bar");
        expect(div.jdm_getAttribute("id")).toBe("bar");
    });

    it("rimuove un attributo da un elemento", () => {
        const el = JDM('<div data-test="ciao"></div>', div);
        expect(el.hasAttribute("data-test")).toBe(true);
        el.jdm_removeAttribute("data-test");
        expect(el.hasAttribute("data-test")).toBe(false);
    });
});

describe("JDM - Form", () => {
    beforeEach(() => {
        document.body.innerHTML = "";
    });

    it("imposta il valore su diversi tipi di elementi, incluso un form complesso", () => {
        // Input checkbox
        const checkbox = JDM('<input type="checkbox">', div);
        checkbox.jdm_setValue(true);
        expect(checkbox.checked).toBe(true);

        // Input radio
        const radio = JDM('<input type="radio">', div);
        radio.jdm_setValue(true);
        expect(radio.checked).toBe(true);

        // Input number (con moltiplicazione implicita)
        const number = JDM('<input type="number">', div);
        number.jdm_setValue("42");
        expect(number.value).toBe("42");

        // Input range (cast a number implicito)
        const range = JDM('<input type="range">', div);
        range.jdm_setValue("7");
        expect(range.value).toBe("7");

        // Input text normale
        const text = JDM('<input type="text">', div);
        text.jdm_setValue("ciao");
        expect(text.value).toBe("ciao");

        // Form complesso
        const formHTML = `
            <form>
              <input name="name" type="text" />
              <input name="age" type="number" />
              <input name="active" type="checkbox" />
              <input name="colors[]" type="checkbox" value="red" />
              <input name="colors[]" type="checkbox" value="green" />
              <input name="colors[]" type="checkbox" value="blue" />
              <input name="profile[email]" type="text" />
              <input name="profile[notifications]" type="checkbox" />
            </form>
          `;

        const form = JDM(formHTML, div);

        const data = {
            name: "Marco",
            age: 35,
            active: true,
            colors: ["red", "blue"],
            profile: {
                email: "marco@example.com",
                notifications: true,
            },
        };

        form.jdm_setValue(data);

        expect(form.elements.name.value).toBe("Marco");
        expect(form.elements.age.value).toBe("35");
        expect(form.elements.active.checked).toBe(true);
        expect(form.querySelector('[value="red"]').checked).toBe(true);
        expect(form.querySelector('[value="green"]').checked).toBe(false);
        expect(form.querySelector('[value="blue"]').checked).toBe(true);
        expect(form.elements["profile[email]"].value).toBe("marco@example.com");
        expect(form.elements["profile[notifications]"].checked).toBe(true);
    });

    it("restituisce correttamente il valore da input, checkbox, radio, select e form complesso", () => {
        // Input checkbox
        const checkbox = JDM('<input type="checkbox">', div);
        checkbox.checked = true;
        expect(checkbox.jdm_getValue()).toBe(true);

        // Input radio
        const radio = JDM('<input type="radio">', div);
        radio.checked = false;
        expect(radio.jdm_getValue()).toBe(false);

        // Select
        const select = JDM(
            `
    <select>
      <option value="one">Uno</option>
      <option value="two" selected>Due</option>
    </select>
  `,
            div,
        );
        expect(select.jdm_getValue()).toBe("two");

        // Input fallback (text)
        const input = JDM('<input type="text">', div);
        input.value = "test";
        expect(input.jdm_getValue()).toBe("test");

        // FORM COMPLESSO
        const formHTML = `
    <form>
      <input name="text" type="text" value="hello" />
      <input name="empty" type="text" value="" />
      <input name="nullable" type="text" value="null" />
      <input name="active" type="checkbox" checked />

      <input name="colors[]" type="checkbox" value="red" checked />
      <input name="colors[]" type="checkbox" value="green" />
      <input name="colors[]" type="checkbox" value="blue" checked />

      <input name="profile[email]" type="text" value="foo@example.com" />
      <input name="profile[roles][]" type="text" value="admin" />
      <input name="profile[roles][]" type="text" value="editor" />
    </form>
  `;

        const form = JDM(formHTML, div);
        const result = form.jdm_getValue();

        expect(result).toEqual({
            text: "hello",
            empty: null, // "" → null
            nullable: null, // "null" → null
            active: "on", // checkbox → "on" (default value)
            colors: ["red", "blue"], // array []
            profile: {
                email: "foo@example.com",
                roles: ["admin", "editor"], // array annidato
            },
        });
    });

    it("gestisce array senza chiave e chiavi duplicate in jdm_getValue", () => {
        const formHTML = `
    <form>
      <input name="list[]" type="text" value="uno" />
      <input name="list[]" type="text" value="due" />

      <input name="duplicated" type="text" value="first" />
      <input name="duplicated" type="text" value="second" />
    </form>
  `;
        const form = JDM(formHTML, div);
        const result = form.jdm_getValue();

        expect(result).toEqual({
            list: ["uno", "due"],
            duplicated: ["first", "second"],
        });
    });

    it("invoca jdm_onSubmit", () => {
        const form = JDM("<form><button>Submit</button></form>", document.body);
        const mock = vi.fn();

        form.jdm_onSubmit(e => {
            e.preventDefault();
            mock();
        });

        form.querySelector("button").click();
        form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
        expect(mock).toHaveBeenCalled();
    });

    it("svuota un input", () => {
        const input = JDM("input", div);
        input.value = "bar";
        expect(input.value).toBe("bar");
        input.jdm_empty();
        expect(input.value).toBe("");
    });

    it("svuota una textarea", () => {
        const textarea = JDM("textarea", div);
        textarea.value = "bar";
        expect(textarea.value).toBe("bar");
        textarea.jdm_empty();
        expect(textarea.value).toBe("");
    });

    it("svuota un checkbox", () => {
        const checkbox = JDM('<input type="checkbox">', div);
        checkbox.checked = true;
        expect(checkbox.checked).toBe(true);
        checkbox.jdm_empty();
        expect(checkbox.checked).toBe(false);
    });

    it("svuota un radio", () => {
        const radio = JDM('<input type="radio">', div);
        radio.checked = true;
        expect(radio.checked).toBe(true);
        radio.jdm_empty();
        expect(radio.checked).toBe(false);
    });

    it("svuota i campi del form", () => {
        const formHTML = `
          <form>
            <input name="text" type="text" value="Marco" />
            <input name="number" type="number" value="33" />
            <input name="checkbox" type="checkbox" checked />
            <select name="select" />
                <option value="1" selected>one</option>
                <option value="2">two</option>
            </select>
          </form>
        `;
        const form = JDM(formHTML, div);
        // Simula modifica dei valori prima dello svuotamento
        form.elements.text.value = "foo";
        form.elements.number.value = 99;
        form.elements.checkbox.checked = true;
        form.elements.select.value = "2";

        expect(form.elements.text.value).toBe("foo");
        expect(form.elements.number.value).toBe("99");
        expect(form.elements.checkbox.checked).toBe(true);
        expect(form.elements.select.value).toBe("2");

        // Esegui reset
        form.jdm_empty();

        expect(form.elements.text.value).toBe("");
        expect(form.elements.number.value).toBe("");
        expect(form.elements.checkbox.checked).toBe(false);
        expect(form.elements.select.value).toBe("");
    });

    it("valida un input e genera evento 'validate'", () => {
        const input = JDM("<input required>", div);
        const spy = vi.fn();

        input.addEventListener("validate", e => {
            // Verifica che venga emesso l'evento
            expect(e).toBeInstanceOf(CustomEvent);
            expect(typeof e.detail).toBe("boolean");
            spy(e.detail);
        });

        input.jdm_validate();

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(false);

        input.value = "ok";
        input.jdm_validate();

        expect(spy).toHaveBeenCalledTimes(2);
        expect(spy).toHaveBeenLastCalledWith(true);
    });

    it("propaga il valore da un input all'altro (binding unidirezionale)", () => {
        const input1 = JDM('<input type="text" />', div);
        const input2 = JDM('<input type="text" />', div);

        input1.jdm_binding(input2, "input", false);

        input1.value = "foo";
        input1.dispatchEvent(new Event("input"));

        expect(input2.value).toBe("foo");
    });

    it("propaga il valore in entrambe le direzioni (binding bidirezionale)", () => {
        const input1 = JDM('<input type="text" />', div);
        const input2 = JDM('<input type="text" />', div);

        input1.jdm_binding(input2); // default: twoWayDataBinding = true

        input1.value = "foo";
        input1.dispatchEvent(new Event("input"));
        expect(input2.value).toBe("foo");

        input2.value = "bar";
        input2.dispatchEvent(new Event("input"));
        expect(input1.value).toBe("bar");
    });
});

describe("JDM - Event", () => {
    it("registra un event listener per 'input'", () => {
        const input = JDM('<input type="text">', div);
        const spy = vi.fn();

        input.jdm_onInput(spy);

        input.value = "foo";
        input.dispatchEvent(new Event("input"));

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("non lancia errore se la funzione non viene fornita", () => {
        const input = JDM('<input type="text">', div);
        expect(() => input.jdm_onInput()).not.toThrow();
    });

    it("registra un event listener per 'change'", () => {
        const select = JDM(
            `
    <select>
      <option value="a">A</option>
      <option value="b">B</option>
    </select>
  `,
            div,
        );

        const spy = vi.fn();
        select.jdm_onChange(spy);

        select.value = "b";
        select.dispatchEvent(new Event("change"));

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("non lancia errore se nessuna funzione viene passata", () => {
        const input = JDM('<input type="text">', div);
        expect(() => input.jdm_onChange()).not.toThrow();
    });

    it("registra un event listener per 'select'", () => {
        const input = JDM('<input type="text" value="ciao">', div);
        const spy = vi.fn();

        input.jdm_onSelect(spy);

        // Seleziona del testo
        input.focus();
        input.setSelectionRange(0, 2);
        input.dispatchEvent(new Event("select"));

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("non lancia errore se nessuna funzione viene passata", () => {
        const input = JDM('<input type="text">', div);
        expect(() => input.jdm_onSelect()).not.toThrow();
    });
    it("registra un event listener debounce per 'input'", async () => {
        const input = JDM('<input type="text">', div);
        const spy = vi.fn();
        const delay = 100;

        input.jdm_onDebounce(spy, delay, "input");

        input.value = "a";
        input.dispatchEvent(new Event("input"));
        input.value = "ab";
        input.dispatchEvent(new Event("input"));
        input.value = "abc";
        input.dispatchEvent(new Event("input"));

        await new Promise(r => setTimeout(r, delay + 20));
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("usa il valore di timeout predefinito se non fornito", async () => {
        const input = JDM('<input type="text">', div);
        const spy = vi.fn();

        input.jdm_onDebounce(spy);

        input.dispatchEvent(new Event("input"));
        await new Promise(r => setTimeout(r, 320));
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("usa 'input' come metodo di default", async () => {
        const input = JDM('<input type="text">', div);
        const spy = vi.fn();

        input.jdm_onDebounce(spy);

        input.dispatchEvent(new Event("input"));
        await new Promise(r => setTimeout(r, 320));
        expect(spy).toHaveBeenCalled();
    });

    it("non lancia errore se nessuna funzione viene passata", async () => {
        const input = JDM('<input type="text">', div);
        expect(() => input.jdm_onDebounce()).not.toThrow();

        input.dispatchEvent(new Event("input"));
        await new Promise(r => setTimeout(r, 320));
    });

    it("registra un event listener per 'click'", () => {
        const button = JDM("<button>Cliccami</button>", div);
        const spy = vi.fn();

        button.jdm_onClick(spy);

        button.dispatchEvent(new MouseEvent("click"));
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("non lancia errore se nessuna funzione viene passata", () => {
        const button = JDM("<button>Cliccami</button>", div);
        expect(() => button.jdm_onClick()).not.toThrow();

        button.dispatchEvent(new MouseEvent("click"));
    });

    it("ritorna il nodo HTML", () => {
        const button = JDM("<button>Cliccami</button>", div);
        const returned = button.jdm_onClick();
        expect(returned).toBeInstanceOf(HTMLElement);
        expect(returned.tagName).toBe("BUTTON");
    });

    it("registra un event listener per 'contextmenu'", () => {
        const el = JDM("<div>Destro</div>", div);
        const spy = vi.fn();

        el.jdm_onRightClick(spy);

        el.dispatchEvent(new MouseEvent("contextmenu"));
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("non lancia errore se nessuna funzione viene passata", () => {
        const el = JDM("<div>Destro</div>", div);
        expect(() => el.jdm_onRightClick()).not.toThrow();

        el.dispatchEvent(new MouseEvent("contextmenu"));
    });

    it("ritorna il nodo HTML", () => {
        const el = JDM("<div>Destro</div>", div);
        const returned = el.jdm_onRightClick();
        expect(returned).toBeInstanceOf(HTMLElement);
        expect(returned.tagName).toBe("DIV");
    });

    it("registra un event listener per 'dblclick'", () => {
        const el = JDM("<div>Doppio click</div>", div);
        const spy = vi.fn();

        el.jdm_onDoubleClick(spy);

        el.dispatchEvent(new MouseEvent("dblclick"));
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("non lancia errore se nessuna funzione viene passata", () => {
        const el = JDM("<div>Doppio click</div>", div);
        expect(() => el.jdm_onDoubleClick()).not.toThrow();

        el.dispatchEvent(new MouseEvent("dblclick"));
    });

    it("ritorna il nodo HTML", () => {
        const el = JDM("<div>Doppio click</div>", div);
        const returned = el.jdm_onDoubleClick();
        expect(returned).toBeInstanceOf(HTMLElement);
        expect(returned.tagName).toBe("DIV");
    });

    it("registra un event listener per 'invalid'", () => {
        const form = JDM("<form><input required></form>", div);
        const input = form.querySelector("input");
        const spy = vi.fn();

        JDM(input).jdm_onInvalid(spy);

        // L'evento 'invalid' non si attiva programmaticamente tramite .dispatchEvent
        // ma possiamo forzarlo così:
        input.dispatchEvent(new Event("invalid", { bubbles: true, cancelable: true }));

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("non lancia errore se nessuna funzione viene passata", () => {
        const input = JDM("<input required>", div);
        expect(() => input.jdm_onInvalid()).not.toThrow();

        input.dispatchEvent(new Event("invalid", { bubbles: true, cancelable: true }));
    });

    it("ritorna il nodo HTML", () => {
        const input = JDM("<input required>", div);
        const returned = input.jdm_onInvalid();
        expect(returned).toBeInstanceOf(HTMLElement);
        expect(returned.tagName).toBe("INPUT");
    });

    it("registra un event listener per 'load'", () => {
        const img = JDM('<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB">', div);
        const spy = vi.fn();

        img.jdm_onLoad(spy);

        // Simuliamo il caricamento dell'immagine
        img.dispatchEvent(new Event("load"));

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("non lancia errore se nessuna funzione viene passata", () => {
        const img = JDM("<img>", div);
        expect(() => img.jdm_onLoad()).not.toThrow();

        img.dispatchEvent(new Event("load"));
    });

    it("ritorna il nodo HTML", () => {
        const img = JDM("<img>", div);
        const returned = img.jdm_onLoad();
        expect(returned).toBeInstanceOf(HTMLElement);
        expect(returned.tagName).toBe("IMG");
    });

    it("registra un event listener per 'error'", () => {
        const img = JDM("<img>", div);
        const spy = vi.fn();

        img.jdm_onError(spy);

        // Simuliamo un errore nel caricamento dell'immagine
        img.dispatchEvent(new Event("error"));

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("non lancia errore se nessuna funzione viene passata", () => {
        const img = JDM("<img>", div);
        expect(() => img.jdm_onError()).not.toThrow();

        img.dispatchEvent(new Event("error"));
    });

    it("ritorna il nodo HTML", () => {
        const img = JDM("<img>", div);
        const returned = img.jdm_onError();
        expect(returned).toBeInstanceOf(HTMLElement);
        expect(returned.tagName).toBe("IMG");
    });
});

describe("JDM - Commons", () => {
    it("dovrebbe chiamare la funzione dopo il timeout", async () => {
        const spy = vi.fn();
        const debouncedFunc = _common.debounce(spy, 100); // timeout di 100ms

        debouncedFunc();
        debouncedFunc();
        debouncedFunc();

        // Verifica che la funzione non sia stata chiamata immediatamente
        expect(spy).not.toHaveBeenCalled();

        // Attendere 150ms per assicurarsi che il debouncedFunc venga chiamato solo una volta
        await new Promise(resolve => setTimeout(resolve, 150));

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("dovrebbe usare il timeout di default se non fornito", async () => {
        const spy = vi.fn();
        const debouncedFunc = _common.debounce(spy);

        debouncedFunc();
        debouncedFunc();

        // Verifica che la funzione non sia stata chiamata immediatamente
        expect(spy).not.toHaveBeenCalled();

        // Attendere il timeout di default di 300ms
        await new Promise(resolve => setTimeout(resolve, 350));

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("dovrebbe creare un CustomEvent e dispatcharlo sul nodo", () => {
        const node = document.createElement("div");
        const spy = vi.fn();
        node.addEventListener("custom-event", e => {
            spy(e.detail);
        });

        const data = { key: "value" };
        _common.genEvent(node, "custom-event", data);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(data);
    });

    it("dovrebbe far propagare l'evento ai genitori se 'propagateToParents' è true", () => {
        const parent = document.createElement("div");
        const child = document.createElement("div");
        parent.appendChild(child);

        const spy = vi.fn();
        parent.addEventListener("custom-event", e => {
            spy(e.detail);
        });

        const data = { key: "value" };
        _common.genEvent(child, "custom-event", data);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(data);
    });

    it("non fa propagare l'evento ai genitori se 'propagateToParents' è false", () => {
        const parent = document.createElement("div");
        const child = document.createElement("div");
        parent.appendChild(child);

        const spy = vi.fn();
        parent.addEventListener("custom-event", e => {
            spy(e.detail);
        });

        const data = { key: "value" };
        _common.genEvent(child, "custom-event", data, false);

        expect(spy).not.toHaveBeenCalled();
    });

    it("dovrebbe restituire il tag name in minuscolo", () => {
        const div = document.createElement("div");
        const span = document.createElement("span");

        expect(_common.getTag(div)).toBe("div");
        expect(_common.getTag(span)).toBe("span");
    });

    it("dovrebbe restituire undefined per nodi senza tagName", () => {
        const textNode = document.createTextNode("test");
        expect(_common.getTag(textNode)).toBeUndefined();
    });
});

describe("JDM - Animation", () => {
    it("utilizzare i valori di default", () => {
        const animationOption = new AnimationOption();

        expect(animationOption.duration).toBe(250);
        expect(animationOption.easing).toBe("ease-in-out");
        expect(animationOption.fill).toBe("forwards");
        expect(animationOption.delay).toBe(0);
        expect(animationOption.composite).toBe("replace");
        expect(animationOption.direction).toBe("normal");
        expect(animationOption.iterations).toBe(1);
    });

    it("permettere di sovrascrivere i valori di default", () => {
        const animationOption = new AnimationOption(500, "ease", "both", 100, "accumulate", "reverse", 3);

        expect(animationOption.duration).toBe(500);
        expect(animationOption.easing).toBe("ease");
        expect(animationOption.fill).toBe("both");
        expect(animationOption.delay).toBe(100);
        expect(animationOption.composite).toBe("accumulate");
        expect(animationOption.direction).toBe("reverse");
        expect(animationOption.iterations).toBe(3);
    });

    it("utilizzare il valore di default per i parametri non specificati", () => {
        const animationOption = new AnimationOption(400, "ease-out");

        expect(animationOption.duration).toBe(400);
        expect(animationOption.easing).toBe("ease-out");
        expect(animationOption.fill).toBe("forwards"); // Valore di default
        expect(animationOption.delay).toBe(0); // Valore di default
        expect(animationOption.composite).toBe("replace"); // Valore di default
        expect(animationOption.direction).toBe("normal"); // Valore di default
        expect(animationOption.iterations).toBe(1); // Valore di default
    });

    it(" cancellare tutte le animazioni e resettare gli stili", () => {
        const fn = vi.fn();
        const node = JDM("<div>foo</div>", div).jdm_fadeIn();
        const result = node.jdm_clearAnimations();

        expect(node.style.animation).toBe("none");
        expect(node.style.transition).toBe("none");
        expect(node.style.transform).toBe("");
        expect(node.style.opacity).toBe("");
        expect(result).toBe(node);
    });

    it.each(Object.entries(keyframe))("dovrebbe chiamare animate e callback in %s", async (method, keyframeFn) => {
        const callbackFn = vi.fn();
        let frame;

        if (method === "rotation") {
            frame = keyframeFn(90);
            div[`jdm_${method}`](callbackFn, 90);
        } else {
            frame = keyframeFn;
            div[`jdm_${method}`](callbackFn);
        }

        expect(div.animate).toHaveBeenCalledWith(frame, expect.any(Object));

        animationMock.onfinish?.();
        expect(callbackFn).toHaveBeenCalledTimes(1);
    });

    it.each(Object.entries(keyframe))(" %s ritorna un elemento HTMLElement", async (method, keyframeFn) => {
        let response = null;
        let frame = null;
        if (method === "rotation") {
            frame = keyframeFn(90);
            response = div[`jdm_${method}`](vi.fn(), 90);
        } else {
            frame = keyframeFn;
            response = div[`jdm_${method}`](vi.fn());
        }
        expect(response).toBe(div);
        expect(response instanceof HTMLElement).toBe(true);
    });
});

describe("JDM - Proto", () => {
    describe("String.prototype.toBoolean", () => {
        it("restituisce true per 'true', '1', 'yes'", () => {
            expect("true".toBoolean()).toBe(true);
            expect("1".toBoolean()).toBe(true);
            expect("yes".toBoolean()).toBe(true);
            expect("TrUe".toBoolean()).toBe(true); // case-insensitive
            expect(" YES ".toBoolean()).toBe(true); // con spazi
        });

        it("restituisce false per 'false', '0', 'no'", () => {
            expect("false".toBoolean()).toBe(false);
            expect("0".toBoolean()).toBe(false);
            expect("no".toBoolean()).toBe(false);
            expect("FaLsE".toBoolean()).toBe(false);
            expect(" NO ".toBoolean()).toBe(false);
        });

        it("genera un errore per stringhe non valide", () => {
            expect(() => "maybe".toBoolean()).toThrow("Invalid boolean string: maybe");
            expect(() => "".toBoolean()).toThrow("Invalid boolean string: ");
        });
    });

    describe("String.prototype.toCapitalize", () => {
        it("mette la prima lettera in maiuscolo", () => {
            expect("ciao".toCapitalize()).toBe("Ciao");
            expect("Ciao".toCapitalize()).toBe("Ciao");
            expect("c".toCapitalize()).toBe("C");
            expect("".toCapitalize()).toBe("");
        });
    });

    describe("Number.prototype.toBoolean", () => {
        it("restituisce true per 1", () => {
            expect((1).toBoolean()).toBe(true);
        });

        it("restituisce false per 0", () => {
            expect((0).toBoolean()).toBe(false);
        });

        it("genera un errore per altri numeri", () => {
            expect(() => (2).toBoolean()).toThrow("Invalid boolean string: 2");
            expect(() => (-1).toBoolean()).toThrow("Invalid boolean string: -1");
        });
    });
});
