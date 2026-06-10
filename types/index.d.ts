// Type declarations for jdm_javascript_dom_manipulator (jdm3)
// Backwards-compatible with v2.5.0 API surface.

export interface AnimationOptionShape {
    duration?: number;
    easing?: "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out";
    fill?: "none" | "forwards" | "backwards" | "both" | "auto";
    delay?: number;
    composite?: "replace" | "add" | "accumulate";
    direction?: "normal" | "reverse" | "alternate" | "alternate-reverse";
    iterations?: number | string;
}

export class AnimationOption implements AnimationOptionShape {
    duration: number;
    easing: "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out";
    fill: "none" | "forwards" | "backwards" | "both" | "auto";
    delay: number;
    composite: "replace" | "add" | "accumulate";
    direction: "normal" | "reverse" | "alternate" | "alternate-reverse";
    iterations: number | string;
    constructor(
        duration?: number,
        easing?: AnimationOptionShape["easing"],
        fill?: AnimationOptionShape["fill"],
        delay?: number,
        composite?: AnimationOptionShape["composite"],
        direction?: AnimationOptionShape["direction"],
        iterations?: number | string,
    );
}

export interface EvtOpt {
    jdm_once?: boolean;
    bubbles?: boolean;
    preservePrevEvent?: boolean;
}

export type JdmCallback = (e?: Event) => void;

/** Funzione restituita da jdm_delegate per disiscriversi */
export type JdmUnsubscribe = () => void;

/**
 * Interfaccia dei metodi `jdm_*` che vengono iniettati su ogni nodo creato da JDM.
 * Estende HTMLElement, perché il valore di ritorno del costruttore è il DOM node stesso.
 */
export interface JdmNode<T extends HTMLElement = HTMLElement> extends HTMLElement {
    /** Riferimento child nodes indicizzati per data-name/name (se deep=true) */
    jdm_childNode: Record<string, JdmNode>;

    /** Tempo di debounce di default (typo legacy preservato) */
    defadefaultDebounceTime: number;

    // ── attributi / class
    jdm_setAttribute(attribute: string, value?: string | number | boolean | null): JdmNode<T>;
    jdm_getAttribute(attribute: string): string | null;
    jdm_removeAttribute(attribute: string): JdmNode<T>;
    jdm_addId(id: string): JdmNode<T>;
    jdm_addClassList(classList: string | string[]): JdmNode<T>;
    jdm_removeClassList(classList: string | string[]): JdmNode<T>;
    jdm_toggleClassList(classList: string | string[]): JdmNode<T>;
    jdm_findClassList(classList: string | string[], some?: boolean): boolean;

    // ── DOM insertion
    jdm_append(elementList: HTMLElement | HTMLElement[]): JdmNode<T>;
    jdm_prepend(elementList: HTMLElement | HTMLElement[]): JdmNode<T>;
    jdm_appendBefore(elementList: HTMLElement | HTMLElement[]): JdmNode<T>;
    jdm_appendAfter(elementList: HTMLElement | HTMLElement[]): JdmNode<T>;
    jdm_empty(): JdmNode<T>;
    jdm_destroy(): JdmNode<T>;

    // ── style / inner
    jdm_setStyle(style: string, value: string | number): JdmNode<T>;
    jdm_innerHTML(value: string): JdmNode<T>;
    jdm_extendNode(name: string, object?: unknown): JdmNode<T>;
    jdm_extendChildNode(): JdmNode<T>;

    // ── values
    jdm_setValue(value: unknown, tooBoolean?: boolean): JdmNode<T>;
    jdm_getValue(): unknown;
    /** Variante senza coerce magic */
    jdm_setValueRaw(value: unknown): JdmNode<T>;
    /** Valore raw (FormData per form, boolean per checkbox/radio, string altrimenti) */
    jdm_getValueRaw(): unknown;
    /** Forza numero (input number/range). Ritorna NaN se non parseable */
    jdm_getValueAsNumber(): number;

