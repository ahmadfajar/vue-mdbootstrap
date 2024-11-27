import type {
    TProgressBarLabelPosition,
    TProgressBarValuePosition,
    TProgressControlMode,
    TProgressControlVariant,
    TTextLabelAlignment,
} from '@/components/Progress/types';
import {
    booleanProp,
    primaryColorProp,
    stringOrNumberProp,
    stringProp,
} from '@/mixins/CommonProps.ts';
import type { Prop } from 'vue';

export const progressProps = {
    buffer: {
        type: [String, Number],
        default: 0,
        validator: (value: string): boolean => !isNaN(parseInt(value, 10)),
    },
    color: primaryColorProp,
    diameter: {
        type: [String, Number],
        default: 60,
        validator: (value: string): boolean => !isNaN(parseInt(value, 10)),
    },
    height: {
        type: [String, Number],
        default: 5,
        validator: (value: string): boolean => !isNaN(parseInt(value, 10)),
    },
    stroke: {
        type: [String, Number],
        default: 6,
        validator: (value: string): boolean => !isNaN(parseInt(value, 10)),
    },
    modelValue: {
        type: Number,
        default: 0,
        validator: (value: number): boolean => value >= 0 && value <= 100,
    },
    mode: {
        type: String,
        default: 'indeterminate',
        validator: (value: string): boolean =>
            ['determinate', 'indeterminate', 'buffer'].includes(value),
    } as Prop<TProgressControlMode>,
    type: {
        type: String,
        default: 'bar',
        validator: (value: string): boolean => ['spinner', 'bar'].includes(value),
    } as Prop<TProgressControlVariant>,
};

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
