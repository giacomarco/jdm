import { _common } from "./_common.js";
import { Proto } from "./proto.js";
import { _animation, AnimationOption } from "./_animation.js";
import { _core } from "./_core.js";

new Proto();

/**
 * Classe Jdm che fornisce un framework per la manipolazione del DOM.
 * Permette di creare un elemento DOM, aggiungerlo a un genitore, assegnargli delle classi
 * e manipolarlo in modo ricorsivo, se richiesto.
 * I metodi della classe sono concatenabili per facilitare le operazioni sul DOM.
 *
 * # INSTALLAZIONE:
 * NPM
 * ```bash
 * npm install jdm_javascript_dom_manipulator
 * ```
 * Esempio di utilizzo di un modulo ES6:
 * ```javascript
 * import './yourPath/dist/jdm.js';
 * ```
 *
 * # USO
 * ```javascript
 * JDM('div', container, ['fooClass','barClass'])
 * ```
 * # COMPARAZIONE:
 *
 * ## jQuery:
 * ```javascript
 * const $div = $('<div>', { class: 'foo bar' });
 * const $ul = $('<ul>');
 * const $li1 = $('<li>').text('Elemento 1');
 * const $li2 = $('<li>').text('Elemento 2');
 * const $li3 = $('<li>').text('Elemento 3');
 * const $li4 = $('<li>').text('Elemento 4');
 * const $li5 = $('<li>').text('Elemento 5');
 * $ul.append($li1, $li2, $li3, $li4, $li5);
 * $div.append($ul);
 * $('body').append($div);
 * ```
 *
 * ## JavaScript puro:
 * ```javascript
 * const div = 'div';
 * div.classList.add('foo', 'bar');
 * const ul = document.createElement('ul');
 * const li1 = document.createElement('li');
 * li1.textContent = 'Elemento 1';
 * const li2 = document.createElement('li');
 * li2.textContent = 'Elemento 2';
 * const li3 = document.createElement('li');
 * li3.textContent = 'Elemento 3';
 * const li4 = document.createElement('li');
 * li4.textContent = 'Elemento 4';
 * const li5 = document.createElement('li');
 * li5.textContent = 'Elemento 5';
 * ul.append(li1, li2, li3, li4, li5);
 * div.appendChild(ul);
 * document.body.appendChild(div);
 * ```
 *
 * ## Jdm:
 *
 * ```javascript
 * const domString = `
 * <div class="foo bar">
 *     <ul>
 *         <li> Elemento 1 </li>
 *         <li> Elemento 2 </li>
 *         <li> Elemento 3 </li>
 *         <li> Elemento 4 </li>
 *         <li> Elemento 5 </li>
 *     </ul>
 * </div>`;
 * const div = JDM(domString, document.body);
 * ```
 *
 * @class
 */
class Jdm extends HTMLElement {
    /**
     * Crea una nuova istanza della classe Jdm e manipola l'elemento DOM.
     *
     * @constructor
     * @param {HTMLElement|null} [element=null] - L'elemento DOM da manipolare. Se non specificato, verrà creato un nuovo nodo.
     * @param {HTMLElement|null} [parent=null] - Il genitore dell'elemento. Se specificato, l'elemento verrà aggiunto come figlio del genitore.
     * @param {string[]|null} [classList=null] - Una lista di classi da aggiungere all'elemento. Se specificato, verranno aggiunte le classi all'elemento.
     * @param {boolean} [deep=true] - Se impostato su `true`, i figli dell'elemento verranno manipolati ricorsivamente.
     * @param {...*} [args] - Altri argomenti opzionali che possono essere passati per la manipolazione del nodo.
     * @returns {Jdm} - Restituisce il nodo appena creato o manipolato.
     *
     * @example
     * const div = JDM('<div>lorem ipsum</div>', document.body, ['my-class'], true);
     * // Crea un nuovo div con la classe 'my-class' e lo aggiunge al body
     *
     * //language=html
     * const domString = `
     *     <div class="my-class">
     *         <p> paragraph </p>
     *     </div>
     *     `;
     * JDM(domString, document.body)
     * // Crea un nuovo div con la classe 'my-class', un paragrafo child e lo aggiunge tutto al body
     */

    constructor(element = null, parent = null, classList = null, deep = true, ...args) {
        super();
        const data = { element: element, parent: parent, classList: classList, deep: deep, args: args };
        this.node = this.init(data);
        this.jdm_childNode = [];
        this.tag = this.node.tagName.toLowerCase();
        if (data.classList) this.jdm_addClassList(data.classList);
        if (data.parent) data.parent.appendChild(this.node);
        if (data.deep) {
            const mainNode = data.args?.length > 0 ? data.args[0]?.mainNode : null;
            this.loopOverChild(this.node.childNodes, data.args[0]?.mainNode);
        }
        this.addJdmMethodToNode();
        return this.node;
    }

    /**
     * Inizializza l'elemento DOM con i dati forniti, creando l'elemento o parsando una stringa HTML,
     * a seconda del tipo di dato passato.
     *
     * @private
     * @param {Object} data - I dati utilizzati per inizializzare l'elemento.
     * @param {HTMLElement|string} data.element - Può essere un tag HTML come stringa, un elemento DOM esistente,
     *                                            o una stringa HTML da parsare.
     * @returns {HTMLElement|null} - Restituisce l'elemento DOM creato o parsato, oppure `null` in caso di errore.
     *
     * @throws {Error} Se il tipo dell'elemento è sconosciuto o non supportato, viene registrato un errore nel console.
     */
    init(data) {
        switch (this.checkType(data.element)) {
            case "tagString":
                return document.createElement(data.element);
            case "domFromString":
                const parser = new DOMParser();
                return parser.parseFromString(data.element, "text/html").getRootNode().body.firstChild;
            case "elementDom":
                return data.element;
            case "domFromHtml":
                const parserHtml = new DOMParser();
                return parserHtml.parseFromString(data.element, "text/html").getRootNode().body.firstChild;
            case "unknown":
                console.error("Element not supported by jdm:", data);
                break;
        }
    }

    /**
     * Controlla il tipo di variabile passata e restituisce una stringa che indica il tipo specifico.
     * Questo metodo viene utilizzato per determinare se la variabile è una stringa HTML, un tag stringa,
     * un elemento DOM o altro tipo sconosciuto.
     *
     * @private
     * @param {*} variable - La variabile il cui tipo deve essere verificato.
     * @returns {string} - Una stringa che rappresenta il tipo dell'elemento:
     *                     - `"domFromString"` se la variabile è una stringa che sembra un'intera struttura HTML.
     *                     - `"domFromHtml"` se la variabile è una stringa HTML che rappresenta un frammento di HTML.
     *                     - `"tagString"` se la variabile è una stringa che rappresenta un tag HTML.
     *                     - `"elementDom"` se la variabile è un nodo DOM.
     *                     - `"unknown"` se il tipo non è riconosciuto.
     *
     * @example
     * checkType("<div></div>"); // Restituisce "domFromString"
     * checkType("<p>Test</p>"); // Restituisce "domFromHtml"
     * checkType("div"); // Restituisce "tagString"
     * checkType('div'); // Restituisce "elementDom"
     * checkType(123); // Restituisce "unknown"
     */
    checkType(variable) {
        if (typeof variable === "string") {
            if (variable.charAt(0) === "<" && variable.charAt(variable.length - 1) === ">") {
                return "domFromString";
            } else if (/<[a-z][\s\S]*>/i.test(variable)) {
                return "domFromHtml";
            } else {
                return "tagString";
            }
        } else if (variable.nodeType && variable.nodeType === Node.ELEMENT_NODE) {
            return "elementDom";
        } else {
            return "unknown";
        }
    }

