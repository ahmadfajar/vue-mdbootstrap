import { BsRipple } from '@/components/Animation';
import { cssPrefix, useWrapSlotDefault } from '@/mixins/CommonApi.ts';
import { booleanProp } from '@/mixins/CommonProps.ts';
import type { TBsButtonInner, TBsRipple, TButtonInnerOptionProps } from '@/types';
import { defineComponent, h } from 'vue';

export default defineComponent<TBsButtonInner>({
  name: 'BsButtonInner',
  props: {
    dropdownToggle: booleanProp,
    iconMode: booleanProp,
    hasIcon: booleanProp,
    rippleOff: booleanProp,
  },
  setup(props, { slots }) {
    const thisProps = props as Readonly<TButtonInnerOptionProps>;

    return () =>
      h<TBsRipple>(
        BsRipple,
        {
          class: { 'dropdown-toggle': thisProps.dropdownToggle && !thisProps.iconMode },
          disabled: props.rippleOff,
          tag: 'span',
        },
        {
          default: () =>
            useWrapSlotDefault('span', slots, [
              `${cssPrefix}btn-inner`,
              thisProps.hasIcon ? 'has-icon' : '',
            ]),
        }
      );
  },
});
