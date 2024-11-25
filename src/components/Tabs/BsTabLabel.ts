import { BsRipple } from '@/components/Animation';
import { baseIconProps } from '@/components/Avatar/mixins/avatarProps';
import { useRenderTabLabel } from '@/components/Tabs/mixins/tabsApi';
import { booleanProp, stringProp, validStringOrNumberProp } from '@/mixins/CommonProps';
import type {
    TBsRipple,
    TBsTabLabel,
    TOrientation,
    TPlacementPosition,
    TTabLabelOptionProps,
} from '@/types';
import Helper from '@/utils/Helper';
import type { Prop } from 'vue';
import { computed, defineComponent, h, toDisplayString } from 'vue';

export default defineComponent<TBsTabLabel>({
    name: 'BsTabLabel',
    props: {
        ...baseIconProps,
        iconPosition: {
            type: String,
            default: 'left',
            validator: (value: string): boolean =>
                ['left', 'right', 'top', 'bottom'].includes(value),
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
            ['left', 'right'].includes(<string>thisProps.tabPosition) ? 'vertical' : 'horizontal'
        );

        return () =>
            h<TBsRipple>(
                BsRipple,
                {
                    class: {
                        'd-flex': true,
                        'align-items-center': true,
                        'justify-content-center': true,
                        'flex-column': ['top', 'bottom'].includes(thisProps.iconPosition as string),
                    },
                    disabled: props.rippleOff,
                },
                {
                    default: () =>
                        !Helper.isEmpty(thisProps.icon) &&
                        ['left', 'right'].includes(thisProps.iconPosition as string)
                            ? h(
                                  'div',
                                  {
                                      class: {
                                          'd-flex': true,
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