    /**
     * Esegue una manipolazione ricorsiva sui figli di un nodo DOM, aggiungendo metodi specifici
     * per ogni figlio e organizzandoli in un oggetto `jdm_childNode` associato al nodo principale.
     *
     * @private
     * @param {NodeList|Array} childNodes - Una lista o un array di nodi figli da manipolare.
     * @param {HTMLElement|null} [mainNode=null] - Il nodo principale a cui associare i figli. Se non specificato,
     *                                             verrà utilizzato il nodo corrente (`this.node`).
     * @returns {void} - Non restituisce alcun valore.
     *
     */
    loopOverChild(childNodes, mainNode = null) {
        childNodes = Array.from(childNodes).filter(child => child.nodeType <= 2);
        mainNode = mainNode ? mainNode : this.node;

        if (childNodes.length > 0) {
            mainNode.jdm_childNode = mainNode.jdm_childNode ? mainNode.jdm_childNode : {};
            for (const child of childNodes) {
                const name = child.getAttribute("name");
                const dataName = child.getAttribute("data-name");

                const jdmElement = JDM(child, null, null, true, { mainNode: mainNode });
                if (dataName) {
                    mainNode.jdm_childNode[dataName] = jdmElement;
                } else if (name) {
                    mainNode.jdm_childNode[name] = jdmElement;
                }
            }
        }
    }

    /**
     * Aggiunge tutti i metodi che iniziano con "jdm_" dall'istanza di `Jdm` all'elemento DOM
     * (associandoli come metodi dell'oggetto `node`), permettendo così di chiamare questi metodi direttamente
     * sull'elemento DOM associato.
     *
     * @private
     * @returns {void} - Non restituisce alcun valore, ma modifica l'oggetto `node` aggiungendo metodi ad esso.
     *
     */
    addJdmMethodToNode() {
        const methodList = Object.getOwnPropertyNames(Jdm.prototype);
        const jdm_methodList = methodList.filter(elemento => {
            return elemento.startsWith("jdm_");
        });

        for (const jdmMethod of jdm_methodList) {
            this.node[jdmMethod] = this[jdmMethod].bind(this);
        }
    }

    animation(keyframe, option, callbackFn) {
        option = { ...new AnimationOption(), ...option };
        const animation = this.node.animate(keyframe, option);
        animation.onfinish = () => {
            if (typeof callbackFn === "function") {
                callbackFn();
            }
        };
        return animation;
    }

    /** CORE **/

    /**
     * Imposta un attributo su un elemento DOM e genera un evento personalizzato per il cambiamento.
     *
     * @param {string} attribute - Il nome dell'attributo da impostare sull'elemento DOM.
     * @param {string|null} [value=null] - Il valore dell'attributo. Se non fornito, l'attributo sarà impostato su `null`.
     * @returns {Jdm} - Restituisce l'elemento DOM su cui l'attributo è stato impostato, consentendo il chaining dei metodi.
     * @chainable
     *
     * @example
     * const div = JDM('<div>lorem ipsum</div>', document.body)
     *   .jdm_setAttribute('id', 'myDiv')
     *   .jdm_setAttribute('data-test', 'foo')
     *   .jdm_setAttribute('counter', 1);
     */
    jdm_setAttribute(attribute, value = null) {
        return _core.jdm_setAttribute.call(this, attribute, value);
    }

    /**
     * Recupera il valore di un attributo di un elemento DOM.
     *
     * @param {string} attribute - Il nome dell'attributo di cui si desidera ottenere il valore.
     * @returns {string|null} - Restituisce il valore dell'attributo se esiste, altrimenti `null` se l'attributo non è presente.
     *
     * @example
     * const div = JDM('<div>lorem ipsum</div>', document.body)
     *  .jdm_setAttribute('data-test', 'foo');
     * const dataTest = div.jdm_getAttribute('data-test')
     */
    jdm_getAttribute(attribute) {
        return _core.jdm_getAttribute.call(this, attribute);
    }

    /**
     * Aggiunge uno o più elementi figli a un elemento DOM.
     * Se viene fornita una lista di elementi, tutti gli elementi vengono aggiunti all'elemento DOM.
     *
     * @param {HTMLElement|HTMLElement[]} elementList - Un singolo elemento DOM o un array di elementi DOM da aggiungere come figli.
     * @returns {Jdm} - Restituisce l'elemento DOM su cui gli elementi sono stati aggiunti, consentendo il chaining dei metodi.
     *
     * @example
     * const p1 = JDM('<p>paragrafo 1</p>');
     * const p2 = JDM('<p>paragrafo 2</p>');
     * const div = JDM('<div>lorem ipsum</div>', document.body)
     *  .jdm_append([p1, p2]); // Aggiunge entrambi i paragrafi come figli del div.
     *
     * const span = JDM('span');
     * div.jdm_append(span); // Aggiunge il singolo elemento span come figlio del div.
     */
    jdm_append(elementList) {
        return _core.jdm_append.call(this, elementList);
    }

    /**
     * Aggiunge uno o più elementi figli a un elemento DOM.
     * Se viene fornita una lista di elementi, tutti gli elementi vengono aggiunti come figli dell'elemento.
     * Se viene fornito un singolo elemento, questo viene aggiunto come unico figlio.
     *
     * @param {HTMLElement|HTMLElement[]} elementList - Un singolo elemento DOM o un array di elementi DOM da aggiungere come figli.
     * @returns {Jdm} - Restituisce l'elemento DOM su cui gli elementi sono stati aggiunti, consentendo il chaining dei metodi.
     *
     * @example
     * const div = JDM('<div><p>paragrafo</p></div>', document.body);
     * const span = JDM('<span>foo</span>');
     * div.jdm_prepend(span);
     * // Risultato
     * <div>
     *     <span>foo</span>
     *     <p>paragrafo</p>
     * </div>

     */
    jdm_prepend(elementList) {
        return _core.jdm_append.call(this, elementList);
    }

    /**
     * Aggiunge un attributo `id` all'elemento DOM specificato.
     *
     * @param {string} id - Il valore dell'attributo `id` da impostare sull'elemento DOM.
     * @returns {Jdm} - Restituisce l'elemento DOM su cui è stato impostato l'attributo `id`, consentendo il chaining dei metodi.
     *
     * @example
     * const div = JDM('<div>lorem ipsum</div>', document.body)
     *  .jdm_addId('myDiv'); // Imposta l'attributo id="myDiv" sull'elemento div.
     */
    jdm_addId(id) {
        return _core.jdm_addId.call(this, id);
    }

