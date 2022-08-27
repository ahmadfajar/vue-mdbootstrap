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
    emits: ['click'],
    setup(props, {emit, slots}) {
        const cmpProps = props as Readonly<TButtonOptionProps>;
        const buttonType = computed<string | undefined>(() => {
            if (Helper.isEmpty(props.href)) {
                return cmpProps.type;
            }
            return undefined;
        });
        const hasIcon = computed<boolean>((): boolean => {
            return (!Helper.isEmpty(props.icon) || (slots.icon !== undefined));
        });
        const isDisabled = computed<boolean>(() => (props.disabled as boolean) && Helper.isEmpty(props.href as string));
        const rippleOff = computed<boolean>(() => (props.rippleOff as boolean) && isDisabled.value);
        const tagName = computed<string>(() => !Helper.isEmpty(props.href as string) ? 'a' : 'button');

        return () => {
            return h(tagName.value, {
                ...useMakeButtonProps(
                    cmpProps, isDisabled.value, buttonType.value,
                ),
                onClick: (event: Event): void => emit('click', event),
            }, [
                h<TBsButtonInner>(BsButtonInner, {
                    dropdownToggle: cmpProps.dropdownToggle as Prop<boolean>,
                    iconMode: (cmpProps.mode === 'icon') as Prop<boolean>,
                    hasIcon: hasIcon.value as Prop<boolean>,
                    rippleOff: rippleOff.value as Prop<boolean>,
                }, {
                    default: () => useRenderButtonContent(slots, cmpProps)
                }),
            ]);
        }
    }
});
