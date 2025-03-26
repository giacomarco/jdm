<a name="Jdm"></a>

## Jdm
Classe Jdm che fornisce un framework per la manipolazione del DOM.
Permette di creare un elemento DOM, aggiungerlo a un genitore, assegnargli delle classi
e manipolarlo in modo ricorsivo, se richiesto.
I metodi della classe sono concatenabili per facilitare le operazioni sul DOM.

**Kind**: global class  

* [Jdm](#Jdm)
    * [new Jdm([element], [parent], [classList], [deep], [...args])](#new_Jdm_new)
    * [.jdm_setAttribute(attribute, [value])](#Jdm+jdm_setAttribute) ⇒ <code>HTMLElement</code>
    * [.jdm_getAttribute(attribute)](#Jdm+jdm_getAttribute) ⇒ <code>string</code> \| <code>null</code>
    * [.jdm_append(elementList)](#Jdm+jdm_append) ⇒ <code>HTMLElement</code>
    * [.jdm_prepend(elementList)](#Jdm+jdm_prepend) ⇒ <code>HTMLElement</code>
    * [.jdm_addId(id)](#Jdm+jdm_addId) ⇒ <code>HTMLElement</code>
    * [.jdm_addClassList(classList)](#Jdm+jdm_addClassList) ⇒ <code>HTMLElement</code>
    * [.jdm_removeClassList(classList)](#Jdm+jdm_removeClassList) ⇒ <code>HTMLElement</code>
    * [.jdm_toggleClassList(classList)](#Jdm+jdm_toggleClassList) ⇒ <code>HTMLElement</code>
    * [.jdm_empty()](#Jdm+jdm_empty) ⇒ <code>HTMLElement</code>
    * [.jdm_destroy()](#Jdm+jdm_destroy) ⇒ <code>HTMLElement</code>
    * [.jdm_validate()](#Jdm+jdm_validate) ⇒ <code>HTMLElement</code>
    * [.jdm_removeAttribute(attribute)](#Jdm+jdm_removeAttribute) ⇒ <code>HTMLElement</code>
    * [.jdm_setStyle(style, value)](#Jdm+jdm_setStyle) ⇒ <code>HTMLElement</code>
    * [.jdm_extendNode(name, [object])](#Jdm+jdm_extendNode) ⇒ <code>HTMLElement</code>
    * [.jdm_innerHTML(value)](#Jdm+jdm_innerHTML) ⇒ <code>HTMLElement</code>
    * [.jdm_binding(el, [event], [twoWayDataBinding])](#Jdm+jdm_binding) ⇒ <code>HTMLElement</code>
    * [.jdm_onInput([fn])](#Jdm+jdm_onInput) ⇒ <code>HTMLElement</code>
    * [.jdm_onChange([fn])](#Jdm+jdm_onChange) ⇒ <code>HTMLElement</code>
    * [.jdm_onSelect([fn])](#Jdm+jdm_onSelect) ⇒ <code>HTMLElement</code>
    * [.jdm_onDebounce([fn], [timeout])](#Jdm+jdm_onDebounce) ⇒ <code>HTMLElement</code>
    * [.jdm_onClick([fn])](#Jdm+jdm_onClick) ⇒ <code>HTMLElement</code>
    * [.jdm_onRightClick([fn])](#Jdm+jdm_onRightClick) ⇒ <code>HTMLElement</code>
    * [.jdm_onDoubleClick([fn])](#Jdm+jdm_onDoubleClick) ⇒ <code>HTMLElement</code>
    * [.jdm_onInvalid([fn])](#Jdm+jdm_onInvalid) ⇒ <code>HTMLElement</code>
    * [.jdm_onLoad([fn])](#Jdm+jdm_onLoad) ⇒ <code>HTMLElement</code>
    * [.jdm_onError([fn])](#Jdm+jdm_onError) ⇒ <code>HTMLElement</code>
    * [.jdm_onSubmit([fn])](#Jdm+jdm_onSubmit) ⇒ <code>HTMLElement</code>
    * [.jdm_setValue(value, [tooBoolean])](#Jdm+jdm_setValue) ⇒ <code>HTMLElement</code>
    * [.jdm_getValue()](#Jdm+jdm_getValue) ⇒ <code>any</code>
    * [.jdm_genEvent(name, [data], [propagateToParents])](#Jdm+jdm_genEvent) ⇒ <code>Node</code>
    * [.jdm_addEventListener(name, [fn])](#Jdm+jdm_addEventListener) ⇒ <code>Node</code>
    * [.jdm_removeEventListener(name, [fn])](#Jdm+jdm_removeEventListener) ⇒ <code>Node</code>
    * [.jdm_extendChildNode()](#Jdm+jdm_extendChildNode) ⇒ <code>Node</code>

<a name="new_Jdm_new"></a>

### new Jdm([element], [parent], [classList], [deep], [...args])
Crea una nuova istanza della classe Jdm e manipola l'elemento DOM.

**Returns**: <code>HTMLElement</code> - - Restituisce il nodo appena creato o manipolato.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [element] | <code>HTMLElement</code> \| <code>null</code> | <code></code> | L'elemento DOM da manipolare. Se non specificato, verrà creato un nuovo nodo. |
| [parent] | <code>HTMLElement</code> \| <code>null</code> | <code></code> | Il genitore dell'elemento. Se specificato, l'elemento verrà aggiunto come figlio del genitore. |
| [classList] | <code>Array.&lt;string&gt;</code> \| <code>null</code> | <code></code> | Una lista di classi da aggiungere all'elemento. Se specificato, verranno aggiunte le classi all'elemento. |
| [deep] | <code>boolean</code> | <code>true</code> | Se impostato su `true`, i figli dell'elemento verranno manipolati ricorsivamente. |
| [...args] | <code>\*</code> |  | Altri argomenti opzionali che possono essere passati per la manipolazione del nodo. |

**Example**  
```js
const div = new Jdm('div', document.body, ['my-class'], true);
// Crea un nuovo div con la classe 'my-class' e lo aggiunge al body
```
<a name="Jdm+jdm_setAttribute"></a>

### jdm.jdm\_setAttribute(attribute, [value]) ⇒ <code>HTMLElement</code>
Imposta un attributo su un elemento DOM e genera un evento personalizzato per il cambiamento.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: <code>HTMLElement</code> - - Restituisce l'elemento DOM su cui l'attributo è stato impostato, consentendo il chaining dei metodi.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| attribute | <code>string</code> |  | Il nome dell'attributo da impostare sull'elemento DOM. |
| [value] | <code>string</code> \| <code>null</code> | <code>null</code> | Il valore dell'attributo. Se non fornito, l'attributo sarà impostato su `null`. |

**Example**  
```js
const div = new Jdm(document.createElement('div'));
div.jdm_setAttribute('id', 'myDiv');
// Imposta l'attributo "id" su "myDiv" per l'elemento div.
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
const div = new Jdm(document.createElement('div'));
div.jdm_setAttribute('id', 'myDiv');
const idValue = div.jdm_getAttribute('id');
console.log(idValue); // Stampa "myDiv"
```
<a name="Jdm+jdm_append"></a>

### jdm.jdm\_append(elementList) ⇒ <code>HTMLElement</code>
Aggiunge uno o più elementi figli a un elemento DOM.
Se viene fornita una lista di elementi, tutti gli elementi vengono aggiunti all'elemento DOM.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: <code>HTMLElement</code> - - Restituisce l'elemento DOM su cui gli elementi sono stati aggiunti, consentendo il chaining dei metodi.  

| Param | Type | Description |
| --- | --- | --- |
| elementList | <code>HTMLElement</code> \| <code>Array.&lt;HTMLElement&gt;</code> | Un singolo elemento DOM o un array di elementi DOM da aggiungere come figli. |

**Example**  
```js
const div = new Jdm(document.createElement('div'));
const p1 = document.createElement('p');
const p2 = document.createElement('p');
div.jdm_append([p1, p2]); // Aggiunge entrambi i paragrafi come figli del div.

const span = document.createElement('span');
div.jdm_append(span); // Aggiunge il singolo elemento span come figlio del div.
```
<a name="Jdm+jdm_prepend"></a>

### jdm.jdm\_prepend(elementList) ⇒ <code>HTMLElement</code>
Aggiunge uno o più elementi figli a un elemento DOM.
Se viene fornita una lista di elementi, tutti gli elementi vengono aggiunti come figli dell'elemento.
Se viene fornito un singolo elemento, questo viene aggiunto come unico figlio.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: <code>HTMLElement</code> - - Restituisce l'elemento DOM su cui gli elementi sono stati aggiunti, consentendo il chaining dei metodi.  

| Param | Type | Description |
| --- | --- | --- |
| elementList | <code>HTMLElement</code> \| <code>Array.&lt;HTMLElement&gt;</code> | Un singolo elemento DOM o un array di elementi DOM da aggiungere come figli. |

**Example**  
```js
const div = new Jdm(document.createElement('div'));
const p1 = document.createElement('p');
const p2 = document.createElement('p');
div.jdm_append([p1, p2]); // Aggiunge entrambi i paragrafi come figli del div.

const span = document.createElement('span');
div.jdm_append(span); // Aggiunge il singolo elemento span come figlio del div.
```
<a name="Jdm+jdm_addId"></a>

### jdm.jdm\_addId(id) ⇒ <code>HTMLElement</code>
Aggiunge un attributo `id` all'elemento DOM specificato.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: <code>HTMLElement</code> - - Restituisce l'elemento DOM su cui è stato impostato l'attributo `id`, consentendo il chaining dei metodi.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Il valore dell'attributo `id` da impostare sull'elemento DOM. |

**Example**  
```js
const div = new Jdm(document.createElement('div'));
div.jdm_addId('myDiv'); // Imposta l'attributo id="myDiv" sull'elemento div.
```
<a name="Jdm+jdm_addClassList"></a>

### jdm.jdm\_addClassList(classList) ⇒ <code>HTMLElement</code>
Aggiunge una o più classi CSS all'elemento DOM.
Se viene fornito un array di classi, tutte le classi vengono aggiunte all'elemento.
Se viene fornita una singola classe, questa viene aggiunta come unica classe.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: <code>HTMLElement</code> - - Restituisce l'elemento DOM su cui le classi sono state aggiunte, consentendo il chaining dei metodi.  

| Param | Type | Description |
| --- | --- | --- |
| classList | <code>string</code> \| <code>Array.&lt;string&gt;</code> | Una singola classe CSS o un array di classi CSS da aggiungere all'elemento DOM. |

**Example**  
```js
const div = new Jdm(document.createElement('div'));
div.jdm_addClassList('myClass'); // Aggiunge la classe "myClass" all'elemento div.

const div2 = new Jdm(document.createElement('div'));
div2.jdm_addClassList(['class1', 'class2']); // Aggiunge "class1" e "class2" all'elemento div2.
```
<a name="Jdm+jdm_removeClassList"></a>

### jdm.jdm\_removeClassList(classList) ⇒ <code>HTMLElement</code>
Rimuove una o più classi CSS dall'elemento DOM.
Se viene fornito un array di classi, tutte le classi vengono rimosse dall'elemento.
Se viene fornita una singola classe, questa viene rimossa.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: <code>HTMLElement</code> - - Restituisce l'elemento DOM su cui le classi sono state rimosse, consentendo il chaining dei metodi.  

| Param | Type | Description |
| --- | --- | --- |
| classList | <code>string</code> \| <code>Array.&lt;string&gt;</code> | Una singola classe CSS o un array di classi CSS da rimuovere dall'elemento DOM. |

**Example**  
```js
const div = new Jdm(document.createElement('div'));
div.jdm_removeClassList('myClass'); // Rimuove la classe "myClass" dall'elemento div.

const div2 = new Jdm(document.createElement('div'));
div2.jdm_removeClassList(['class1', 'class2']); // Rimuove "class1" e "class2" dall'elemento div2.
```
<a name="Jdm+jdm_toggleClassList"></a>

### jdm.jdm\_toggleClassList(classList) ⇒ <code>HTMLElement</code>
Attiva o disattiva una o più classi CSS su un elemento DOM.
Se viene fornito un array di classi, ciascuna classe verrà alternata (aggiunta se non presente, rimossa se presente).
Se viene fornita una singola classe, questa verrà alternata.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: <code>HTMLElement</code> - - Restituisce l'elemento DOM su cui le classi sono state alternate, consentendo il chaining dei metodi.  

| Param | Type | Description |
| --- | --- | --- |
| classList | <code>string</code> \| <code>Array.&lt;string&gt;</code> | Una singola classe CSS o un array di classi CSS da alternare sull'elemento DOM. |

**Example**  
```js
const div = new Jdm(document.createElement('div'));
div.jdm_toggleClassList('active'); // Alterna la classe "active" sull'elemento div.

const div2 = new Jdm(document.createElement('div'));
div2.jdm_toggleClassList(['class1', 'class2']); // Alterna le classi "class1" e "class2" sull'elemento div2.
```
<a name="Jdm+jdm_empty"></a>

### jdm.jdm\_empty() ⇒ <code>HTMLElement</code>
Svuota il contenuto dell'elemento DOM.
A seconda del tipo di elemento, il comportamento di "svuotamento" varia:
- Per gli elementi `input` di tipo `checkbox` o `radio`, deseleziona l'elemento (imposta `checked` a `false`).
- Per gli altri elementi `input` o `textarea`, imposta il valore a `null` (svuotando il campo di testo).
- Per un elemento `form`, esegue il reset del modulo (ripristina tutti i campi al loro stato iniziale).
- Per altri tipi di elementi, rimuove il contenuto HTML dell'elemento (imposta `innerHTML` a una stringa vuota).

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: <code>HTMLElement</code> - - Restituisce l'elemento DOM su cui è stato effettuato lo svuotamento, consentendo il chaining dei metodi.  
**Example**  
```js
const inputText = new Jdm(document.createElement('input'));
inputText.jdm_empty(); // Imposta il valore dell'input text a null.

const checkbox = new Jdm(document.createElement('input'));
checkbox.node.type = 'checkbox';
checkbox.jdm_empty(); // Deseleziona la checkbox.

const form = new Jdm(document.createElement('form'));
form.jdm_empty(); // Esegue il reset del modulo.
```
<a name="Jdm+jdm_destroy"></a>

### jdm.jdm\_destroy() ⇒ <code>HTMLElement</code>
Rimuove l'elemento DOM dal documento e genera un evento di distruzione.
Questo metodo elimina l'elemento DOM rappresentato da `this.node` dalla struttura del documento.
Inoltre, viene generato un evento personalizzato chiamato "destroy".

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: <code>HTMLElement</code> - - Restituisce l'elemento DOM che è stato rimosso, consentendo il chaining dei metodi.  
**Example**  
```js
const div = new Jdm(document.createElement('div'));
div.jdm_destroy(); // Rimuove l'elemento div dal documento e genera un evento "destroy".
```
<a name="Jdm+jdm_validate"></a>

### jdm.jdm\_validate() ⇒ <code>HTMLElement</code>
Verifica la validità dell'elemento `input` o `form` secondo le regole di validazione HTML.
Se l'elemento è valido, il metodo restituisce `true`; altrimenti, restituisce `false` e attiva un evento di validazione.
Dopo la verifica, viene generato un evento personalizzato chiamato "validate".

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: <code>HTMLElement</code> - - Restituisce l'elemento DOM su cui è stata effettuata la validazione, consentendo il chaining dei metodi.  
**Example**  
```js
const input = new Jdm(document.createElement('input'));
input.node.setAttribute('required', 'true');
input.jdm_validate(); // Verifica la validità dell'input e genera l'evento "validate".
```
<a name="Jdm+jdm_removeAttribute"></a>

### jdm.jdm\_removeAttribute(attribute) ⇒ <code>HTMLElement</code>
Rimuove un attributo dall'elemento DOM e genera un evento di rimozione dell'attributo.
Questo metodo rimuove l'attributo specificato dall'elemento DOM rappresentato da `this.node`.
Inoltre, viene generato un evento personalizzato chiamato "removeAttribute" con il nome dell'attributo rimosso.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: <code>HTMLElement</code> - - Restituisce l'elemento DOM su cui l'attributo è stato rimosso, consentendo il chaining dei metodi.  

| Param | Type | Description |
| --- | --- | --- |
| attribute | <code>string</code> | Il nome dell'attributo da rimuovere dall'elemento DOM. |

**Example**  
```js
const div = new Jdm(document.createElement('div'));
div.jdm_removeAttribute('id'); // Rimuove l'attributo 'id' dall'elemento div.
```
<a name="Jdm+jdm_setStyle"></a>

### jdm.jdm\_setStyle(style, value) ⇒ <code>HTMLElement</code>
Imposta un valore per una proprietà di stile CSS su un elemento DOM.
Questo metodo applica una dichiarazione di stile CSS all'elemento DOM rappresentato da `this.node`.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: <code>HTMLElement</code> - - Restituisce l'elemento DOM su cui è stato applicato lo stile, consentendo il chaining dei metodi.  

| Param | Type | Description |
| --- | --- | --- |
| style | <code>string</code> | Il nome della proprietà di stile CSS da impostare (ad esempio, "color", "backgroundColor"). |
| value | <code>string</code> | Il valore da assegnare alla proprietà di stile CSS (ad esempio, "red", "10px"). |

**Example**  
```js
const div = new Jdm(document.createElement('div'));
div.jdm_setStyle('color', 'red'); // Imposta il colore del testo dell'elemento div su rosso.
```
<a name="Jdm+jdm_extendNode"></a>

### jdm.jdm\_extendNode(name, [object]) ⇒ <code>HTMLElement</code>
Estende l'elemento DOM aggiungendo una proprietà personalizzata.
Questo metodo assegna un oggetto o un valore alla proprietà `name` dell'elemento DOM rappresentato da `this.node`.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: <code>HTMLElement</code> - - Restituisce l'elemento DOM su cui è stata aggiunta la proprietà personalizzata, consentendo il chaining dei metodi.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | Il nome della proprietà da aggiungere all'elemento DOM. |
| [object] | <code>Object</code> \| <code>null</code> | <code></code> | L'oggetto o il valore da associare alla proprietà. Può essere qualsiasi tipo di valore, incluso `null`. |

**Example**  
```js
const div = new Jdm(document.createElement('div'));
div.jdm_extendNode('customData', { id: 123, name: 'My Div' });
// Aggiunge la proprietà 'customData' all'elemento div con un oggetto come valore.
console.log(div.node.customData); // { id: 123, name: 'My Div' }
```
<a name="Jdm+jdm_innerHTML"></a>

### jdm.jdm\_innerHTML(value) ⇒ <code>HTMLElement</code>
Imposta o restituisce il contenuto HTML interno dell'elemento DOM.
Questo metodo imposta il valore di `innerHTML` dell'elemento DOM rappresentato da `this.node`.
Se il parametro `value` viene fornito, aggiorna il contenuto HTML; altrimenti, restituisce il contenuto HTML attuale.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: <code>HTMLElement</code> - - Restituisce l'elemento DOM con il nuovo contenuto HTML impostato, consentendo il chaining dei metodi.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | Il contenuto HTML da impostare all'interno dell'elemento DOM.                           Se non fornito, il metodo restituirà il contenuto HTML corrente. |

**Example**  
```js
const div = new Jdm(document.createElement('div'));
div.jdm_innerHTML('<p>Nuovo contenuto HTML</p>');
// Imposta il contenuto HTML del div con un nuovo paragrafo.
```
<a name="Jdm+jdm_binding"></a>

### jdm.jdm\_binding(el, [event], [twoWayDataBinding]) ⇒ <code>HTMLElement</code>
Imposta un binding di dati tra l'elemento corrente e un altro o più elementi.
Questo metodo consente di sincronizzare i valori tra gli elementi DOM, abilitando il data binding unidirezionale o bidirezionale.
Se un valore cambia nell'elemento sorgente (ad esempio un `input`), il valore dell'elemento di destinazione (ad esempio un altro `input` o `div`) viene aggiornato.
Se il binding bidirezionale è abilitato, i cambiamenti sono sincronizzati in entrambe le direzioni.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: <code>HTMLElement</code> - - Restituisce l'elemento DOM su cui è stato applicato il binding, consentendo il chaining dei metodi.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| el | <code>HTMLElement</code> \| <code>Array.&lt;HTMLElement&gt;</code> |  | L'elemento o la lista di elementi con cui si desidera stabilire il binding. |
| [event] | <code>string</code> | <code>&quot;\&quot;input\&quot;&quot;</code> | Il tipo di evento da ascoltare per attivare il binding. Default è "input". |
| [twoWayDataBinding] | <code>boolean</code> | <code>true</code> | Se `true`, attiva il binding bidirezionale. Se `false`, il binding sarà unidirezionale. |

**Example**  
```js
const input = new Jdm(document.createElement('input'));
const output = new Jdm(document.createElement('div'));
input.jdm_binding(output);
// Crea un binding tra l'input e l'output, così che quando l'input cambia, l'output si aggiorna.
```
**Example**  
```js
const input = new Jdm(document.createElement('input'));
const output = new Jdm(document.createElement('div'));
input.jdm_binding(output, "change", false);
// Crea un binding unidirezionale tra l'input e l'output, che si attiva sull'evento 'change'.
```
<a name="Jdm+jdm_onInput"></a>

### jdm.jdm\_onInput([fn]) ⇒ <code>HTMLElement</code>
Aggiunge un listener per l'evento `input` all'elemento DOM.
Questo metodo consente di eseguire una funzione di callback ogni volta che si verifica un evento di tipo `input` sull'elemento.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: <code>HTMLElement</code> - - Restituisce l'elemento DOM su cui è stato aggiunto l'event listener, consentendo il chaining dei metodi.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [fn] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | La funzione di callback da eseguire quando si verifica l'evento `input`.                                    La funzione riceverà l'evento come parametro. |

**Example**  
```js
const input = new Jdm(document.createElement('input'));
input.jdm_onInput((event) => {
  console.log('Input modificato:', event.target.value);
});
// Aggiunge un listener per l'evento 'input' che stampa il valore dell'input ogni volta che cambia.
```
<a name="Jdm+jdm_onChange"></a>

### jdm.jdm\_onChange([fn]) ⇒ <code>HTMLElement</code>
Aggiunge un listener per l'evento `change` all'elemento DOM.
Questo metodo consente di eseguire una funzione di callback ogni volta che si verifica un evento di tipo `change` sull'elemento.
L'evento `change` viene attivato quando il valore di un elemento, come un campo di input, viene modificato e l'elemento perde il focus.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: <code>HTMLElement</code> - - Restituisce l'elemento DOM su cui è stato aggiunto l'event listener, consentendo il chaining dei metodi.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [fn] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | La funzione di callback da eseguire quando si verifica l'evento `change`.                                    La funzione riceverà l'evento come parametro. |

**Example**  
```js
const input = new Jdm(document.createElement('input'));
input.jdm_onChange((event) => {
  console.log('Valore cambiato:', event.target.value);
});
// Aggiunge un listener per l'evento 'change' che stampa il valore dell'input ogni volta che cambia.
```
<a name="Jdm+jdm_onSelect"></a>

### jdm.jdm\_onSelect([fn]) ⇒ <code>HTMLElement</code>
Aggiunge un listener per l'evento `select` all'elemento DOM.
Questo metodo consente di eseguire una funzione di callback ogni volta che si verifica un evento di tipo `select` sull'elemento.
L'evento `select` viene attivato quando una parte del testo all'interno di un elemento, come un campo di input o una textarea, viene selezionata dall'utente.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: <code>HTMLElement</code> - - Restituisce l'elemento DOM su cui è stato aggiunto l'event listener, consentendo il chaining dei metodi.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [fn] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | La funzione di callback da eseguire quando si verifica l'evento `select`.                                    La funzione riceverà l'evento come parametro. |

**Example**  
```js
const input = new Jdm(document.createElement('input'));
input.jdm_onSelect((event) => {
  console.log('Testo selezionato:', event.target.value);
});
// Aggiunge un listener per l'evento 'select' che stampa il valore del campo di input ogni volta che viene selezionato del testo.
```
<a name="Jdm+jdm_onDebounce"></a>

### jdm.jdm\_onDebounce([fn], [timeout]) ⇒ <code>HTMLElement</code>
Aggiunge un listener per l'evento `input` all'elemento DOM con un meccanismo di debounce.
Questo metodo permette di eseguire una funzione di callback solo dopo che l'utente ha smesso di digitare per un determinato periodo di tempo.
È utile per evitare l'esecuzione ripetitiva di funzioni (come una ricerca o un aggiornamento) mentre l'utente sta digitando, migliorando le prestazioni.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: <code>HTMLElement</code> - - Restituisce l'elemento DOM su cui è stato aggiunto l'event listener, consentendo il chaining dei metodi.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [fn] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | La funzione di callback da eseguire quando si verifica l'evento `input`.                                    La funzione verrà eseguita dopo che l'utente smette di digitare per un periodo di tempo specificato dal parametro `timeout`. |
| [timeout] | <code>number</code> | <code>300</code> | Il tempo di attesa (in millisecondi) dopo l'ultimo evento `input` prima che la funzione di callback venga eseguita.                                  Il valore predefinito è 300 millisecondi. |

**Example**  
```js
const input = new Jdm(document.createElement('input'));
input.jdm_onDebounce((event) => {
  console.log('Input debounced:', event.target.value);
}, 500);
// Aggiunge un listener per l'evento 'input' con un debounce di 500 millisecondi,
// evitando chiamate troppo frequenti alla funzione di callback mentre l'utente sta digitando.
```
<a name="Jdm+jdm_onClick"></a>

### jdm.jdm\_onClick([fn]) ⇒ <code>HTMLElement</code>
Aggiunge un listener per l'evento `click` all'elemento DOM.
Questo metodo consente di eseguire una funzione di callback ogni volta che si verifica un evento di tipo `click` sull'elemento.
L'evento `click` viene attivato quando l'utente clicca su un elemento, come un pulsante o un link.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: <code>HTMLElement</code> - - Restituisce l'elemento DOM su cui è stato aggiunto l'event listener, consentendo il chaining dei metodi.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [fn] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | La funzione di callback da eseguire quando si verifica l'evento `click`.                                    La funzione riceverà l'evento come parametro. |

**Example**  
```js
const button = new Jdm(document.createElement('button'));
button.jdm_onClick((event) => {
  console.log('Button clicked');
});
// Aggiunge un listener per l'evento 'click' che stampa un messaggio ogni volta che il pulsante viene cliccato.
```
<a name="Jdm+jdm_onRightClick"></a>

### jdm.jdm\_onRightClick([fn]) ⇒ <code>HTMLElement</code>
Aggiunge un listener per l'evento `contextmenu` (clic destro) all'elemento DOM.
Questo metodo consente di eseguire una funzione di callback ogni volta che si verifica un evento di tipo `contextmenu` sull'elemento,
che viene attivato dal clic destro del mouse (o equivalente, come il tocco prolungato su dispositivi mobili).
L'evento `contextmenu` è tipicamente usato per visualizzare il menu contestuale di un elemento.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: <code>HTMLElement</code> - - Restituisce l'elemento DOM su cui è stato aggiunto l'event listener, consentendo il chaining dei metodi.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [fn] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | La funzione di callback da eseguire quando si verifica l'evento `contextmenu`.                                    La funzione riceverà l'evento come parametro. |

**Example**  
```js
const element = new Jdm(document.createElement('div'));
element.jdm_onRightClick((event) => {
  event.preventDefault(); // Previene il menu contestuale predefinito
  console.log('Clic destro eseguito!');
});
// Aggiunge un listener per l'evento 'contextmenu' che esegue la funzione di callback ogni volta che si fa clic destro sull'elemento.
```
<a name="Jdm+jdm_onDoubleClick"></a>

### jdm.jdm\_onDoubleClick([fn]) ⇒ <code>HTMLElement</code>
Aggiunge un listener per l'evento `dblclick` (doppio clic) all'elemento DOM.
Questo metodo consente di eseguire una funzione di callback ogni volta che si verifica un evento di tipo `dblclick` sull'elemento,
che viene attivato quando l'utente fa doppio clic su un elemento.
L'evento `dblclick` è comunemente utilizzato per azioni che richiedono un'interazione più rapida dell'utente, come l'apertura di un file o l'attivazione di una funzionalità.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: <code>HTMLElement</code> - - Restituisce l'elemento DOM su cui è stato aggiunto l'event listener, consentendo il chaining dei metodi.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [fn] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | La funzione di callback da eseguire quando si verifica l'evento `dblclick`.                                    La funzione riceverà l'evento come parametro. |

**Example**  
```js
const element = new Jdm(document.createElement('div'));
element.jdm_onDoubleClick((event) => {
  console.log('Elemento doppiamente cliccato');
});
// Aggiunge un listener per l'evento 'dblclick' che esegue la funzione di callback ogni volta che l'utente fa doppio clic sull'elemento.
```
<a name="Jdm+jdm_onInvalid"></a>

### jdm.jdm\_onInvalid([fn]) ⇒ <code>HTMLElement</code>
Aggiunge un listener per l'evento `invalid` all'elemento DOM.
Questo metodo consente di eseguire una funzione di callback ogni volta che si verifica un evento di tipo `invalid` sull'elemento,
che viene attivato quando un elemento di modulo non soddisfa i suoi vincoli di validazione.
L'evento `invalid` viene in genere generato automaticamente dal browser quando un utente invia un modulo con campi non validi.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: <code>HTMLElement</code> - - Restituisce l'elemento DOM su cui è stato aggiunto l'event listener, consentendo il chaining dei metodi.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [fn] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | La funzione di callback da eseguire quando si verifica l'evento `invalid`.                                    La funzione riceverà l'evento come parametro. |

**Example**  
```js
const inputElement = new Jdm(document.createElement('input'));
inputElement.jdm_onInvalid((event) => {
  console.log('Il campo input è invalido');
  event.preventDefault(); // Previene l'azione predefinita (se desiderato)
});
// Aggiunge un listener per l'evento 'invalid' che esegue la funzione di callback quando l'input non è valido.
```
<a name="Jdm+jdm_onLoad"></a>

### jdm.jdm\_onLoad([fn]) ⇒ <code>HTMLElement</code>
Aggiunge un listener per l'evento `load` all'elemento DOM.
Questo metodo consente di eseguire una funzione di callback ogni volta che si verifica un evento di tipo `load` sull'elemento,
che viene attivato quando l'elemento o le risorse a esso associate sono completamente caricate.
L'evento `load` viene comunemente utilizzato per monitorare il caricamento di immagini, script o altri contenuti multimediali,
ma può essere attivato anche quando una pagina o un elemento è stato completamente caricato nel DOM.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: <code>HTMLElement</code> - - Restituisce l'elemento DOM su cui è stato aggiunto l'event listener, consentendo il chaining dei metodi.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [fn] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | La funzione di callback da eseguire quando si verifica l'evento `load`.                                    La funzione riceverà l'evento come parametro. |

**Example**  
```js
const imgElement = new Jdm(document.createElement('img'));
imgElement.jdm_onLoad(() => {
  console.log('Immagine caricata con successo');
});
// Aggiunge un listener per l'evento 'load' che esegue la funzione di callback ogni volta che l'immagine è completamente caricata.
```
<a name="Jdm+jdm_onError"></a>

### jdm.jdm\_onError([fn]) ⇒ <code>HTMLElement</code>
Aggiunge un listener per l'evento `error` all'elemento DOM.
Questo metodo consente di eseguire una funzione di callback ogni volta che si verifica un evento di tipo `error` sull'elemento,
che viene attivato quando si verifica un errore durante il caricamento di risorse o altre operazioni.
L'evento `error` viene comunemente utilizzato per gestire errori di caricamento, come quando un'immagine non riesce a caricarsi
o quando un file JavaScript o CSS non può essere caricato correttamente.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: <code>HTMLElement</code> - - Restituisce l'elemento DOM su cui è stato aggiunto l'event listener, consentendo il chaining dei metodi.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [fn] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | La funzione di callback da eseguire quando si verifica l'evento `error`.                                    La funzione riceverà l'evento come parametro. |

**Example**  
```js
const imgElement = new Jdm(document.createElement('img'));
imgElement.jdm_onError(() => {
  console.log('Si è verificato un errore nel caricamento dell\'immagine');
});
// Aggiunge un listener per l'evento 'error' che esegue la funzione di callback ogni volta che si verifica un errore nel caricamento dell'immagine.
```
<a name="Jdm+jdm_onSubmit"></a>

### jdm.jdm\_onSubmit([fn]) ⇒ <code>HTMLElement</code>
Aggiunge un listener per l'evento `submit` all'elemento DOM.
Questo metodo consente di eseguire una funzione di callback ogni volta che si verifica un evento di tipo `submit` sull'elemento,
che viene attivato quando un modulo viene inviato.
L'evento `submit` viene generato quando un utente invia un modulo, sia tramite il pulsante di invio che premendo il tasto "Enter"
in un campo del modulo.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: <code>HTMLElement</code> - - Restituisce l'elemento DOM su cui è stato aggiunto l'event listener, consentendo il chaining dei metodi.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [fn] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | La funzione di callback da eseguire quando si verifica l'evento `submit`.                                    La funzione riceverà l'evento come parametro.                                    Se necessario, la funzione di callback può chiamare `event.preventDefault()` per prevenire l'invio del modulo. |

**Example**  
```js
const formElement = new Jdm(document.createElement('form'));
formElement.jdm_onSubmit((event) => {
  event.preventDefault(); // Previene l'invio del modulo
  console.log('Modulo inviato');
});
// Aggiunge un listener per l'evento 'submit' che esegue la funzione di callback ogni volta che il modulo viene inviato.
```
<a name="Jdm+jdm_setValue"></a>

### jdm.jdm\_setValue(value, [tooBoolean]) ⇒ <code>HTMLElement</code>
Imposta il valore di un elemento DOM. Se l'elemento è una checkbox, un radio button o un modulo,
il valore verrà impostato di conseguenza. Se l'elemento è un modulo (`<form>`), verranno impostati
i valori di tutti i campi del modulo, compresi i checkbox e i radio buttons.
Inoltre, è possibile forzare il valore a essere trattato come booleano tramite il parametro `tooBoolean`.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: <code>HTMLElement</code> - - Restituisce l'elemento DOM su cui è stato impostato il valore, consentendo il chaining dei metodi.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>any</code> |  | Il valore da impostare sull'elemento DOM. Il tipo di valore dipende dall'elemento e dal contesto. |
| [tooBoolean] | <code>boolean</code> | <code>true</code> | Se impostato su `true`, tenterà di convertire il valore in booleano.                                       Se il valore non è convertibile in booleano, verrà mantenuto il valore originale.                                       Se impostato su `false`, il valore non verrà modificato. |

**Example**  
```js
const checkboxElement = new Jdm(document.createElement('input'));
checkboxElement.jdm_setValue(true);
// Imposta il valore di una checkbox su 'true', facendo in modo che sia selezionata.

const formElement = new Jdm(document.createElement('form'));
const formData = {
  username: 'user1',
  password: 'password123',
  terms: true
};
formElement.jdm_setValue(formData);
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
const checkboxElement = new Jdm(document.createElement('input'));
checkboxElement.node.type = 'checkbox';
checkboxElement.node.checked = true;
console.log(checkboxElement.jdm_getValue()); // true

const formElement = new Jdm(document.createElement('form'));
const formData = {
  username: 'user1',
  password: 'password123',
  terms: true
};
formElement.jdm_setValue(formData);
console.log(formElement.jdm_getValue());
// Restituisce un oggetto JSON con i dati del modulo, es.
// { username: 'user1', password: 'password123', terms: true }

const selectElement = new Jdm(document.createElement('select'));
selectElement.node.innerHTML = '<option value="1">Option 1</option><option value="2">Option 2</option>';
selectElement.node.value = '1';
console.log(selectElement.jdm_getValue()); // '1'
```
<a name="Jdm+jdm_genEvent"></a>

### jdm.jdm\_genEvent(name, [data], [propagateToParents]) ⇒ <code>Node</code>
Genera un evento personalizzato per l'elemento DOM associato, utilizzando il metodo di generazione evento definito nella libreria `_common`.
L'evento può essere propagato ai genitori, se necessario.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: <code>Node</code> - - Restituisce il nodo dell'elemento su cui è stato generato l'evento, per consentire il chaining.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | Il nome dell'evento da generare. Può essere qualsiasi stringa che rappresenta un tipo di evento personalizzato. |
| [data] | <code>Object</code> \| <code>null</code> | <code></code> | I dati da associare all'evento. Questi dati vengono passati come parte dell'oggetto evento. Può essere `null` se non sono necessari dati aggiuntivi. |
| [propagateToParents] | <code>boolean</code> | <code>true</code> | Un valore booleano che indica se l'evento deve essere propagato ai genitori dell'elemento. Il valore predefinito è `true`. |

**Example**  
```js
// Esempio di come generare un evento personalizzato
const element = new Jdm(document.createElement('div'));
element.jdm_genEvent('customEvent', { message: 'Evento generato!' });

// Esempio con propagazione a genitori disabilitata
element.jdm_genEvent('customEvent', { message: 'Evento senza propagazione' }, false);
```
<a name="Jdm+jdm_addEventListener"></a>

### jdm.jdm\_addEventListener(name, [fn]) ⇒ <code>Node</code>
Aggiunge un listener per un evento specificato sull'elemento DOM associato.
Consente di eseguire una funzione di callback quando l'evento si verifica.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: <code>Node</code> - - Restituisce il nodo dell'elemento a cui è stato aggiunto l'evento, per consentire il chaining.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | Il nome dell'evento per cui aggiungere il listener (es. "click", "input", ecc.). |
| [fn] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | La funzione di callback che viene eseguita quando l'evento si verifica. Il valore predefinito è una funzione vuota. |

**Example**  
```js
// Aggiungi un listener per l'evento 'click' su un elemento
const element = new Jdm(document.createElement('div'));
element.jdm_addEventListener('click', () => {
    console.log('Elemento cliccato!');
});

// Aggiungi un listener per l'evento 'input' su un elemento con funzione di callback predefinita
element.jdm_addEventListener('input');
```
<a name="Jdm+jdm_removeEventListener"></a>

### jdm.jdm\_removeEventListener(name, [fn]) ⇒ <code>Node</code>
Rimuove un listener per un evento specificato sull'elemento DOM associato.
Questo metodo permette di interrompere l'esecuzione della funzione di callback
quando l'evento si verifica.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: <code>Node</code> - - Restituisce il nodo dell'elemento da cui è stato rimosso l'evento, per consentire il chaining.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | Il nome dell'evento per cui rimuovere il listener (es. "click", "input", ecc.). |
| [fn] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | La funzione di callback che era stata precedentemente aggiunta come listener. Il valore predefinito è una funzione vuota. |

**Example**  
```js
// Rimuovi un listener per l'evento 'click' su un elemento
const element = new Jdm(document.createElement('div'));
const clickHandler = () => { console.log('Elemento cliccato!'); };
element.jdm_addEventListener('click', clickHandler);
// Dopo un certo punto, rimuoviamo il listener
element.jdm_removeEventListener('click', clickHandler);

// Rimuovi un listener per l'evento 'input' su un elemento con funzione di callback predefinita
element.jdm_removeEventListener('input');
```
<a name="Jdm+jdm_extendChildNode"></a>

### jdm.jdm\_extendChildNode() ⇒ <code>Node</code>
Estende l'elemento corrente con i nodi figli definiti in `jdm_childNode`.
Se l'elemento ha nodi figli associati a `jdm_childNode`, questi vengono aggiunti come proprietà dell'elemento stesso.

**Kind**: instance method of [<code>Jdm</code>](#Jdm)  
**Returns**: <code>Node</code> - - Restituisce il nodo dell'elemento a cui sono stati estesi i figli, per consentire il chaining.  
**Example**  
```js
// Esempio di utilizzo di jdm_extendChildNode
const element = new Jdm(document.createElement('div'));
element.node.jdm_childNode = {
    child1: new Jdm(document.createElement('p')),
    child2: new Jdm(document.createElement('span'))
};

// Estende il nodo con i suoi figli definiti in jdm_childNode
element.jdm_extendChildNode();

// I nodi child1 e child2 sono ora proprietà di element.node
console.log(element.node.child1); // Jdm { ... }
console.log(element.node.child2); // Jdm { ... }
```
