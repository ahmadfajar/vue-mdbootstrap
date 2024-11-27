import type { TMaskLoaderVariant } from '@/components/Progress/types';
import {
    booleanProp,
    defaultTransitionProp,
    primaryColorProp,
    stringProp,
} from '@/mixins/CommonProps.ts';
import type { Prop } from 'vue';

const maskLoaderVariant = {
    type: String,
    default: 'linear',
    validator: (value: string): boolean =>
        ['linear', 'linear-alt', 'progress', 'spinner', 'grow'].includes(value),
} as Prop<TMaskLoaderVariant>;

export const maskLoaderProps = {
    fixedPosition: booleanProp,
    show: booleanProp,
    overlayOpacity: {
        type: [String, Number],
        default: 0.5,
        validator: (value: string): boolean => !isNaN(parseFloat(value)),
    },
    overlayColor: stringProp,
    spinnerColor: primaryColorProp,
    spinnerDiameter: {
        type: [String, Number],
        default: 36,
        validator: (value: string): boolean => !isNaN(parseInt(value, 10)),
    },
    spinnerThickness: {
        type: [String, Number],
        default: 5,
        validator: (value: string): boolean => !isNaN(parseInt(value, 10)),
    },
    spinnerType: stringProp as Prop<TMaskLoaderVariant>,
    type: maskLoaderVariant,
    transition: defaultTransitionProp,
    zIndex: {
        type: [String, Number],
        default: 100,
        validator: (value: string): boolean => !isNaN(parseInt(value, 10)),
    },
};
