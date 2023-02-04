import type {PropType} from "vue";
import type {TPopoverPosition} from "../../Popover/types";
import {booleanProp, booleanTrueProp, whiteColorProp} from "../../../mixins/CommonProps";

export const menuProps = {
    cover: booleanProp,
    disabled: booleanProp,
    open: booleanProp,
    openOnHover: booleanProp,
    contentClickClose: booleanTrueProp,
    color: whiteColorProp,
    placement: {
        type: String as PropType<TPopoverPosition>,
        default: "bottom-left",
        validator: (value: string) => [
            "top", "top-left", "top-right",
            "bottom", "bottom-left", "bottom-right",
            "left", "left-top", "left-bottom",
            "right", "right-top", "right-bottom"
        ].includes(value)
    },
    transition: {
        type: String,
        default: "scale"
    },
}
