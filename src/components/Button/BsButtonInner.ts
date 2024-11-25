import { BsRipple } from '@/components/Animation';
import { buttonInnerProps } from '@/components/Button/mixins/buttonProps.ts';
import { cssPrefix, useRenderSlotDefault } from '@/mixins/CommonApi.ts';
import type { TBsButtonInner, TBsRipple, TButtonInnerOptionProps } from '@/types';
import { defineComponent, h } from 'vue';

export default defineComponent<TBsButtonInner>({
    name: 'BsButtonInner',
    props: buttonInnerProps,
    setup(props, { slots }) {
        const thisProps = props as Readonly<TButtonInnerOptionProps>;

        return () =>
            h<TBsRipple>(
                BsRipple,
                {
                    class: { 'dropdown-toggle': thisProps.dropdownToggle && !thisProps.iconMode },
                    disabled: props.rippleOff,
                    tag: props.tagName,
                },
                {
                    default: () =>
                        useRenderSlotDefault('span', slots, [
                            `${cssPrefix}btn-inner`,
                            thisProps.hasIcon ? 'has-icon' : '',
                        ]),
                }
            );
    },
});
