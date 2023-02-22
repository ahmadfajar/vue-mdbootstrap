import type {
    ComponentObjectPropsOptions,
    ComponentOptionsMixin,
    ComputedOptions,
    DefineComponent,
    EmitsOptions,
    Ref,
    UnwrapNestedRefs
} from "vue";
import type {HSLA, RGBA, TColor, TPopoverPosition, TRecord} from "../../../types";

export type {HSLA, HSVA, RGBA, TColor} from "../../../mixins/colorUtils";

export declare type TColorPickerMode = "HEX" | "RGB" | "HSL";

declare type TColorPickerValue = {
    currentColor: TColor;
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
    colorRGB: RGBA;
    colorHSL: HSLA;
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
    mode?: TColorPickerMode | string;
    modelValue?: string;
    /**
     * This ColorPicker display placement when property `activator` is defined.
     */
    placement?: TPopoverPosition | string;
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

export declare const BsColorPicker: DefineComponent<TBsColorPicker, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