    /**
     * Aggiunge una o più classi CSS all'elemento DOM.
     * Se viene fornito un array di classi, tutte le classi vengono aggiunte all'elemento.
     * Se viene fornita una singola classe, questa viene aggiunta come unica classe.
     *
     * @param {string|string[]} classList - Una singola classe CSS o un array di classi CSS da aggiungere all'elemento DOM.
     * @returns {Jdm} - Restituisce l'elemento DOM su cui le classi sono state aggiunte, consentendo il chaining dei metodi.
     *
     * @example
     * const div = JDM('<div>lorem ipsum</div>', document.body)
     *  .jdm_addClassList('myClass'); // Aggiunge la classe "myClass" all'elemento div.
     *
     * const div2 = JDM('<div>lorem ipsum</div>', document.body)
     *  .jdm_addClassList(['class1', 'class2']); // Aggiunge "class1" e "class2" all'elemento div2.
     */
    jdm_addClassList(classList) {
        return _core.jdm_addClassList.call(this, classList);
    }

    /**
     * Rimuove una o più classi CSS dall'elemento DOM.
     * Se viene fornito un array di classi, tutte le classi vengono rimosse dall'elemento.
     * Se viene fornita una singola classe, questa viene rimossa.
     *
     * @param {string|string[]} classList - Una singola classe CSS o un array di classi CSS da rimuovere dall'elemento DOM.
     * @returns {Jdm} - Restituisce l'elemento DOM su cui le classi sono state rimosse, consentendo il chaining dei metodi.
     *
     * @example
     * JDM('<div class="foo bar myClass"></div>', document.body)
     *  .jdm_removeClassList('myClass'); // Rimuove la classe "myClass" dall'elemento.
     *
     * JDM('<div class="foo bar myClass"></div>', document.body)
     *  .jdm_removeClassList(['foo', 'bar']); // Rimuove "foo" e "bar" dall'elemento.
     */
    jdm_removeClassList(classList) {
        return _core.jdm_removeClassList.call(this, classList);
    }

    /**
     * Attiva o disattiva una o più classi CSS su un elemento DOM.
     * Se viene fornito un array di classi, ciascuna classe verrà alternata (aggiunta se non presente, rimossa se presente).
     * Se viene fornita una singola classe, questa verrà alternata.
     *
     * @param {string|string[]} classList - Una singola classe CSS o un array di classi CSS da alternare sull'elemento DOM.
     * @returns {Jdm} - Restituisce l'elemento DOM su cui le classi sono state alternate, consentendo il chaining dei metodi.
     *
     * @example
     * const div = JDM('<div>lorem ipsum</div>', document.body)
     * .jdm_toggleClassList('active'); // Alterna la classe "active" sull'elemento div.
     *
     * const div2 = JDM('<div>lorem ipsum</div>', document.body)
     * .jdm_toggleClassList(['class1', 'class2']); // Alterna le classi "class1" e "class2" sull'elemento div2.
     */
    jdm_toggleClassList(classList) {
        return _core.jdm_toggleClassList.call(this, classList);
    }

    /**
     * Svuota il contenuto dell'elemento DOM.
     * A seconda del tipo di elemento, il comportamento di "svuotamento" varia:
     * - Per gli elementi `input` di tipo `checkbox` o `radio`, deseleziona l'elemento (imposta `checked` a `false`).
     * - Per gli altri elementi `input` o `textarea`, imposta il valore a `null` (svuotando il campo di testo).
     * - Per un elemento `form`, esegue il reset del modulo (ripristina tutti i campi al loro stato iniziale).
     * - Per altri tipi di elementi, rimuove il contenuto HTML dell'elemento (imposta `innerHTML` a una stringa vuota).
     *
     * @returns {Jdm} - Restituisce l'elemento DOM su cui è stato effettuato lo svuotamento, consentendo il chaining dei metodi.
     *
     * @example
     * const inputText = JDM('input', document.body)
     *  .jdm_empty(); // Imposta il valore dell'input text a null.
     *
     * const checkbox = JDM('input', document.body)
     *  .jdm_setAttribute('type', 'checkbox')
     *  .jdm_empty(); // Deseleziona la checkbox.
     *
     * const form = JDM('form').jdm_empty(); // Esegue il reset del modulo.
     */
    jdm_empty() {
        return _core.jdm_empty.call(this);
    }

    /**
     * Rimuove l'elemento DOM dal documento e genera un evento di distruzione.
     * Questo metodo elimina l'elemento DOM rappresentato da `this.node` dalla struttura del documento.
     * Inoltre, viene generato un evento personalizzato chiamato "destroy".
     *
     * @returns {Jdm} - Restituisce l'elemento DOM che è stato rimosso, consentendo il chaining dei metodi.
     *
     * @example
     * const div = JDM('<div>lorem ipsum</div>', document.body)
     *  .jdm_destroy(); // Rimuove l'elemento div dal documento e genera un evento "destroy".
     */
    jdm_destroy() {
        return _core.jdm_destroy.call(this);
    }

    /**
     * Verifica la validità dell'elemento `input` o `form` secondo le regole di validazione HTML.
     * Dopo la verifica, viene generato un evento personalizzato chiamato "validate", che segnala il risultato della validazione.
     *
     * @returns {Jdm} L'elemento DOM su cui è stata effettuata la validazione, consentendo il chaining dei metodi.
     *
     * @example
     * JDM('input', document.body)
     *  .jdm_setAttribute('required', 'true')
     *  .jdm_validate(); // Verifica la validità dell'input e genera l'evento "validate".
     */
    jdm_validate() {
        return _core.jdm_validate.call(this);
    }

    /**
     * Rimuove un attributo dall'elemento DOM e genera un evento di rimozione dell'attributo.
     * Questo metodo rimuove l'attributo specificato dall'elemento DOM rappresentato da `this.node`.
     * Inoltre, viene generato un evento personalizzato chiamato "removeAttribute" con il nome dell'attributo rimosso.
     *
     * @param {string} attribute - Il nome dell'attributo da rimuovere dall'elemento DOM.
     * @returns {Jdm} - Restituisce l'elemento DOM su cui l'attributo è stato rimosso, consentendo il chaining dei metodi.
     *
     * @example
     * JDM('<div id="foo">lorem ipsum</div>', document.body)
     *  .jdm_removeAttribute('id'); // Rimuove l'attributo 'id' dall'elemento div.
     */
    jdm_removeAttribute(attribute) {
        return _core.jdm_removeAttribute.call(this, attribute);
    }

    /**
     * Imposta un valore per una proprietà di stile CSS su un elemento DOM.
     * Questo metodo applica una dichiarazione di stile CSS all'elemento DOM rappresentato da `this.node`.
     *
     * @param {string} style - Il nome della proprietà di stile CSS da impostare (ad esempio, "color", "backgroundColor").
     * @param {string} value - Il valore da assegnare alla proprietà di stile CSS (ad esempio, "red", "10px").
     * @returns {Jdm} - Restituisce l'elemento DOM su cui è stato applicato lo stile, consentendo il chaining dei metodi.
     *
     * @example
     * const div = JDM('<div>lorem ipsum</div>', document.body)
     * .jdm_setStyle('color', 'red'); // Imposta il colore del testo dell'elemento div su rosso.
     */
    jdm_setStyle(style, value) {
        return _core.jdm_setStyle.call(this, style, value);
    }

