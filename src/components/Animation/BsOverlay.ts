import {ComponentOptionsMixin, ComputedOptions, createCommentVNode, defineComponent, EmitsOptions, h} from "vue";
import {cssPrefix, useRenderTransition} from "../../mixins/CommonApi";
import {preventEventTarget} from "../../mixins/DomHelper";
import {overlayProps} from "./mixins/overlayProps";
import {TBsOverlay} from "./types";
import {TRecord} from "../../types";

export default defineComponent<TBsOverlay, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsOverlay",
    props: overlayProps,
    emits: ["click"],
    setup(props, {emit, slots}) {
        return () =>
            useRenderTransition(
                {name: "fade"},
                props.show
                    ? h("div", {
                        class: [`${cssPrefix}overlay`],
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
            )
    }
});
