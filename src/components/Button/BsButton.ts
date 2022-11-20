import {ComponentOptionsMixin, computed, ComputedOptions, defineComponent, EmitsOptions, h, Prop} from "vue";
import {useMakeButtonProps, useRenderButtonContent} from "./mixins/buttonApi";
import {buttonProps} from "./mixins/buttonProps";
import BsButtonInner from "./BsButtonInner";
import Helper from "../../utils/Helper";
import {TBsButton, TBsButtonInner, TButtonOptionProps, TRecord} from "../../types";

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
            () => (cmpProps.disabled === true) && Helper.isEmpty(<string | undefined>props.href)
        );
        const rippleOff = computed<boolean>(
            () => (cmpProps.rippleOff === true) && isDisabled.value
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
                    // @ts-ignore
                    iconMode: <Prop<boolean>>(cmpProps.mode === 'icon'),
                    // @ts-ignore
                    hasIcon: <Prop<boolean>>hasIcon.value,
                    // @ts-ignore
                    rippleOff: <Prop<boolean>>rippleOff.value,
                }, {
                    default: () => useRenderButtonContent(slots, cmpProps)
                }),
            ]);
        }
    }
});
