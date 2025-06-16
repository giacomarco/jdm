/**
 * Opzioni per l'animazione.
 */
export class AnimationOption {
    /**
     * @param {number} duration - Durata dell'animazione in millisecondi.
     * @default 250
     *
     * @param {'linear'|'ease'|'ease-in'|'ease-out'|'ease-in-out'} easing - Funzione di easing dell'animazione.
     * @default 'easeInOut'
     *
     * @param {'none'|'forwards'|'backwards'|'both'|'auto'} fill - Stile applicato fuori dall'intervallo dell'animazione.
     * @default 'forwards'
     *
     * @param {number} delay - Ritardo dell'inizio dell'animazione in millisecondi.
     * @default 0
     *
     * @param {'replace'|'add'|'accumulate'} composite - Modalità di composizione dell’animazione.
     * @default 'replace'
     *
     * @param {'normal'|'reverse'|'alternate'|'alternate-reverse'} direction - Direzione di riproduzione dell'animazione.
     * @default 'normal'
     *
     * @param {number|string} iterations - Numero di volte che l'animazione verrà ripetuta.
     * @default 1
     */
    constructor(duration = 250, easing = "ease-in-out", fill = "forwards", delay = 0, composite = "replace", direction = "normal", iterations = 1) {
        this.duration = duration;
        this.easing = easing;
        this.fill = fill;
        this.delay = delay;
        this.composite = composite;
        this.direction = direction;
        this.iterations = iterations;
    }
}

export const keyframe = {
    fadeIn: [{ opacity: 0 }, { opacity: 1 }],
    fadeInDown: [
        { opacity: 0, transform: "translate3d(0, -100%, 0)" },
        { opacity: 1, transform: "translate3d(0, 0, 0)" },
    ],
    fadeInUp: [
        { opacity: 0, transform: "translate3d(0, 100%, 0)" },
        { opacity: 1, transform: "translate3d(0, 0, 0)" },
    ],
    fadeInLeft: [
        { opacity: 0, transform: "translate3d(-100%, 0, 0)" },
        { opacity: 1, transform: "translate3d(0, 0, 0)" },
    ],
    fadeInRight: [
        { opacity: 0, transform: "translate3d(100%, 0, 0)" },
        { opacity: 1, transform: "translate3d(0, 0, 0)" },
    ],
    fadeOut: [{ opacity: 1 }, { opacity: 0 }],
    fadeOutDown: [
        { opacity: 1, transform: "translate3d(0, 0, 0)" },
        { opacity: 0, transform: "translate3d(0, 100%, 0)" },
    ],
    fadeOutUp: [
        { opacity: 1, transform: "translate3d(0, 0, 0)" },
        { opacity: 0, transform: "translate3d(0, -100%, 0)" },
    ],
    fadeOutLeft: [
        { opacity: 1, transform: "translate3d(0, 0, 0)" },
        { opacity: 0, transform: "translate3d(-100%, 0, 0)" },
    ],
    fadeOutRight: [
        { opacity: 1, transform: "translate3d(0, 0, 0)" },
        { opacity: 0, transform: "translate3d(100%, 0, 0)" },
    ],
    bounce: [
        { transform: "translateY(0)", easing: "ease" },
        { transform: "translateY(-30px)", easing: "ease-in" },
        { transform: "translateY(15px)", easing: "ease-out" },
        { transform: "translateY(-10px)", easing: "ease-in-out" },
        { transform: "translateY(0)", easing: "ease-out" },
    ],
    tada: [
        {
            transform: "scale(1) rotate(0) translateX(0)",
            transformOrigin: "center center",
            easing: "ease",
        },
        {
            transform: "scale(1.1) rotate(-3deg) translateX(-0.1%)",
            transformOrigin: "center center",
            easing: "ease-in-out",
        },
        {
            transform: "scale(1.1) rotate(3deg) translateX(-0.1%)",
            transformOrigin: "center center",
            easing: "ease-in-out",
        },
        {
            transform: "scale(1.1) rotate(-3deg) translateX(-0.1%)",
            transformOrigin: "center center",
            easing: "ease-in-out",
        },
        {
            transform: "scale(1.1) rotate(3deg) translateX(-0.1%)",
            transformOrigin: "center center",
            easing: "ease-in-out",
        },
        {
            transform: "scale(1) rotate(0) translateX(0)",
            transformOrigin: "center center",
            easing: "ease-out",
        },
    ],
    zoomIn: [
        {
            transform: "scale(0)",
            opacity: 0,
            transformOrigin: "center center",
            easing: "ease",
        },
        {
            transform: "scale(1)",
            opacity: 1,
            transformOrigin: "center center",
            easing: "ease-out",
        },
    ],
    zoomOut: [
        {
            transform: "scale(1)",
            opacity: 1,
            transformOrigin: "center center",
            easing: "ease-out",
        },
        {
            transform: "scale(0)",
            opacity: 0,
            transformOrigin: "center center",
            easing: "ease",
        },
    ],
    rotation: deg => [
        {
            transform: `rotate(${deg}deg)`,
            transformOrigin: "center center",
            easing: "linear",
        },
    ],
};

