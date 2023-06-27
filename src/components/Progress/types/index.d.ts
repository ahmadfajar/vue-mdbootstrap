import type {
    ComponentObjectPropsOptions,
    ComponentOptionsMixin,
    ComputedOptions,
    DefineComponent,
    EmitsOptions,
    MethodOptions,
    Plugin
} from 'vue';
import { TRecord } from '../../../types';

export declare type TMaskLoaderOptionProps = {
    /**
     * Sets the css-style `position` value. If `true` then css-style `position` is set to `fixed`.
     */
    fixedPosition?: boolean;
    /**
     * Mask loader state, show or hide.
     */
    show?: boolean;
    /**
     * Backdrop overlay opacity value.
     */
    overlayOpacity?: string | number;
    /**
     * Backdrop overlay color.
     */
    overlayColor?: string;
    /**
     * Mask loader spinner color.
     */
    spinnerColor?: string;
    /**
     * Mask loader spinner diameter.
     */
    spinnerDiameter?: string | number;
    /**
     * Mask loader spinner thickness.
     */
    spinnerThickness?: string | number;
    /**
     * @deprecated
     * Use `variant` instead.
     */
    spinnerType?: string;
    /**
     * Mask loader variant type.
     */
    variant?: string;
    /**
     * The animation transition to be used when displaying the mask loader.
     */
    transition?: string;
    /**
     * Sets the css style `z-index` value.
     */
    zIndex?: string | number;
}

export declare type TProgressOptionProps = {
    /**
     * ProgressBar buffer length.
     */
    buffer?: string | number;
    /**
     * The component color appearance.
     */
    color?: string;
    /**
     * Spinner diameter value.
     */
    diameter?: string | number;
    /**
     * ProgressBar thickness.
     */
    height?: string | number;
    /**
     * Spinner thickness.
     */
    stroke?: string | number;
    /**
     * The value monitored by `v-model` to control the progress value.
     */
    modelValue?: number;
    /**
     * ProgressControl mode, valid values are: `determinate`, `indeterminate`, `buffer`.
     */
    mode?: string;
    /**
     * ProgressControl type, valid values are: `spinner`, `bar`.
     */
    type?: string;
}

export declare type TProgressBarOptionProps = {
    /**
     * The component color appearance.
     */
    color?: string;
    /**
     * The ProgressBar thickness.
     */
    height?: string | number;
    /**
     * The value monitored by `v-model` to control the progress bar value.
     */
    modelValue?: number;
    /**
     * Set to `false` to remove the rounded border on the side of the progress bar.
     */
    rounded?: boolean;
    /**
     * Create striped ProgressBar.
     */
    striped?: boolean;
    /**
     * Create animated stripe ProgressBar.
     */
    stripedAnimation?: boolean;
    /**
     * Display progress bar's value or not.
     */
    showValue?: boolean;
}

export declare type TBsMaskLoader = ComponentObjectPropsOptions<TMaskLoaderOptionProps>;

export declare type TBsProgress = ComponentObjectPropsOptions<TProgressOptionProps>;

export declare type TBsProgressBar = ComponentObjectPropsOptions<TProgressBarOptionProps>;

export declare const BsMaskLoader: DefineComponent<TBsMaskLoader, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>;

export declare const BsProgress: DefineComponent<TBsProgress, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>;

export declare const BsProgressBar: DefineComponent<TBsProgressBar, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>;

export declare const BsProgressPlugin: Plugin;
