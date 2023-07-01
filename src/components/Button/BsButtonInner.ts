import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { defineComponent, h } from 'vue';
import { cssPrefix, useRenderSlotDefault } from '../../mixins/CommonApi';
import type { TBsButtonInner, TBsRipple, TButtonInnerOptionProps, TRecord } from '../../types';
import { BsRipple } from '../Animation';
import { buttonInnerProps } from './mixins/buttonProps';

export default defineComponent<TBsButtonInner, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsButtonInner',
    props: buttonInnerProps,
    setup(props, {slots}) {
        const thisProps = props as Readonly<TButtonInnerOptionProps>;

        return () =>
            h<TBsRipple>(BsRipple, {
                class: {'dropdown-toggle': thisProps.dropdownToggle && !thisProps.iconMode},
                disabled: props.rippleOff,
                tag: props.tagName,
            }, {
                default: () => useRenderSlotDefault(
                    'span', slots, [
                        `${cssPrefix}btn-inner`,
                        thisProps.hasIcon ? `${cssPrefix}has-icon` : '',
                    ]
                )
            });
    }
});
