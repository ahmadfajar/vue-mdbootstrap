import {ComponentOptionsMixin, computed, ComputedOptions, defineComponent, EmitsOptions, h} from "vue";
import {useMakeButtonProps, useRenderButtonContent} from "./mixins/buttonApi";
import {buttonProps} from "./mixins/buttonProps";
import {TBsButton} from "./types";
import BsButtonInner from "./BsButtonInner";
import Helper from "../../utils/Helper";

export default defineComponent<TBsButton, unknown, unknown, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsButton",
    props: buttonProps,
    emits: ['click'],
    setup(props, {emit, slots}) {
        const buttonType = computed<string | undefined>(() => {
            if (Helper.isEmpty(props.href)) {
                return props.type;
            }
            return undefined;
        });
        const hasIcon = computed<boolean>((): boolean => {
            return (!Helper.isEmpty(props.icon) || (slots.icon !== undefined));
        });
        const isDisabled = computed<boolean>(() => props.disabled && Helper.isEmpty(props.href));
        const rippleOff = computed<boolean>(() => props.rippleOff && isDisabled.value);
        const tagName = computed<string>(() => !Helper.isEmpty(props.href) ? 'a' : 'button');

        return () => {
            return h(tagName.value, {
                ...useMakeButtonProps(
                    props, isDisabled.value, buttonType.value,
                ),
                onClick: (event: Event): void => emit('click', event),
            }, [
                h(BsButtonInner, {
                    dropdownToggle: props.dropdownToggle,
                    iconMode: props.mode === 'icon',
                    hasIcon: hasIcon.value,
                    rippleOff: rippleOff.value,
                }, {
                    default: () => useRenderButtonContent(slots, props)
                }),
            ]);
        }
    }
});
