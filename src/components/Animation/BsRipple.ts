import {createCommentVNode, defineComponent, Fragment, h, renderList} from "vue";
import {cssPrefix} from "../../mixins/CommonApi";
import {booleanProp, tagProp} from "../../mixins/CommonProps";
import {useEndRipple, useStartRipple, useTouchMoveCheck, useTouchStartCheck} from "./mixins/rippleApi";
import {TRippleOptionProps, TRipple, IRippleEvent} from "./types";
import BsWave from "./BsWave";
import Helper from "../../utils/Helper";

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
         * @type {string|*}
         */
        tag: tagProp
    },
    /*
        emits: ["update:active"],
        watch: {
            active(handler: boolean | Event) {
                const isBoolean = typeof handler === 'boolean';
                const matches = handler?.constructor?.toString()?.match(/function (\w*)/);
                const isEvent = matches && matches.length > 0 && (matches[1] as string).toLowerCase() === 'mouseevent';

                if (isBoolean && this.centered && handler) {
                    console.log("ripple-start, handler:boolean:center");
                    useStartRipple(
                        this.$props as TBsRippleOptionProps,
                        this.$data,
                        {type: "mousedown"} as TRippleEvent, this.$el,
                    );
                } else if (isEvent) {
                    console.log("ripple-start, handler:event");
                    useStartRipple(
                        this.$props as TBsRippleOptionProps,
                        this.$data,
                        handler as TRippleEvent, this.$el,
                    );
                }
                this.$emit("update:active", false);
            }
        },
    */
    data() {
        return {
            ripples: [],
            eventType: null,
            touchTimeout: undefined
        }
    },
    render() {
        return h(this.tag, {
            class: [`${cssPrefix}-ripple`, this.disabled ? "ripple-off" : ""],
            onMousedownPassive: (event: IRippleEvent) =>
                useStartRipple(
                    this.$props as TRippleOptionProps,
                    this.$data, event, this.$el,
                ),
            onMouseleavePassive: () => useEndRipple(this.$data),
            onMouseupPassive: () => useEndRipple(this.$data),
            onTouchcancelPassive: () => useEndRipple(this.$data),
            onTouchendPassive: () => useEndRipple(this.$data),
            onTouchmovePassive: () => useTouchMoveCheck(this.$data),
            onTouchstartPassive: (event: IRippleEvent) =>
                useTouchStartCheck(
                    this.$props as TRippleOptionProps,
                    this.$data, event, this.$el,
                )
        }, [
            this.$slots.default && this.$slots.default(),
            (!this.disabled)
                ? h(
                    Fragment,
                    {key: Helper.uuid(true)},
                    renderList(
                        this.ripples,
                        (ripple: TRipple) => {
                            return h(BsWave, {
                                key: ripple.uuid,
                                class: [this.centered ? `${cssPrefix}-centered` : ""],
                                style: ripple.waveStyles,
                            });
                        },
                    )
                )
                : createCommentVNode("v-if", true),
        ]);
    }
});
