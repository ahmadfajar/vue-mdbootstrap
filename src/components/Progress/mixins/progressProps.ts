import type { Prop } from 'vue';
import { primaryColorProp } from '../../../mixins/CommonProps';
import type { TProgressControlMode, TProgressControlVariant } from '../types';

export const progressProps = {
    /**
     * ProgressBar buffer length.
     */
    buffer: {
        type: [String, Number],
        default: 0,
        validator: (value: string): boolean => !isNaN(parseInt(value, 10)),
    },
    /**
     * The component color appearance.
     */
    color: primaryColorProp,
    /**
     * Spinner diameter value.
     */
    diameter: {
        type: [String, Number],
        default: 60,
        validator: (value: string): boolean => !isNaN(parseInt(value, 10)),
    },
    /**
     * ProgressBar thickness.
     */
    height: {
        type: [String, Number],
        default: 5,
        validator: (value: string): boolean => !isNaN(parseInt(value, 10)),
    },
    /**
     * Spinner thickness.
     */
    stroke: {
        type: [String, Number],
        default: 6,
        validator: (value: string): boolean => !isNaN(parseInt(value, 10)),
    },
    /**
     * The value monitored by `v-model` to control the progress value.
     */
    modelValue: {
        type: Number,
        default: 0,
        validator: (value: number): boolean => value >= 0 && value <= 100
    },
    /**
     * ProgressControl mode, valid values are: `determinate`, `indeterminate`, `buffer`.
     */
    mode: {
        type: String,
        default: 'indeterminate',
        validator: (value: string): boolean => ['determinate', 'indeterminate', 'buffer'].includes(value)
    } as Prop<TProgressControlMode>,
    /**
     * ProgressControl type, valid values are: `spinner`, `bar`.
     */
    type: {
        type: String,
        default: 'bar',
        validator: (value: string): boolean => ['spinner', 'bar'].includes(value)
    } as Prop<TProgressControlVariant>,
}
