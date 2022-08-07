import {defineComponent, h} from "vue";
import {useRenderCardImg} from "./mixins/cardFunc";
import {booleanProp, cssPrefix, stringProp, tagProp} from "../../mixins/Commons";

export default defineComponent({
    name: "BsCard",
    props: {
        /**
         * Create rectangle card and removes rounded border on its corner.
         * @type {boolean|*}
         */
        flat: booleanProp,
        /**
         * Create card with shadow on its sides.
         * @type {boolean|*}
         */
        shadow: booleanProp,
        /**
         * The image URL for image placed at the top of the card.
         * @type {string|*}
         */
        imgTopSrc: stringProp,
        /**
         * Value for the image `alt` attribute.
         * @type {string|*}
         */
        imgTopAlt: stringProp,
        /**
         * The image URL for image placed at the bottom of the card.
         * @type {string|*}
         */
        imgBottomSrc: stringProp,
        /**
         * Value for the image `alt` attribute.
         * @type {string|*}
         */
        imgBottomAlt: stringProp,
        /**
         * Html tag used to render the card.
         * @type {string|*}
         */
        tag: tagProp,
    },
    setup(props, {slots}) {
        return () => h(
            props.tag, {
                class: {
                    'card': true,
                    'rounded-0': props.flat,
                    [`${cssPrefix}-shadow`]: props.shadow
                }
            }, [
                props.imgTopSrc
                    ? useRenderCardImg(props.imgTopSrc, props.imgTopAlt, "card-img-top")
                    : null,
                slots.default && slots.default(),
                props.imgBottomSrc
                    ? useRenderCardImg(props.imgBottomSrc, props.imgBottomAlt, "card-img-bottom")
                    : null,
            ]
        )
    },
});
