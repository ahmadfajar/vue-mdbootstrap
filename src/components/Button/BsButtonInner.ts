import {ComponentOptionsMixin, ComputedOptions, defineComponent, EmitsOptions, h, Prop} from "vue";
import {BsRipple} from "../Animation";
import {cssPrefix} from "../../mixins/CommonApi";
import {buttonInnerProps} from "./mixins/buttonProps";
import {TBsButtonInner, TButtonInnerOptionProps} from "./types";
import {TBsRipple} from "../Animation/types";
import {TRecord} from "../../types";

export default defineComponent<TBsButtonInner, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsButtonInner",
    props: buttonInnerProps,
    setup(props, {slots}) {
        const cmpProps = props as Readonly<TButtonInnerOptionProps>;

        return () =>
            h<TBsRipple>(BsRipple, {
                class: {'dropdown-toggle': cmpProps.dropdownToggle && !cmpProps.iconMode},
                disabled: <Prop<boolean>>cmpProps.rippleOff,
                tag: <Prop<string>>cmpProps.tagName,
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
