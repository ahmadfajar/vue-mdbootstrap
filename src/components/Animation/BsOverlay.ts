import {createCommentVNode, defineComponent, h, Transition} from "vue";
import {booleanProp, stringRequiredProp, validStringOrNumberProp} from "../../mixins/CommonProps";
import {cssPrefix} from "../../mixins/CommonApi";
import {preventEventTarget} from "../../mixins/DomHelper";
import Helper from "../../utils/Helper";

export default defineComponent({
    name: "BsOverlay",
    props: {
        /**
         * Overlay base color.
         * @type {string|*}
         */
        color: stringRequiredProp,
        /**
         * Use css position: `fixed` or `absolute`. If `true` then css position fixed will be used.
         * @type {boolean}
         */
        fixed: booleanProp,
        /**
         * Overlay opacity.
         * @type {string|number|*}
         */
        opacity: {
            type: [String, Number],
            default: 0.4,
            validator: (value: string): boolean => !isNaN(parseFloat(value)),
        },
        /**
         * Handler when overlay is clicked.
         * @type {Function|*}
         */
        onClick: {
            type: Function,
            default: undefined
        },
        /**
         * Overlay state, show or hide.
         * @type {boolean}
         */
        show: booleanProp,
        /**
         * Overlay css `z-index`.
         * @type {string|number|*}
         */
        zIndex: validStringOrNumberProp,
    },
    setup(props, {slots}) {
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
                        if (props.onClick && Helper.isFunction(props.onClick)) {
                            props.onClick();
                        }
                    },
                    onTouchmove(event: Event) {
                        preventEventTarget(event);
                    },
                }, slots.default && slots.default())
                : createCommentVNode("v-if", true)
        })
    }
});
