## Classes

<dl>
<dt><a href="#AnimationOption">AnimationOption</a></dt>
<dd><p>Opzioni per l&#39;animazione.</p>
</dd>
<dt><a href="#Jdm">Jdm</a></dt>
<dd><p>Classe Jdm che fornisce un framework per la manipolazione del DOM.
Permette di creare un elemento DOM, aggiungerlo a un genitore, assegnargli delle classi
e manipolarlo in modo ricorsivo, se richiesto.
I metodi della classe sono concatenabili per facilitare le operazioni sul DOM.</p>
<h1 id="installazione">INSTALLAZIONE:</h1>
<p>NPM</p>
<pre><code class="language-bash">npm install jdm_javascript_dom_manipulator
</code></pre>
<p>Esempio di utilizzo di un modulo ES6:</p>
<pre><code class="language-javascript">import &#39;./yourPath/dist/jdm.js&#39;;
</code></pre>
<h1 id="uso">USO</h1>
<pre><code class="language-javascript">JDM(&#39;div&#39;, container, [&#39;fooClass&#39;,&#39;barClass&#39;])
</code></pre>
<h1 id="comparazione">COMPARAZIONE:</h1>
<h2 id="jquery">jQuery:</h2>
<pre><code class="language-javascript">const $div = $(&#39;&lt;div&gt;&#39;, { class: &#39;foo bar&#39; });
const $ul = $(&#39;&lt;ul&gt;&#39;);
const $li1 = $(&#39;&lt;li&gt;&#39;).text(&#39;Elemento 1&#39;);
const $li2 = $(&#39;&lt;li&gt;&#39;).text(&#39;Elemento 2&#39;);
const $li3 = $(&#39;&lt;li&gt;&#39;).text(&#39;Elemento 3&#39;);
const $li4 = $(&#39;&lt;li&gt;&#39;).text(&#39;Elemento 4&#39;);
const $li5 = $(&#39;&lt;li&gt;&#39;).text(&#39;Elemento 5&#39;);
$ul.append($li1, $li2, $li3, $li4, $li5);
$div.append($ul);
$(&#39;body&#39;).append($div);
</code></pre>
<h2 id="javascript-puro">JavaScript puro:</h2>
<pre><code class="language-javascript">const div = &#39;div&#39;;
div.classList.add(&#39;foo&#39;, &#39;bar&#39;);
const ul = document.createElement(&#39;ul&#39;);
const li1 = document.createElement(&#39;li&#39;);
li1.textContent = &#39;Elemento 1&#39;;
const li2 = document.createElement(&#39;li&#39;);
li2.textContent = &#39;Elemento 2&#39;;
const li3 = document.createElement(&#39;li&#39;);
li3.textContent = &#39;Elemento 3&#39;;
const li4 = document.createElement(&#39;li&#39;);
li4.textContent = &#39;Elemento 4&#39;;
const li5 = document.createElement(&#39;li&#39;);
li5.textContent = &#39;Elemento 5&#39;;
ul.append(li1, li2, li3, li4, li5);
div.appendChild(ul);
document.body.appendChild(div);
</code></pre>
<h2 id="jdm">Jdm:</h2>
<pre><code class="language-javascript">const domString = `
&lt;div class=&quot;foo bar&quot;&gt;
    &lt;ul&gt;
        &lt;li&gt; Elemento 1 &lt;/li&gt;
        &lt;li&gt; Elemento 2 &lt;/li&gt;
        &lt;li&gt; Elemento 3 &lt;/li&gt;
        &lt;li&gt; Elemento 4 &lt;/li&gt;
        &lt;li&gt; Elemento 5 &lt;/li&gt;
    &lt;/ul&gt;
&lt;/div&gt;`;
const div = JDM(domString, document.body);
</code></pre>
</dd>
<dt><a href="#Proto">Proto</a></dt>
<dd><p>Classe che contiene una lista di prototype.</p>
</dd>
</dl>

<a name="AnimationOption"></a>

## AnimationOption
Opzioni per l'animazione.

**Kind**: global class  
**Default**: <code>1</code>  
<a name="new_AnimationOption_new"></a>

### new AnimationOption(duration, easing, fill, delay, composite, direction, iterations)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| duration | <code>number</code> | <code>250</code> | Durata dell'animazione in millisecondi. |
| easing | <code>&#x27;linear&#x27;</code> \| <code>&#x27;ease&#x27;</code> \| <code>&#x27;ease-in&#x27;</code> \| <code>&#x27;ease-out&#x27;</code> \| <code>&#x27;ease-in-out&#x27;</code> | <code>ease-in-out</code> | Funzione di easing dell'animazione. |
| fill | <code>&#x27;none&#x27;</code> \| <code>&#x27;forwards&#x27;</code> \| <code>&#x27;backwards&#x27;</code> \| <code>&#x27;both&#x27;</code> \| <code>&#x27;auto&#x27;</code> | <code>forwards</code> | Stile applicato fuori dall'intervallo dell'animazione. |
| delay | <code>number</code> | <code>0</code> | Ritardo dell'inizio dell'animazione in millisecondi. |
| composite | <code>&#x27;replace&#x27;</code> \| <code>&#x27;add&#x27;</code> \| <code>&#x27;accumulate&#x27;</code> | <code>replace</code> | Modalità di composizione dell’animazione. |
| direction | <code>&#x27;normal&#x27;</code> \| <code>&#x27;reverse&#x27;</code> \| <code>&#x27;alternate&#x27;</code> \| <code>&#x27;alternate-reverse&#x27;</code> | <code>normal</code> | Direzione di riproduzione dell'animazione. |
| iterations | <code>number</code> | <code>1</code> | Numero di volte che l'animazione verrà ripetuta. |

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
Esempio di utilizzo di un modulo ES6:
```javascript
import './yourPath/dist/jdm.js';
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
    * [.jdm_setAttribute(attribute, [value])](#Jdm+jdm_setAttribute) ⇒ [<code>Jdm</code>](#Jdm)
    * [.jdm_getAttribute(attribute)](#Jdm+jdm_getAttribute) ⇒ <code>string</code> \| <code>null</code>
    * [.jdm_append(elementList)](#Jdm+jdm_append) ⇒ [<code>Jdm</code>](#Jdm)
    * [.jdm_prepend(elementList)](#Jdm+jdm_prepend) ⇒ [<code>Jdm</code>](#Jdm)
    * [.jdm_addId(id)](#Jdm+jdm_addId) ⇒ [<code>Jdm</code>](#Jdm)
    * [.jdm_addClassList(classList)](#Jdm+jdm_addClassList) ⇒ [<code>Jdm</code>](#Jdm)
    * [.jdm_removeClassList(classList)](#Jdm+jdm_removeClassList) ⇒ [<code>Jdm</code>](#Jdm)
    * [.jdm_toggleClassList(classList)](#Jdm+jdm_toggleClassList) ⇒ [<code>Jdm</code>](#Jdm)
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
    * [.jdm_onClick([fn])](#Jdm+jdm_onClick) ⇒ [<code>Jdm</code>](#Jdm)
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
    * [.jdm_fadeIn([option], [callback])](#Jdm+jdm_fadeIn) ⇒ [<code>Jdm</code>](#Jdm)

<a name="new_Jdm_new"></a>

### new Jdm([element], [parent], [classList], [deep], [...args])
Crea una nuova istanza della classe Jdm e manipola l'elemento DOM.

**Returns**: [<code>Jdm</code>](#Jdm) - - Restituisce il nodo appena creato o manipolato.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [element] | <code>HTMLElement</code> \| <code>null</code> | <code></code> | L'elemento DOM da manipolare. Se non specificato, verrà creato un nuovo nodo. |
| [parent] | <code>HTMLElement</code> \| <code>null</code> | <code></code> | Il genitore dell'elemento. Se specificato, l'elemento verrà aggiunto come figlio del genitore. |
| [classList] | <code>Array.&lt;string&gt;</code> \| <code>null</code> | <code></code> | Una lista di classi da aggiungere all'elemento. Se specificato, verranno aggiunte le classi all'elemento. |
| [deep] | <code>boolean</code> | <code>true</code> | Se impostato su `true`, i figli dell'elemento verranno manipolati ricorsivamente. |
| [...args] | <code>\*</code> |  | Altri argomenti opzionali che possono essere passati per la manipolazione del nodo. |

**Example**  
```js
const div = JDM('<div>lorem ipsum</div>', document.body, ['my-class'], true);
// Crea un nuovo div con la classe 'my-class' e lo aggiunge al body

//language=html
const domString = `
    <div class="my-class">
        <p> paragraph </p>
    </div>
    `;
JDM(domString, document.body)
// Crea un nuovo div con la classe 'my-class', un paragrafo child e lo aggiunge tutto al body
```
<a name="Jdm+jdm_setAttribute"></a>

### jdm.jdm\_setAttribute(attribute, [value]) ⇒ [<code>Jdm</code>](#Jdm)
Imposta un attributo su un elemento DOM e genera un evento personalizzato per il cambiamento.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Chainable**  
**Returns**: [<code>Jdm</code>](#Jdm) - - Restituisce l'elemento DOM su cui l'attributo è stato impostato, consentendo il chaining dei metodi.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| attribute | <code>string</code> |  | Il nome dell'attributo da impostare sull'elemento DOM. |
| [value] | <code>string</code> \| <code>null</code> | <code>null</code> | Il valore dell'attributo. Se non fornito, l'attributo sarà impostato su `null`. |

**Example**  
```js
const div = JDM('<div>lorem ipsum</div>', document.body)
  .jdm_setAttribute('id', 'myDiv')
  .jdm_setAttribute('data-test', 'foo')
  .jdm_setAttribute('counter', 1);
```
<a name="Jdm+jdm_getAttribute"></a>

### jdm.jdm\_getAttribute(attribute) ⇒ <code>string</code> \| <code>null</code>
Recupera il valore di un attributo di un elemento DOM.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: <code>string</code> \| <code>null</code> - - Restituisce il valore dell'attributo se esiste, altrimenti `null` se l'attributo non è presente.  

| Param | Type | Description |
| --- | --- | --- |
| attribute | <code>string</code> | Il nome dell'attributo di cui si desidera ottenere il valore. |

**Example**  
```js
const div = JDM('<div>lorem ipsum</div>', document.body)
 .jdm_setAttribute('data-test', 'foo');
const dataTest = div.jdm_getAttribute('data-test')
```
<a name="Jdm+jdm_append"></a>

### jdm.jdm\_append(elementList) ⇒ [<code>Jdm</code>](#Jdm)
Aggiunge uno o più elementi figli a un elemento DOM.
Se viene fornita una lista di elementi, tutti gli elementi vengono aggiunti all'elemento DOM.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: [<code>Jdm</code>](#Jdm) - - Restituisce l'elemento DOM su cui gli elementi sono stati aggiunti, consentendo il chaining dei metodi.  

| Param | Type | Description |
| --- | --- | --- |
| elementList | <code>HTMLElement</code> \| <code>Array.&lt;HTMLElement&gt;</code> | Un singolo elemento DOM o un array di elementi DOM da aggiungere come figli. |

**Example**  
```js
const p1 = JDM('<p>paragrafo 1</p>');
const p2 = JDM('<p>paragrafo 2</p>');
const div = JDM('<div>lorem ipsum</div>', document.body)
 .jdm_append([p1, p2]); // Aggiunge entrambi i paragrafi come figli del div.

const span = JDM('span');
div.jdm_append(span); // Aggiunge il singolo elemento span come figlio del div.
```
<a name="Jdm+jdm_prepend"></a>

### jdm.jdm\_prepend(elementList) ⇒ [<code>Jdm</code>](#Jdm)
Aggiunge uno o più elementi figli a un elemento DOM.
Se viene fornita una lista di elementi, tutti gli elementi vengono aggiunti come figli dell'elemento.
Se viene fornito un singolo elemento, questo viene aggiunto come unico figlio.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: [<code>Jdm</code>](#Jdm) - - Restituisce l'elemento DOM su cui gli elementi sono stati aggiunti, consentendo il chaining dei metodi.  

| Param | Type | Description |
| --- | --- | --- |
| elementList | <code>HTMLElement</code> \| <code>Array.&lt;HTMLElement&gt;</code> | Un singolo elemento DOM o un array di elementi DOM da aggiungere come figli. |

**Example**  
```js
const div = JDM('<div><p>paragrafo</p></div>', document.body);
const span = JDM('<span>foo</span>');
div.jdm_prepend(span);
// Risultato
<div>
    <span>foo</span>
    <p>paragrafo</p>
</div>
```
<a name="Jdm+jdm_addId"></a>

### jdm.jdm\_addId(id) ⇒ [<code>Jdm</code>](#Jdm)
Aggiunge un attributo `id` all'elemento DOM specificato.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: [<code>Jdm</code>](#Jdm) - - Restituisce l'elemento DOM su cui è stato impostato l'attributo `id`, consentendo il chaining dei metodi.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Il valore dell'attributo `id` da impostare sull'elemento DOM. |

**Example**  
```js
const div = JDM('<div>lorem ipsum</div>', document.body)
 .jdm_addId('myDiv'); // Imposta l'attributo id="myDiv" sull'elemento div.
```
<a name="Jdm+jdm_addClassList"></a>

### jdm.jdm\_addClassList(classList) ⇒ [<code>Jdm</code>](#Jdm)
Aggiunge una o più classi CSS all'elemento DOM.
Se viene fornito un array di classi, tutte le classi vengono aggiunte all'elemento.
Se viene fornita una singola classe, questa viene aggiunta come unica classe.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: [<code>Jdm</code>](#Jdm) - - Restituisce l'elemento DOM su cui le classi sono state aggiunte, consentendo il chaining dei metodi.  

| Param | Type | Description |
| --- | --- | --- |
| classList | <code>string</code> \| <code>Array.&lt;string&gt;</code> | Una singola classe CSS o un array di classi CSS da aggiungere all'elemento DOM. |

**Example**  
```js
const div = JDM('<div>lorem ipsum</div>', document.body)
 .jdm_addClassList('myClass'); // Aggiunge la classe "myClass" all'elemento div.

const div2 = JDM('<div>lorem ipsum</div>', document.body)
 .jdm_addClassList(['class1', 'class2']); // Aggiunge "class1" e "class2" all'elemento div2.
```
<a name="Jdm+jdm_removeClassList"></a>

### jdm.jdm\_removeClassList(classList) ⇒ [<code>Jdm</code>](#Jdm)
Rimuove una o più classi CSS dall'elemento DOM.
Se viene fornito un array di classi, tutte le classi vengono rimosse dall'elemento.
Se viene fornita una singola classe, questa viene rimossa.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: [<code>Jdm</code>](#Jdm) - - Restituisce l'elemento DOM su cui le classi sono state rimosse, consentendo il chaining dei metodi.  

| Param | Type | Description |
| --- | --- | --- |
| classList | <code>string</code> \| <code>Array.&lt;string&gt;</code> | Una singola classe CSS o un array di classi CSS da rimuovere dall'elemento DOM. |

**Example**  
```js
JDM('<div class="foo bar myClass"></div>', document.body)
 .jdm_removeClassList('myClass'); // Rimuove la classe "myClass" dall'elemento.

JDM('<div class="foo bar myClass"></div>', document.body)
 .jdm_removeClassList(['foo', 'bar']); // Rimuove "foo" e "bar" dall'elemento.
```
<a name="Jdm+jdm_toggleClassList"></a>

### jdm.jdm\_toggleClassList(classList) ⇒ [<code>Jdm</code>](#Jdm)
Attiva o disattiva una o più classi CSS su un elemento DOM.
Se viene fornito un array di classi, ciascuna classe verrà alternata (aggiunta se non presente, rimossa se presente).
Se viene fornita una singola classe, questa verrà alternata.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: [<code>Jdm</code>](#Jdm) - - Restituisce l'elemento DOM su cui le classi sono state alternate, consentendo il chaining dei metodi.  

| Param | Type | Description |
| --- | --- | --- |
| classList | <code>string</code> \| <code>Array.&lt;string&gt;</code> | Una singola classe CSS o un array di classi CSS da alternare sull'elemento DOM. |

**Example**  
```js
const div = JDM('<div>lorem ipsum</div>', document.body)
.jdm_toggleClassList('active'); // Alterna la classe "active" sull'elemento div.

const div2 = JDM('<div>lorem ipsum</div>', document.body)
.jdm_toggleClassList(['class1', 'class2']); // Alterna le classi "class1" e "class2" sull'elemento div2.
```
<a name="Jdm+jdm_empty"></a>

### jdm.jdm\_empty() ⇒ [<code>Jdm</code>](#Jdm)
Svuota il contenuto dell'elemento DOM.
A seconda del tipo di elemento, il comportamento di "svuotamento" varia:
- Per gli elementi `input` di tipo `checkbox` o `radio`, deseleziona l'elemento (imposta `checked` a `false`).
- Per gli altri elementi `input` o `textarea`, imposta il valore a `null` (svuotando il campo di testo).
- Per un elemento `form`, esegue il reset del modulo (ripristina tutti i campi al loro stato iniziale).
- Per altri tipi di elementi, rimuove il contenuto HTML dell'elemento (imposta `innerHTML` a una stringa vuota).

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: [<code>Jdm</code>](#Jdm) - - Restituisce l'elemento DOM su cui è stato effettuato lo svuotamento, consentendo il chaining dei metodi.  
**Example**  
```js
const inputText = JDM('input', document.body)
 .jdm_empty(); // Imposta il valore dell'input text a null.

const checkbox = JDM('input', document.body)
 .jdm_setAttribute('type', 'checkbox')
 .jdm_empty(); // Deseleziona la checkbox.

const form = JDM('form').jdm_empty(); // Esegue il reset del modulo.
```
<a name="Jdm+jdm_destroy"></a>

### jdm.jdm\_destroy() ⇒ [<code>Jdm</code>](#Jdm)
Rimuove l'elemento DOM dal documento e genera un evento di distruzione.
Questo metodo elimina l'elemento DOM rappresentato da `this.node` dalla struttura del documento.
Inoltre, viene generato un evento personalizzato chiamato "destroy".

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: [<code>Jdm</code>](#Jdm) - - Restituisce l'elemento DOM che è stato rimosso, consentendo il chaining dei metodi.  
**Example**  
```js
const div = JDM('<div>lorem ipsum</div>', document.body)
 .jdm_destroy(); // Rimuove l'elemento div dal documento e genera un evento "destroy".
```
<a name="Jdm+jdm_validate"></a>

### jdm.jdm\_validate() ⇒ [<code>Jdm</code>](#Jdm)
Verifica la validità dell'elemento `input` o `form` secondo le regole di validazione HTML.
Dopo la verifica, viene generato un evento personalizzato chiamato "validate", che segnala il risultato della validazione.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: [<code>Jdm</code>](#Jdm) - L'elemento DOM su cui è stata effettuata la validazione, consentendo il chaining dei metodi.  
**Example**  
```js
JDM('input', document.body)
 .jdm_setAttribute('required', 'true')
 .jdm_validate(); // Verifica la validità dell'input e genera l'evento "validate".
```
<a name="Jdm+jdm_removeAttribute"></a>

### jdm.jdm\_removeAttribute(attribute) ⇒ [<code>Jdm</code>](#Jdm)
Rimuove un attributo dall'elemento DOM e genera un evento di rimozione dell'attributo.
Questo metodo rimuove l'attributo specificato dall'elemento DOM rappresentato da `this.node`.
Inoltre, viene generato un evento personalizzato chiamato "removeAttribute" con il nome dell'attributo rimosso.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: [<code>Jdm</code>](#Jdm) - - Restituisce l'elemento DOM su cui l'attributo è stato rimosso, consentendo il chaining dei metodi.  

| Param | Type | Description |
| --- | --- | --- |
| attribute | <code>string</code> | Il nome dell'attributo da rimuovere dall'elemento DOM. |

**Example**  
```js
JDM('<div id="foo">lorem ipsum</div>', document.body)
 .jdm_removeAttribute('id'); // Rimuove l'attributo 'id' dall'elemento div.
```
<a name="Jdm+jdm_setStyle"></a>

### jdm.jdm\_setStyle(style, value) ⇒ [<code>Jdm</code>](#Jdm)
Imposta un valore per una proprietà di stile CSS su un elemento DOM.
Questo metodo applica una dichiarazione di stile CSS all'elemento DOM rappresentato da `this.node`.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: [<code>Jdm</code>](#Jdm) - - Restituisce l'elemento DOM su cui è stato applicato lo stile, consentendo il chaining dei metodi.  

| Param | Type | Description |
| --- | --- | --- |
| style | <code>string</code> | Il nome della proprietà di stile CSS da impostare (ad esempio, "color", "backgroundColor"). |
| value | <code>string</code> | Il valore da assegnare alla proprietà di stile CSS (ad esempio, "red", "10px"). |

**Example**  
```js
const div = JDM('<div>lorem ipsum</div>', document.body)
.jdm_setStyle('color', 'red'); // Imposta il colore del testo dell'elemento div su rosso.
```
<a name="Jdm+jdm_extendNode"></a>

### jdm.jdm\_extendNode(name, [object]) ⇒ [<code>Jdm</code>](#Jdm)
Estende l'elemento DOM aggiungendo una proprietà personalizzata.
Questo metodo assegna un oggetto o un valore alla proprietà `name` dell'elemento DOM rappresentato da `this.node`.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: [<code>Jdm</code>](#Jdm) - - Restituisce l'elemento DOM su cui è stata aggiunta la proprietà personalizzata, consentendo il chaining dei metodi.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | Il nome della proprietà da aggiungere all'elemento DOM. |
| [object] | <code>Object</code> \| <code>null</code> | <code></code> | L'oggetto o il valore da associare alla proprietà. Può essere qualsiasi tipo di valore, incluso `null`. |

**Example**  
```js
const div = JDM('<div>lorem ipsum</div>', document.body)
 .jdm_extendNode('customData', { id: 123, name: 'My Div' });
// Aggiunge la proprietà 'customData' all'elemento div con un oggetto come valore.
console.log(div.customData); // { id: 123, name: 'My Div' }
```
<a name="Jdm+jdm_innerHTML"></a>

### jdm.jdm\_innerHTML(value) ⇒ [<code>Jdm</code>](#Jdm)
Imposta o restituisce il contenuto HTML interno dell'elemento DOM.
Questo metodo imposta il valore di `innerHTML` dell'elemento DOM rappresentato da `this.node`.
Se il parametro `value` viene fornito, aggiorna il contenuto HTML; altrimenti, restituisce il contenuto HTML attuale.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: [<code>Jdm</code>](#Jdm) - - Restituisce l'elemento DOM con il nuovo contenuto HTML impostato, consentendo il chaining dei metodi.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | Il contenuto HTML da impostare all'interno dell'elemento DOM.                           Se non fornito, il metodo restituirà il contenuto HTML corrente. |

**Example**  
```js
JDM('<div>lorem ipsum</div>', document.body)
 .jdm_innerHTML('<p>Dolor sit amet</p>');
// Imposta il contenuto HTML del div con un nuovo paragrafo.
```
<a name="Jdm+jdm_binding"></a>

### jdm.jdm\_binding(el, [event], [twoWayDataBinding]) ⇒ [<code>Jdm</code>](#Jdm)
Imposta un binding di dati tra l'elemento corrente e un altro o più elementi.
Questo metodo consente di sincronizzare i valori tra gli elementi DOM, abilitando il data binding unidirezionale o bidirezionale.
Se un valore cambia nell'elemento sorgente (ad esempio un `input`), il valore dell'elemento di destinazione (ad esempio un altro `input` o `div`) viene aggiornato.
Se il binding bidirezionale è abilitato, i cambiamenti sono sincronizzati in entrambe le direzioni.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: [<code>Jdm</code>](#Jdm) - - Restituisce l'elemento DOM su cui è stato applicato il binding, consentendo il chaining dei metodi.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| el | <code>HTMLElement</code> \| <code>Array.&lt;HTMLElement&gt;</code> |  | L'elemento o la lista di elementi con cui si desidera stabilire il binding. |
| [event] | <code>string</code> | <code>&quot;\&quot;input\&quot;&quot;</code> | Il tipo di evento da ascoltare per attivare il binding. Default è "input". |
| [twoWayDataBinding] | <code>boolean</code> | <code>true</code> | Se `true`, attiva il binding bidirezionale. Se `false`, il binding sarà unidirezionale. |

**Example**  
```js
const input = JDM('input', document.body);
 const output = JDM('input', document.body);
 input.jdm_binding(output, "input", true);
// Crea un binding unidirezionale tra l'input e l'output, che si attiva sull'evento 'change'.
```
<a name="Jdm+jdm_onInput"></a>

### jdm.jdm\_onInput([fn]) ⇒ [<code>Jdm</code>](#Jdm)
Aggiunge un listener per l'evento `input` all'elemento DOM.
Questo metodo consente di eseguire una funzione di callback ogni volta che si verifica un evento di tipo `input` sull'elemento.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: [<code>Jdm</code>](#Jdm) - - Restituisce l'elemento DOM su cui è stato aggiunto l'event listener, consentendo il chaining dei metodi.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [fn] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | La funzione di callback da eseguire quando si verifica l'evento `input`.                                    La funzione riceverà l'evento come parametro. |

**Example**  
```js
const input = JDM('input', document.body)
 .jdm_onInput((event) => {
  console.log('Input modificato:', input.jdm_getValue());
});
// Aggiunge un listener per l'evento 'input' che stampa il valore dell'input ogni volta che cambia.
```
<a name="Jdm+jdm_onChange"></a>

### jdm.jdm\_onChange([fn]) ⇒ [<code>Jdm</code>](#Jdm)
Aggiunge un listener per l'evento `change` all'elemento DOM.
Questo metodo consente di eseguire una funzione di callback ogni volta che si verifica un evento di tipo `change` sull'elemento.
L'evento `change` viene attivato quando il valore di un elemento, come un campo di input, viene modificato e l'elemento perde il focus.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: [<code>Jdm</code>](#Jdm) - - Restituisce l'elemento DOM su cui è stato aggiunto l'event listener, consentendo il chaining dei metodi.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [fn] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | La funzione di callback da eseguire quando si verifica l'evento `change`.                                    La funzione riceverà l'evento come parametro. |

**Example**  
```js
const input = JDM('input', document.body)
 .jdm_onChange(() => {
  console.log('Valore cambiato:', input.jdm_getValue());
});
// Aggiunge un listener per l'evento 'change' che stampa il valore dell'input ogni volta che cambia.
```
<a name="Jdm+jdm_onSelect"></a>

### jdm.jdm\_onSelect([fn]) ⇒ [<code>Jdm</code>](#Jdm)
Aggiunge un listener per l'evento `select` all'elemento DOM.
Questo metodo consente di eseguire una funzione di callback ogni volta che si verifica un evento di tipo `select` sull'elemento.
L'evento `select` viene attivato quando una parte del testo all'interno di un elemento, come un campo di input o una textarea, viene selezionata dall'utente.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: [<code>Jdm</code>](#Jdm) - - Restituisce l'elemento DOM su cui è stato aggiunto l'event listener, consentendo il chaining dei metodi.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [fn] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | La funzione di callback da eseguire quando si verifica l'evento `select`.                                    La funzione riceverà l'evento come parametro. |

**Example**  
```js
const input = JDM('<input>', document.body)
 .jdm_onSelect((event) => {
  console.log('Testo selezionato:', input.jdm_getValue());
});
// Aggiunge un listener per l'evento 'select' che stampa il valore del campo di input ogni volta che viene selezionato del testo.
```
<a name="Jdm+jdm_onDebounce"></a>

### jdm.jdm\_onDebounce([fn], [timeout]) ⇒ [<code>Jdm</code>](#Jdm)
Aggiunge un listener per l'evento `input` all'elemento DOM con un meccanismo di debounce.
Questo metodo permette di eseguire una funzione di callback solo dopo che l'utente ha smesso di digitare per un determinato periodo di tempo.
È utile per evitare l'esecuzione ripetitiva di funzioni (come una ricerca o un aggiornamento) mentre l'utente sta digitando, migliorando le prestazioni.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: [<code>Jdm</code>](#Jdm) - - Restituisce l'elemento DOM su cui è stato aggiunto l'event listener, consentendo il chaining dei metodi.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [fn] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | La funzione di callback da eseguire quando si verifica l'evento `input`.                                    La funzione verrà eseguita dopo che l'utente smette di digitare per un periodo di tempo specificato dal parametro `timeout`. |
| [timeout] | <code>number</code> | <code>300</code> | Il tempo di attesa (in millisecondi) dopo l'ultimo evento `input` prima che la funzione di callback venga eseguita.                                  Il valore predefinito è 300 millisecondi. |

**Example**  
```js
const input = JDM('input', document.body)
 .jdm_onDebounce(() => {
     console.log('Input debounced:',input.jdm_getValue());
 }, 500);
// Aggiunge un listener per l'evento 'input' con un debounce di 500 millisecondi,
// evitando chiamate troppo frequenti alla funzione di callback mentre l'utente sta digitando.
```
<a name="Jdm+jdm_onClick"></a>

### jdm.jdm\_onClick([fn]) ⇒ [<code>Jdm</code>](#Jdm)
Aggiunge un listener per l'evento `click` all'elemento DOM.
Questo metodo consente di eseguire una funzione di callback ogni volta che si verifica un evento di tipo `click` sull'elemento.
L'evento `click` viene attivato quando l'utente clicca su un elemento, come un pulsante o un link.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: [<code>Jdm</code>](#Jdm) - - Restituisce l'elemento DOM su cui è stato aggiunto l'event listener, consentendo il chaining dei metodi.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [fn] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | La funzione di callback da eseguire quando si verifica l'evento `click`.                                    La funzione riceverà l'evento come parametro. |

**Example**  
```js
const button = JDM('<button>CLICK</button>', document.body)
 .jdm_onClick((event) => {
     console.log('Button clicked');
 });
// Aggiunge un listener per l'evento 'click' che stampa un messaggio ogni volta che il pulsante viene cliccato.
```
<a name="Jdm+jdm_onRightClick"></a>

### jdm.jdm\_onRightClick([fn]) ⇒ [<code>Jdm</code>](#Jdm)
Aggiunge un listener per l'evento `contextmenu` (clic destro) all'elemento DOM.
Questo metodo consente di eseguire una funzione di callback ogni volta che si verifica un evento di tipo `contextmenu` sull'elemento,
che viene attivato dal clic destro del mouse (o equivalente, come il tocco prolungato su dispositivi mobili).
L'evento `contextmenu` è tipicamente usato per visualizzare il menu contestuale di un elemento.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: [<code>Jdm</code>](#Jdm) - - Restituisce l'elemento DOM su cui è stato aggiunto l'event listener, consentendo il chaining dei metodi.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [fn] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | La funzione di callback da eseguire quando si verifica l'evento `contextmenu`.                                    La funzione riceverà l'evento come parametro. |

**Example**  
```js
const element = JDM('<div> RIGHT CLICK </div>', document.body).jdm_onRightClick((event) => {
  event.preventDefault(); // Previene il menu contestuale predefinito
  console.log('Clic destro eseguito!');
});
// Aggiunge un listener per l'evento 'contextmenu' che esegue la funzione di callback ogni volta che si fa clic destro sull'elemento.
```
<a name="Jdm+jdm_onDoubleClick"></a>

### jdm.jdm\_onDoubleClick([fn]) ⇒ [<code>Jdm</code>](#Jdm)
Aggiunge un listener per l'evento `dblclick` (doppio clic) all'elemento DOM.
Questo metodo consente di eseguire una funzione di callback ogni volta che si verifica un evento di tipo `dblclick` sull'elemento,
che viene attivato quando l'utente fa doppio clic su un elemento.
L'evento `dblclick` è comunemente utilizzato per azioni che richiedono un'interazione più rapida dell'utente, come l'apertura di un file o l'attivazione di una funzionalità.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: [<code>Jdm</code>](#Jdm) - - Restituisce l'elemento DOM su cui è stato aggiunto l'event listener, consentendo il chaining dei metodi.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [fn] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | La funzione di callback da eseguire quando si verifica l'evento `dblclick`.                                    La funzione riceverà l'evento come parametro. |

**Example**  
```js
const element = JDM('<div>Double click</div>', document.body)
 .jdm_onDoubleClick((event) => {
     console.log('Elemento doppiamente cliccato');
 });
// Aggiunge un listener per l'evento 'dblclick' che esegue la funzione di callback ogni volta che l'utente fa doppio clic sull'elemento.
```
<a name="Jdm+jdm_onInvalid"></a>

### jdm.jdm\_onInvalid([fn]) ⇒ [<code>Jdm</code>](#Jdm)
Aggiunge un listener per l'evento `invalid` all'elemento DOM.
Questo metodo consente di eseguire una funzione di callback ogni volta che si verifica un evento di tipo `invalid` sull'elemento,
che viene attivato quando un elemento di modulo non soddisfa i suoi vincoli di validazione.
L'evento `invalid` viene in genere generato automaticamente dal browser quando un utente invia un modulo con campi non validi.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: [<code>Jdm</code>](#Jdm) - - Restituisce l'elemento DOM su cui è stato aggiunto l'event listener, consentendo il chaining dei metodi.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [fn] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | La funzione di callback da eseguire quando si verifica l'evento `invalid`.                                    La funzione riceverà l'evento come parametro. |

**Example**  
```js
const formString = `
 <form>
     <input name="inputNumeric" type="number" min="1" max="10" required />
     <button type="submit"> Submit </button>
 </form>`;
 const form = JDM(formString, document.body)
 form.jdm_childNode.inputNumeric
     .jdm_onInvalid((e) => {
         console.log('Il campo input è invalido');
     })
// Aggiunge un listener per l'evento 'invalid' che esegue la funzione di callback quando l'input non è valido.
```
<a name="Jdm+jdm_onLoad"></a>

### jdm.jdm\_onLoad([fn]) ⇒ [<code>Jdm</code>](#Jdm)
Aggiunge un listener per l'evento `load` all'elemento DOM.
Questo metodo consente di eseguire una funzione di callback ogni volta che si verifica un evento di tipo `load` sull'elemento,
che viene attivato quando l'elemento o le risorse a esso associate sono completamente caricate.
L'evento `load` viene comunemente utilizzato per monitorare il caricamento di immagini, script o altri contenuti multimediali,
ma può essere attivato anche quando una pagina o un elemento è stato completamente caricato nel DOM.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: [<code>Jdm</code>](#Jdm) - - Restituisce l'elemento DOM su cui è stato aggiunto l'event listener, consentendo il chaining dei metodi.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [fn] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | La funzione di callback da eseguire quando si verifica l'evento `load`.                                    La funzione riceverà l'evento come parametro. |

**Example**  
```js
const image = JDM('<img src="https://picsum.photos/200/300" alt="test">', document.body)
 .jdm_onLoad(() => {
     console.log('Immagine caricata con successo');
 });
// Aggiunge un listener per l'evento 'load' che esegue la funzione di callback ogni volta che l'immagine è completamente caricata.
```
<a name="Jdm+jdm_onError"></a>

### jdm.jdm\_onError([fn]) ⇒ [<code>Jdm</code>](#Jdm)
Aggiunge un listener per l'evento `error` all'elemento DOM.
Questo metodo consente di eseguire una funzione di callback ogni volta che si verifica un evento di tipo `error` sull'elemento,
che viene attivato quando si verifica un errore durante il caricamento di risorse o altre operazioni.
L'evento `error` viene comunemente utilizzato per gestire errori di caricamento, come quando un'immagine non riesce a caricarsi
o quando un file JavaScript o CSS non può essere caricato correttamente.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: [<code>Jdm</code>](#Jdm) - - Restituisce l'elemento DOM su cui è stato aggiunto l'event listener, consentendo il chaining dei metodi.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [fn] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | La funzione di callback da eseguire quando si verifica l'evento `error`.                                    La funzione riceverà l'evento come parametro. |

**Example**  
```js
const imgElement = JDM('<img src="invalidUrl" alt="invalid url">', document.body)
     .jdm_onError(() => {
         console.log('Si è verificato un errore nel caricamento dell\'immagine');
     });
// Aggiunge un listener per l'evento 'error' che esegue la funzione di callback ogni volta che si verifica un errore nel caricamento dell'immagine.
```
<a name="Jdm+jdm_onSubmit"></a>

### jdm.jdm\_onSubmit([fn]) ⇒ [<code>Jdm</code>](#Jdm)
Aggiunge un listener per l'evento `submit` all'elemento DOM.
Questo metodo consente di eseguire una funzione di callback ogni volta che si verifica un evento di tipo `submit` sull'elemento,
che viene attivato quando un modulo viene inviato.
L'evento `submit` viene generato quando un utente invia un modulo, sia tramite il pulsante di invio che premendo il tasto "Enter"
in un campo del modulo.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: [<code>Jdm</code>](#Jdm) - - Restituisce l'elemento DOM su cui è stato aggiunto l'event listener, consentendo il chaining dei metodi.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [fn] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | La funzione di callback da eseguire quando si verifica l'evento `submit`.                                    La funzione riceverà l'evento come parametro.                                    Se necessario, la funzione di callback può chiamare `event.preventDefault()` per prevenire l'invio del modulo. |

**Example**  
```js
const formString = `
 <form>
     <input name="inputNumeric" type="number" min="1" max="10" required />
     <button type="submit"> Submit </button>
 </form>`;
 const form = JDM(formString, document.body)
     .jdm_onSubmit((e)=> {
         e.preventDefault();
         console.log('submit');
     })
// Aggiunge un listener per l'evento 'submit' che esegue la funzione di callback ogni volta che il modulo viene inviato.
```
<a name="Jdm+jdm_setValue"></a>

### jdm.jdm\_setValue(value, [tooBoolean]) ⇒ [<code>Jdm</code>](#Jdm)
Imposta il valore di un elemento DOM. Se l'elemento è una checkbox, un radio button o un modulo,
il valore verrà impostato di conseguenza. Se l'elemento è un modulo (`<form>`), verranno impostati
i valori di tutti i campi del modulo, compresi i checkbox e i radio buttons.
Inoltre, è possibile forzare il valore a essere trattato come booleano tramite il parametro `tooBoolean`.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: [<code>Jdm</code>](#Jdm) - - Restituisce l'elemento DOM su cui è stato impostato il valore, consentendo il chaining dei metodi.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>any</code> |  | Il valore da impostare sull'elemento DOM. Il tipo di valore dipende dall'elemento e dal contesto. |
| [tooBoolean] | <code>boolean</code> | <code>true</code> | Se impostato su `true`, tenterà di convertire il valore in booleano.                                       Se il valore non è convertibile in booleano, verrà mantenuto il valore originale.                                       Se impostato su `false`, il valore non verrà modificato. |

**Example**  
```js
const checkboxElement = JDM('<input type="checkbox">', document.body)
 .jdm_setValue(true);
// Imposta il valore di una checkbox su 'true', facendo in modo che sia selezionata.

const data = {
 inputNumeric: 1,
 name: 'foo',
 surname : 'bar'
 }

const formString = `
 <form>
     <input name="inputNumeric" type="number" min="1" max="10"/>
     <input name="name" type="text"/>
     <input name="surname" type="text"/>
     <button type="submit"> Submit </button>
 </form>`;
 const form = JDM(formString, document.body)
     .jdm_setValue(data);
// Imposta i valori del modulo, inclusi i checkbox e altri input.
```
<a name="Jdm+jdm_getValue"></a>

### jdm.jdm\_getValue() ⇒ <code>any</code>
Ottiene il valore di un elemento DOM. A seconda del tipo di elemento, il valore verrà restituito in modo appropriato:
- **Input** (checkbox, radio): restituisce il valore `checked` dell'elemento.
- **Form**: restituisce un oggetto JSON con i valori di tutti i campi del modulo, supportando strutture di dati complesse come array e oggetti.
- **Select**: restituisce il valore selezionato dell'elemento `<select>`.
- **Altri input** (testo, numero, range): restituisce il valore dell'elemento come una stringa.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: <code>any</code> - - Il valore dell'elemento DOM. Se l'elemento è un modulo, restituisce un oggetto JSON con i dati del modulo.  
**Example**  
```js
const checkboxValue = JDM('<input type="checkbox" checked>', document.body)
 .jdm_getValue();
console.log(checkboxValue); // log true

const data = {
 inputNumeric: 1,
 name: 'foo',
 surname: 'bar'
}

const formString = `
<form>
  <input name="inputNumeric" type="number" min="1" max="10"/>
  <input name="name" type="text"/>
  <input name="surname" type="text"/>
  <button type="submit"> Submit </button>
</form>`;
const form = JDM(formString, document.body)
 .jdm_setValue(data);
 console.log(form.jdm_getValue());
// Restituisce un oggetto JSON con i dati del modulo, es.
// { inputNumeric: '1', name: 'foo', surname: 'bar' }

const selectString = `
<select name="foo">
 <option value="foo">foo</option>
 <option value="bar" selected>bar</option>
</select>`;
const select = JDM(selectString, document.body);
console.log(select.jdm_getValue()); // log 'bar'
```
<a name="Jdm+jdm_genEvent"></a>

### jdm.jdm\_genEvent(name, [data], [propagateToParents]) ⇒ [<code>Jdm</code>](#Jdm)
Genera un evento personalizzato per l'elemento DOM associato, utilizzando il metodo di generazione evento definito nella libreria `_common`.
L'evento può essere propagato ai genitori, se necessario.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: [<code>Jdm</code>](#Jdm) - - Restituisce il nodo dell'elemento su cui è stato generato l'evento, per consentire il chaining.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | Il nome dell'evento da generare. Può essere qualsiasi stringa che rappresenta un tipo di evento personalizzato. |
| [data] | <code>Object</code> \| <code>null</code> | <code></code> | I dati da associare all'evento. Questi dati vengono passati come parte dell'oggetto evento. Può essere `null` se non sono necessari dati aggiuntivi. |
| [propagateToParents] | <code>boolean</code> | <code>true</code> | Un valore booleano che indica se l'evento deve essere propagato ai genitori dell'elemento. Il valore predefinito è `true`. |

**Example**  
```js
const element = JDM('<input>', document.body)
 .jdm_addEventListener('customEvent', (event)=> {
     console.log(event.detail)
})
element.jdm_genEvent('customEvent', { message: 'Evento generato!' });
```
<a name="Jdm+jdm_addEventListener"></a>

### jdm.jdm\_addEventListener(name, [fn]) ⇒ [<code>Jdm</code>](#Jdm)
Aggiunge un listener per un evento specificato sull'elemento DOM associato.
Consente di eseguire una funzione di callback quando l'evento si verifica.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: [<code>Jdm</code>](#Jdm) - - Restituisce il nodo dell'elemento a cui è stato aggiunto l'evento, per consentire il chaining.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | Il nome dell'evento per cui aggiungere il listener (es. "click", "input", ecc.). |
| [fn] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | La funzione di callback che viene eseguita quando l'evento si verifica. Il valore predefinito è una funzione vuota. |

**Example**  
```js
const element = JDM('<div>Click me</div>', document.body)
 .jdm_addEventListener('click', () => {
     console.log('Click!');
 })
 .jdm_addEventListener('contextmenu', () => {
     console.log('Right Click!');
 })
```
<a name="Jdm+jdm_removeEventListener"></a>

### jdm.jdm\_removeEventListener(name, [fn]) ⇒ [<code>Jdm</code>](#Jdm)
Rimuove un listener per un evento specificato sull'elemento DOM associato.
Questo metodo permette di interrompere l'esecuzione della funzione di callback
quando l'evento si verifica.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: [<code>Jdm</code>](#Jdm) - - Restituisce il nodo dell'elemento da cui è stato rimosso l'evento, per consentire il chaining.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | Il nome dell'evento per cui rimuovere il listener (es. "click", "input", ecc.). |
| [fn] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | La funzione di callback che era stata precedentemente aggiunta come listener. Il valore predefinito è una funzione vuota. |

**Example**  
```js
// Rimuovi un listener per l'evento 'click' su un elemento
const element = JDM('<div>lorem ipsum</div>', document.body);
const clickHandler = () => { console.log('Elemento cliccato!'); };
element.jdm_addEventListener('click', clickHandler);
// Dopo un certo punto, rimuoviamo il listener
element.jdm_removeEventListener('click', clickHandler);

// Rimuovi un listener per l'evento 'input' su un elemento con funzione di callback predefinita
element.jdm_removeEventListener('input');
```
<a name="Jdm+jdm_extendChildNode"></a>

### jdm.jdm\_extendChildNode() ⇒ [<code>Jdm</code>](#Jdm)
Estende l'elemento corrente con i nodi figli definiti in `jdm_childNode`.
Se l'elemento ha nodi figli associati a `jdm_childNode`, questi vengono aggiunti come proprietà dell'elemento stesso.
### NB:questo metodo NON funziona sui form

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: [<code>Jdm</code>](#Jdm) - - Restituisce il nodo dell'elemento a cui sono stati estesi i figli, per consentire il chaining.  
**Example**  
```js
const domString = `
 <div class="foo">
     <div data-name="element1"> Element 1</div>
     <div data-name="element2"> Element 2</div>
     <div data-name="element3"> Element 3</div>
 </div>`;
 const div = JDM(domString, document.body)
  .jdm_extendChildNode();
  console.log(div.element1);
  console.log(div.element2);
  console.log(div.element3);
```
<a name="Jdm+jdm_fadeIn"></a>

### jdm.jdm\_fadeIn([option], [callback]) ⇒ [<code>Jdm</code>](#Jdm)
Applica un'animazione di fade-in sul nodo.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: [<code>Jdm</code>](#Jdm) - - Restituisce il nodo dell'elemento a cui sono stati estesi i figli, per consentire il chaining.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [option] | <code>object</code> | <code>new AnimationOption()</code> | Opzioni dell'animazione. |
| [callback] | <code>function</code> |  | Funzione da eseguire al termine dell'animazione. |

**Example**  
```js
const domString = `
 <div class="foo">
     <div data-name="element1"> Element 1</div>
     <div data-name="element2"> Element 2</div>
     <div data-name="element3"> Element 3</div>
 </div>`;
JDM(domString, document.body)
     .jdm_fadeIn({duration: 2000, direction: 'alternate', iterations:'Infinity'}, ()=> {console.log(myInput)})
```
