import {
    AllowedComponentProps,
    ComponentCustomProps,
    ComponentObjectPropsOptions,
    Plugin,
    Ref,
    UnwrapNestedRefs,
    VNodeProps
} from 'vue';
import { Color, EventUpdateModelValueProps, EventUpdateOpenProps, TPopoverPosition } from '../../../types';

export declare type TColorPickerMode = 'HEX' | 'RGB' | 'HSL';

declare type TColorPickerValue = {
    currentColor: Color.TColor;
    hueSlider: number;
    alphaSlider: number;
    mode: TColorPickerMode;
    value: string | undefined;
}

/**
 * ColorPicker internal data structures.
 */
export declare type TColorPickerData = {
    config: UnwrapNestedRefs<TColorPickerValue>;
    colorRGB: Color.RGBA;
    colorHSL: Color.HSLA;
    pickerEl: Ref<HTMLElement | null>;
    colorArea: Ref<HTMLElement | null>;
    colorAreaRect: DOMRect;
    colorMarker: Ref<HTMLElement | null>;
    colorPreview: Ref<HTMLElement | null>;
    hueSlider: Ref<HTMLElement | null>;
    hueSliderThumb: Ref<HTMLElement | null>;
    alphaSlider: Ref<HTMLElement | null>;
    alphaSliderThumb: Ref<HTMLElement | null>;
    canvasCtx?: CanvasRenderingContext2D | null;
}

export declare type TColorPickerOptionProps = {
    /**
     * Display this ColorPicker as a popup dialog and calculate its display
     * position from the activator element.
     *
     * Leave it `undefined` to display persistent/inline ColorPicker.
     */
    activator?: Element | string;
    /**
     * This ColorPicker container background color.
     */
    containerColor?: string;
    /**
     * Display ColorPicker at a position that covers the activator element.
     */
    cover?: boolean;
    /**
     * Hide alpha slider and alpha input field.
     */
    hideAlpha?: boolean;
    /**
     * Hide the input fields.
     */
    hideInputs?: boolean;
    /**
     * Hide toggle mode buttons.
     */
    hideModeButton?: boolean;
    /**
     * Render the toggle mode buttons with outlined style.
     */
    outlineModeButton?: boolean;
    /**
     * Default the toggle mode button color style.
     */
    modeButtonColor?: string;
    /**
     * Color to apply to the active button.
     */
    modeButtonToggleColor?: string;
    /**
     * Apply custom css style to the input field label.
     */
    inputLabelClass?: string | string[];
    /**
     * This ColorPicker popup state: `show` or `hide`.
     * Only works if activator element is defined.
     */
    open?: boolean;
    /**
     * This ColorPicker mode. Valid values: `HEX`, `RGB`, `HSL`.
     */
    mode?: TColorPickerMode;
    modelValue?: string;
    /**
     * This ColorPicker display placement when property `activator` is defined.
     */
    placement?: TPopoverPosition;
    /**
     * Number of pixel to shift the ColorPicker display position from the activator element.
     */
    space?: string | number;
    /**
     * Custom color swatches to display at the bottom ColorPicker.
     */
    swatches?: string[];
    /**
     * Sets the maximum height of the swatches section.
     */
    swatchesMaxHeight?: string | number;
    /**
     * Transition animation when displaying the ColorPicker.
     * This animation is effected by `placement` property.
     */
    transition?: string;
}

export declare type TBsColorPicker = ComponentObjectPropsOptions<TColorPickerOptionProps>;

declare type AllowedColorPickerProps = AllowedComponentProps & ComponentCustomProps &
    VNodeProps & EventUpdateOpenProps & EventUpdateModelValueProps<string> & {
    'onUpdate:mode'?: (mode: TColorPickerMode) => void;
    '@update:mode'?: (mode: TColorPickerMode) => void;
}

export declare const BsColorPicker: {
    new(): {
        $props: AllowedColorPickerProps & TColorPickerOptionProps;
        $emit: [
            /**
             * Fired when this ColorPicker's mode is updated.
             */
            'update:mode',
            /**
             * Fired when this ColorPicker's value is updated.
             */
            'update:model-value',
            /**
             * Fired when this ColorPicker's popup state is updated.
             */
            'update:open',
        ];
    };
};

export declare const BsColorPickerPlugin: Plugin;
