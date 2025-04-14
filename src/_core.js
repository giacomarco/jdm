import { _common } from "./_common.js";

export class _core {
    /** @this {Jdm} */
    static jdm_append(elementList) {
        if (Array.isArray(elementList)) {
            for (const element of elementList) {
                this.node.appendChild(element);
            }
        } else if (elementList) {
            this.node.appendChild(elementList);
        }
        return this.node;
    }

    /** @this {Jdm} */
    static jdm_prepend(elementList) {
        const firstChild = this.node.firstElementChild;

        if (Array.isArray(elementList)) {
            for (const element of elementList) {
                this.node.prepend(element);
            }
        } else if (elementList) {
            this.node.prepend(elementList);
        }
        return this.node;
    }

    /** @this {Jdm} */
    static jdm_setAttribute(attribute, value = null) {
        this.node.setAttribute(attribute, value);
        this.jdm_genEvent("setAttribute", { attribute: attribute, value: value });
        return this.node;
    }

    /** @this {Jdm} */
    static jdm_getAttribute(attribute) {
        return this.node.getAttribute(attribute);
    }

    /** @this {Jdm} */
    static jdm_removeAttribute(attribute) {
        this.node.removeAttribute(attribute);
        this.jdm_genEvent("removeAttribute", { attribute: attribute });
        return this.node;
    }

    /** @this {Jdm} */
    static jdm_addId(id) {
        this.node.setAttribute("id", id);
        return this.node;
    }

    /** @this {Jdm} */
    static jdm_addClassList(classList) {
        if (Array.isArray(classList)) {
            for (const cls of classList) {
                this.node.classList.add(cls);
            }
        } else if (classList) {
            this.node.classList.add(classList);
        }
        return this.node;
    }

    /** @this {Jdm} */
    static jdm_removeClassList(classList) {
        if (Array.isArray(classList)) {
            for (const cls of classList) {
                this.node.classList.remove(cls);
            }
        } else if (classList) {
            this.node.classList.remove(classList);
        }
        return this.node;
    }

    /** @this {Jdm} */
    static jdm_toggleClassList(classList) {
        if (Array.isArray(classList)) {
            for (const cls of classList) {
                this.node.classList.toggle(cls);
            }
        } else if (classList) {
            this.node.classList.toggle(classList);
        }
        return this.node;
    }

    /** @this {Jdm} */
    static jdm_empty() {
        if (this.tag === "input" && (this.node.element === "checkbox" || this.node.element === "radio")) {
            this.node.checked = false;
        } else if (this.tag === "input" || this.tag === "textarea") {
            this.node.value = null;
        } else if (this.tag === "form") {
            this.node.reset();
        } else {
            this.node.innerHTML = "";
        }
        return this.node;
    }

    /** @this {Jdm} */
    static jdm_destroy() {
        this.node.remove();
        this.jdm_genEvent("destroy");
        return this.node;
    }

    /** @this {Jdm} */
    static jdm_validate() {
        const validity = this.node.checkValidity();
        this.jdm_genEvent("validate", validity);
        return this.node;
    }

    /** @this {Jdm} */
    static jdm_validate() {
        const validity = this.node.checkValidity();
        this.jdm_genEvent("validate", validity);
        return this.node;
    }

    /** @this {Jdm} */
    static jdm_setStyle(style, value) {
        this.node.style[style] = value;
        return this.node;
    }

    /** @this {Jdm} */
    static jdm_extendNode(name, object = null) {
        this.node[name] = object;
        return this.node;
    }

    /** @this {Jdm} */
    static jdm_innerHTML(value) {
        this.node.innerHTML = value;
        return this.node;
    }

    /** @this {Jdm} */
    static jdm_binding(el, event = "input", twoWayDataBinding = true) {
        let elementList = [];

        if (Array.isArray(el)) {
            elementList = elementList.concat(el);
        } else {
            elementList.push(el);
        }

        for (const element of elementList) {
            if (
                element.tagName.toLowerCase() === "input" ||
                element.tagName.toLowerCase() === "select" ||
                element.tagName.toLowerCase() === "textarea"
            ) {
                this.node.addEventListener(event, () => {
                    element.jdm_setValue(this.jdm_getValue());
                });
            } else {
                this.node.addEventListener(event, () => {
                    element.jdm_innerHTML(this.jdm_getValue());
                });
            }

            if (twoWayDataBinding) {
                const elementListTmp = elementList.filter(elementTmp => elementTmp !== element);
                elementListTmp.push(this.node);
                for (const elementTmp of elementListTmp) {
                    element.jdm_binding(elementListTmp, event, false);
                }
            }
        }

        return this.node;
    }

    /** @this {Jdm} */
    static jdm_onInput(fn = () => {}) {
        this.node.addEventListener("input", fn);
        return this.node;
    }

    /** @this {Jdm} */
    static jdm_onChange(fn = () => {}) {
        this.node.addEventListener("change", fn);
        return this.node;
    }

    /** @this {Jdm} */
    static jdm_onSelect(fn = () => {}) {
        this.node.addEventListener("select", fn);
        return this.node;
    }

    /** @this {Jdm} */
    static jdm_onDebounce(fn = () => {}, timeout = 300, method = "input") {
        this.node.addEventListener(method, _common.debounce(fn, timeout));
        return this.node;
    }

