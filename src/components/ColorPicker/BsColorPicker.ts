import {
    ComponentOptionsMixin,
    computed,
    ComputedOptions,
    defineComponent,
    EmitsOptions,
    onMounted,
    ref,
    watch
} from "vue";
import {cssPrefix, useGenerateId} from "../../mixins/CommonApi";
import type {TBsColorPicker, TColorPickerData, TColorPickerMode, TColorPickerOptionProps, TRecord} from "../../types";
import {moveColorMarkerListener, useRenderColorPicker} from "./mixins/colorPickerApi";
import {colorPickerProps} from "./mixins/colorPickerProps";

export default defineComponent<TBsColorPicker, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsColorPicker",
    inheritAttrs: false,
    props: colorPickerProps,
    emits: [
        /**
         * Callback fired when this ColorPicker's mode is updated.
         */
        "update:mode",
        /**
         * Callback fired when this ColorPicker's value is updated.
         */
        "update:model-value",
    ],
    setup(props, {emit, attrs}) {
        const thisProps = props as Readonly<TColorPickerOptionProps>;
        const thisData: TColorPickerData = {
            pickerMode: ref<TColorPickerMode>(<TColorPickerMode>thisProps.mode),
            pickerValue: ref(thisProps.modelValue),
            pickerEl: ref<Element | null>(null),
            colorArea: ref<Element | null>(null),
            colorAreaRect: {width: 0, height: 0, x: 0, y: 0},
            colorValues: {r: 0, g: 0, b: 0, h: 0, s: 0, v: 0, a: 1},
            colorMarker: ref<Element | null>(null),
            colorPreview: ref<Element | null>(null),
            colorSlider: ref<Element | null>(null),
            colorSliderMarker: ref<Element | null>(null),
            colorSliderValue: ref<number>(0),
            alphaSlider: ref<Element | null>(null),
            alphaSliderMarker: ref<Element | null>(null),
            alphaSliderValue: ref<number>(1),
        };
        const pickerClasses = computed(() => [
            `${cssPrefix}color-picker`,
            `bg-${thisProps.containerColor}`,
        ]);
        const inputIDs: TRecord = {
            "H": useGenerateId(),
            "S": useGenerateId(),
            "L": useGenerateId(),
            "A1": useGenerateId(),
            "R": useGenerateId(),
            "G": useGenerateId(),
            "B": useGenerateId(),
            "A2": useGenerateId(),
            "HEX": useGenerateId(),
        }

        watch(
            () => thisProps.mode,
            (value) => {
                thisData.pickerMode.value = <TColorPickerMode>value;
            }
        );
        onMounted(() => {
            document.addEventListener(
                "mouseup",
                () => moveColorMarkerListener("mousemove", thisData, emit, true)
            );
            document.addEventListener(
                "touchend",
                () => moveColorMarkerListener("touchmove", thisData, emit, true, {passive: false})
            );
        });

        return () =>
            useRenderColorPicker(thisProps, pickerClasses, thisData, inputIDs, attrs, emit)
    }
});
