import { BsRipple } from '@/components/Animation';
import { iconBaseProps } from '@/components/Avatar/mixins/avatarProps.ts';
import { useRenderTabLabel } from '@/components/Tabs/mixins/tabsApi.ts';
import { booleanProp, stringProp, validStringOrNumberProp } from '@/mixins/CommonProps.ts';
import type {
  TBsRipple,
  TBsTabLabel,
  TOrientation,
  TPlacementPosition,
  TTabLabelOptionProps,
} from '@/types';
import Helper from '@/utils/Helper.ts';
import type { Prop } from 'vue';
import { computed, defineComponent, h, toDisplayString } from 'vue';

export default defineComponent<TBsTabLabel>({
  name: 'BsTabLabel',
  props: {
    ...iconBaseProps,
    iconPosition: {
      type: String,
      default: 'left',
      validator: (value: string): boolean => ['left', 'right', 'top', 'bottom'].includes(value),
    } as Prop<TPlacementPosition>,
    iconSize: validStringOrNumberProp,
    label: stringProp,
    tabPosition: {
      type: String,
      default: 'top',
      validator: (value: string) => ['left', 'right', 'top', 'bottom'].includes(value),
    } as Prop<TPlacementPosition>,
    rippleOff: booleanProp,
  },
  setup(props) {
    const thisProps = props as Readonly<TTabLabelOptionProps>;
    const orientation = computed<TOrientation>(() =>
      ['left', 'right'].includes(thisProps.tabPosition as string) ? 'vertical' : 'horizontal'
    );

    return () =>
      h<TBsRipple>(
        BsRipple,
        {
          class: {
            flex: true,
            'items-center': true,
            'justify-center': true,
            'flex-col': ['top', 'bottom'].includes(thisProps.iconPosition as string),
          },
          disabled: props.rippleOff,
          tag: 'div' as Prop<string>,
        },
        {
          default: () =>
            !Helper.isEmpty(thisProps.icon) &&
            ['left', 'right'].includes(thisProps.iconPosition as string)
              ? h(
                  'div',
                  {
                    class: {
                      flex: true,
                      'text-nowrap': true,
                      'flex-fill': orientation.value === 'vertical',
                    },
                  },
                  useRenderTabLabel(thisProps, orientation)
                )
              : !Helper.isEmpty(thisProps.icon) &&
                  ['top', 'bottom'].includes(thisProps.iconPosition as string)
                ? useRenderTabLabel(thisProps, orientation)
                : h('span', toDisplayString(props.label)),
        }
      );
  },
});
