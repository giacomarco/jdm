export class _common {
    static debounce(func, timeout = 300) {
        let timer;
        // function (non-arrow) → `this` viene preso dal chiamante runtime (es. event listener context).
        // Era arrow → `this` puntava a _common static class, inutile per i caller.
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, timeout);
        };
    }

    static genEvent(node, name, data, propagateToParents = true) {
        node.dispatchEvent(new CustomEvent(name, { detail: data, bubbles: propagateToParents }));
    }

    static getTag(node) {
        return node.tagName?.toLowerCase();
    }
}
