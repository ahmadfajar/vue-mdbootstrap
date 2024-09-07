import {
    booleanProp,
    booleanTrueProp,
    defaultTransitionProp,
    stringProp,
} from '../../../mixins/CommonProps';
import { iconProps } from '../../Avatar/mixins/avatarProps';
import { iconVariant } from '../../Icon/mixins/iconProps';

export const alertProps = {
    color: stringProp,
    dismissible: booleanProp,
    iconVariant,
    iconType: {
        type: String,
        default: undefined,
        validator: (value: string): boolean =>
            ['success', 'info', 'warning', 'danger', 'help'].includes(value),
    },
    variant: {
        type: String,
        default: undefined,
        validator: (value: string): boolean =>
            ['success', 'info', 'warning', 'danger', 'help'].includes(value),
    },
    outlined: booleanProp,
    filled: booleanProp,
    solidFill: booleanProp,
    transition: defaultTransitionProp,
    modelValue: booleanTrueProp,
    ...iconProps,
};