    // ── validate / submit
    jdm_validate(): JdmNode<T>;
    jdm_submit(): JdmNode<T>;

    // ── data binding
    jdm_binding(el: HTMLElement | HTMLElement[], event?: string, twoWayDataBinding?: boolean): JdmNode<T>;

    // ── events (DOM)
    jdm_addEventListener(name: string, fn?: JdmCallback): JdmNode<T>;
    jdm_removeEventListener(name: string, fn?: JdmCallback): JdmNode<T>;
    jdm_genEvent(name: string, data?: unknown, propagateToParents?: boolean): JdmNode<T>;
    jdm_on(name: string, fn: JdmCallback, opt?: EvtOpt): JdmNode<T>;
    jdm_off(name: string, fn?: JdmCallback, opt?: EvtOpt): JdmNode<T>;

    // ── high-level event helpers
    jdm_onInput(fn?: JdmCallback, opt?: EvtOpt): JdmNode<T>;
    jdm_onChange(fn?: JdmCallback, opt?: EvtOpt): JdmNode<T>;
    jdm_onSelect(fn?: JdmCallback, opt?: EvtOpt): JdmNode<T>;
    jdm_onDebounce(fn?: JdmCallback, timeout?: number, method?: string, opt?: EvtOpt): JdmNode<T>;
    jdm_onClick(fn?: JdmCallback, opt?: EvtOpt): JdmNode<T>;
    jdm_onRightClick(fn?: JdmCallback, opt?: EvtOpt): JdmNode<T>;
    jdm_onDoubleClick(fn?: JdmCallback, opt?: EvtOpt): JdmNode<T>;
    jdm_onInvalid(fn?: JdmCallback, opt?: EvtOpt): JdmNode<T>;
    jdm_onLoad(fn?: JdmCallback, opt?: EvtOpt): JdmNode<T>;
    jdm_onError(fn?: JdmCallback, opt?: EvtOpt): JdmNode<T>;
    jdm_onSubmit(fn?: JdmCallback, opt?: EvtOpt): JdmNode<T>;
    jdm_setDebounceTime(time?: number): JdmNode<T>;

    // ── async helpers (Tier 1 additions)
    jdm_waitFor(eventName: string, opt?: { timeout?: number; signal?: AbortSignal }): Promise<Event>;
    jdm_delegate(eventName: string, selector: string, fn: (e: Event, target: HTMLElement) => void): JdmUnsubscribe;
    jdm_batch(fn: (node: HTMLElement) => void): Promise<HTMLElement>;

    // ── animations
    jdm_animation(keyframe: Keyframe[], callbackFn?: JdmCallback, option?: AnimationOptionShape): JdmNode<T>;
    jdm_clearAnimations(): JdmNode<T>;
    /** Cancella le animazioni senza azzerare transform/opacity inline */
    jdm_cancelAnimations(): JdmNode<T>;
    /** Reset di tutti gli stili inline */
    jdm_resetStyles(): JdmNode<T>;
    jdm_hide(): JdmNode<T>;
    jdm_show(): JdmNode<T>;
    jdm_fadeIn(callbackFn?: JdmCallback, option?: AnimationOptionShape): JdmNode<T>;
    jdm_fadeInDown(callbackFn?: JdmCallback, option?: AnimationOptionShape): JdmNode<T>;
    jdm_fadeInUp(callbackFn?: JdmCallback, option?: AnimationOptionShape): JdmNode<T>;
    jdm_fadeInLeft(callbackFn?: JdmCallback, option?: AnimationOptionShape): JdmNode<T>;
    jdm_fadeInRight(callbackFn?: JdmCallback, option?: AnimationOptionShape): JdmNode<T>;
    jdm_fadeOut(callbackFn?: JdmCallback, option?: AnimationOptionShape): JdmNode<T>;
    jdm_fadeOutDown(callbackFn?: JdmCallback, option?: AnimationOptionShape): JdmNode<T>;
    jdm_fadeOutUp(callbackFn?: JdmCallback, option?: AnimationOptionShape): JdmNode<T>;
    jdm_fadeOutLeft(callbackFn?: JdmCallback, option?: AnimationOptionShape): JdmNode<T>;
    jdm_fadeOutRight(callbackFn?: JdmCallback, option?: AnimationOptionShape): JdmNode<T>;
    jdm_bounce(callbackFn?: JdmCallback, option?: AnimationOptionShape): JdmNode<T>;
    jdm_tada(callbackFn?: JdmCallback, option?: AnimationOptionShape): JdmNode<T>;
    jdm_zoomIn(callbackFn?: JdmCallback, option?: AnimationOptionShape): JdmNode<T>;
    jdm_zoomOut(callbackFn?: JdmCallback, option?: AnimationOptionShape): JdmNode<T>;
    jdm_rotation(callbackFn?: JdmCallback, deg?: number, option?: AnimationOptionShape): JdmNode<T>;
}

