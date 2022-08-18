import {defineComponent, h, onBeforeUnmount, ref, watch} from "vue";
import {cssPrefix} from "../../mixins/CommonApi";
import {booleanProp, booleanTrueProp, tagProp} from "../../mixins/CommonProps";
import {useEndRipple, useStartRipple, useTouchMoveCheck, useTouchStartCheck} from "./mixins/rippleApi";
import {TBsRippleOptionProps, TRipple, TRippleEvent} from "./types";
import BsWave from "./BsWave";

export default defineComponent({
    name: "BsRipple",
    props: {
        /**
         * Ripple animation state.
         * @type {boolean|Event|*}
         */
        active: {
            type: [Boolean, Event],
            default: false
        },
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
         * Start animation on mousedown/touch-event.
         * @type {boolean}
         */
        eventTrigger: booleanTrueProp,
        /**
         * Html tag used to render the component.
         * @type {string|*}
         */
        tag: tagProp
    },
    emits: ['update:active'],
    setup(props, {slots, emit}) {
        const thisEl = ref<HTMLElement | null>(null);
        const ripples = ref<Array<TRipple>>([]);
        const touchTimeout = ref<number | null>(null);
        const eventType = ref<string | null>(null);

        watch(
            () => props.active,
            (handler: boolean | Event) => {
                const isBoolean = typeof handler === 'boolean';
                const matches = handler?.constructor?.toString()?.match(/function (\w*)/);
                const isEvent = matches && matches.length > 0 && (matches[1] as string).toLowerCase() === 'mouseevent';

                if (isBoolean && props.centered && handler) {
                    useStartRipple(
                        props as TBsRippleOptionProps,
                        ripples, eventType,
                        {type: 'mousedown'} as TRippleEvent,
                        thisEl.value,
                    );
                } else if (isEvent) {
                    useStartRipple(
                        props as TBsRippleOptionProps,
                        ripples, eventType,
                        handler as TRippleEvent,
                        thisEl.value,
                    );
                }
                emit("update:active", false);
            }
        );

        onBeforeUnmount(() => ripples.value = []);

        return () => h(props.tag, {
            ref: thisEl,
            class: [`${cssPrefix}-ripple`, !props.disabled ? "ripple-off" : ""],
            onMousedownPassive(event: TRippleEvent): void {
                props.eventTrigger &&
                useStartRipple(
                    props as TBsRippleOptionProps,
                    ripples, eventType, event, thisEl.value,
                );
            },
            onMouseleavePassive(): void {
                useEndRipple(ripples);
            },
            onMouseupPassive(): void {
                useEndRipple(ripples);
            },
            onTouchcancelPassive(): void {
                useEndRipple(ripples);
            },
            onTouchendPassive(): void {
                useEndRipple(ripples);
            },
            onTouchmovePassive(): void {
                props.eventTrigger && useTouchMoveCheck(touchTimeout);
            },
            onTouchstartPassive(event: TRippleEvent): void {
                props.eventTrigger &&
                useTouchStartCheck(
                    props as TBsRippleOptionProps,
                    touchTimeout, ripples,
                    eventType, event, thisEl.value,
                );
            },
        }, [
            slots.default && slots.default(),
            !props.disabled
                ? ripples.value.map(ripple => h(BsWave, {
                    key: ripple.uuid,
                    class: [props.centered ? `${cssPrefix}-centered` : ""],
                    style: ripple.waveStyles,
                }))
                : null,
        ])
    }
});