    /** @this {Jdm} */
    static jdm_onClick(fn = () => {}) {
        this.node.addEventListener("click", fn);

        return this.node;
    }

    /** @this {Jdm} */
    static jdm_onRightClick(fn = () => {}) {
        this.node.addEventListener("contextmenu", fn);
        return this.node;
    }

    /** @this {Jdm} */
    static jdm_onDoubleClick(fn = () => {}) {
        this.node.addEventListener("dblclick", fn);
        return this.node;
    }

    /** @this {Jdm} */
    static jdm_onInvalid(fn = () => {}) {
        this.node.addEventListener("invalid", fn);
        return this.node;
    }

    /** @this {Jdm} */
    static jdm_onLoad(fn = () => {}) {
        this.node.addEventListener("load", fn);
        return this.node;
    }

    /** @this {Jdm} */
    static jdm_onError(fn = () => {}) {
        this.node.addEventListener("error", fn);
        return this.node;
    }

    /** @this {Jdm} */
    static jdm_onSubmit(fn = e => {}) {
        this.node.addEventListener("submit", fn);
        return this.node;
    }

    /** @this {Jdm} */
    static jdm_setValue(value, tooBoolean = true) {
        if (tooBoolean) {
            try {
                value = value.toBoolean();
            } catch (e) {
                value = value;
            }
        }

        if (this.node.type === "checkbox" || this.node.type === "radio") {
            this.node.checked = value;
        } else if (this.tag === "form") {
            const setValue = (el, value) => {
                if (el.type === "checkbox" || el.type === "radio") {
                    el.checked = value;
                } else {
                    el.value = value;
                }
            };

            const findElement = (form, name) => {
                return form.querySelectorAll(`[name="${name}"]`);
            };

            const populateForm = (form, data, prefix = "") => {
                for (const key in data) {
                    const value = data[key];
                    const name = prefix ? `${prefix}[${key}]` : key;
                    const elementList = findElement(form, Array.isArray(value) ? `${name}[]` : name);
                    if (elementList?.length > 0) {
                        for (const element of elementList) {
                            if (Array.isArray(value)) {
                                const checkboxes = form.querySelectorAll(`[name="${name}[]"]`);
                                checkboxes.forEach(checkbox => {
                                    setValue(checkbox, value.includes(checkbox.value));
                                });
                            } else if (typeof value === "object") {
                                populateForm(form, value, name);
                            } else {
                                setValue(element, value);
                            }
                        }
                    } else if (typeof value === "object") {
                        populateForm(form, value, name);
                    }
                }
            };
            populateForm(this.node, value);
        } else {
            if (this.node.jdm_getAttribute("type") === "number" || this.node.jdm_getAttribute("type") === "range") {
                this.node.value = value * 1;
            } else {
                this.node.value = value;
            }
        }

        return this.node;
    }

    /** @this {Jdm} */
    static jdm_getValue() {
        if (this.tag === "input" && (this.node.type === "checkbox" || this.node.type === "radio")) {
            return this.node.checked;
        } else if (this.tag === "form") {
            const formData = new FormData(this.node);
            const json = {};

            for (let [key, value] of formData.entries()) {
                value = value === "" ? null : value;
                value = value === "null" ? null : value;
                let currentObj = json;
                const keys = key.split(/\[|\]\[|\]/).filter(Boolean);
                const lastKey = keys.pop();

                for (let i = 0; i < keys.length; i++) {
                    const currentKey = keys[i];
                    if (!currentObj[currentKey]) {
                        currentObj[currentKey] = isNaN(keys[i + 1]) ? {} : [];
                    }
                    currentObj = currentObj[currentKey];
                }

                if (lastKey === "") {
                    if (!currentObj.length) {
                        currentObj.length = 0;
                    }
                    currentObj[currentObj.length++] = value;
                } else if (Array.isArray(currentObj[lastKey])) {
                    currentObj[lastKey].push(value);
                } else if (currentObj[lastKey]) {
                    currentObj[lastKey] = [currentObj[lastKey], value];
                } else {
                    if (key.endsWith("[]")) {
                        if (value) {
                            currentObj[lastKey] = new Array();
                            currentObj[lastKey].push(value);
                        }
                    } else {
                        currentObj[lastKey] = value;
                    }
                }
            }
            return json;
        } else if (this.tag === "select") {
            return this.node.value;
        } else {
            return this.node.value;
        }
    }

    /** @this {Jdm} */
    static jdm_genEvent(name, data = null, propagateToParents = true) {
        _common.genEvent(this.node, name, data, propagateToParents);
        return this.node;
    }

    /** @this {Jdm} */
    static jdm_addEventListener(name, fn = () => {}) {
        this.node.addEventListener(name, fn);
        return this.node;
    }

    /** @this {Jdm} */
    static jdm_removeEventListener(name, fn = () => {}) {
        this.node.removeEventListener(name, fn);
        return this.node;
    }

    /** @this {Jdm} */
    static jdm_extendChildNode() {
        if (this.node?.jdm_childNode && Object.entries(this.node.jdm_childNode).length > 0) {
            for (const [key, value] of Object.entries(this.node.jdm_childNode)) {
                this.node.jdm_extendNode(key, value);
            }
        }

        return this.node;
    }
}
