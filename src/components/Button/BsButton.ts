import {ComponentOptionsMixin, computed, ComputedOptions, defineComponent, EmitsOptions, h, Prop} from "vue";
import {useMakeButtonProps, useRenderButtonContent} from "./mixins/buttonApi";
import {buttonProps} from "./mixins/buttonProps";
import {TBsButton, TBsButtonInner, TButtonOptionProps} from "./types";
import {TRecord} from "../../types";
import BsButtonInner from "./BsButtonInner";
import Helper from "../../utils/Helper";

export default defineComponent<TBsButton, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsButton",
    props: buttonProps,
    setup(props, {slots}) {
        const cmpProps = props as Readonly<TButtonOptionProps>;
        const buttonType = computed<string | undefined>(() => {
            if (Helper.isEmpty(<string | undefined>props.href)) {
                return ["icon", "floating"].includes(<string>props.mode) ? 'div' : cmpProps.type;
            }

            return undefined;
        });
        const hasIcon = computed<boolean>((): boolean => {
            return (!Helper.isEmpty(props.icon) || (slots.icon !== undefined));
        });
        const isDisabled = computed<boolean>(
            () => (<boolean>props.disabled) && Helper.isEmpty(<string | undefined>props.href)
        );
        const rippleOff = computed<boolean>(
            () => (<boolean>props.rippleOff) && isDisabled.value
        );
        const tagName = computed<string>(
            () => (
                !Helper.isEmpty(<string | undefined>props.href)
                    ? 'a'
                    : buttonType.value === 'div' ? 'div' : 'button'
            )
        );

        return () => {
            return h(tagName.value, {
                ...useMakeButtonProps(
                    cmpProps, isDisabled.value, buttonType.value,
                ),
            }, [
                h<TBsButtonInner>(BsButtonInner, {
                    dropdownToggle: props.dropdownToggle,
                    iconMode: <Prop<boolean>>(cmpProps.mode === 'icon'),
                    hasIcon: <Prop<boolean>>hasIcon.value,
                    rippleOff: <Prop<boolean>>rippleOff.value,
                }, {
                    default: () => useRenderButtonContent(slots, cmpProps)
                }),
            ]);
        }
    }
});
