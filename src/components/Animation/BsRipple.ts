import {defineComponent, h, ref} from "vue";
import {booleanProp, tagProp} from "../../mixins/CommonProps";
import {cssPrefix} from "../../mixins/CommonApi";
import {useCreateRipple} from "./mixins/rippleApi";
import {IRippleEvent} from "./types";

export default defineComponent({
    name: "BsRipple",
    props: {
        /**
         * Start animation from center or from mouse click position.
         * If true then animation always start from center, otherwise animation
         * will start from mouse click position.
         * @type {boolean}
         */
        centered: booleanProp,
        /**
         * Enable or disable ripple animation.
         * @type {boolean}
         */
        disabled: booleanProp,
        /**
         * Html tag used to render the component.
         * @type {string}
         */
        tag: tagProp
    },
    setup(props, {slots}) {
        const touchTimeout = ref<number>();

        return () => {
            return h(props.tag, {
                class: `${cssPrefix}ripple`,
                onMousedownPassive: (event: IRippleEvent) => {
                    !props.disabled && useCreateRipple(event, props.centered)
                },
                onTouchstartPassive: (event: IRippleEvent) => {
                    if (!props.disabled) {
                        touchTimeout.value = window.setTimeout(() => {
                            useCreateRipple(event, props.centered)
                        }, 100);
                    }
                },
                onTouchmovePassive: () => {
                    window.clearTimeout(touchTimeout.value);
                }
            }, slots.default && slots.default())
        }
    }
});
