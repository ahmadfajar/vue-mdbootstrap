import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions, Prop } from 'vue';
import { computed, defineComponent, h } from 'vue';
import { useGenerateId } from '../../mixins/CommonApi';
import type { TBsButton, TBsButtonInner, TButtonOptionProps, TRecord } from '../../types';
import Helper from '../../utils/Helper';
import BsButtonInner from './BsButtonInner';
import { useMakeButtonProps, useRenderButtonContent } from './mixins/buttonApi';
import { buttonProps } from './mixins/buttonProps';

export default defineComponent<TBsButton, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsButton',
    props: buttonProps,
    setup(props, {slots}) {
        const cmpProps = props as Readonly<TButtonOptionProps>;
        const buttonType = computed<string | undefined>(() => {
            if (Helper.isEmpty(<string | undefined>props.href)) {
                return ['icon', 'floating'].includes(<string>props.mode) ? 'div' : cmpProps.type;
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
            () => (cmpProps.rippleOff === true) || isDisabled.value || (cmpProps.readonly === true)
        );
        const tagName = computed<string>(
            () => (
                !Helper.isEmpty(<string | undefined>props.href)
                    ? 'a'
                    : buttonType.value === 'div' ? 'div' : 'button'
            )
        );
        const iconId = useGenerateId();

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
                    default: () => useRenderButtonContent(slots, cmpProps, iconId)
                }),
            ]);
        }
    }
});
