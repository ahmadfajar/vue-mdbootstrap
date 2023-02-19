import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {computed, defineComponent, h, mergeProps, nextTick, onMounted, watch} from "vue";
import {cssPrefix, useGenerateId} from "../../mixins/CommonApi";
import type {TBsColorPicker, TColorPickerMode, TColorPickerOptionProps, TRecord} from "../../types";
import {
    initColorPickerData,
    moveAlphaSliderThumb,
    moveColorMarker,
    moveHueSliderThumb,
    useReleasePointerEvents,
    useRenderColorPicker,
    useUpdateColorCanvas
} from "./mixins/colorPickerApi";
import {colorPickerProps} from "./mixins/colorPickerProps";
import {hslaToString, hsvaToHsla, rgbaToHex, rgbaToString} from "./mixins/colorUtils";
import {BsPopover} from "../Popover";
import Helper from "../../utils/Helper";

export default defineComponent<TBsColorPicker, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsColorPicker",
    inheritAttrs: false,
    props: colorPickerProps,
    emits: [
        /**
         * Fired when this ColorPicker's mode is updated.
         */
        "update:mode",
        /**
         * Fired when this ColorPicker's value is updated.
         */
        "update:model-value",
        /**
         * Fired when this ColorPicker's popup state is updated.
         */
        "update:open",
    ],
    setup(props, {emit, attrs}) {
        const thisProps = props as Readonly<TColorPickerOptionProps>;
        const thisData = initColorPickerData(thisProps);
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
        const moveHueSliderThumbHandler = (event: Event) => {
            moveHueSliderThumb(<UIEvent>event, thisData, emit);
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
        watch(
            () => thisProps.modelValue,
            (value) => {
                if (thisData.config.value !== value) {
                    thisData.config.value = value;

                    // Sync internal data with the ColorPicker's Mode
                    useUpdateColorCanvas(thisData);
                    if (thisData.config.mode === "HSL") {
                        thisData.config.value = hslaToString(hsvaToHsla(thisData.config.currentColor));
                    } else if (thisData.config.mode === "RGB") {
                        thisData.config.value = rgbaToString(thisData.config.currentColor);
                    } else {
                        thisData.config.value = rgbaToHex(thisData.config.currentColor);
                    }
                }
            }
        );
        onMounted(() => {
            if (thisData.colorArea.value) {
                thisData.colorAreaRect = thisData.colorArea.value.getBoundingClientRect();
            }
            useReleasePointerEvents(
                thisData,
                moveColorMarkerHandler,
                moveHueSliderThumbHandler,
                moveAlphaSliderThumbHandler,
            );
            nextTick().then(() => {
                emit("update:mode", thisData.config.mode);
                useUpdateColorCanvas(thisData, emit);
            });
        });

        return () =>
            !Helper.isEmpty(thisProps.activator)
                ? h(BsPopover, mergeProps({
                    class: [`${cssPrefix}popover-color-picker`],
                    color: props.containerColor,
                    cover: props.cover,
                    open: props.open,
                    placement: props.placement,
                    space: props.space || 4,
                    transition: props.transition,
                    trigger: props.activator,
                    "onUpdate:open": (value: boolean) => emit("update:open", value),
                }, attrs), {
                    default: () => useRenderColorPicker(
                        thisProps, pickerClasses,
                        thisData, inputIDs, attrs, emit,
                        moveColorMarkerHandler,
                        moveHueSliderThumbHandler,
                        moveAlphaSliderThumbHandler,
                    )
                }) : useRenderColorPicker(
                    thisProps, pickerClasses,
                    thisData, inputIDs, attrs, emit,
                    moveColorMarkerHandler,
                    moveHueSliderThumbHandler,
                    moveAlphaSliderThumbHandler,
                )
    }
});