export class _animation {
    /** @this {Jdm} */
    static #animate(keyframe, option, callbackFn) {
        option = { ...new AnimationOption(), ...option };
        const animation = this.node.animate(keyframe, option);
        animation.onfinish = () => {
            if (typeof callbackFn === "function") {
                callbackFn();
            }
        };
        return animation;
    }

    /** @this {Jdm} */
    static jdm_clearAnimations() {
        if (typeof this.node.getAnimations === "function") {
            this.node.getAnimations().forEach(animation => animation.cancel());
        }

        this.node.style.animation = "none";
        this.node.style.transition = "none";
        this.node.style.transform = "";
        this.node.style.opacity = "";
        return this.node;
    }

    /** @this {Jdm} */
    static jdm_animation(keyframe, callbackFn, option = new AnimationOption()) {
        _animation.#animate.apply(this, [keyframe, option, callbackFn]);
        return this.node;
    }

    /** @this {Jdm} */
    static jdm_hide() {
        this.jdm_setStyle("visibility", "hide");
        this.jdm_setStyle("opacity", 0);
        return this.node;
    }

    /** @this {Jdm} */
    static jdm_show() {
        this.jdm_setStyle("visibility", "visible");
        this.jdm_setStyle("opacity", 1);
        return this.node;
    }

    /** @this {Jdm} */
    static jdm_fadeIn(callbackFn, option = new AnimationOption()) {
        return _animation.jdm_animation.apply(this, [keyframe.fadeIn, callbackFn, option]);
    }

    /** @this {Jdm} */
    static jdm_fadeInDown(callbackFn, option = new AnimationOption()) {
        return _animation.jdm_animation.apply(this, [keyframe.fadeInDown, callbackFn, option]);
    }

    /** @this {Jdm} */
    static jdm_fadeInUp(callbackFn, option = new AnimationOption()) {
        return _animation.jdm_animation.apply(this, [keyframe.fadeInUp, callbackFn, option]);
    }

    /** @this {Jdm} */
    static jdm_fadeInLeft(callbackFn, option = new AnimationOption()) {
        return _animation.jdm_animation.apply(this, [keyframe.fadeInLeft, callbackFn, option]);
    }

    /** @this {Jdm} */
    static jdm_fadeInRight(callbackFn, option = new AnimationOption()) {
        return _animation.jdm_animation.apply(this, [keyframe.fadeInRight, callbackFn, option]);
    }

    /** @this {Jdm} */
    static jdm_fadeOut(callbackFn, option = new AnimationOption()) {
        return _animation.jdm_animation.apply(this, [keyframe.fadeOut, callbackFn, option]);
    }

    /** @this {Jdm} */
    static jdm_fadeOutDown(callbackFn, option = new AnimationOption()) {
        return _animation.jdm_animation.apply(this, [keyframe.fadeOutDown, callbackFn, option]);
    }

    /** @this {Jdm} */
    static jdm_fadeOutUp(callbackFn, option = new AnimationOption()) {
        return _animation.jdm_animation.apply(this, [keyframe.fadeOutUp, callbackFn, option]);
    }

    /** @this {Jdm} */
    static jdm_fadeOutLeft(callbackFn, option = new AnimationOption()) {
        return _animation.jdm_animation.apply(this, [keyframe.fadeOutLeft, callbackFn, option]);
    }

    /** @this {Jdm} */
    static jdm_fadeOutRight(callbackFn, option = new AnimationOption()) {
        return _animation.jdm_animation.apply(this, [keyframe.fadeOutRight, callbackFn, option]);
    }

    /** @this {Jdm} */
    static jdm_bounce(callbackFn, option = new AnimationOption()) {
        return _animation.jdm_animation.apply(this, [keyframe.bounce, callbackFn, option]);
    }

    /** @this {Jdm} */
    static jdm_tada(callbackFn, option = new AnimationOption()) {
        return _animation.jdm_animation.apply(this, [keyframe.tada, callbackFn, option]);
    }

    /** @this {Jdm} */
    static jdm_zoomIn(callbackFn, option = new AnimationOption()) {
        return _animation.jdm_animation.apply(this, [keyframe.zoomIn, callbackFn, option]);
    }

    /** @this {Jdm} */
    static jdm_zoomOut(callbackFn, option = new AnimationOption()) {
        return _animation.jdm_animation.apply(this, [keyframe.zoomOut, callbackFn, option]);
    }

    /** @this {Jdm} */
    static jdm_rotation(callbackFn, deg = 360, option = new AnimationOption()) {
        return _animation.jdm_animation.apply(this, [keyframe.rotation(deg), callbackFn, option]);
    }
}
