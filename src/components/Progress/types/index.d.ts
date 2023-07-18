import type { AllowedComponentProps, ComponentCustomProps, ComponentObjectPropsOptions, Plugin, VNodeProps } from 'vue';

export declare type TProgressControlMode = 'determinate' | 'indeterminate' | 'buffer';

export declare type TProgressControlVariant = 'spinner' | 'bar';

export declare type TProgressBarValuePosition = 'start' | 'end' | 'top' | 'bottom' | 'inside';

export declare type TMaskLoaderVariant = 'linear' | 'linear-alt' | 'progress' | 'spinner' | 'grow';

export declare type TMaskLoaderOptionProps = {
    /**
     * Sets the inline css-style `position` property. If `true` then the inline
     * css-style `position` property is set to `fixed`.
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
     * Use `type` instead.
     */
    spinnerType?: string;
    /**
     * Mask loader variant type.
     */
    type?: TMaskLoaderVariant;
    /**
     * @deprecated
     * Use `type` instead.
     */
    variant?: TMaskLoaderVariant;
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
    mode?: TProgressControlMode;
    /**
     * ProgressControl type, valid values are: `spinner`, `bar`.
     */
    type?: TProgressControlVariant;
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
     * Display progress bar's value.
     */
    showValue?: boolean;
    /**
     * Progress bar's value position.
     */
    valuePosition?: TProgressBarValuePosition;
}

export declare type TBsMaskLoader = ComponentObjectPropsOptions<TMaskLoaderOptionProps>;

export declare type TBsProgress = ComponentObjectPropsOptions<TProgressOptionProps>;

export declare type TBsProgressBar = ComponentObjectPropsOptions<TProgressBarOptionProps>;

export declare const BsMaskLoader: {
    new(): {
        $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & TMaskLoaderOptionProps;
    };
};

export declare const BsProgress: {
    new(): {
        $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & TProgressOptionProps;
    };
};

export declare const BsProgressBar: {
    new(): {
        $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & TProgressBarOptionProps;
    };
};

export declare const BsProgressPlugin: {
    new(): Plugin;
};
