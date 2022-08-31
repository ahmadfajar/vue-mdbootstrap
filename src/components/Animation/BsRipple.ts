import {ComponentOptionsMixin, ComputedOptions, defineComponent, EmitsOptions, h, ref} from "vue";
import {booleanProp} from "../../mixins/CommonProps";
import {cssPrefix} from "../../mixins/CommonApi";
import {baseTagProps} from "../Card/mixins/cardProps";
import {useCreateRipple} from "./mixins/rippleApi";
import {IRippleEvent, TBsRipple} from "./types";
import {TRecord} from "../../types";

export default defineComponent<TBsRipple, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsRipple",
    props: {
        ...baseTagProps,
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
    },
    setup(props, {slots}) {
        const touchTimeout = ref<number>();

        return () => {
            return h(props.tag as string, {
                class: `${cssPrefix}ripple`,
                onClickPassive: (event: IRippleEvent) => {
                    !props.disabled && useCreateRipple(event, <boolean>props.centered)
                },
                onTouchstartPassive: (event: IRippleEvent) => {
                    if (!props.disabled) {
                        touchTimeout.value = window.setTimeout(() => {
                            useCreateRipple(event, <boolean>props.centered)
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