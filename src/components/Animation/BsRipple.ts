import {createCommentVNode, defineComponent, Fragment, h, renderList} from "vue";
import {cssPrefix} from "../../mixins/CommonApi";
import {booleanProp, tagProp} from "../../mixins/CommonProps";
import {useEndRipple, useStartRipple, useTouchMoveCheck, useTouchStartCheck} from "./mixins/rippleApi";
import {IRippleEvent, TRipple, TRippleOptionProps} from "./types";
import BsWave from "./BsWave";
import Helper from "../../utils/Helper";

export default defineComponent({
    name: "BsRipple",
    props: {
        // /**
        //  * Ripple animation state.
        //  * @type {boolean|Event}
        //  */
        // active: {
        //     type: [Boolean, Event],
        //     default: false
        // },
        // /**
        //  * Start animation on mousedown/touch-event.
        //  * @type {boolean}
        //  */
        // eventTrigger: {
        //     type: Boolean,
        //     default: true
        // },
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
    // emits: ["update:active"],
    // watch: {
    //     active(handler: boolean | Event) {
    //         const isBoolean = typeof handler === 'boolean';
    //         const matches = handler?.constructor?.toString()?.match(/function (\w*)/);
    //         const isEvent = matches && matches.length > 0 && (matches[1] as string).toLowerCase() === 'mouseevent';
    //
    //         if (isBoolean && this.centered && handler) {
    //             console.log("ripple-start, handler:boolean:center");
    //             useStartRipple(
    //                 this.$props as TRippleOptionProps,
    //                 this.$data,
    //                 {type: "mousedown"} as IRippleEvent, this.$el,
    //             );
    //         } else if (isEvent) {
    //             console.log("ripple-start, handler:event");
    //             useStartRipple(
    //                 this.$props as TRippleOptionProps,
    //                 this.$data,
    //                 handler as IRippleEvent, this.$el,
    //             );
    //         }
    //         this.$emit("update:active", false);
    //     }
    // },
    data() {
        return {
            ripples: [],
            eventType: null,
            touchTimeout: undefined
        }
    },
    render() {
        return h(this.tag, {
            class: [`${cssPrefix}ripple`, this.disabled ? "ripple-off" : ""],
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
                                class: [this.centered ? `${cssPrefix}centered` : ""],
                                style: ripple.waveStyles,
                            });
                        },
                    )
                )
                : createCommentVNode("v-if", true),
        ]);
    }
});
