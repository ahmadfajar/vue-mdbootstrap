import type { Prop } from 'vue';
import { booleanProp, defaultColorProp, stringOrArrayProp } from '../../../mixins/CommonProps';
import type { TLabelPosition } from '../../../types';
import { inputProps } from '../../Field/mixins/fieldProps';

export const switchProps = {
    ...inputProps,
    color: defaultColorProp,
    labelClass: stringOrArrayProp,
    labelPosition: {
        type: String,
        default: 'right',
        validator: (value: string) => ['left', 'right'].includes(value),
    } as Prop<TLabelPosition>,
    insetMode: booleanProp,
    insetOutlined: booleanProp,
    checkoffIcon: booleanProp,
    checkedIcon: booleanProp,
    value: {
        type: [String, Number, Boolean, Object],
        default: undefined,
        required: true,
    },
    modelValue: {
        type: [String, Number, Boolean, Object],
        default: undefined,
    },
};