    /**
     * Estende l'elemento DOM aggiungendo una proprietà personalizzata.
     * Questo metodo assegna un oggetto o un valore alla proprietà `name` dell'elemento DOM rappresentato da `this.node`.
     *
     * @param {string} name - Il nome della proprietà da aggiungere all'elemento DOM.
     * @param {Object|null} [object=null] - L'oggetto o il valore da associare alla proprietà. Può essere qualsiasi tipo di valore, incluso `null`.
     * @returns {Jdm} - Restituisce l'elemento DOM su cui è stata aggiunta la proprietà personalizzata, consentendo il chaining dei metodi.
     *
     * @example
     * const div = JDM('<div>lorem ipsum</div>', document.body)
     *  .jdm_extendNode('customData', { id: 123, name: 'My Div' });
     * // Aggiunge la proprietà 'customData' all'elemento div con un oggetto come valore.
     * console.log(div.customData); // { id: 123, name: 'My Div' }
     */
    jdm_extendNode(name, object = null) {
        return _core.jdm_extendNode.call(this, name, object);
    }

    /**
     * Imposta o restituisce il contenuto HTML interno dell'elemento DOM.
     * Questo metodo imposta il valore di `innerHTML` dell'elemento DOM rappresentato da `this.node`.
     * Se il parametro `value` viene fornito, aggiorna il contenuto HTML; altrimenti, restituisce il contenuto HTML attuale.
     *
     * @param {string} value - Il contenuto HTML da impostare all'interno dell'elemento DOM.
     *                           Se non fornito, il metodo restituirà il contenuto HTML corrente.
     * @returns {Jdm} - Restituisce l'elemento DOM con il nuovo contenuto HTML impostato, consentendo il chaining dei metodi.
     *
     * @example
     * JDM('<div>lorem ipsum</div>', document.body)
     *  .jdm_innerHTML('<p>Dolor sit amet</p>');
     * // Imposta il contenuto HTML del div con un nuovo paragrafo.
     */
    jdm_innerHTML(value) {
        return _core.jdm_innerHTML.call(this, value);
    }
    /**
     * Imposta un binding di dati tra l'elemento corrente e un altro o più elementi.
     * Questo metodo consente di sincronizzare i valori tra gli elementi DOM, abilitando il data binding unidirezionale o bidirezionale.
     * Se un valore cambia nell'elemento sorgente (ad esempio un `input`), il valore dell'elemento di destinazione (ad esempio un altro `input` o `div`) viene aggiornato.
     * Se il binding bidirezionale è abilitato, i cambiamenti sono sincronizzati in entrambe le direzioni.
     *
     * @param {HTMLElement|HTMLElement[]} el - L'elemento o la lista di elementi con cui si desidera stabilire il binding.
     * @param {string} [event="input"] - Il tipo di evento da ascoltare per attivare il binding. Default è "input".
     * @param {boolean} [twoWayDataBinding=true] - Se `true`, attiva il binding bidirezionale. Se `false`, il binding sarà unidirezionale.
     * @returns {Jdm} - Restituisce l'elemento DOM su cui è stato applicato il binding, consentendo il chaining dei metodi.
     *
     * @example
     *  const input = JDM('input', document.body);
     *  const output = JDM('input', document.body);
     *  input.jdm_binding(output, "input", true);
     * // Crea un binding unidirezionale tra l'input e l'output, che si attiva sull'evento 'change'.
     */
    jdm_binding(el, event = "input", twoWayDataBinding = true) {
        return _core.jdm_innerHTML.call(this, el, event, twoWayDataBinding);
    }

    /**
     * Aggiunge un listener per l'evento `input` all'elemento DOM.
     * Questo metodo consente di eseguire una funzione di callback ogni volta che si verifica un evento di tipo `input` sull'elemento.
     *
     * @param {Function} [fn=() => {}] - La funzione di callback da eseguire quando si verifica l'evento `input`.
     *                                    La funzione riceverà l'evento come parametro.
     * @returns {Jdm} - Restituisce l'elemento DOM su cui è stato aggiunto l'event listener, consentendo il chaining dei metodi.
     *
     * @example
     * const input = JDM('input', document.body)
     *  .jdm_onInput((event) => {
     *   console.log('Input modificato:', input.jdm_getValue());
     * });
     * // Aggiunge un listener per l'evento 'input' che stampa il valore dell'input ogni volta che cambia.
     */
    jdm_onInput(fn = () => {}) {
        return _core.jdm_onInput.call(this, fn);
    }

    /**
     * Aggiunge un listener per l'evento `change` all'elemento DOM.
     * Questo metodo consente di eseguire una funzione di callback ogni volta che si verifica un evento di tipo `change` sull'elemento.
     * L'evento `change` viene attivato quando il valore di un elemento, come un campo di input, viene modificato e l'elemento perde il focus.
     *
     * @param {Function} [fn=() => {}] - La funzione di callback da eseguire quando si verifica l'evento `change`.
     *                                    La funzione riceverà l'evento come parametro.
     * @returns {Jdm} - Restituisce l'elemento DOM su cui è stato aggiunto l'event listener, consentendo il chaining dei metodi.
     *
     * @example
     * const input = JDM('input', document.body)
     *  .jdm_onChange(() => {
     *   console.log('Valore cambiato:', input.jdm_getValue());
     * });
     * // Aggiunge un listener per l'evento 'change' che stampa il valore dell'input ogni volta che cambia.
     */
    jdm_onChange(fn = () => {}) {
        return _core.jdm_onChange.call(this, fn);
    }

    /**
     * Aggiunge un listener per l'evento `select` all'elemento DOM.
     * Questo metodo consente di eseguire una funzione di callback ogni volta che si verifica un evento di tipo `select` sull'elemento.
     * L'evento `select` viene attivato quando una parte del testo all'interno di un elemento, come un campo di input o una textarea, viene selezionata dall'utente.
     *
     * @param {Function} [fn=() => {}] - La funzione di callback da eseguire quando si verifica l'evento `select`.
     *                                    La funzione riceverà l'evento come parametro.
     * @returns {Jdm} - Restituisce l'elemento DOM su cui è stato aggiunto l'event listener, consentendo il chaining dei metodi.
     *
     * @example
     * const input = JDM('<input>', document.body)
     *  .jdm_onSelect((event) => {
     *   console.log('Testo selezionato:', input.jdm_getValue());
     * });
     * // Aggiunge un listener per l'evento 'select' che stampa il valore del campo di input ogni volta che viene selezionato del testo.
     */
    jdm_onSelect(fn = () => {}) {
        return _core.jdm_onSelect.call(this, fn);
    }

    /**
     * Aggiunge un listener per l'evento `input` all'elemento DOM con un meccanismo di debounce.
     * Questo metodo permette di eseguire una funzione di callback solo dopo che l'utente ha smesso di digitare per un determinato periodo di tempo.
     * È utile per evitare l'esecuzione ripetitiva di funzioni (come una ricerca o un aggiornamento) mentre l'utente sta digitando, migliorando le prestazioni.
     *
     * @param {Function} [fn=() => {}] - La funzione di callback da eseguire quando si verifica l'evento `input`.
     *                                    La funzione verrà eseguita dopo che l'utente smette di digitare per un periodo di tempo specificato dal parametro `timeout`.
     * @param {number} [timeout=300] - Il tempo di attesa (in millisecondi) dopo l'ultimo evento `input` prima che la funzione di callback venga eseguita.
     *                                  Il valore predefinito è 300 millisecondi.
     * @returns {Jdm} - Restituisce l'elemento DOM su cui è stato aggiunto l'event listener, consentendo il chaining dei metodi.
     *
     * @example
     * const input = JDM('input', document.body)
     *  .jdm_onDebounce(() => {
     *      console.log('Input debounced:',input.jdm_getValue());
     *  }, 500);
     * // Aggiunge un listener per l'evento 'input' con un debounce di 500 millisecondi,
     * // evitando chiamate troppo frequenti alla funzione di callback mentre l'utente sta digitando.
     */
    jdm_onDebounce(fn = () => {}, timeout = 300, method = "input") {
        return _core.jdm_onDebounce.call(this, fn, timeout, method);
    }

