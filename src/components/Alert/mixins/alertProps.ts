import type { TAlertVariant } from '@/components/Alert/types';
import { baseIconProps } from '@/components/Avatar/mixins/avatarProps';
import {
    booleanProp,
    booleanTrueProp,
    defaultTransitionProp,
    stringProp,
} from '@/mixins/CommonProps';
import type { Prop } from 'vue';

export const alertProps = {
    color: stringProp,
    dismissible: booleanProp,
    iconType: {
        type: String,
        default: undefined,
        validator: (value: string): boolean =>
            ['success', 'info', 'warning', 'danger', 'help'].includes(value),
    } as Prop<TAlertVariant>,
    variant: {
        type: String,
        default: undefined,
        validator: (value: string): boolean =>
            ['success', 'info', 'warning', 'danger', 'help'].includes(value),
    } as Prop<TAlertVariant>,
    outlined: booleanProp,
    filled: booleanProp,
    solidFill: booleanProp,
    transition: defaultTransitionProp,
    modelValue: booleanTrueProp,
    ...baseIconProps,
};
