import type { TPopoverPosition } from '@/components/Popover/types';
import {
    booleanProp,
    booleanTrueProp,
    stringProp,
    validStringOrFloatProp,
    validStringOrNumberProp,
    whiteColorProp,
} from '@/mixins/CommonProps.ts';
import type { Prop } from 'vue';

export const popoverPlacementProp = {
    type: String,
    default: 'bottom-left',
    validator: (value: string) =>
        [
            'top',
            'top-left',
            'top-right',
            'bottom',
            'bottom-left',
            'bottom-right',
            'left',
            'left-top',
            'left-bottom',
            'right',
            'right-top',
            'right-bottom',
        ].includes(value),
} as Prop<TPopoverPosition>;

export const popoverDefaultTransitionProp = {
    type: String,
    default: 'scale',
};

export const popoverBaseProps = {
    open: booleanProp,
    escClose: booleanTrueProp,
    overlay: booleanProp,
    overlayClickClose: booleanTrueProp,
    overlayColor: stringProp,
    overlayOpacity: validStringOrFloatProp,
};

export const popoverProps = {
    ...popoverBaseProps,
    cover: booleanProp,
    color: whiteColorProp,
    space: validStringOrNumberProp,
    placement: popoverPlacementProp,
    transition: popoverDefaultTransitionProp,
    trigger: {
        type: [String, Object],
        default: undefined,
    } as Prop<string | Element>,
};
