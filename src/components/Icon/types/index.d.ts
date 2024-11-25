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
     * Suffix `_filled` or `_outlined_filled` will result the same icon style.
     * And you can either use `*_filled` or sets property `filled` to `true` to
     * create an icon with fill style.
     *
     * @see [Google Material Symbol](https://fonts.google.com/icons?icon.set=Material+Symbols&icon.size=24&icon.color=%23e8eaed&icon.platform=web) for details.
     */
    icon: string;
    /**
     * Use [Google Material Symbol](https://fonts.google.com/icons?icon.set=Material+Symbols&icon.size=24&icon.color=%23e8eaed&icon.platform=web) with fill style.
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
     * @see  [Google Material Symbol](https://fonts.google.com/icons?icon.set=Material+Symbols&icon.size=24&icon.color=%23e8eaed&icon.platform=web) for details.
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
     * @see  [Google Material Symbol](https://fonts.google.com/icons?icon.set=Material+Symbols&icon.size=24&icon.color=%23e8eaed&icon.platform=web) for details.
     */
    toggleIcon: string;
    /**
     * Use [Google Material Symbol](https://fonts.google.com/icons?icon.set=Material+Symbols&icon.size=24&icon.color=%23e8eaed&icon.platform=web) with fill style.
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

export declare type TBsIcon = ComponentObjectPropsOptions<TIconOptionProps>;

export declare type TBsIconSvg = ComponentObjectPropsOptions<TIconOptionProps>;

export declare type TBsIconSpinner = ComponentObjectPropsOptions<TIconSpinnerOptionProps>;

export declare type TBsToggleIcon = ComponentObjectPropsOptions<TToggleIconOptionProps>;

export declare const spinnerSvgData =
    'M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z';

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
 * @param height The desired {@link Element} height
 * @param width  The desired {@link Element} width
 * @param clazz  Optional css class name
 */
export declare function useRenderSVG(
    data: string,
    height: number | string,
    width: number | string,
    clazz: unknown
): VNode;

export declare const BsIconPlugin: ObjectPlugin;
