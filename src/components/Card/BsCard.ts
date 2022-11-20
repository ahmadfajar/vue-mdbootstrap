import {ComponentOptionsMixin, ComputedOptions, defineComponent, EmitsOptions, h} from "vue";
import {useRenderCardImg} from "./mixins/cardApi";
import {cssPrefix} from "../../mixins/CommonApi";
import {cardProps} from "./mixins/cardProps";
import {TBsCard, TCardOptionProps, TRecord} from "../../types";

export default defineComponent<TBsCard, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsCard",
    props: cardProps,
    setup(props, {slots}) {
        const cmpProps = props as Readonly<TCardOptionProps>;
        return () => h(
            cmpProps.tag || "div", {
                class: {
                    'card': true,
                    'rounded-0': cmpProps.rounded === false,
                    [`${cssPrefix}shadow`]: props.shadow
                }
            }, [
                cmpProps.imgTopSrc
                    ? useRenderCardImg(cmpProps.imgTopSrc, cmpProps.imgTopAlt, "card-img-top")
                    : null,
                slots.default && slots.default(),
                cmpProps.imgBottomSrc
                    ? useRenderCardImg(cmpProps.imgBottomSrc, cmpProps.imgBottomAlt, "card-img-bottom")
                    : null,
            ]
        )
    },
});
