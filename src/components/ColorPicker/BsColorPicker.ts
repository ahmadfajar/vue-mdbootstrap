import {
    ComponentOptionsMixin,
    computed,
    ComputedOptions,
    defineComponent,
    EmitsOptions,
    nextTick,
    onMounted,
    reactive,
    ref,
    watch
} from "vue";
import {cssPrefix, useGenerateId} from "../../mixins/CommonApi";
import type {TBsColorPicker, TColorPickerData, TColorPickerMode, TColorPickerOptionProps, TRecord} from "../../types";
import {
    moveAlphaSliderThumb,
    moveColorMarker,
    moveColorSliderThumb, useReleasePointerEvents,
    useRenderColorPicker,
    useUpdateCanvasColor
} from "./mixins/colorPickerApi";
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
            config: reactive({
                currentColor: {r: 0, g: 0, b: 0, h: 0, s: 0, v: 0, a: 1},
                colorSlider: 0,
                alphaSlider: 100,
                value: thisProps.modelValue,
                mode: <TColorPickerMode>thisProps.mode,
            }),
            pickerEl: ref<HTMLElement | null>(null),
            colorArea: ref<HTMLElement | null>(null),
            colorAreaRect: DOMRect.fromRect({width: 0, height: 0, x: 0, y: 0}),
            colorMarker: ref<HTMLElement | null>(null),
            colorPreview: ref<HTMLElement | null>(null),
            colorSlider: ref<HTMLElement | null>(null),
            colorSliderMarker: ref<HTMLElement | null>(null),
            // colorSliderValue: ref<number>(0),
            alphaSlider: ref<HTMLElement | null>(null),
            alphaSliderMarker: ref<HTMLElement | null>(null),
            // alphaSliderValue: ref<number>(100),
            canvasCtx: document.createElement("canvas").getContext("2d"),
        };
        const pickerClasses = computed(() => [
            `${cssPrefix}color-picker`,
            `bg-${thisProps.containerColor}`,
        ]);
        const inputIDs: Record<string, string> = {
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
        const moveColorMarkerHandler = (event: Event) => {
            moveColorMarker(<UIEvent>event, thisData, emit);
        }
        const moveColorSliderThumbHandler = (event: Event) => {
            moveColorSliderThumb(<UIEvent>event, thisData, emit);
        }
        const moveAlphaSliderThumbHandler = (event: Event) => {
            moveAlphaSliderThumb(<UIEvent>event, thisData, emit);
        }

        watch(
            () => thisProps.mode,
            (value) => {
                thisData.config.mode = <TColorPickerMode>value;
            }
        );
        onMounted(() => {
            if (thisData.colorArea.value) {
                thisData.colorAreaRect = thisData.colorArea.value.getBoundingClientRect();
            }
            useReleasePointerEvents(
                moveColorMarkerHandler,
                moveColorSliderThumbHandler,
                moveAlphaSliderThumbHandler,
            );
            nextTick().then(() => emit("update:mode", thisData.config.mode));
            useUpdateCanvasColor(thisData, emit);
        });

        return () =>
            useRenderColorPicker(
                thisProps, pickerClasses,
                thisData, inputIDs, attrs, emit,
                moveColorMarkerHandler,
                moveColorSliderThumbHandler,
                moveAlphaSliderThumbHandler,
            )
    }
});
