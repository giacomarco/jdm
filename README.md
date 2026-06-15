<!-- This header is hand-maintained and prepended to the generated API docs by
     `npm run docs:markdown` (scripts/build-readme.mjs). Edit it here, not in README.md. -->

# JDM — JavaScript DOM Manipulator

[![npm version](https://img.shields.io/npm/v/jdm_javascript_dom_manipulator.svg)](https://www.npmjs.com/package/jdm_javascript_dom_manipulator)
[![CI](https://github.com/giacomarco/jdm/actions/workflows/ci.yml/badge.svg)](https://github.com/giacomarco/jdm/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/jdm_javascript_dom_manipulator.svg)](./LICENSE)
[![bundle size](https://img.shields.io/badge/gzip-~6KB-brightgreen.svg)](#)

Tiny, chainable DOM manipulator. Create elements, query and index children,
wire events (incl. a global event bus), animate, and bind form values — all
with a fluent `jdm_*` API on the raw DOM node.

```bash
npm install jdm_javascript_dom_manipulator
```

```javascript
import "jdm_javascript_dom_manipulator";

JDM("<button>Click</button>", document.body)
    .jdm_addClassList(["btn", "btn-primary"])
    .jdm_onClick(() => console.log("clicked"));
```

- **Docs:** full API reference below (generated from JSDoc).
- **Changelog:** [CHANGELOG.md](./CHANGELOG.md)
- **Contributing:** [CONTRIBUTING.md](./CONTRIBUTING.md) — note the strict
  backwards-compatibility and deprecation policy.
- **Security:** [SECURITY.md](./SECURITY.md)

---

# API Reference

<a name="Jdm"></a>

## Jdm
Classe Jdm che fornisce un framework per la manipolazione del DOM.
Permette di creare un elemento DOM, aggiungerlo a un genitore, assegnargli delle classi
e manipolarlo in modo ricorsivo, se richiesto.
I metodi della classe sono concatenabili per facilitare le operazioni sul DOM.

# INSTALLAZIONE:
NPM
```bash
npm install jdm_javascript_dom_manipulator
```
Esempio di utilizzo classico (da inserire prima degli script che usano JDM):
```html
<script src="./dist/jdm.js"></script>
```
Esempio di utilizzo di un modulo ES6 (NB: usa jdm.es.js):
```javascript
import './dist/jdm.es.js';
```

# USO
```javascript
JDM('div', container, ['fooClass','barClass'])
```
# COMPARAZIONE:

## jQuery:
```javascript
const $div = $('<div>', { class: 'foo bar' });
const $ul = $('<ul>');
const $li1 = $('<li>').text('Elemento 1');
const $li2 = $('<li>').text('Elemento 2');
const $li3 = $('<li>').text('Elemento 3');
const $li4 = $('<li>').text('Elemento 4');
const $li5 = $('<li>').text('Elemento 5');
$ul.append($li1, $li2, $li3, $li4, $li5);
$div.append($ul);
$('body').append($div);
```

## JavaScript puro:
```javascript
const div = 'div';
div.classList.add('foo', 'bar');
const ul = document.createElement('ul');
const li1 = document.createElement('li');
li1.textContent = 'Elemento 1';
const li2 = document.createElement('li');
li2.textContent = 'Elemento 2';
const li3 = document.createElement('li');
li3.textContent = 'Elemento 3';
const li4 = document.createElement('li');
li4.textContent = 'Elemento 4';
const li5 = document.createElement('li');
li5.textContent = 'Elemento 5';
ul.append(li1, li2, li3, li4, li5);
div.appendChild(ul);
document.body.appendChild(div);
```

## Jdm:

```javascript
const domString = `
<div class="foo bar">
    <ul>
        <li> Elemento 1 </li>
        <li> Elemento 2 </li>
        <li> Elemento 3 </li>
        <li> Elemento 4 </li>
        <li> Elemento 5 </li>
    </ul>
</div>`;
const div = JDM(domString, document.body);
```

**Kind**: global class  

* [Jdm](#Jdm)
    * [new Jdm([element], [parent], [classList], [deep], [...args])](#new_Jdm_new)
    * _instance_
        * [.warnDuplicateNames](#Jdm+warnDuplicateNames) : <code>boolean</code>
        * [.version](#Jdm+version) : <code>string</code>
        * [.jdm_setAttribute(attribute, [value])](#Jdm+jdm_setAttribute) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_getAttribute(attribute)](#Jdm+jdm_getAttribute) ⇒ <code>string</code> \| <code>null</code>
        * [.jdm_append(elementList)](#Jdm+jdm_append) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_prepend(elementList)](#Jdm+jdm_prepend) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_appendBefore(elementList, elementTarget)](#Jdm+jdm_appendBefore) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_appendAfter(elementList, elementTarget)](#Jdm+jdm_appendAfter) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_addId(id)](#Jdm+jdm_addId) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_addClassList(classList)](#Jdm+jdm_addClassList) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_removeClassList(classList)](#Jdm+jdm_removeClassList) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_toggleClassList(classList)](#Jdm+jdm_toggleClassList) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_findClassList(classList, [some])](#Jdm+jdm_findClassList) ⇒ <code>boolean</code>
        * [.jdm_empty()](#Jdm+jdm_empty) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_destroy()](#Jdm+jdm_destroy) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_validate()](#Jdm+jdm_validate) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_removeAttribute(attribute)](#Jdm+jdm_removeAttribute) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_setStyle(style, value)](#Jdm+jdm_setStyle) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_extendNode(name, [object])](#Jdm+jdm_extendNode) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_innerHTML(value)](#Jdm+jdm_innerHTML) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_binding(el, [event], [twoWayDataBinding])](#Jdm+jdm_binding) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_onInput([fn])](#Jdm+jdm_onInput) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_onChange([fn])](#Jdm+jdm_onChange) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_onSelect([fn])](#Jdm+jdm_onSelect) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_onDebounce([fn], [timeout])](#Jdm+jdm_onDebounce) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_onClick([fn], [options])](#Jdm+jdm_onClick) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_onRightClick([fn])](#Jdm+jdm_onRightClick) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_onDoubleClick([fn])](#Jdm+jdm_onDoubleClick) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_onInvalid([fn])](#Jdm+jdm_onInvalid) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_onLoad([fn])](#Jdm+jdm_onLoad) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_onError([fn])](#Jdm+jdm_onError) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_onSubmit([fn])](#Jdm+jdm_onSubmit) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_setValue(value, [tooBoolean])](#Jdm+jdm_setValue) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_getValue()](#Jdm+jdm_getValue) ⇒ <code>any</code>
        * [.jdm_genEvent(name, [data], [propagateToParents])](#Jdm+jdm_genEvent) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_addEventListener(name, [fn])](#Jdm+jdm_addEventListener) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_removeEventListener(name, [fn])](#Jdm+jdm_removeEventListener) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_extendChildNode()](#Jdm+jdm_extendChildNode) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_setValueRaw()](#Jdm+jdm_setValueRaw)
        * [.jdm_clearAnimations()](#Jdm+jdm_clearAnimations) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_fadeIn([callbackFn], [option])](#Jdm+jdm_fadeIn) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_fadeInDown([callbackFn], [option])](#Jdm+jdm_fadeInDown) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_fadeInUp([callbackFn], [option])](#Jdm+jdm_fadeInUp) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_fadeInLeft([callbackFn], [option])](#Jdm+jdm_fadeInLeft) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_fadeInRight([callbackFn], [option])](#Jdm+jdm_fadeInRight) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_fadeOut([callbackFn], [option])](#Jdm+jdm_fadeOut) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_fadeOutRight([callbackFn], [option])](#Jdm+jdm_fadeOutRight) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_fadeOutUp([callbackFn], [option])](#Jdm+jdm_fadeOutUp) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_fadeOutDown([callbackFn], [option])](#Jdm+jdm_fadeOutDown) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_fadeOutLeft([callbackFn], [option])](#Jdm+jdm_fadeOutLeft) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_bounce([callbackFn], [option])](#Jdm+jdm_bounce) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_tada([callbackFn], [option])](#Jdm+jdm_tada) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_zoomIn([callbackFn], [option])](#Jdm+jdm_zoomIn) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_zoomOut([callbackFn], [option])](#Jdm+jdm_zoomOut) ⇒ [<code>Jdm</code>](#Jdm)
        * [.jdm_rotation([callbackFn], [deg], [option])](#Jdm+jdm_rotation) ⇒ [<code>Jdm</code>](#Jdm)
    * _static_
        * [.on()](#Jdm.on)
        * [.use(plugin)](#Jdm.use) ⇒ [<code>Jdm</code>](#Jdm)
        * [._invalidateMethodCache()](#Jdm._invalidateMethodCache)
        * [.inspect(node, [depth])](#Jdm.inspect)

<a name="new_Jdm_new"></a>

### new Jdm([element], [parent], [classList], [deep], [...args])
Crea una nuova istanza della classe Jdm e manipola l'elemento DOM.

**Returns**: [<code>Jdm</code>](#Jdm) - - Restituisce il nodo appena creato o manipolato.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [element] | <code>HTMLElement</code> \| <code>null</code> | <code></code> | L'elemento DOM da manipolare. Se non specificato, verrà creato un nuovo nodo. |
| [parent] | <code>HTMLElement</code> \| <code>null</code> | <code></code> | Il genitore dell'elemento. Se specificato, l'elemento verrà aggiunto come figlio del genitore. |
| [classList] | <code>Array.&lt;string&gt;</code> \| <code>null</code> | <code></code> | Una lista di classi da aggiungere all'elemento. Se specificato, verranno aggiunte le classi 