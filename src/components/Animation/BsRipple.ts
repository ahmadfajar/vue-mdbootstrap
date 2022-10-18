import {ComponentOptionsMixin, ComputedOptions, defineComponent, EmitsOptions, h, ref, watch} from "vue";
import {booleanProp} from "../../mixins/CommonProps";
import {cssPrefix, useGenerateId} from "../../mixins/CommonApi";
import {baseTagProps} from "../Card/mixins/cardProps";
import {useCreateRipple} from "./mixins/rippleApi";
import {IRippleEvent, TBsRipple, TRecord} from "../../types";
import Helper from "../../utils/Helper";

export default defineComponent<TBsRipple, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsRipple",
    props: {
        ...baseTagProps,
        /**
         * Ripple animation state.
         * @type {boolean}
         */
        active: booleanProp,
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
    emits: [
        /**
         * Fired when this component's animation state is updated.
         */
        "update:active",
    ],
    setup(props, {emit, slots}) {
        const cmpId = useGenerateId();
        const touchTimeout = ref<number>();
        const startRipple = (event: IRippleEvent): void => {
            emit('update:active', true);
            useCreateRipple(event, <boolean>props.centered);
            Helper.defer(() => {
                emit('update:active', false);
            }, 100);
        }

        watch(
            () => props.active,
            (value) => {
                if (value && !props.disabled) {
                    const event = {target: document.getElementById(cmpId)} as IRippleEvent;
                    useCreateRipple(event, <boolean>props.centered);
                    Helper.defer(() => {
                        emit('update:active', false);
                    }, 100);
                }
            }
        )

        return () => {
            return h(props.tag as string, {
                id: cmpId,
                class: `${cssPrefix}ripple`,
                onClickPassive: (event: IRippleEvent) => {
                    !props.disabled && startRipple(event);
                },
                onTouchstartPassive: (event: IRippleEvent) => {
                    if (!props.disabled) {
                        touchTimeout.value = window.setTimeout(() => {
                            startRipple(event);
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
