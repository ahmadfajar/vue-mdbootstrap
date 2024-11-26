import type { TColorPickerMode } from '@/components/ColorPicker/types';
import {
    popoverDefaultTransitionProp,
    popoverPlacementProp,
} from '@/components/Popover/mixins/popoverProps';
import {
    booleanProp,
    stringOrArrayProp,
    stringProp,
    validStringOrNumberProp,
    whiteColorProp,
} from '@/mixins/CommonProps';
import type { Prop } from 'vue';

export const colorPickerProps = {
    activator: {
        type: [String, Object],
        default: undefined,
    } as Prop<string | Element>,
    containerColor: whiteColorProp,
    cover: booleanProp,
    open: booleanProp,
    hideAlpha: booleanProp,
    hideInputs: booleanProp,
    hideModeButton: booleanProp,
    outlineModeButton: booleanProp,
    modeButtonColor: {
        type: String,
        default: 'grey',
    },
    modeButtonToggleColor: stringProp,
    inputLabelClass: stringOrArrayProp,
    mode: {
        type: String,
        default: 'HEX',
        validator: (v: string) => ['RGB', 'HSL', 'HEX'].includes(v),
    } as Prop<TColorPickerMode>,
    modelValue: stringProp,
    placement: popoverPlacementProp,
    space: validStringOrNumberProp,
    transition: popoverDefaultTransitionProp,
    swatches: {
        type: Array,
        default: undefined,
    },
    swatchesMaxHeight: {
        type: [String, Number],
        default: 80,
    },
};
