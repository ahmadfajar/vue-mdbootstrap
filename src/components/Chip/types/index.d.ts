import type {
    AllowedComponentProps,
    ComponentCustomProps,
    ComponentObjectPropsOptions,
    Plugin,
    VNode,
    VNodeProps
} from 'vue';
import type { EventClosableProps, EventUpdateModelValueProps, TIconProps } from '../../../types';

export declare type TChipValue = {
    id: string;
    text: string;
    value?: string | number | boolean;
}

export declare type TChipContainer = {
    contentId: string;
    contentWidth: number;
    wrapperId: string;
    wrapperWidth: number;
}

export declare type TChipOptionItem = TIconProps & {
    id?: string;
    disabled?: boolean;
    dismissible?: boolean;
    imgSrc?: string;
    iconVariant?: string,
    href?: string;
    text: string;
    value?: string | number | boolean;
}

export declare type TChipOptionProps = TIconProps & {
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
     * Sets this component state: `enabled` or `disabled`.
     */
    disabled?: boolean;
    /**
     * When sets, display the close button to dismiss/hide this component.
     */
    dismissible?: boolean;
    /**
     * Render as `<a>` element and define its `href` property and apply chip styles to the element.
     */
    href?: string;
    /**
     * Use predefined icon style to be used inside this component.
     */
    iconVariant?: string,
    /**
     * Enable avatar and set the image location url.
     */
    imgSrc?: string;
    /**
     * Create avatar with circle shape style.
     */
    imgCircle?: boolean;
    /**
     * Adjust avatar size to match the component's height by eliminating the margin around the avatar.
     */
    imgPadding?: boolean;
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
    size?: string;
}

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
     * Adjust Chip's avatar size to match the Chip height by eliminating the margin around the avatar.
     */
    imgPadding?: boolean;
    /**
     * The collection of `<BsChip>` property-value.
     */
    items: Array<TChipOptionItem>;
    /**
     * The value monitored by `v-model` for the selected items.
     */
    modelValue?: TChipValue | Array<TChipValue>;
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
    size?: string;
    /**
     * Show slider's button or not.
     */
    sliderButton?: boolean;
    /**
     * Slider button color appearance.
     */
    sliderButtonColor?: string;
}

export declare type TBsChip = ComponentObjectPropsOptions<TChipOptionProps>;

export declare type TBsChipGroup = ComponentObjectPropsOptions<TChipGroupOptionProps>;

declare type AllowedChipProps = AllowedComponentProps & ComponentCustomProps &
    VNodeProps & EventClosableProps & EventUpdateModelValueProps<boolean> & {
    'onUpdate:active'?: (active: boolean) => void;
}

declare type AllowedChipGroupProps = AllowedComponentProps & ComponentCustomProps &
    VNodeProps & EventUpdateModelValueProps<TChipValue | TChipValue[] | null> & {
    onChange?: (newValue: TChipValue | TChipValue[] | null) => void;
    'onItem:close'?: (dismissedItem: TChipValue) => void;
}

export declare const BsChip: {
    new(): {
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

export declare const BsChipGroup: {
    new(): {
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

export declare const BsChipPlugin: {
    new(): Plugin;
};

