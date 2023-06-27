import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions, PropType } from 'vue';
import { computed, defineComponent, h, toDisplayString } from 'vue';
import { booleanProp, stringProp, validStringOrNumberProp } from '../../mixins/CommonProps';
import type { TBsRipple, TBsTabLabel, TOrientation, TPositionType, TRecord, TTabLabelOptionProps } from '../../types';
import Helper from '../../utils/Helper';
import { BsRipple } from '../Animation';
import { iconProps } from '../Avatar/mixins/avatarProps';
import { useRenderTabLabel } from './mixins/tabsApi';

export default defineComponent<TBsTabLabel, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsTabLabel',
    props: {
        ...iconProps,
        iconPosition: {
            type: String as PropType<TPositionType>,
            default: 'left',
            validator: (value: string): boolean => ['left', 'right', 'top', 'bottom'].includes(value),
        },
        iconSize: validStringOrNumberProp,
        label: stringProp,
        tabPosition: {
            type: String as PropType<TPositionType>,
            default: 'top',
            validator: (value: string) => ['left', 'right', 'top', 'bottom'].includes(value)
        },
        rippleOff: booleanProp,
    },
    setup(props) {
        const cmpProps = props as Readonly<TTabLabelOptionProps>;
        const orientation = computed<TOrientation>(
            () => ['left', 'right'].includes(<string>cmpProps.tabPosition) ? 'vertical' : 'horizontal'
        );

        return () =>
            h<TBsRipple>(BsRipple, {
                class: [
                    'd-flex', 'align-items-center', 'justify-content-center',
                    ['top', 'bottom'].includes(<string>cmpProps.iconPosition) ? 'flex-column' : '',
                ],
                disabled: props.rippleOff,
            }, {
                default: () =>
                    (!Helper.isEmpty(cmpProps.icon) && ['left', 'right'].includes(<string>cmpProps.iconPosition))
                        ? h('div', {
                            class: ['text-nowrap', 'd-flex', orientation.value === 'vertical' ? 'flex-fill' : ''],
                        }, useRenderTabLabel(cmpProps, orientation))
                        : (
                            (!Helper.isEmpty(cmpProps.icon) && ['top', 'bottom'].includes(<string>cmpProps.iconPosition))
                                ? useRenderTabLabel(cmpProps, orientation)
                                : h('span', toDisplayString(props.label))
                        )
            })
    }
});
