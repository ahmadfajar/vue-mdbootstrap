import type {PropType} from "vue";
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
    disabled: booleanProp,
    open: booleanProp,
    hideAlpha: booleanProp,
    hideInputs: booleanProp,
    hideModeButton: booleanProp,
    modeButtonOutlined: booleanProp,
    modeButtonColor: {
        type: String,
        default: "grey",
    },
    modeButtonSelectedColor: stringProp,
    inputLabelClass: stringOrArrayProp,
    mode: {
        type: String as PropType<TColorPickerMode>,
        default: "HEX",
        validator: (v: TColorPickerMode) => ["RGB", "HSL", "HEX"].includes(v),
    },
    modelValue: stringProp,
    placement: popoverPlacementProp,
    space: validStringOrNumberProp,
    transition: popoverDefaultTransitionProp,
}
