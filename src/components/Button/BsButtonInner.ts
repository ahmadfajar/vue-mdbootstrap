import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { defineComponent, h } from 'vue';
import { cssPrefix } from '../../mixins/CommonApi';
import type { TBsButtonInner, TBsRipple, TButtonInnerOptionProps, TRecord } from '../../types';
import { BsRipple } from '../Animation';
import { buttonInnerProps } from './mixins/buttonProps';

export default defineComponent<TBsButtonInner, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsButtonInner',
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
                    'span',
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
