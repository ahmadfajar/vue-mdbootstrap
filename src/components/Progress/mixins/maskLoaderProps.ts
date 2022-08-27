import {
    booleanProp,
    defaultTransitionProp,
    primaryColorProp,
    stringProp,
    validStringOrFloatProp
} from "../../../mixins/CommonProps";
import {maskLoaderVariant} from "./progressAnimationApi";

export const maskLoaderProps = {
    /**
     * Sets the css-style `position` value. If `true` then css-style `position` is set to `fixed`.
     * @type {boolean}
     */
    fixedPosition: booleanProp,
    /**
     * Mask loader state, show or hide.
     * @type {boolean}
     */
    show: booleanProp,
    /**
     * Backdrop overlay opacity value.
     * @type {number}
     */
    overlayOpacity: validStringOrFloatProp,
    /**
     * Backdrop overlay color.
     * @type {string}
     */
    overlayColor: stringProp,
    /**
     * Mask loader spinner color.
     * @type {string}
     */
    spinnerColor: primaryColorProp,
    /**
     * Mask loader spinner diameter.
     * @type {number}
     */
    spinnerDiameter: {
        type: [String, Number],
        default: 36,
        validator: (value: string): boolean => !isNaN(parseInt(value, 10)),
    },
    /**
     * Mask loader spinner thickness.
     * @type {number}
     */
    spinnerThickness: {
        type: [String, Number],
        default: 5,
        validator: (value: string): boolean => !isNaN(parseInt(value, 10)),
    },
    /**
     * Mask loader variant type [deprecated], use `variant` instead.
     * @type {string}
     */
    spinnerType: maskLoaderVariant,
    /**
     * Mask loader variant type.
     * @type {string}
     */
    variant: maskLoaderVariant,
    /**
     * The animation transition to be used when displaying the mask loader.
     * @type {string}
     */
    transition: defaultTransitionProp,
    /**
     * Sets the css style `z-index` value.
     * @type {number}
     */
    zIndex: {
        type: [String, Number],
        default: 100,
        validator: (value: string): boolean => !isNaN(parseInt(value, 10)),
    },
}