export interface JdmPluginCtx {
    Jdm: typeof Jdm;
    _core: unknown;
    _evt: unknown;
    _common: unknown;
    _animation: unknown;
}

export class Jdm extends HTMLElement {
    constructor(
        element?: HTMLElement | string | null,
        parent?: HTMLElement | null,
        classList?: string[] | null,
        deep?: boolean,
        ...args: unknown[]
    );

    node: JdmNode;
    jdm_childNode: Record<string, JdmNode>;
    defadefaultDebounceTime: number;
    tag: string;

    static version: string;
    static on(name: string, fn: (data: unknown) => void): typeof Jdm;
    static off(name: string, fn?: (data: unknown) => void): typeof Jdm;
    static emit(name: string, data?: unknown): typeof Jdm;
    static once(name: string, fn: (data: unknown) => void): typeof Jdm;
    static use(plugin: (ctx: JdmPluginCtx) => void): typeof Jdm;
    static _invalidateMethodCache(): void;
    static inspect(node: HTMLElement | null, depth?: number): void;
}

/** Factory function (preferita rispetto al `new Jdm()`) */
export function JDM<T extends HTMLElement = HTMLElement>(
    element?: HTMLElement | string | null,
    parent?: HTMLElement | null,
    classList?: string[] | null,
    deep?: boolean,
    ...args: unknown[]
): JdmNode<T>;

export const keyframe: Record<string, Keyframe[] | ((deg: number) => Keyframe[])>;

export class _core {}
export class _evt {
    static jdm_on(name: string, fn: (data: unknown) => void, opt?: EvtOpt): typeof _evt;
    static jdm_off(name: string, fn?: (data: unknown) => void): typeof _evt;
    static jdm_emit(name: string, data?: unknown): typeof _evt;
    static jdm_once(name: string, fn: (data: unknown) => void): typeof _evt;
    static jdm_onElement(
        element: HTMLElement,
        name: string,
        fn: (e: Event) => void,
        opt?: EvtOpt,
    ): typeof _evt;
    static jdm_offElement(element: HTMLElement, name: string, fn?: (e: Event) => void): typeof _evt;
    static jdm_onceElement(element: HTMLElement, name: string, fn: (e: Event) => void, opt?: EvtOpt): typeof _evt;
}
export class _common {
    static debounce<T extends (...args: any[]) => any>(func: T, timeout?: number): T;
    static genEvent(node: HTMLElement, name: string, data?: unknown, propagateToParents?: boolean): void;
    static getTag(node: HTMLElement): string | undefined;
}
export class _animation {}
export class Proto {
    constructor();
}

declare global {
    interface String {
        toBoolean(): boolean;
        toCapitalize(): string;
    }
    interface Number {
        toBoolean(): boolean;
    }
    interface Window {
        JDM: typeof JDM;
        Jdm: typeof Jdm;
        evtListener: Record<string, Array<(data: unknown) => void>>;
        evtElementFnList: WeakMap<HTMLElement, Map<string, Array<{ fn: (e: Event) => void; opt: EvtOpt }>>>;
    }
}

declare const _default: typeof Jdm;
export default _default;