    /**
     * Aggiunge un listener per l'evento `click` all'elemento DOM.
     * Questo metodo consente di eseguire una funzione di callback ogni volta che si verifica un evento di tipo `click` sull'elemento.
     * L'evento `click` viene attivato quando l'utente clicca su un elemento, come un pulsante o un link.
     *
     * @param {Function} [fn=() => {}] - La funzione di callback da eseguire quando si verifica l'evento `click`.
     *                                    La funzione riceverà l'evento come parametro.
     * @returns {Jdm} - Restituisce l'elemento DOM su cui è stato aggiunto l'event listener, consentendo il chaining dei metodi.
     *
     * @example
     * const button = JDM('<button>CLICK</button>', document.body)
     *  .jdm_onClick((event) => {
     *      console.log('Button clicked');
     *  });
     * // Aggiunge un listener per l'evento 'click' che stampa un messaggio ogni volta che il pulsante viene cliccato.
     */
    jdm_onClick(fn = () => {}) {
        return _core.jdm_onClick.call(this, fn);
    }

    /**
     * Aggiunge un listener per l'evento `contextmenu` (clic destro) all'elemento DOM.
     * Questo metodo consente di eseguire una funzione di callback ogni volta che si verifica un evento di tipo `contextmenu` sull'elemento,
     * che viene attivato dal clic destro del mouse (o equivalente, come il tocco prolungato su dispositivi mobili).
     * L'evento `contextmenu` è tipicamente usato per visualizzare il menu contestuale di un elemento.
     *
     * @param {Function} [fn=() => {}] - La funzione di callback da eseguire quando si verifica l'evento `contextmenu`.
     *                                    La funzione riceverà l'evento come parametro.
     * @returns {Jdm} - Restituisce l'elemento DOM su cui è stato aggiunto l'event listener, consentendo il chaining dei metodi.
     *
     * @example
     * const element = JDM('<div> RIGHT CLICK </div>', document.body).jdm_onRightClick((event) => {
     *   event.preventDefault(); // Previene il menu contestuale predefinito
     *   console.log('Clic destro eseguito!');
     * });
     * // Aggiunge un listener per l'evento 'contextmenu' che esegue la funzione di callback ogni volta che si fa clic destro sull'elemento.
     */
    jdm_onRightClick(fn = () => {}) {
        return _core.jdm_onRightClick.call(this, fn);
    }

    /**
     * Aggiunge un listener per l'evento `dblclick` (doppio clic) all'elemento DOM.
     * Questo metodo consente di eseguire una funzione di callback ogni volta che si verifica un evento di tipo `dblclick` sull'elemento,
     * che viene attivato quando l'utente fa doppio clic su un elemento.
     * L'evento `dblclick` è comunemente utilizzato per azioni che richiedono un'interazione più rapida dell'utente, come l'apertura di un file o l'attivazione di una funzionalità.
     *
     * @param {Function} [fn=() => {}] - La funzione di callback da eseguire quando si verifica l'evento `dblclick`.
     *                                    La funzione riceverà l'evento come parametro.
     * @returns {Jdm} - Restituisce l'elemento DOM su cui è stato aggiunto l'event listener, consentendo il chaining dei metodi.
     *
     * @example
     * const element = JDM('<div>Double click</div>', document.body)
     *  .jdm_onDoubleClick((event) => {
     *      console.log('Elemento doppiamente cliccato');
     *  });
     * // Aggiunge un listener per l'evento 'dblclick' che esegue la funzione di callback ogni volta che l'utente fa doppio clic sull'elemento.
     */
    jdm_onDoubleClick(fn = () => {}) {
        return _core.jdm_onDoubleClick.call(this, fn);
    }

    /**
     * Aggiunge un listener per l'evento `invalid` all'elemento DOM.
     * Questo metodo consente di eseguire una funzione di callback ogni volta che si verifica un evento di tipo `invalid` sull'elemento,
     * che viene attivato quando un elemento di modulo non soddisfa i suoi vincoli di validazione.
     * L'evento `invalid` viene in genere generato automaticamente dal browser quando un utente invia un modulo con campi non validi.
     *
     * @param {Function} [fn=() => {}] - La funzione di callback da eseguire quando si verifica l'evento `invalid`.
     *                                    La funzione riceverà l'evento come parametro.
     * @returns {Jdm} - Restituisce l'elemento DOM su cui è stato aggiunto l'event listener, consentendo il chaining dei metodi.
     *
     * @example
     * const formString = `
     *  <form>
     *      <input name="inputNumeric" type="number" min="1" max="10" required />
     *      <button type="submit"> Submit </button>
     *  </form>`;
     *  const form = JDM(formString, document.body)
     *  form.jdm_childNode.inputNumeric
     *      .jdm_onInvalid((e) => {
     *          console.log('Il campo input è invalido');
     *      })
     * // Aggiunge un listener per l'evento 'invalid' che esegue la funzione di callback quando l'input non è valido.
     */
    jdm_onInvalid(fn = () => {}) {
        return _core.jdm_onInvalid.call(this, fn);
    }

    /**
     * Aggiunge un listener per l'evento `load` all'elemento DOM.
     * Questo metodo consente di eseguire una funzione di callback ogni volta che si verifica un evento di tipo `load` sull'elemento,
     * che viene attivato quando l'elemento o le risorse a esso associate sono completamente caricate.
     * L'evento `load` viene comunemente utilizzato per monitorare il caricamento di immagini, script o altri contenuti multimediali,
     * ma può essere attivato anche quando una pagina o un elemento è stato completamente caricato nel DOM.
     *
     * @param {Function} [fn=() => {}] - La funzione di callback da eseguire quando si verifica l'evento `load`.
     *                                    La funzione riceverà l'evento come parametro.
     * @returns {Jdm} - Restituisce l'elemento DOM su cui è stato aggiunto l'event listener, consentendo il chaining dei metodi.
     *
     * @example
     * const image = JDM('<img src="https://picsum.photos/200/300" alt="test">', document.body)
     *  .jdm_onLoad(() => {
     *      console.log('Immagine caricata con successo');
     *  });
     * // Aggiunge un listener per l'evento 'load' che esegue la funzione di callback ogni volta che l'immagine è completamente caricata.
     */
    jdm_onLoad(fn = () => {}) {
        return _core.jdm_onLoad.call(this, fn);
    }

