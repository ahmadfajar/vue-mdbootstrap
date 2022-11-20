import {booleanProp, booleanTrueProp} from "../../../mixins/CommonProps";

export const sideDrawerProps = {
    color: {
        type: String,
        default: "white",
    },
    clipped: booleanProp,
    mini: booleanProp,
    miniWidth: {
        type: [Number, String],
        default: 56,
        validator: (value: string): boolean => !isNaN(parseInt(value, 10)),
    },
    modalWidth: {
        type: [Number, String],
        default: 300,
        validator: (value: string): boolean => !isNaN(parseInt(value, 10)),
    },
    open: booleanTrueProp,
    overlayColor: {
        type: String,
        default: "#000",
    },
    position: {
        type: String,
        default: "left",
        validator: (value: string): boolean => ["left", "right"].includes(value),
    },
    shadow: booleanProp,
    tag: {
        type: String,
        default: "aside",
    },
    width: {
        type: [Number, String],
        default: 250,
        validator: (value: string): boolean => !isNaN(parseInt(value, 10)),
    },
}
