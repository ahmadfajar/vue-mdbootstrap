import { toggleIconProps } from '@/components/Icon/mixins/iconProps.ts';
import type { TBsSvgIcon, TBsToggleIcon, TToggleIconOptionProps } from '@/components/Icon/types';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import { defineComponent, h } from 'vue';
import BsIconSvg from './BsSvgIcon.ts';

export default defineComponent<TBsToggleIcon>({
  name: 'BsToggleIcon',
  props: toggleIconProps,
  emits: ['update:model-value'],
  setup(props, { emit }) {
    const thisProps = props as Readonly<TToggleIconOptionProps>;
    return () =>
      h(
        'span',
        {
          class: [`${cssPrefix}toggle-icon`],
          onClick: () => emit('update:model-value', !thisProps.modelValue),
        },
        h<TBsSvgIcon>(BsIconSvg, {
          icon: props.modelValue ? props.toggleIcon : props.icon,
          filled: props.filled,
          height: props.size,
          width: props.size,
        })
      );
  },
});