    /**
     * Aggiunge un listener per l'evento `error` all'elemento DOM.
     * Questo metodo consente di eseguire una funzione di callback ogni volta che si verifica un evento di tipo `error` sull'elemento,
     * che viene attivato quando si verifica un errore durante il caricamento di risorse o altre operazioni.
     * L'evento `error` viene comunemente utilizzato per gestire errori di caricamento, come quando un'immagine non riesce a caricarsi
     * o quando un file JavaScript o CSS non può essere caricato correttamente.
     *
     * @param {Function} [fn=() => {}] - La funzione di callback da eseguire quando si verifica l'evento `error`.
     *                                    La funzione riceverà l'evento come parametro.
     * @returns {Jdm} - Restituisce l'elemento DOM su cui è stato aggiunto l'event listener, consentendo il chaining dei metodi.
     *
     * @example
     *  const imgElement = JDM('<img src="invalidUrl" alt="invalid url">', document.body)
     *      .jdm_onError(() => {
     *          console.log('Si è verificato un errore nel caricamento dell\'immagine');
     *      });
     * // Aggiunge un listener per l'evento 'error' che esegue la funzione di callback ogni volta che si verifica un errore nel caricamento dell'immagine.
     */
    jdm_onError(fn = () => {}) {
        return _core.jdm_onError.call(this, fn);
    }

    /**
     * Aggiunge un listener per l'evento `submit` all'elemento DOM.
     * Questo metodo consente di eseguire una funzione di callback ogni volta che si verifica un evento di tipo `submit` sull'elemento,
     * che viene attivato quando un modulo viene inviato.
     * L'evento `submit` viene generato quando un utente invia un modulo, sia tramite il pulsante di invio che premendo il tasto "Enter"
     * in un campo del modulo.
     *
     * @param {Function} [fn=() => {}] - La funzione di callback da eseguire quando si verifica l'evento `submit`.
     *                                    La funzione riceverà l'evento come parametro.
     *                                    Se necessario, la funzione di callback può chiamare `event.preventDefault()` per prevenire l'invio del modulo.
     * @returns {Jdm} - Restituisce l'elemento DOM su cui è stato aggiunto l'event listener, consentendo il chaining dei metodi.
     *
     * @example
     * const formString = `
     *  <form>
     *      <input name="inputNumeric" type="number" min="1" max="10" required />
     *      <button type="submit"> Submit </button>
     *  </form>`;
     *  const form = JDM(formString, document.body)
     *      .jdm_onSubmit((e)=> {
     *          e.preventDefault();
     *          console.log('submit');
     *      })
     * // Aggiunge un listener per l'evento 'submit' che esegue la funzione di callback ogni volta che il modulo viene inviato.
     */
    jdm_onSubmit(fn = e => {}) {
        return _core.jdm_onSubmit.call(this, fn);
    }

    /**
     * Imposta il valore di un elemento DOM. Se l'elemento è una checkbox, un radio button o un modulo,
     * il valore verrà impostato di conseguenza. Se l'elemento è un modulo (`<form>`), verranno impostati
     * i valori di tutti i campi del modulo, compresi i checkbox e i radio buttons.
     * Inoltre, è possibile forzare il valore a essere trattato come booleano tramite il parametro `tooBoolean`.
     *
     * @param {any} value - Il valore da impostare sull'elemento DOM. Il tipo di valore dipende dall'elemento e dal contesto.
     * @param {boolean} [tooBoolean=true] - Se impostato su `true`, tenterà di convertire il valore in booleano.
     *                                       Se il valore non è convertibile in booleano, verrà mantenuto il valore originale.
     *                                       Se impostato su `false`, il valore non verrà modificato.
     * @returns {Jdm} - Restituisce l'elemento DOM su cui è stato impostato il valore, consentendo il chaining dei metodi.
     *
     * @example
     * const checkboxElement = JDM('<input type="checkbox">', document.body)
     *  .jdm_setValue(true);
     * // Imposta il valore di una checkbox su 'true', facendo in modo che sia selezionata.
     *
     * const data = {
     *  inputNumeric: 1,
     *  name: 'foo',
     *  surname : 'bar'
     *  }
     *
     * const formString = `
     *  <form>
     *      <input name="inputNumeric" type="number" min="1" max="10"/>
     *      <input name="name" type="text"/>
     *      <input name="surname" type="text"/>
     *      <button type="submit"> Submit </button>
     *  </form>`;
     *  const form = JDM(formString, document.body)
     *      .jdm_setValue(data);
     * // Imposta i valori del modulo, inclusi i checkbox e altri input.
     */
    jdm_setValue(value, tooBoolean = true) {
        return _core.jdm_setValue.call(this, value, tooBoolean);
    }

    /**
     * Ottiene il valore di un elemento DOM. A seconda del tipo di elemento, il valore verrà restituito in modo appropriato:
     * - **Input** (checkbox, radio): restituisce il valore `checked` dell'elemento.
     * - **Form**: restituisce un oggetto JSON con i valori di tutti i campi del modulo, supportando strutture di dati complesse come array e oggetti.
     * - **Select**: restituisce il valore selezionato dell'elemento `<select>`.
     * - **Altri input** (testo, numero, range): restituisce il valore dell'elemento come una stringa.
     *
     * @returns {any} - Il valore dell'elemento DOM. Se l'elemento è un modulo, restituisce un oggetto JSON con i dati del modulo.
     *
     * @example
     * const checkboxValue = JDM('<input type="checkbox" checked>', document.body)
     *  .jdm_getValue();
     * console.log(checkboxValue); // log true
     *
     * const data = {
     *  inputNumeric: 1,
     *  name: 'foo',
     *  surname: 'bar'
     * }
     *
     * const formString = `
     * <form>
     *   <input name="inputNumeric" type="number" min="1" max="10"/>
     *   <input name="name" type="text"/>
     *   <input name="surname" type="text"/>
     *   <button type="submit"> Submit </button>
     * </form>`;
     * const form = JDM(formString, document.body)
     *  .jdm_setValue(data);
     *  console.log(form.jdm_getValue());
     * // Restituisce un oggetto JSON con i dati del modulo, es.
     * // { inputNumeric: '1', name: 'foo', surname: 'bar' }
     *
     * const selectString = `
     * <select name="foo">
     *  <option value="foo">foo</option>
     *  <option value="bar" selected>bar</option>
     * </select>`;
     * const select = JDM(selectString, document.body);
     * console.log(select.jdm_getValue()); // log 'bar'
     */
    jdm_getValue() {
        return _core.jdm_getValue.call(this);
    }

    /**
     * Genera un evento personalizzato per l'elemento DOM associato, utilizzando il metodo di generazione evento definito nella libreria `_common`.
     * L'evento può essere propagato ai genitori, se necessario.
     *
     * @param {string} name - Il nome dell'evento da generare. Può essere qualsiasi stringa che rappresenta un tipo di evento personalizzato.
     * @param {Object|null} [data=null] - I dati da associare all'evento. Questi dati vengono passati come parte dell'oggetto evento. Può essere `null` se non sono necessari dati aggiuntivi.
     * @param {boolean} [propagateToParents=true] - Un valore booleano che indica se l'evento deve essere propagato ai genitori dell'elemento. Il valore predefinito è `true`.
     *
     * @returns {Jdm} - Restituisce il nodo dell'elemento su cui è stato generato l'evento, per consentire il chaining.
     *
     * @example
     * const element = JDM('<input>', document.body)
     *  .jdm_addEventListener('customEvent', (event)=> {
     *      console.log(event.detail)
     * })
     * element.jdm_genEvent('customEvent', { message: 'Evento generato!' });
     */
    jdm_genEvent(name, data = null, propagateToParents = true) {
        return _core.jdm_getValue.call(this, name, data, propagateToParents);
    }

