import {defineComponent, EmitsOptions, h, Transition, TransitionProps} from "vue";
import {afterEnter, afterLeave, beforeEnter, beforeLeave, onEnter, onLeave} from "./mixins/expandTransitionApi";

export default defineComponent({
    name: "BsExpandTransition",
    setup(props, {slots}) {
        return () =>
            h<TransitionProps, EmitsOptions>(Transition, {
                    name: 'expand',
                    onBeforeEnter: beforeEnter,
                    onEnter: onEnter,
                    onAfterEnter: afterEnter,
                    onBeforeLeave: beforeLeave,
                    onLeave: onLeave,
                    onAfterLeave: afterLeave,
                },
                slots.default && slots.default()
            )
    }
});