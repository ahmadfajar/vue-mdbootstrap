import type {PropType} from "vue";
import {inputProps} from "../../Field/mixins/fieldProps";
import {booleanProp, defaultColorProp, stringOrArrayProp} from "../../../mixins/CommonProps";
import type {TLabelPosition} from "../../../types";

export const switchProps = {
    ...inputProps,
    color: defaultColorProp,
    labelClass: stringOrArrayProp,
    labelPosition: {
        type: String as PropType<TLabelPosition>,
        default: "right",
        validator: (value: string) => ["left", "right"].includes(value),
    },
    insetMode: booleanProp,
    insetOutlined: booleanProp,
    offIcon: booleanProp,
    onIcon: booleanProp,
    value: {
        type: [String, Number, Boolean, Object],
        default: undefined,
        required: true
    },
    modelValue: {
        type: [String, Number, Boolean, Object],
        default: undefined
    },
}
