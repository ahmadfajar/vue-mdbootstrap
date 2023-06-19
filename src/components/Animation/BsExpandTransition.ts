import {defineComponent, h, Transition} from "vue";
import {afterEnter, afterLeave, beforeEnter, beforeLeave, onEnter, onLeave} from "./mixins/expandTransitionApi";

export default defineComponent({
    name: "BsExpandTransition",
    setup(props, {slots}) {
        return () =>
            h(Transition, {
                    name: "expand",
                    onBeforeEnter: beforeEnter,
                    onEnter: onEnter,
                    onAfterEnter: afterEnter,
                    onBeforeLeave: beforeLeave,
                    onLeave: onLeave,
                    onAfterLeave: afterLeave,
                }, {
                    default: () => slots.default && slots.default()
                }
            )
    }
});
