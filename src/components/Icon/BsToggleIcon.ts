import { toggleIconProps } from '@/components/Icon/mixins/iconProps';
import type { TBsIconSvg, TBsToggleIcon, TToggleIconOptionProps } from '@/components/Icon/types';
import { cssPrefix } from '@/mixins/CommonApi';
import { defineComponent, h } from 'vue';
import BsIconSvg from './BsIconSvg';

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
                    filled: props.filled,
                    height: props.size,
                    width: props.size,
                })
            );
    },
});
