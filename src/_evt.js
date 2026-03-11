class EvtOpt {
    constructor(jdm_once = false, bubbles = false, preservePrevEvent = false) {
        this.jdm_once = jdm_once;
        this.bubbles = bubbles;
        this.preservePrevEvent = preservePrevEvent;
    }
}

export class _evt {
    constructor() {
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
        window.evtListener[name].forEach(fn => fn(data));
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
        }

        let handlers = listEvent.get(name);
        if (!handlers) {
            handlers = [];
            listEvent.set(name, handlers);
        }

        handlers.push({ fn, opt });
        element.addEventListener(name, fn, opt);

        if (opt.jdm_once) {
            listEvent.delete(name);
            if (listEvent.size === 0) {
                window.evtElementFnList.delete(element);
            }
        }
        return this;
    }

    static jdm_offElement(element, name) {
        const listEvent = window.evtElementFnList.get(element);
        if (!listEvent) return this;

        const handlers = listEvent.get(name);
        if (!handlers) return this;

        // rimuovo TUTTI i listener registrati per quell’evento
        for (const { fn, opt } of handlers) {
            element.removeEventListener(name, fn, opt);
        }
        listEvent.delete(name);

        // se non ci sono più eventi → pulisco l’elemento
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
new _evt();
