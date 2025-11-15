import { booleanProp, defaultColorProp } from '@/mixins/CommonProps';
import { defineComponent, h, type Prop } from 'vue';
import BsButton from './BsButton';
import type { TBsButton, TBsCloseButton, TButtonMode, TButtonSize } from './types';

export default defineComponent<TBsCloseButton>({
  name: 'BsCloseButton',
  props: {
    color: defaultColorProp,
    disabled: booleanProp,
    flat: booleanProp,
    readonly: booleanProp,
    rippleOff: booleanProp,
    tonal: booleanProp,
  },
  setup(props) {
    return () => {
      return h<TBsButton>(BsButton, {
        mode: 'icon' as Prop<TButtonMode>,
        size: 'sm' as Prop<TButtonSize>,
        color: props.color,
        flat: props.flat,
        tonal: props.tonal,
        disabled: props.disabled,
        readonly: props.readonly,
        rippleOff: props.rippleOff,
        icon: 'close' as Prop<string>,
        iconSize: 22 as Prop<number>,
        class: ['btn-close-action'],
        ariaLabel: 'Close',
      });
    };
  },
});
