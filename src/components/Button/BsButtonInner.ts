import {defineComponent, h} from "vue";
import {BsRipple} from "../Animation";
import {booleanProp} from "../../mixins/CommonProps";
import {cssPrefix} from "../../mixins/CommonApi";

export default defineComponent({
    name: "BsButtonInner",
    props: {
        dropdownToggle: booleanProp,
        iconMode: booleanProp,
        rippleOff: booleanProp,
    },
    setup(props, {slots}) {
        return () =>
            h(BsRipple, {
                class: {'dropdown-toggle': props.dropdownToggle && !props.iconMode},
                disabled: props.rippleOff,
                tag: "span"
            }, {
                default: () => h(
                    "span",
                    {class: `${cssPrefix}-btn-inner`},
                    slots.default && slots.default(),
                )
            })
    }
});
