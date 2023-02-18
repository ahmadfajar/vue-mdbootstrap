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

export type {HSLA, HSVA, RGBA, TColor} from "../mixins/colorUtils";

export declare type TColorPickerMode = "HEX" | "RGB" | "HSL";

declare type TColorPickerValue = {
    currentColor: TColor;
    colorSlider: number;
    alphaSlider: number;
    mode: TColorPickerMode;
    value: string | undefined;
}

export declare type TColorPickerData = {
    config: UnwrapNestedRefs<TColorPickerValue>;
    colorRGB: RGBA;
    colorHSL: HSLA;
    pickerEl: Ref<HTMLElement | null>;
    colorArea: Ref<HTMLElement | null>;
    colorAreaRect: DOMRect;
    colorMarker: Ref<HTMLElement | null>;
    colorPreview: Ref<HTMLElement | null>;
    colorSlider: Ref<HTMLElement | null>;
    colorSliderMarker: Ref<HTMLElement | null>;
    alphaSlider: Ref<HTMLElement | null>;
    alphaSliderMarker: Ref<HTMLElement | null>;
    canvasCtx?: CanvasRenderingContext2D | null;
}

export declare type TColorPickerOptionProps = {
    /**
     * Display this ColorPicker as a popup dialog and calculate its display
     * position from the activator element.
     *
     * Leave it `undefined` to display ColorPicker persistently.
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
     * Disable this ColorPicker and prevents changing its values.
     */
    disabled?: boolean;
    hideAlpha?: boolean;
    hideInputs?: boolean;
    hideModeButton?: boolean;
    modeButtonOutlined?: boolean;
    modeButtonColor?: string;
    modeButtonSelectedColor?: string;
    inputLabelClass?: string | string[];
    /**
     * This Popover state: show or hide.
     */
    open?: boolean;
    mode?: TColorPickerMode | string;
    modelValue?: string;
    /**
     * This ColorPicker display placement when property `activator` is defined..
     */
    placement?: TPopoverPosition | string;
    /**
     * Number of pixel to shift the ColorPicker display position from the activator element.
     */
    space?: string | number;
    /**
     * Transition animation when displaying the ColorPicker.
     * This animation is effected by `placement` property.
     */
    transition?: string;
}

export declare type TBsColorPicker = ComponentObjectPropsOptions<TColorPickerOptionProps>;

export declare const BsColorPicker: DefineComponent<TBsColorPicker, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
