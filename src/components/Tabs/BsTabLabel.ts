import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions, Prop } from 'vue';
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
            type: String,
            default: 'left',
            validator: (value: string): boolean => ['left', 'right', 'top', 'bottom'].includes(value),
        } as Prop<TPositionType>,
        iconSize: validStringOrNumberProp,
        label: stringProp,
        tabPosition: {
            type: String,
            default: 'top',
            validator: (value: string) => ['left', 'right', 'top', 'bottom'].includes(value)
        } as Prop<TPositionType>,
        rippleOff: booleanProp,
    },
    setup(props) {
        const thisProps = props as Readonly<TTabLabelOptionProps>;
        const orientation = computed<TOrientation>(
            () => ['left', 'right'].includes(<string>thisProps.tabPosition) ? 'vertical' : 'horizontal'
        );

        return () =>
            h<TBsRipple>(BsRipple, {
                class: [
                    'd-flex', 'align-items-center', 'justify-content-center',
                    ['top', 'bottom'].includes(<string>thisProps.iconPosition) ? 'flex-column' : '',
                ],
                disabled: props.rippleOff,
            }, {
                default: () =>
                    (
                        !Helper.isEmpty(thisProps.icon) &&
                        ['left', 'right'].includes(<string>thisProps.iconPosition)
                    )
                        ? h('div', {
                            class: [
                                'text-nowrap', 'd-flex',
                                orientation.value === 'vertical' ? 'flex-fill' : ''
                            ],
                        }, useRenderTabLabel(thisProps, orientation))
                        : (
                            (
                                !Helper.isEmpty(thisProps.icon) &&
                                ['top', 'bottom'].includes(<string>thisProps.iconPosition)
                            )
                                ? useRenderTabLabel(thisProps, orientation)
                                : h('span', toDisplayString(props.label))
                        )
            })
    }
});
