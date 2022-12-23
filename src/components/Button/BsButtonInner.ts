import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {defineComponent, h} from "vue";
import {BsRipple} from "../Animation";
import {cssPrefix} from "../../mixins/CommonApi";
import {buttonInnerProps} from "./mixins/buttonProps";
import type {TBsButtonInner, TBsRipple, TButtonInnerOptionProps, TRecord} from "../../types";

export default defineComponent<TBsButtonInner, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsButtonInner",
    props: buttonInnerProps,
    setup(props, {slots}) {
        const cmpProps = props as Readonly<TButtonInnerOptionProps>;

        return () =>
            h<TBsRipple>(BsRipple, {
                class: {'dropdown-toggle': cmpProps.dropdownToggle && !cmpProps.iconMode},
                disabled: props.rippleOff,
                tag: props.tagName,
            }, {
                default: () => h(
                    "span",
                    {
                        class: [
                            `${cssPrefix}btn-inner`,
                            cmpProps.hasIcon ? `${cssPrefix}has-icon` : '',
                        ],
                    },
                    slots.default && slots.default(),
                )
            })
    }
});
