import {
    AllowedComponentProps,
    ComponentCustomProps,
    ComponentObjectPropsOptions,
    ObjectPlugin,
    VNode,
    VNodeProps,
} from 'vue';
import { EventUpdateModelValueProps } from '../../../types';

export declare type TFlipMode = 'horizontal' | 'vertical' | 'both';

export declare type TFontAwesomeVariant = 'regular' | 'solid' | 'light';

export declare type TIconRotation = '90' | '180' | '270';

export declare type TIconVariant =
    | 'outlined'
    | 'rounded'
    | 'sharp'
    | 'filled'
    | 'outlined_filled'
    | 'rounded_filled'
    | 'sharp_filled';

export declare type TPlacementPosition = 'left' | 'right' | 'top' | 'bottom';

export declare type TIconData = {
    name: string;
    icon: string;
    theme: string;
    variant?: string;
    data?: string;
};

export declare type TSizeProps = {
    /**
     * This component's height.
     */
    height?: string | number;
    /**
     * This component's width.
     */
    width?: string | number;
};

export declare type TSizeOptionProps = {
    /**
     * This component's height.
     */
    height?: string | number;
    /**
     * This component's width.
     */
    width?: string | number;
    /**
     * Shortcut to create this component with equal height and width.
     */
    size?: string | number | TSizeProps;
};

export declare type TIconOptionProps = TSizeOptionProps & {
    /**
     * Android icon name with suffix: `_outlined`, `_rounded`, `_sharp`, `_filled`,
     * `_outlined_filled`, `_rounded_filled`, or `_sharp_filled`.
     *
     * Suffix `_filled` and `_outlined_filled` will result the same icon style.
     * And you can either use `*_filled` or sets property `filled` to `true` to
     * create an icon with fill style.
     *
     * @see [Google Material Symbol](https://fonts.google.com/icons?icon.set=Material+Symbols) for details.
     */
    icon: string;
    /**
     * Use [Google Material Symbol](https://fonts.google.com/icons?icon.set=Material+Symbols) with fill style.
     */
    filled?: boolean;
    /**
     * Apply **pulse** animation to the icon.
     */
    pulse?: boolean;
    /**
     * Apply **spin** animation to the icon.
     */
    spin?: boolean;
    /**
     * Flip the icon, valid values are: `horizontal`, `vertical`, `both`.
     */
    flip?: TFlipMode;
    /**
     * Rotate the icon, valid values are: `90`, `180`, `270`.
     */
    rotate?: TIconRotation;
};

export declare type TIconSpinnerOptionProps = {
    /**
     * The Icon color.
     */
    color?: string;
    /**
     * The icon’s size in pixel.
     */
    size?: string | number;
    /**
     * Apply **pulse** animation to the icon.
     */
    pulse?: boolean;
    /**
     * Apply **spin** animation to the icon.
     */
    spin?: boolean;
};

export declare type TToggleIconOptionProps = {
    /**
     * The icon to display when `modelValue` property is `false` or `undefined`.
     *
     * Use android icon name with suffix: `_outlined`, `_rounded`, `_sharp`,
     * `_filled`, `_outlined_filled`, `_rounded_filled`, or `_sharp_filled`.
     *
     * Suffix `_filled` or `_outlined_filled` will result the same icon style.
     * And you can either use `*_filled` or sets property `filled` to `true` to
     * create an icon with fill style.
     *
     * @see  [Google Material Symbol](https://fonts.google.com/icons?icon.set=Material+Symbols) for details.
     */
    icon: string;
    /**
     * The icon to display when `modelValue` property is `true`.
     *
     * Use android icon name with suffix: `_outlined`, `_rounded`, `_sharp`,
     * `_filled`, `_outlined_filled`, `_rounded_filled`, or `_sharp_filled`.
     *
     * Suffix `_filled` or `_outlined_filled` will result the same icon style.
     * And you can either use `*_filled` or sets property `filled` to `true` to
     * create an icon with fill style.
     *
     * @see  [Google Material Symbol](https://fonts.google.com/icons?icon.set=Material+Symbols) for details.
     */
    toggleIcon: string;
    /**
     * Use [Google Material Symbol](https://fonts.google.com/icons?icon.set=Material+Symbols) with fill style.
     */
    filled?: boolean;
    /**
     * Value monitored by `v-model` to maintain this component state.
     */
    modelValue?: boolean;
    /**
     * The icon size in pixels.
     */
    size?: string | number;
};

export declare type TFontAwesomeOptionProps = TSizeOptionProps & {
    /**
     * Any valid font awesome icon name.
     *
     * @see [Font Awesome](https://fontawesome.com/v6/search?o=r&m=free) for details.
     */
    icon: string;
    /**
     * Font Awesome style variant, valid values are: `regular`, `solid`, `light`.
     * Default is `solid`.
     */
    variant?: TFontAwesomeVariant;
    /**
     * Font Awesome vendor version. Default is `6.7.1`.
     */
    version?: string;
    /**
     * Apply **pulse** animation to the icon.
     */
    pulse?: boolean;
    /**
     * Apply **spin** animation to the icon.
     */
    spin?: boolean;
    /**
     * Flip the icon, valid values are: `horizontal`, `vertical`, `both`.
     */
    flip?: TFlipMode;
    /**
     * Rotate the icon, valid values are: `90`, `180`, `270`.
     */
    rotate?: TIconRotation;
}

export declare type TBsFontAwesome = ComponentObjectPropsOptions<TFontAwesomeOptionProps>;

export declare type TBsIcon = ComponentObjectPropsOptions<TIconOptionProps>;

export declare type TBsIconSvg = ComponentObjectPropsOptions<TIconOptionProps>;

export declare type TBsIconSpinner = ComponentObjectPropsOptions<TIconSpinnerOptionProps>;

export declare type TBsToggleIcon = ComponentObjectPropsOptions<TToggleIconOptionProps>;

export declare const spinnerSvgData = 'SVG+ML/data';

export declare const BsFontAwesome: {
    new (): {
        $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & TFontAwesomeOptionProps;
    };
};

export declare const BsIcon: {
    new (): {
        $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & TIconOptionProps;
    };
};

export declare const BsIconSvg: {
    new (): {
        $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & TIconOptionProps;
    };
};

export declare const BsIconSpinner: {
    new (): {
        $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & TIconSpinnerOptionProps;
    };
};

export declare const BsToggleIcon: {
    new (): {
        $props: AllowedComponentProps &
            ComponentCustomProps &
            VNodeProps &
            EventUpdateModelValueProps<boolean> &
            TToggleIconOptionProps;
        $emit: [
            /**
             * Fired when this component's toggle state is updated.
             */
            'update:model-value',
        ];
    };
};

/**
 * Function to draw inline SVG xml directly.
 *
 * @param data   The SVG xml string
 * @param width  The desired {@link Element} width
 * @param height The desired {@link Element} height
 * @param clazz  Optional css class name
 */
export declare function useRenderSVG(
    data: string,
    width: number | string,
    height: number | string,
    clazz: unknown
): VNode;

export declare const BsIconPlugin: ObjectPlugin;
