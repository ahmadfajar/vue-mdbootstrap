import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { defineComponent, h } from 'vue';
import { cssPrefix } from '../../mixins/CommonApi';
import type { TBsIconSvg, TBsToggleIcon, TRecord, TToggleIconOptionProps } from '../../types';
import BsIconSvg from './BsIconSvg';
import { toggleIconProps } from './mixins/iconProps';

export default defineComponent<TBsToggleIcon, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsToggleIcon',
    props: toggleIconProps,
    emits: [
        /**
         * Fired when this component's toggle state is updated.
         */
        'update:model-value',
    ],
    setup(props, {emit}) {
        const cmpProps = props as Readonly<TToggleIconOptionProps>;
        return () => h(
            'span', {
                class: [`${cssPrefix}toggle-icon`],
                onClick: () => emit('update:model-value', !cmpProps.modelValue),
            },
            h<TBsIconSvg>(BsIconSvg, {
                icon: (props.modelValue ? props.toggleIcon : props.icon),
                height: props.size,
                width: props.size,
            }),
        )
    }
});
