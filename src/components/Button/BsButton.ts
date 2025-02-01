import BsButtonInner from '@/components/Button/BsButtonInner';
import { useMakeButtonProps, useRenderButtonContent } from '@/components/Button/mixins/buttonApi';
import { buttonProps } from '@/components/Button/mixins/buttonProps';
import type { TBsButton, TBsButtonInner, TButtonOptionProps } from '@/components/Button/types';
import { useGenerateId } from '@/mixins/CommonApi';
import Helper from '@/utils/Helper';
import type { Prop } from 'vue';
import { computed, defineComponent, h } from 'vue';

export default defineComponent<TBsButton>({
    name: 'BsButton',
    props: buttonProps,
    setup(props, { slots }) {
        const thisProps = props as Readonly<TButtonOptionProps>;
        const buttonType = computed<string | undefined>(() => {
            if (Helper.isEmpty(props.href)) {
                return ['icon', 'fab', 'floating'].includes(thisProps.mode as string)
                    ? 'div'
                    : thisProps.type;
            }

            return undefined;
        });
        const hasIcon = computed<boolean>((): boolean => {
            return !Helper.isEmpty(props.icon) || slots.icon != null;
        });
        const isDisabled = computed<boolean>(
            () => thisProps.disabled === true && Helper.isEmpty(props.href)
        );
        const rippleOff = computed<boolean>(
            () => thisProps.rippleOff === true || isDisabled.value || thisProps.readonly === true
        );
        const tagName = computed<string>(() =>
            !Helper.isEmpty(thisProps.href) && !thisProps.disabled && !thisProps.readonly
                ? 'a'
                : buttonType.value === 'div'
                  ? 'div'
                  : 'button'
        );
        const iconId = useGenerateId();

        return () => {
            return h(
                tagName.value,
                {
                    ...useMakeButtonProps(thisProps, isDisabled.value, buttonType.value),
                },
                [
                    h<TBsButtonInner>(
                        BsButtonInner,
                        {
                            class: { 'empty-text': !slots.default && thisProps.dropdownToggle },
                            dropdownToggle: props.dropdownToggle,
                            // @ts-ignore
                            iconMode: (thisProps.mode === 'icon') as Prop<boolean>,
                            // @ts-ignore
                            hasIcon: hasIcon.value as Prop<boolean>,
                            // @ts-ignore
                            rippleOff: rippleOff.value as Prop<boolean>,
                        },
                        {
                            default: () => useRenderButtonContent(slots, thisProps, iconId),
                        }
                    ),
                ]
            );
        };
    },
});