    /**
     * Aggiunge un listener per un evento specificato sull'elemento DOM associato.
     * Consente di eseguire una funzione di callback quando l'evento si verifica.
     *
     * @param {string} name - Il nome dell'evento per cui aggiungere il listener (es. "click", "input", ecc.).
     * @param {Function} [fn=() => {}] - La funzione di callback che viene eseguita quando l'evento si verifica. Il valore predefinito è una funzione vuota.
     *
     * @returns {Jdm} - Restituisce il nodo dell'elemento a cui è stato aggiunto l'evento, per consentire il chaining.
     *
     * @example
     * const element = JDM('<div>Click me</div>', document.body)
     *  .jdm_addEventListener('click', () => {
     *      console.log('Click!');
     *  })
     *  .jdm_addEventListener('contextmenu', () => {
     *      console.log('Right Click!');
     *  })
     */
    jdm_addEventListener(name, fn = () => {}) {
        return _core.jdm_getValue.call(this, name, fn);
    }

    /**
     * Rimuove un listener per un evento specificato sull'elemento DOM associato.
     * Questo metodo permette di interrompere l'esecuzione della funzione di callback
     * quando l'evento si verifica.
     *
     * @param {string} name - Il nome dell'evento per cui rimuovere il listener (es. "click", "input", ecc.).
     * @param {Function} [fn=() => {}] - La funzione di callback che era stata precedentemente aggiunta come listener. Il valore predefinito è una funzione vuota.
     *
     * @returns {Jdm} - Restituisce il nodo dell'elemento da cui è stato rimosso l'evento, per consentire il chaining.
     *
     * @example
     * // Rimuovi un listener per l'evento 'click' su un elemento
     * const element = JDM('<div>lorem ipsum</div>', document.body);
     * const clickHandler = () => { console.log('Elemento cliccato!'); };
     * element.jdm_addEventListener('click', clickHandler);
     * // Dopo un certo punto, rimuoviamo il listener
     * element.jdm_removeEventListener('click', clickHandler);
     *
     * // Rimuovi un listener per l'evento 'input' su un elemento con funzione di callback predefinita
     * element.jdm_removeEventListener('input');
     */
    jdm_removeEventListener(name, fn = () => {}) {
        return _core.jdm_getValue.call(this, name, fn);
    }

    /**
     * Estende l'elemento corrente con i nodi figli definiti in `jdm_childNode`.
     * Se l'elemento ha nodi figli associati a `jdm_childNode`, questi vengono aggiunti come proprietà dell'elemento stesso.
     * ### NB:questo metodo NON funziona sui form
     * @returns {Jdm} - Restituisce il nodo dell'elemento a cui sono stati estesi i figli, per consentire il chaining.
     *
     * @example
     * const domString = `
     *  <div class="foo">
     *      <div data-name="element1"> Element 1</div>
     *      <div data-name="element2"> Element 2</div>
     *      <div data-name="element3"> Element 3</div>
     *  </div>`;
     *  const div = JDM(domString, document.body)
     *   .jdm_extendChildNode();
     *   console.log(div.element1);
     *   console.log(div.element2);
     *   console.log(div.element3);
     */
    jdm_extendChildNode() {
        return _core.jdm_extendChildNode.call(this);
    }

    /** ANIMATION **/

    /**
     * Applica un'animazione di fade-in sul nodo.
     *
     * @param {object} [option=new AnimationOption()] - Opzioni dell'animazione.
     * @param {function(): void} [callbackFn] - Funzione da eseguire al termine dell'animazione.
     * @returns {Jdm} - Restituisce il nodo dell'elemento a cui sono stati estesi i figli, per consentire il chaining.
     * @example
     * JDM(`<div class="foo"> FadeIn </div>`, document.body)
     *      .jdm_fadeIn(()=> {console.log('test')}, {duration: 2000, direction: 'alternate', iterations:'Infinity'})
     */
    jdm_fadeIn(callbackFn, option = new AnimationOption()) {
        return _animation.jdm_fadeIn.call(this, callbackFn, option);
    }

    /**
     * Applica un'animazione tipo fadeInDown al nodo .
     *
     * @param {function(): void} [callbackFn] - Funzione da eseguire al termine dell'animazione.
     * @param {Partial<AnimationOption>} [option=new AnimationOption()] - Opzioni dell'animazione.
     * @returns {Jdm} - Restituisce il nodo dell'elemento a cui sono stati estesi i figli, per consentire il chaining.
     * @example
     * JDM(`<div class="foo"> FadeInDown </div>`, document.body)
     *      .jdm_fadeInDown(() => console.log('done'), { duration: 1000, easing: 'ease-out' });
     */
    jdm_fadeInDown(callbackFn, option = new AnimationOption()) {
        return _animation.jdm_fadeInDown.call(this, callbackFn, option);
    }

    /**
     * Applica un'animazione tipo fadeInUp al nodo .
     *
     * @param {function(): void} [callbackFn] - Funzione da eseguire al termine dell'animazione.
     * @param {Partial<AnimationOption>} [option=new AnimationOption()] - Opzioni dell'animazione.
     * @returns {Jdm} - Restituisce il nodo dell'elemento a cui sono stati estesi i figli, per consentire il chaining.
     * @example
     * JDM(`<div class="foo"> FadeInUp </div>`, document.body)
     *      .jdm_fadeInUp(() => console.log('Fade in up concluso'), { duration: 800 });
     */
    jdm_fadeInUp(callbackFn, option = new AnimationOption()) {
        return _animation.jdm_fadeInUp.call(this, callbackFn, option);
    }

    /**
     * Applica un'animazione tipo fadeInLeft al nodo .
     *
     * @param {function(): void} [callbackFn] - Funzione da eseguire al termine dell'animazione.
     * @param {Partial<AnimationOption>} [option=new AnimationOption()] - Opzioni dell'animazione.
     * @returns {Jdm} - Restituisce il nodo dell'elemento a cui sono stati estesi i figli, per consentire il chaining.
     * @example
     * JDM(`<div class="foo"> FadeInLeft </div>`, document.body)
     *      .jdm_fadeInLeft(() => console.log('Fade in left concluso'), { duration: 800 });
     */
    jdm_fadeInLeft(callbackFn, option = new AnimationOption()) {
        return _animation.jdm_fadeInLeft.call(this, callbackFn, option);
    }
    /**
     * Applica un'animazione tipo fadeInRight al nodo .
     *
     * @param {function(): void} [callbackFn] - Funzione da eseguire al termine dell'animazione.
     * @param {Partial<AnimationOption>} [option=new AnimationOption()] - Opzioni dell'animazione.
     * @returns {Jdm} - Restituisce il nodo dell'elemento a cui sono stati estesi i figli, per consentire il chaining.
     * @example
     * JDM(`<div class="foo"> FadeInRight </div>`, document.body)
     *      .jdm_fadeInRight(() => console.log('Fade in right concluso'), { duration: 800 });
     */
    jdm_fadeInRight(callbackFn, option = new AnimationOption()) {
        return _animation.jdm_fadeInRight.call(this, callbackFn, option);
    }

