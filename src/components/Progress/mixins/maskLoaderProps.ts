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
     */
    fixedPosition: booleanProp,
    /**
     * Mask loader state, show or hide.
     */
    show: booleanProp,
    /**
     * Backdrop overlay opacity value.
     */
    overlayOpacity: validStringOrFloatProp,
    /**
     * Backdrop overlay color.
     */
    overlayColor: stringProp,
    /**
     * Mask loader spinner color.
     */
    spinnerColor: primaryColorProp,
    /**
     * Mask loader spinner diameter.
     */
    spinnerDiameter: {
        type: [String, Number],
        default: 36,
        validator: (value: string): boolean => !isNaN(parseInt(value, 10)),
    },
    /**
     * Mask loader spinner thickness.
     */
    spinnerThickness: {
        type: [String, Number],
        default: 5,
        validator: (value: string): boolean => !isNaN(parseInt(value, 10)),
    },
    /**
     * Mask loader variant type [deprecated], use `variant` instead.
     */
    spinnerType: maskLoaderVariant,
    /**
     * Mask loader variant type.
     */
    variant: maskLoaderVariant,
    /**
     * The animation transition to be used when displaying the mask loader.
     */
    transition: defaultTransitionProp,
    /**
     * Sets the css style `z-index` value.
     */
    zIndex: {
        type: [String, Number],
        default: 100,
        validator: (value: string): boolean => !isNaN(parseInt(value, 10)),
    },
}
