import {
  useInitColorPickerData,
  useMoveAlphaSliderThumb,
  useMoveColorMarker,
  useMoveHueSliderThumb,
  useReleasePointerEvents,
  useRenderColorPicker,
  useUpdateColorCanvas,
} from '@/components/ColorPicker/mixins/colorPickerApi.ts';
import { colorPickerProps } from '@/components/ColorPicker/mixins/colorPickerProps.ts';
import type {
  TBsColorPicker,
  TColorPickerMode,
  TColorPickerOptionProps,
} from '@/components/ColorPicker/types';
import type { TStringRecord } from '@/components/Field/types';
import { BsPopover } from '@/components/Popover';
import { cssPrefix, useGenerateId } from '@/mixins/CommonApi.ts';
import { hslaToString, hsvaToHsla, rgbaToHex, rgbaToString } from '@/utils/colorUtils.ts';
import Helper from '@/utils/Helper.ts';
import { computed, defineComponent, h, mergeProps, onMounted, watch } from 'vue';

export default defineComponent<TBsColorPicker>({
  name: 'BsColorPicker',
  inheritAttrs: false,
  props: colorPickerProps,
  emits: ['update:mode', 'update:model-value', 'update:open'],
  setup(props, { emit, attrs, expose }) {
    const thisProps = props as Readonly<TColorPickerOptionProps>;
    const thisData = useInitColorPickerData(thisProps);
    const pickerClasses = computed(() => [
      `${cssPrefix}color-picker`,
      'inline-block',
      'relative',
      thisProps.containerColor
        ? thisProps.containerColor.startsWith('bg-')
          ? thisProps.containerColor
          : `bg-${thisProps.containerColor}`
        : '',
    ]);
    const inputIDs: TStringRecord = {
      H: useGenerateId(),
      S: useGenerateId(),
      L: useGenerateId(),
      A1: useGenerateId(),
      R: useGenerateId(),
      G: useGenerateId(),
      B: useGenerateId(),
      A2: useGenerateId(),
      HEX: useGenerateId(),
    };

    const moveColorMarkerHandler = (event: Event) => {
      useMoveColorMarker(event as UIEvent, emit, thisData);
    };

    const moveHueSliderThumbHandler = (event: Event) => {
      useMoveHueSliderThumb(event as UIEvent, emit, thisData);
    };

    const moveAlphaSliderThumbHandler = (event: Event) => {
      useMoveAlphaSliderThumb(event as UIEvent, emit, thisData);
    };

    const hexColor = () => rgbaToHex(thisData.config.currentColor);
    const rgbColor = () => thisData.colorRGB;
    const hslColor = () => thisData.colorHSL;

    expose({ hexColor, rgbColor, hslColor });

    watch(
      () => thisProps.mode,
      (value) => {
        thisData.config.mode = value as TColorPickerMode;
      }
    );

    watch(
      () => thisProps.modelValue,
      (value) => {
        if (thisData.config.value !== value) {
          thisData.config.value = value;

          // Sync internal data with the ColorPicker's Mode
          useUpdateColorCanvas(thisData);
          if (thisData.config.mode === 'HSL') {
            thisData.config.value = hslaToString(hsvaToHsla(thisData.config.currentColor));
          } else if (thisData.config.mode === 'RGB') {
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
        moveAlphaSliderThumbHandler
      );
      Helper.defer(() => {
        emit('update:mode', thisData.config.mode);
        useUpdateColorCanvas(thisData, emit);
      }, 100);
    });

    return () =>
      !Helper.isEmpty(thisProps.activator)
        ? h(
            BsPopover,
            mergeProps(
              {
                class: [`${cssPrefix}popover-color-picker`],
                color: props.containerColor,
                cover: props.cover,
                open: props.open,
                placement: props.placement,
                space: props.space || 4,
                transition: props.transition,
                trigger: props.activator,
                'onUpdate:open': (value: boolean) => emit('update:open', value),
              },
              attrs
            ),
            {
              default: () =>
                useRenderColorPicker(
                  thisProps,
                  pickerClasses,
                  thisData,
                  inputIDs,
                  attrs,
                  emit,
                  moveColorMarkerHandler,
                  moveHueSliderThumbHandler,
                  moveAlphaSliderThumbHandler
                ),
            }
          )
        : useRenderColorPicker(
            thisProps,
            pickerClasses,
            thisData,
            inputIDs,
            attrs,
            emit,
            moveColorMarkerHandler,
            moveHueSliderThumbHandler,
            moveAlphaSliderThumbHandler
          );
  },
});
