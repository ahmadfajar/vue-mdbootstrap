import type {
    ComponentObjectPropsOptions,
    ComponentOptionsMixin,
    ComputedOptions,
    DefineComponent,
    EmitsOptions,
    MethodOptions,
    Plugin,
    VNode
} from 'vue';
import type { TRecord } from '../../../types';

export declare type TFlipMode = 'horizontal' | 'vertical' | 'both';

export declare type TIconVariant = 'outlined' | 'filled' | 'round' | 'sharp';

export declare type TPositionType = 'left' | 'right' | 'top' | 'bottom';

export declare type TIconData = {
    id: number;
    name: string;
    icon?: string;
    category?: string;
    variant?: string;
    data?: string;
}

export declare type TSizeProps = {
    /**
     * This component's height.
     */
    height?: string | number;
    /**
     * This component's width.
     */
    width?: string | number;
}

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
}

export declare type TIconOptionProps = TSizeOptionProps & {
    /**
     * The icon’s name or alias.
     */
    icon?: string;
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
    rotate?: string | number;
}

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
}

export declare type TToggleIconOptionProps = {
    /**
     * The icon’s name or alias.
     */
    icon?: string;
    /**
     * The icon to display when `value` property is `true`.
     */
    toggleIcon?: string;
    /**
     * Value monitored by `v-model` to maintain this component state.
     */
    modelValue?: boolean;
    /**
     * The icon size in pixels.
     */
    size?: string | number;
}

export declare type TBsIcon = ComponentObjectPropsOptions<TIconOptionProps>;

export declare type TBsIconSvg = ComponentObjectPropsOptions<TIconOptionProps>;

export declare type TBsIconSpinner = ComponentObjectPropsOptions<TIconSpinnerOptionProps>;

export declare type TBsToggleIcon = ComponentObjectPropsOptions<TToggleIconOptionProps>;

export declare const BsIcon: DefineComponent<TBsIcon, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>;

export declare const BsIconSvg: DefineComponent<TBsIconSvg, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>;

export declare const BsIconSpinner: DefineComponent<TBsIconSpinner, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>;

export declare const BsToggleIcon: DefineComponent<TBsToggleIcon, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>;

export declare const BsIconPlugin: Plugin;

export declare const spinnerSvgData = 'M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z';

export declare function useCreateSvgComponent(data: string, height: number | string, width: number | string, clazz: unknown): VNode;
