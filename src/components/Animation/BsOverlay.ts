import {createCommentVNode, defineComponent, h, Transition} from "vue";
import {booleanProp, stringProp, validStringOrFloatProp, validStringOrNumberProp} from "../../mixins/CommonProps";
import {cssPrefix} from "../../mixins/CommonApi";
import {preventEventTarget} from "../../mixins/DomHelper";

export default defineComponent({
    name: "BsOverlay",
    props: {
        /**
         * Overlay base color.
         * @type {string|*}
         */
        color: stringProp,
        /**
         * Sets the css-style `position` value. If `true` then css-style `position` is set to `fixed`.
         * @type {boolean}
         */
        fixed: booleanProp,
        /**
         * Overlay opacity.
         * @type {string|number|*}
         */
        opacity: validStringOrFloatProp,
        /**
         * Overlay state, show or hide.
         * @type {boolean}
         */
        show: booleanProp,
        /**
         * Overlay inline-css `z-index`.
         * @type {string|number|*}
         */
        zIndex: validStringOrNumberProp,
    },
    emits: ["click"],
    setup(props, {emit, slots}) {
        return () => h(Transition, {
            name: "fade",
        }, {
            default: () => props.show
                ? h("div", {
                    class: [`${cssPrefix}-overlay`],
                    style: {
                        'opacity': props.opacity,
                        'background-color': props.color,
                        'position': props.fixed ? 'fixed' : null,
                        'z-index': props.zIndex
                    },
                    onClick() {
                        emit("click");
                    },
                    onTouchmove(event: Event) {
                        preventEventTarget(event);
                    },
                }, slots.default && slots.default())
                : createCommentVNode(" BsOverlay ", true)
        })
    }
});
