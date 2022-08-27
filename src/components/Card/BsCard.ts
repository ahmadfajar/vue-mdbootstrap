import {ComponentOptionsMixin, ComputedOptions, defineComponent, EmitsOptions, h} from "vue";
import {useRenderCardImg} from "./mixins/cardApi";
import {cssPrefix} from "../../mixins/CommonApi";
import {cardProps} from "./mixins/cardProps";
import {TBsCard} from "./types";

export default defineComponent<TBsCard, unknown, unknown, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsCard",
    props: cardProps,
    setup(props, {slots}) {
        return () => h(
            props.tag, {
                class: {
                    'card': true,
                    'rounded-0': props.rounded === false,
                    [`${cssPrefix}shadow`]: props.shadow
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
