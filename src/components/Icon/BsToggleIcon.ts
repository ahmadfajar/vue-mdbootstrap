import { defineComponent, h } from 'vue';
import { cssPrefix } from '../../mixins/CommonApi';
import BsIconSvg from './BsIconSvg';
import { toggleIconProps } from './mixins/iconProps';
import type { TBsIconSvg, TBsToggleIcon, TToggleIconOptionProps } from './types';

export default defineComponent<TBsToggleIcon>({
    name: 'BsToggleIcon',
    props: toggleIconProps,
    emits: [
        /**
         * Fired when this component's toggle state is updated.
         */
        'update:model-value',
    ],
    setup(props, { emit }) {
        const thisProps = props as Readonly<TToggleIconOptionProps>;
        return () =>
            h(
                'span',
                {
                    class: [`${cssPrefix}toggle-icon`],
                    onClick: () => emit('update:model-value', !thisProps.modelValue),
                },
                h<TBsIconSvg>(BsIconSvg, {
                    icon: props.modelValue ? props.toggleIcon : props.icon,
                    height: props.size,
                    width: props.size,
                })
            );
    },
});
