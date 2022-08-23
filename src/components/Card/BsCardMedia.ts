import {defineComponent, h} from "vue";
import {cssPrefix} from "../../mixins/CommonApi";
import {booleanProp, stringProp, stringRequiredProp} from "../../mixins/CommonProps";

export default defineComponent({
    name: "BsCardMedia",
    props: {
        /**
         * Text for media title.
         * @type {string|*}
         */
        title: stringRequiredProp,
        /**
         * Text for media subtitle.
         * @type {string|*}
         */
        subtitle: stringProp,
        /**
         * Placed text overlay at the top.
         * @type {boolean|*}
         */
        overlayTop: booleanProp,
    },
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
