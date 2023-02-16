import type {
    ComponentObjectPropsOptions,
    ComponentOptionsMixin,
    ComputedOptions,
    DefineComponent,
    EmitsOptions,
    Ref
} from "vue";
import type {TColors, TPopoverPosition, TRecord} from "../../../types";

export type {THsla, THsva, TRgba, TColors} from "../mixins/colorUtils";

export declare type TColorPickerMode = "HEX" | "RGB" | "HSL";

export declare type TElementRect = {
    width: number;
    height: number;
    x: number;
    y: number;
}

export declare type TColorPickerData = {
    pickerMode: Ref<TColorPickerMode>;
    pickerValue: Ref<string | undefined>;
    pickerEl: Ref<Element | null>;
    colorArea: Ref<Element | null>;
    colorAreaRect: TElementRect;
    colorValues: TColors;
    colorMarker: Ref<Element | null>;
    colorPreview: Ref<Element | null>;
    colorSlider: Ref<Element | null>;
    colorSliderMarker: Ref<Element | null>;
    colorSliderValue: Ref<number>;
    alphaSlider: Ref<Element | null>;
    alphaSliderMarker: Ref<Element | null>;
    alphaSliderValue: Ref<number>;
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
