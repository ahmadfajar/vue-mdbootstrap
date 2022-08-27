import {ComponentOptionsMixin, ComputedOptions, defineComponent, EmitsOptions, h} from "vue";
import {BsRipple} from "../Animation";
import {cssPrefix} from "../../mixins/CommonApi";
import {buttonInnerProps} from "./mixins/buttonProps";
import {TBsButtonInner} from "./types";

export default defineComponent<TBsButtonInner, unknown, unknown, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsButtonInner",
    props: buttonInnerProps,
    setup(props, {slots}) {
        return () =>
            h(BsRipple, {
                class: {'dropdown-toggle': props.dropdownToggle && !props.iconMode},
                disabled: props.rippleOff,
                tag: props.tagName
            }, {
                default: () => h(
                    "span",
                    {
                        class: [
                            `${cssPrefix}btn-inner`,
                            props.hasIcon ? `${cssPrefix}has-icon` : '',
                        ],
                    },
                    slots.default && slots.default(),
                )
            })
    }
});
