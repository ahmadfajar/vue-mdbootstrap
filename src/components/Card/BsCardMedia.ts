import {ComponentOptionsMixin, ComputedOptions, defineComponent, EmitsOptions, h} from "vue";
import {cssPrefix} from "../../mixins/CommonApi";
import {cardMediaProps} from "./mixins/cardProps";
import {TBsCardMedia} from "./types";

export default defineComponent<TBsCardMedia, unknown, unknown, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsCardMedia",
    props: cardMediaProps,
    setup(props, {slots}) {
        return () => h(
            "div", {
                class: [`${cssPrefix}card-media`]
            }, [
                slots.default && slots.default(),
                h("div", {
                    class: {
                        [`${cssPrefix}card-media-overlay`]: true,
                        [`${cssPrefix}overlay-top`]: props.overlayTop,
                        [`${cssPrefix}overlay-bottom`]: !props.overlayTop,
                    },
                    style: {
                        top: props.overlayTop ? 0 : null,
                        bottom: !props.overlayTop ? 0 : null,
                    }
                }, [
                    h("div", {
                            class: [`${cssPrefix}card-media-title`],
                        },
                        props.title,
                    ),
                    props.subtitle
                        ? h("div", {
                                class: [`${cssPrefix}card-media-subtitle`],
                            },
                            props.subtitle,
                        )
                        : null,
                ]),
            ]
        )
    }
});
