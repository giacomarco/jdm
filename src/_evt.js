class EvtOpt {
    constructor(jdm_once = false, bubbles = false, preservePrevEvent = false) {
        this.jdm_once = jdm_once;
        this.bubbles = bubbles;
        this.preservePrevEvent = preservePrevEvent;
    }
}

export class _evt {
    constructor() {
        if (typeof window === "undefined") return;
        window.evtElementFnList = new WeakMap();
        window.evtListener = {};
    }

    // BUS

    static jdm_on(name, fn, opt = {}) {
        opt = { ...new EvtOpt(), ...opt };
        if (!window.evtListener[name]) window.evtListener[name] = [];

        if (opt.jdm_once) {
            const wrapper = data => {
                fn(data);
                _evt.jdm_off(name, wrapper);
            };
            window.evtListener[name].push(wrapper);
        } else {
            window.evtListener[name].push(fn);
        }
        return this;
    }

    static jdm_off(name, fn) {
        if (!window.evtListener[name]) return;
        if (fn) {
            window.evtListener[name] = window.evtListener[name].filter(f => f !== fn);
        } else {
            delete window.evtListener[name];
        }
        return this;
    }

    static jdm_emit(name, data) {
        if (!window.evtListener[name]) return;
        // snapshot: handler-driven off() during emit must not skip subsequent handlers
        [...window.evtListener[name]].forEach(fn => fn(data));
        return this;
    }

    static jdm_once(name, fn) {
        _evt.jdm_on(name, fn, { jdm_once: true });
        return this;
    }

    // ELEMENT

    static jdm_onElement(element, name, fn, opt = {}) {
        opt = { ...new EvtOpt(), ...opt };

        let listEvent = window.evtElementFnList.get(element);
        if (!listEvent) {
            listEvent = new Map();
            window.evtElementFnList.set(element, listEvent);
        }

        // se non voglio preservare i precedenti listener → li rimuovo
        if (opt.preservePrevEvent === false) {
            _evt.jdm_offElement(element, name);
            // re-acquire after potential deletion
            listEvent = window.evtElementFnList.get(element);
            if (!listEvent) {
                listEvent = new Map();
                window.evtElementFnList.set(element, listEvent);
            }
        }

        let handlers = listEvent.get(name);
        if (!handlers) {
            handlers = [];
            listEvent.set(name, handlers);
        }

        let actualFn = fn;
        if (opt.jdm_once) {
            // wrapper auto-removes both DOM listener and internal tracking after first fire
            actualFn = function onceWrapper(e) {
                try {
                    fn(e);
                } finally {
                    element.removeEventListener(name, actualFn, opt);
                    const h = listEvent.get(name);
                    if (h) {
                        const idx = h.findIndex(x => x.fn === actualFn);
                        if (idx >= 0) h.splice(idx, 1);
                        if (h.length === 0) listEvent.delete(name);
                    }
                    if (listEvent.size === 0) {
                        window.evtElementFnList.delete(element);
                    }
                }
            };
        }

        handlers.push({ fn: actualFn, opt });
        element.addEventListener(name, actualFn, opt);

        return this;
    }

    static jdm_offElement(element, name, fn = null) {
        const listEvent = window.evtElementFnList.get(element);
        if (!listEvent) return this;

        const handlers = listEvent.get(name);
        if (!handlers) return this;

        if (fn) {
            // remove only matching handler (native-like)
            const idx = handlers.findIndex(h => h.fn === fn);
            if (idx >= 0) {
                const { opt } = handlers[idx];
                element.removeEventListener(name, fn, opt);
                handlers.splice(idx, 1);
            }
            if (handlers.length === 0) listEvent.delete(name);
        } else {
            // rimuovo TUTTI i listener registrati per quell'evento
            for (const { fn: hfn, opt } of handlers) {
                element.removeEventListener(name, hfn, opt);
            }
            listEvent.delete(name);
        }

        // se non ci sono più eventi → pulisco l'elemento
        if (listEvent.size === 0) {
            window.evtElementFnList.delete(element);
        }
        return this;
    }

    static jdm_onceElement(element, name, fn, opt = {}) {
        _evt.jdm_onElement(element, name, fn, { ...opt, jdm_once: true });
        return this;
    }
}
if (typeof window !== "undefined") {
    new _evt();
}
