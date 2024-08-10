import type { Prop } from 'vue';
import { booleanProp, stringOrNumberProp, stringProp } from '../../../mixins/CommonProps';
import type {
    TProgressBarLabelPosition,
    TProgressBarValuePosition,
    TTextLabelAlignment,
} from '../types';

export const progressBarProps = {
    color: stringProp,
    height: stringOrNumberProp,
    innerCls: stringProp,
    label: stringProp,
    labelAlignment: {
        type: String,
        default: 'center',
        validator: (value: string) => ['start', 'end', 'center'].includes(value),
    } as Prop<TTextLabelAlignment>,
    labelPosition: {
        type: String,
        default: 'top',
        validator: (value: string) => ['start', 'end', 'top', 'bottom'].includes(value),
    } as Prop<TProgressBarLabelPosition>,
    roundedOff: booleanProp,
    striped: booleanProp,
    stripedAnimation: booleanProp,
    showValue: booleanProp,
    modelValue: {
        type: Number,
        default: 0,
        validator: (value: number): boolean => value >= 0 && value <= 100,
    },
    valuePosition: {
        type: String,
        default: 'inside',
        validator: (value: string) => ['start', 'end', 'top', 'bottom', 'inside'].includes(value),
    } as Prop<TProgressBarValuePosition>,
};