    /**
     * Applica un'animazione di fade-out sul nodo.
     *

     * @param {function(): void} [callbackFn] - Funzione da eseguire al termine dell'animazione.
     * @param {Partial<AnimationOption>} [option=new AnimationOption()] - Opzioni dell'animazione.
     * @returns {Jdm} - Restituisce il nodo dell'elemento a cui sono stati estesi i figli, per consentire il chaining.
     * @example
     *
     * JDM(`<div class="foo"> FadeOut </div>`, document.body)
     *      .jdm_fadeOut(()=> {console.log('test')}, {duration: 2000, direction: 'alternate', iterations:'Infinity'})
     */
    jdm_fadeOut(callbackFn, option = new AnimationOption()) {
        return _animation.jdm_fadeOut.call(this, callbackFn, option);
    }

    /**
     * Applica un'animazione di fade out right sul nodo.
     *

     * @param {function(): void} [callbackFn] - Funzione da eseguire al termine dell'animazione.
     * @param {Partial<AnimationOption>} [option=new AnimationOption()] - Opzioni dell'animazione.
     * @returns {Jdm} - Restituisce il nodo dell'elemento a cui sono stati estesi i figli, per consentire il chaining.
     * @example
     *
     * JDM(`<div class="foo"> FadeOutRight </div>`, document.body)
     *      .jdm_fadeOutRight(()=> {console.log('test')}, {duration: 2000, direction: 'alternate', iterations:'Infinity'})
     */
    jdm_fadeOutRight(callbackFn, option = new AnimationOption()) {
        return _animation.jdm_fadeOutRight.call(this, callbackFn, option);
    }

    /**
     * Applica un'animazione di fade out up sul nodo.
     *
     * @param {function(): void} [callbackFn] - Funzione da eseguire al termine dell'animazione.
     * @param {Partial<AnimationOption>} [option=new AnimationOption()] - Opzioni dell'animazione.
     * @returns {Jdm} - Restituisce il nodo dell'elemento a cui sono stati estesi i figli, per consentire il chaining.
     * @example
     *
     * JDM(`<div class="foo"> FadeOutUp </div>`, document.body)
     *      .jdm_fadeOutUp(()=> {console.log('test')}, {duration: 2000, direction: 'alternate', iterations:'Infinity'})
     */
    jdm_fadeOutUp(callbackFn, option = new AnimationOption()) {
        return _animation.jdm_fadeOutUp.call(this, callbackFn, option);
    }

    /**
     * Applica un'animazione di fade out down sul nodo.
     *
     * @param {function(): void} [callbackFn] - Funzione da eseguire al termine dell'animazione.
     * @param {Partial<AnimationOption>} [option=new AnimationOption()] - Opzioni dell'animazione.
     * @returns {Jdm} - Restituisce il nodo dell'elemento a cui sono stati estesi i figli, per consentire il chaining.
     * @example
     *
     * JDM(`<div class="foo"> FadeOutDown </div>`, document.body)
     *      .jdm_fadeOutDown(()=> {console.log('test')}, {duration: 2000, direction: 'alternate', iterations:'Infinity'})
     */
    jdm_fadeOutDown(callbackFn, option = new AnimationOption()) {
        return _animation.jdm_fadeOutDown.call(this, callbackFn, option);
    }

    /**
     * Applica un'animazione di fade out left sul nodo.
     *
     * @param {function(): void} [callbackFn] - Funzione da eseguire al termine dell'animazione.
     * @param {Partial<AnimationOption>} [option=new AnimationOption()] - Opzioni dell'animazione.
     * @returns {Jdm} - Restituisce il nodo dell'elemento a cui sono stati estesi i figli, per consentire il chaining.
     * @example
     *
     * JDM(`<div class="foo"> FadeOutLeft </div>`, document.body)
     *      .jdm_fadeOutLeft(()=> {console.log('test')}, {duration: 2000, direction: 'alternate', iterations:'Infinity'})
     */
    jdm_fadeOutLeft(callbackFn, option = new AnimationOption()) {
        return _animation.jdm_fadeOutLeft.call(this, callbackFn, option);
    }

    /**
     * Applica un'animazione tipo bounce al nodo (come in animate.css).
     *
     * @param {function(): void} [callbackFn] - Funzione da eseguire al termine dell'animazione.
     * @param {Partial<AnimationOption>} [option=new AnimationOption()] - Opzioni dell'animazione.
     * @returns {Jdm} - Restituisce il nodo dell'elemento a cui sono stati estesi i figli, per consentire il chaining.
     * @example
     * JDM(`<div class="foo"> Bounce </div>`, document.body)
     *      .jdm_bounce(() => console.log('Bounce completato!'), { duration: 1000 });
     */
    jdm_bounce(callbackFn, option = new AnimationOption()) {
        return _animation.jdm_bounce.call(this, callbackFn, option);
        return this.node;
    }

    /**
     * Applica un'animazione tipo tada al nodo (come in animate.css).
     *
     * @param {function(): void} [callbackFn] - Funzione da eseguire al termine dell'animazione.
     * @param {Partial<AnimationOption>} [option=new AnimationOption()] - Opzioni dell'animazione.
     * @returns {Jdm} - Restituisce il nodo dell'elemento a cui sono stati estesi i figli, per consentire il chaining.
     * @example
     * JDM(`<div class="foo"> Tada </div>`, document.body)
     *      .jdm_tada(() => console.log('Tada completato!'), { duration: 1000 });
     */
    jdm_tada(callbackFn, option = new AnimationOption()) {
        return _animation.jdm_tada.call(this, callbackFn, option);
        return this.node;
    }

    /**
     * Applica un'animazione di zoom-in e fade-in al nodo.
     *
     * @param {function(): void} [callbackFn] - Funzione da eseguire al termine dell'animazione.
     * @param {Partial<AnimationOption>} [option=new AnimationOption()] - Opzioni dell'animazione.
     * @returns {Jdm} - Restituisce il nodo dell'elemento a cui sono stati estesi i figli, per consentire il chaining.
     * @example
     * JDM(`<div class="foo"> ZoomIn </div>`, document.body)
     *      .jdm_zoomIn(() => console.log('ZoomIn completato!'), { duration: 1000 });
     */
    jdm_zoomIn(callbackFn, option = new AnimationOption()) {
        return _animation.jdm_zoomIn.call(this, callbackFn, option);
        return this.node;
    }

    /**
     * Applica un'animazione di zoom-out e fade-out al nodo.
     *
     * @param {function(): void} [callbackFn] - Funzione da eseguire al termine dell'animazione.
     * @param {Partial<AnimationOption>} [option=new AnimationOption()] - Opzioni dell'animazione.
     * @returns {Jdm} - Restituisce il nodo dell'elemento a cui sono stati estesi i figli, per consentire il chaining.
     * @example
     * JDM(`<div class="foo"> ZoomOut </div>`, document.body)
     *      .jdm_zoomOut(() => console.log('ZoomOut!'), { duration: 1000 });
     */
    jdm_zoomOut(callbackFn, option = new AnimationOption()) {
        return _animation.jdm_zoomOut.call(this, callbackFn, option);
        return this.node;
    }

    jdm_rotation(callbackFn, deg = 360, option = new AnimationOption()) {
        return _animation.jdm_rotation.call(this, callbackFn, deg, option);
        return this.node;
    }
}

window.JDM = (element = null, parent = null, classList = null, deep = true, ...args) => {
    return new Jdm(element, parent, classList, deep, ...args);
};
window.Jdm = Jdm;
window.customElements.define("jdm-element", Jdm);

export { Jdm };
