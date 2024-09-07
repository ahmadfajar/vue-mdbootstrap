import type { Prop } from 'vue';
import {
    booleanProp,
    defaultTransitionProp,
    primaryColorProp,
    stringProp,
} from '../../../mixins/CommonProps';
import type { TMaskLoaderVariant } from '../types';

const maskLoaderVariant = {
    type: String,
    default: 'linear',
    validator: (value: string): boolean =>
        ['linear', 'linear-alt', 'progress', 'spinner', 'grow'].includes(value),
} as Prop<TMaskLoaderVariant>;

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
    overlayOpacity: {
        type: [String, Number],
        default: 0.5,
        validator: (value: string): boolean => !isNaN(parseFloat(value)),
    },
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
     * Mask loader variant type [deprecated], use `type` instead.
     */
    spinnerType: stringProp as Prop<TMaskLoaderVariant>,
    /**
     * Mask loader variant type.
     */
    type: maskLoaderVariant,
    /**
     * Mask loader variant type [deprecated], use `type` instead.
     */
    variant: stringProp as Prop<TMaskLoaderVariant>,
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
};
