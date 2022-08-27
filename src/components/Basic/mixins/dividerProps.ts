import {booleanProp, validStringOrNumberProp} from "../../../mixins/CommonProps";

export const dividerProps = {
    /**
     * Set to `TRUE` when divider is placed inside element that has dark background color.
     * @type {boolean}
     */
    dark: booleanProp,
    /**
     * Indentation from left side.
     * @type {string|number}
     */
    leftIndent: validStringOrNumberProp,
    /**
     * Indentation from right side.
     * @type {string|number}
     */
    rightIndent: validStringOrNumberProp,
    /**
     * Divider thickness.
     * @type {string|number}
     */
    thickness: validStringOrNumberProp,
}
