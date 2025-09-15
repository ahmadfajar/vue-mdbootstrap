import {
    AllowedComponentProps,
    ComponentCustomProps,
    ComponentObjectPropsOptions,
    ObjectPlugin,
    VNode,
    VNodeProps,
} from 'vue';
import {
    EventUpdateModelValueProps,
    EventVoidClosableProps,
    TAllowedIconProps,
    TLabelPosition,
} from '../../../types';

export declare type TChipSize = 'sm' | 'lg';

export declare type TChipValue = {
    id: string;
    text: string;
    value?: string | number | boolean;
};

export declare type TChipContainer = {
    contentId: string;
    contentWidth: number;
    wrapperId: string;
    wrapperWidth: number;
};

export declare type TChipOptionItem = TAllowedIconProps & {
    id?: string;
    disabled?: boolean;
    dismissible?: boolean;
    imgSrc?: string;
    href?: string;
    text: string;
    value?: string | number | boolean;
};

export declare type TChipOptionProps = TAllowedIconProps & {
    /**
     * Sets this component state: `active` or `normal`.
     */
    active?: boolean;
    /**
     * Custom CSS class to apply when this component is in active state.
     */
    activeClass?: string;
    /**
     * The default chip color to apply.
     */
    color?: string;
    /**
     * Sets this component state to `disabled`.
     */
    disabled?: boolean;
    /**
     * Sets this component state to `readonly`.
     */
    readonly?: boolean;
    /**
     * When sets, display the close button to dismiss/hide this component.
     */
    dismissible?: boolean;
    /**
     * Render as `<a>` element and define its `href` property and apply chip styles to the element.
     */
    href?: string;
    /**
     * Place icon on the `left` side (before text) or on the `right` side (after text).
     */
    iconPosition?: TLabelPosition;
    /**
     * Enable avatar and set the image location url.
     */
    imgSrc?: string;
    /**
     * Create avatar with circle shape style.
     */
    imgCircle?: boolean;
    /**
     * @deprecated
     * Use `imgPaddingOff` property instead.
     */
    imgPadding?: boolean;
    /**
     * Adjust avatar size to match the component's height by eliminating the margin around the avatar.
     */
    imgPaddingOff?: boolean;
    /**
     * The value monitored by `v-model` to show or hide this component.
     */
    modelValue?: boolean;
    /**
     * Render this component with outlined style or not.
     */
    outlined?: boolean;
    /**
     * Render this component with rounded-pill style.
     */
    pill?: boolean;
    /**
     * Enabled or disabled ripple effect.
     * Ripple effect is automatically disabled when `click` event or `href` property is not defined.
     */
    rippleOff?: boolean;
    /**
     * Create Chip with predefined size, valid values are: `sm` (small), `lg` (large).
     */
    size?: TChipSize;
};

export declare type TChipGroupOptionProps = {
    /**
     * Custom CSS class to apply when the chip's item is in `active` state.
     */
    activeClass?: string;
    /**
     * Sets the default Chip items color.
     */
    color?: string;
    /**
     * Show checked icon when the Chip is selected.
     */
    checkedIcon?: boolean;
    /**
     * Enable multi rows if total width of items beyond the container width.
     */
    column?: boolean;
    /**
     * Create chip item's avatar with circle shape.
     */
    imgCircle?: boolean;
    /**
     * @deprecated
     * Use `imgPaddingOff` property instead.
     */
    imgPadding?: boolean;
    /**
     * Adjust avatar size to match the component's height by eliminating the margin around the avatar.
     */
    imgPaddingOff?: boolean;
    /**
     * The collection of `<BsChip>` property-value.
     */
    items: TChipOptionItem[];
    /**
     * The value monitored by `v-model` for the selected items.
     */
    modelValue?: TChipValue | TChipValue[];
    /**
     * Allow multiple selection or not.
     */
    multiple?: boolean;
    /**
     * Render Chip items with outlined style or not.
     */
    outlined?: boolean;
    /**
     * Render this component with rounded-pill style.
     */
    pill?: boolean;
    /**
     * Create Chip with predefined size, valid values are: `sm` (small), `lg` (large).
     */
    size?: TChipSize;
    /**
     * Show slider's button or not.
     */
    sliderButton?: boolean;
    /**
     * Slider button color appearance.
     */
    sliderButtonColor?: string;
};

export declare type TBsChip = ComponentObjectPropsOptions<TChipOptionProps>;

export declare type TBsChipGroup = ComponentObjectPropsOptions<TChipGroupOptionProps>;

declare type AllowedChipProps = AllowedComponentProps &
    ComponentCustomProps &
    VNodeProps &
    EventVoidClosableProps &
    EventUpdateModelValueProps<boolean> & {
        'onUpdate:active'?: (active: boolean) => void;
        '@update:active'?: (active: boolean) => void;
    };

export declare const BsChip: {
    new (): {
        $props: AllowedChipProps & TChipOptionProps;
        $slots: {
            default?: () => VNode[];
            icon?: () => VNode;
        };
        $emit: [
            /**
             * Fired when this component is dismissed (hide).
             */
            'close',
            /**
             * Fired when this component state is updated.
             */
            'update:active',
            /**
             * Fired when this component's value is updated.
             */
            'update:model-value',
        ];
    };
};

declare type AllowedChipGroupProps = AllowedComponentProps &
    ComponentCustomProps &
    VNodeProps &
    EventUpdateModelValueProps<TChipValue | TChipValue[] | null> & {
        onChange?: (newValue: TChipValue | TChipValue[] | null) => void;
        'onItem:close'?: (dismissedItem: TChipValue) => void;
        '@change'?: (newValue: TChipValue | TChipValue[] | null) => void;
        '@item:close'?: (dismissedItem: TChipValue) => void;
    };

export declare const BsChipGroup: {
    new (): {
        $props: AllowedChipGroupProps & TChipGroupOptionProps;
        $slots: {
            text?: (props: TChipOptionItem) => VNode;
            icon?: (props: TChipOptionItem) => VNode;
        };
        $emit: [
            /**
             * Fired immediately when this component's value is changed.
             */
            'change',
            /**
             * Fired when this component's value is updated.
             */
            'update:model-value',
            /**
             * Fired when this component's item is dismissed (hide).
             */
            'item:close',
        ];
    };
};

export declare const BsChipPlugin: ObjectPlugin;
