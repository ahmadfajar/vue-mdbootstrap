import {booleanProp, stringProp, validStringOrFloatProp, validStringOrNumberProp} from "../../../mixins/CommonProps";

export const overlayProps = {
    /**
     * Overlay base color.
     * @type {string}
     */
    color: stringProp,
    /**
     * Sets the css-style `position` value. If `true` then css-style `position` is set to `fixed`.
     * @type {boolean}
     */
    fixed: booleanProp,
    /**
     * Overlay opacity.
     * @type {string|number}
     */
    opacity: validStringOrFloatProp,
    /**
     * Overlay state, show or hide.
     * @type {boolean}
     */
    show: booleanProp,
    /**
     * Overlay inline-css `z-index`.
     * @type {string|number}
     */
    zIndex: validStringOrNumberProp,
}
