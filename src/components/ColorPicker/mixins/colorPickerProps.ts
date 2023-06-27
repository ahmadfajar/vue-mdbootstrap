import type { Prop, PropType } from 'vue';
import {
    booleanProp,
    stringOrArrayProp,
    stringProp,
    validStringOrNumberProp,
    whiteColorProp
} from "../../../mixins/CommonProps";
import {popoverDefaultTransitionProp, popoverPlacementProp} from "../../Popover/mixins/popoverProps";
import type {TColorPickerMode} from "../types";

export const colorPickerProps = {
    activator: {
        type: [String, Element],
        default: undefined
    },
    containerColor: whiteColorProp,
    cover: booleanProp,
    open: booleanProp,
    hideAlpha: booleanProp,
    hideInputs: booleanProp,
    hideModeButton: booleanProp,
    outlineModeButton: booleanProp,
    modeButtonColor: {
        type: String,
        default: "grey",
    },
    modeButtonToggleColor: stringProp,
    inputLabelClass: stringOrArrayProp,
    mode: {
        type: String,
        default: "HEX",
        validator: (v: string) => ["RGB", "HSL", "HEX"].includes(v),
    } as Prop<TColorPickerMode>,
    modelValue: stringProp,
    placement: popoverPlacementProp,
    space: validStringOrNumberProp,
    transition: popoverDefaultTransitionProp,
    swatches: {
        type: Array,
        default: undefined
    },
    swatchesMaxHeight: {
        type: [String, Number],
        default: 80
    },
}
