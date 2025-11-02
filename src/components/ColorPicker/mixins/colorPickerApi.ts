import { BsToggleButton } from '@/components/Button';
import { cssPrefix, useMergeClass } from '@/mixins/CommonApi.ts';
import { preventEventTarget } from '@/mixins/DomHelper.ts';
import type {
  Color,
  TBsToggleButton,
  TButtonSize,
  TColorPickerData,
  TColorPickerMode,
  TColorPickerOptionProps,
  TEmitFn,
  TInputOptionItem,
  TRecord,
  TStringRecord,
} from '@/types';
import {
  hslaToHsva,
  hslaToString,
  hsvaToHsla,
  hsvaToRgba,
  oklchToRgba,
  oklchToString,
  rgbaFromString,
  rgbaToHex,
  rgbaToHsva,
  rgbaToOklch,
  rgbaToString,
} from '@/utils/colorUtils.ts';
import Helper from '@/utils/Helper.ts';
import { isStartWith } from '@/utils/StringHelper.ts';
import type { ComputedRef, Prop, VNode } from 'vue';
import { createCommentVNode, h, mergeProps, nextTick, reactive, ref } from 'vue';

export function useInitColorPickerData(props: Readonly<TColorPickerOptionProps>): TColorPickerData {
  return {
    config: reactive({
      currentColor: { r: 0, g: 0, b: 0, h: 0, s: 0, v: 0, a: 1 },
      hueSlider: 0,
      alphaSlider: 100,
      value: props.modelValue,
      mode: props.mode as TColorPickerMode,
    }),
    colorRGB: reactive<Color.RGBA>({ r: 0, g: 0, b: 0, a: 1 }),
    colorHSL: reactive<Color.HSLA>({ h: 0, s: 0, l: 0, a: 1 }),
    colorOKLCH: reactive<Color.LCHA>({ l: 0, c: 0, h: 0, a: 1 }),
    pickerEl: ref<HTMLElement | null>(null),
    colorArea: ref<HTMLElement | null>(null),
    colorAreaRect: DOMRect.fromRect({ width: 0, height: 0, x: 0, y: 0 }),
    colorMarker: ref<HTMLElement | null>(null),
    colorPreview: ref<HTMLElement | null>(null),
    hueSlider: ref<HTMLElement | null>(null),
    hueSliderThumb: ref<HTMLElement | null>(null),
    alphaSlider: ref<HTMLElement | null>(null),
    alphaSliderThumb: ref<HTMLElement | null>(null),
    canvasCtx: document.createElement('canvas').getContext('2d'),
  };
}

function createHueSliderControl(
  emit: TEmitFn,
  pickerData: TColorPickerData,
  hueSliderThumbMoveHandler: EventListener
): VNode {
  return h(
    'div',
    {
      ref: pickerData.hueSlider,
      class: [`${cssPrefix}hue-slider`, 'relative'],
    },
    [
      h(
        'div',
        {
          class: [`${cssPrefix}slider-track`, 'flex', 'items-center', 'relative', 'w-full'],
          onClick: (event: UIEvent) => {
            pickerData.hueSliderThumb.value?.classList.add(
              'move-transition',
              `${cssPrefix}focused`
            );
            useMoveHueSliderThumb(event, emit, pickerData);
            Helper.defer(() => {
              pickerData.hueSliderThumb.value?.classList.remove('move-transition');
            }, 100);
          },
        },
        [
          h(
            'div',
            {
              tabIndex: 0,
              ref: pickerData.hueSliderThumb,
              class: [`${cssPrefix}slider-thumb`, 'absolute'],
              onBlur: (event: Event) => {
                (event.target as HTMLElement).classList.remove(`${cssPrefix}focused`);
              },
              onKeydown: (event: KeyboardEvent) => {
                const movements: Record<string, number> = {
                  ArrowLeft: -1,
                  ArrowRight: 1,
                };
                if (Object.keys(movements).includes(event.key)) {
                  pickerData.hueSliderThumb.value?.classList.add(`${cssPrefix}focused`);
                  moveSliderThumbOnKeydown(
                    pickerData.hueSliderThumb.value as HTMLElement,
                    movements[event.key]!,
                    pickerData,
                    emit,
                    updateHueSliderThumbUI
                  );
                  event.preventDefault();
                }
              },
              onMousedown: () => {
                pickerData.hueSliderThumb.value?.classList.add(`${cssPrefix}pressed`);
                document.addEventListener('mousemove', hueSliderThumbMoveHandler);
              },
              onTouchstart: () => {
                pickerData.hueSliderThumb.value?.classList.add(`${cssPrefix}pressed`);
                document.addEventListener('touchmove', hueSliderThumbMoveHandler, {
                  passive: false,
                });
              },
            },
            [
              h('div', {
                class: [`${cssPrefix}slider-thumb-surface`, 'h-full', 'w-full', 'select-none'],
              }),
              h('div', {
                class: [`${cssPrefix}slider-thumb-ripple`, 'absolute'],
              }),
            ]
          ),
        ]
      ),
    ]
  );
}

function createAlphaSliderControl(
  emit: TEmitFn,
  pickerData: TColorPickerData,
  alphaSliderThumbMoveHandler: EventListener
): VNode {
  return h(
    'div',
    {
      ref: pickerData.alphaSlider,
      class: [`${cssPrefix}alpha-slider`, 'relative'],
    },
    [
      h(
        'div',
        {
          class: [`${cssPrefix}slider-track`, 'flex', 'items-center', 'relative', 'w-full'],
          onClick: (event: UIEvent) => {
            pickerData.alphaSliderThumb.value?.classList.add(
              'move-transition',
              `${cssPrefix}focused`
            );
            useMoveAlphaSliderThumb(event, emit, pickerData);
            Helper.defer(() => {
              pickerData.alphaSliderThumb.value?.classList.remove('move-transition');
            }, 100);
          },
        },
        [
          h('div', {
            class: [`${cssPrefix}slider-track-alpha`, 'h-full', 'w-full'],
          }),
          h(
            'div',
            {
              tabIndex: 0,
              ref: pickerData.alphaSliderThumb,
              class: [`${cssPrefix}slider-thumb`, 'absolute'],
              onBlur: (event: Event) => {
                (event.target as HTMLElement).classList.remove(`${cssPrefix}focused`);
              },
              onKeydown: (event: KeyboardEvent) => {
                const movements: Record<string, number> = {
                  ArrowLeft: -1,
                  ArrowRight: 1,
                };
                if (Object.keys(movements).includes(event.key)) {
                  pickerData.alphaSliderThumb.value?.classList.add(`${cssPrefix}focused`);
                  moveSliderThumbOnKeydown(
                    pickerData.alphaSliderThumb.value as HTMLElement,
                    movements[event.key]!,
                    pickerData,
                    emit,
                    updateAlphaSliderThumbUI
                  );
                  event.preventDefault();
                }
              },
              onMousedown: () => {
                pickerData.alphaSliderThumb.value?.classList.add(`${cssPrefix}pressed`);
                document.addEventListener('mousemove', alphaSliderThumbMoveHandler);
              },
              onTouchstart: () => {
                pickerData.alphaSliderThumb.value?.classList.add(`${cssPrefix}pressed`);
                document.addEventListener('touchmove', alphaSliderThumbMoveHandler, {
                  passive: false,
                });
              },
            },
            [
              h('div', {
                class: [`${cssPrefix}slider-thumb-surface`, 'h-full', 'w-full', 'select-none'],
              }),
              h('div', {
                class: [`${cssPrefix}slider-thumb-ripple`, 'absolute'],
              }),
            ]
          ),
        ]
      ),
    ]
  );
}

function renderColorPickerControls(
  props: Readonly<TColorPickerOptionProps>,
  pickerData: TColorPickerData,
  cssNamePrefix: string,
  emit: TEmitFn,
  hueSliderThumbMoveHandler: EventListener,
  alphaSliderThumbMoveHandler: EventListener
): VNode {
  const sliders = [createHueSliderControl(emit, pickerData, hueSliderThumbMoveHandler)];

  if (!props.hideAlpha) {
    sliders.push(createAlphaSliderControl(emit, pickerData, alphaSliderThumbMoveHandler));
  }

  return h(
    'div',
    {
      class: [`${cssNamePrefix}controls`, 'flex', 'items-center'],
    },
    [
      h(
        'div',
        {
          ref: pickerData.colorPreview,
          class: [`${cssNamePrefix}preview`, 'relative'],
        },
        [
          h(
            'div',
            {
              class: [`${cssNamePrefix}selected-color`, 'h-full', 'w-full'],
            },
            [
              h('div', {
                class: [`${cssNamePrefix}selected-color-alpha`, 'h-full', 'w-full'],
              }),
            ]
          ),
        ]
      ),
      h(
        'div',
        {
          class: [`${cssNamePrefix}sliders`, 'flex', 'flex-col'],
        },
        sliders
      ),
    ]
  );
}

function createInputLabel(
  props: Readonly<TColorPickerOptionProps>,
  cssNamePrefix: string,
  forID: string,
  label: string
): VNode {
  return h(
    'label',
    {
      class: useMergeClass(
        [`${cssNamePrefix}input-label`, 'select-none'],
        props.inputLabelClass as string | string[]
      ),
      for: forID,
    },
    label
  );
}

function createInputNumber(
  pickerData: TColorPickerData,
  emit: TEmitFn,
  cssNamePrefix: string,
  inputID: string,
  placeholder: string,
  maxValue = 255,
  step?: number,
  maxLength?: number
): VNode {
  const mode = pickerData.config.mode;
  let value: number | string;

  // process RGB color mode
  if (mode === 'RGB' && placeholder.startsWith('R')) {
    value = pickerData.colorRGB.r;
  } else if (mode === 'RGB' && placeholder.startsWith('G')) {
    value = pickerData.colorRGB.g;
  } else if (mode === 'RGB' && placeholder.startsWith('B')) {
    value = pickerData.colorRGB.b;
  }
  // process HSL color mode
  else if (mode === 'HSL' && placeholder.startsWith('H')) {
    value = pickerData.colorHSL.h;
  } else if (mode === 'HSL' && placeholder.startsWith('S')) {
    value = pickerData.colorHSL.s;
  } else if (mode === 'HSL' && placeholder.startsWith('L')) {
    value = pickerData.colorHSL.l;
  }
  // process OKLCH color mode
  else if (mode === 'OKLCH' && placeholder.startsWith('L')) {
    value = pickerData.colorOKLCH.l.toFixed(3);
  } else if (mode === 'OKLCH' && placeholder.startsWith('C')) {
    value = pickerData.colorOKLCH.c.toFixed(3);
  } else if (mode === 'OKLCH' && placeholder.startsWith('H')) {
    value = pickerData.colorOKLCH.h.toFixed(1);
  } else {
    // process alpha transparency
    if (mode === 'OKLCH') {
      value =
        pickerData.colorOKLCH.a < 1.0
          ? pickerData.colorOKLCH.a.toFixed(2)
          : pickerData.colorOKLCH.a;
    } else if (mode === 'HSL') {
      value =
        pickerData.colorHSL.a < 1.0 ? pickerData.colorHSL.a.toFixed(2) : pickerData.colorHSL.a;
    } else {
      value =
        pickerData.colorRGB.a < 1.0 ? pickerData.colorRGB.a.toFixed(2) : pickerData.colorRGB.a;
    }
  }

  return h(
    'div',
    {
      class: [`${cssNamePrefix}input-col`, 'flex-fill'],
    },
    [
      h('input', {
        class: ['form-input-number', 'block', 'w-full'],
        type: 'number',
        id: inputID,
        min: 0,
        max: maxValue,
        maxlength: maxLength,
        step: step,
        value: value,
        placeholder: placeholder,
        onChange: (event: Event) => {
          onUpdateInputNumber(
            (event.target as HTMLInputElement).value,
            placeholder,
            pickerData,
            emit
          );
        },
      }),
    ]
  );
}

function onUpdateInputNumber(
  value: string,
  placeholder: string,
  pickerData: TColorPickerData,
  emit: TEmitFn
): void {
  const mode = pickerData.config.mode;
  let srcValue =
    mode === 'RGB' && !placeholder.startsWith('A')
      ? Number.parseInt(value.trim())
      : mode === 'HSL' && placeholder.startsWith('H')
        ? Number.parseInt(value.trim())
        : Number.parseFloat(value.trim());

  let rgba: Color.RGBA | undefined;
  let hsla: Color.HSLA | undefined;
  let hsva: Color.HSVA | undefined;
  let lcha: Color.LCHA | undefined;

  // Prevent value from going out of bounds.
  if (srcValue < 0) {
    srcValue = 0;
  } else if (isStartWith(placeholder, ['S', 'L', 'C', 'A']) && srcValue > 1) {
    srcValue = 1;
  } else if (isStartWith(placeholder, ['R', 'G', 'B']) && srcValue > 255) {
    srcValue = 255;
  } else if (placeholder.startsWith('H') && srcValue > 360) {
    srcValue = 360;
  }

  if (mode === 'OKLCH') {
    lcha = pickerData.colorOKLCH;

    if (placeholder.startsWith('L')) {
      lcha.l = srcValue;
    } else if (placeholder.startsWith('C')) {
      lcha.c = srcValue;
    } else if (placeholder.startsWith('H')) {
      lcha.h = srcValue;
    } else {
      lcha.a = srcValue;
    }

    rgba = oklchToRgba(lcha);
    hsva = rgbaToHsva(rgba);
  } else if (mode === 'HSL') {
    hsla = pickerData.colorHSL;

    if (placeholder.startsWith('H')) {
      hsla.h = srcValue;
    } else if (placeholder.startsWith('S')) {
      hsla.s = srcValue;
    } else if (placeholder.startsWith('L')) {
      hsla.l = srcValue;
    } else {
      hsla.a = srcValue;
    }

    hsva = hslaToHsva(hsla);
    rgba = hsvaToRgba(hsva);
  } else {
    rgba = pickerData.colorRGB;

    if (placeholder.startsWith('R')) {
      rgba.r = srcValue;
    } else if (placeholder.startsWith('G')) {
      rgba.g = srcValue;
    } else if (placeholder.startsWith('B')) {
      rgba.b = srcValue;
    } else {
      rgba.a = srcValue;
    }

    hsva = rgbaToHsva(rgba);
  }

  updateColor(pickerData, rgba, hsva);
  updateColorCanvasUI(pickerData, hsva);
  updateColorPreview(pickerData, emit);
}

/**
 * Create form input for HSLA.
 */
function createInputColorHSL(
  props: Readonly<TColorPickerOptionProps>,
  pickerData: TColorPickerData,
  cssNamePrefix: string,
  inputIDs: TStringRecord,
  emit: TEmitFn
): VNode {
  const inputHSL = [
    createInputLabel(props, cssNamePrefix, inputIDs.H1!, 'H'),
    createInputNumber(pickerData, emit, cssNamePrefix, inputIDs.H1!, 'Hue', 360),
    createInputLabel(props, cssNamePrefix, inputIDs.S1!, 'S'),
    createInputNumber(pickerData, emit, cssNamePrefix, inputIDs.S1!, 'Sat', 1, 0.01),
    createInputLabel(props, cssNamePrefix, inputIDs.L1!, 'L'),
    createInputNumber(pickerData, emit, cssNamePrefix, inputIDs.L1!, 'Light', 1, 0.01),
  ];

  if (!props.hideAlpha) {
    inputHSL.push(
      createInputLabel(props, cssNamePrefix, inputIDs.A1!, 'A'),
      createInputNumber(pickerData, emit, cssNamePrefix, inputIDs.A1!, 'Alpha', 1, 0.01)
    );
  }

  return h(
    'div',
    {
      class: [`${cssNamePrefix}input-row`, `${cssPrefix}gap-x-2`, 'flex', 'items-center'],
    },
    inputHSL
  );
}

/**
 * Create form input for RGBA.
 */
function createInputColorRGB(
  props: Readonly<TColorPickerOptionProps>,
  pickerData: TColorPickerData,
  cssNamePrefix: string,
  inputIDs: TStringRecord,
  emit: TEmitFn
): VNode {
  const inputRGB = [
    createInputLabel(props, cssNamePrefix, inputIDs.R2!, 'R'),
    createInputNumber(pickerData, emit, cssNamePrefix, inputIDs.R2!, 'Red'),
    createInputLabel(props, cssNamePrefix, inputIDs.G2!, 'G'),
    createInputNumber(pickerData, emit, cssNamePrefix, inputIDs.G2!, 'Green'),
    createInputLabel(props, cssNamePrefix, inputIDs.B2!, 'B'),
    createInputNumber(pickerData, emit, cssNamePrefix, inputIDs.B2!, 'Blue'),
  ];

  if (!props.hideAlpha) {
    inputRGB.push(
      createInputLabel(props, cssNamePrefix, inputIDs.A2!, 'A'),
      createInputNumber(pickerData, emit, cssNamePrefix, inputIDs.A2!, 'Alpha', 1, 0.01)
    );
  }

  return h(
    'div',
    {
      class: [`${cssNamePrefix}input-row`, `${cssPrefix}gap-x-2`, 'flex', 'items-center'],
    },
    inputRGB
  );
}

/**
 * Create form input for OKLCH.
 */
function createInputColorLCH(
  props: Readonly<TColorPickerOptionProps>,
  pickerData: TColorPickerData,
  cssNamePrefix: string,
  inputIDs: TStringRecord,
  emit: TEmitFn
): VNode {
  const inputLCH = [
    createInputLabel(props, cssNamePrefix, inputIDs.L3!, 'L'),
    createInputNumber(pickerData, emit, cssNamePrefix, inputIDs.L3!, 'Light', 1, 0.001),
    createInputLabel(props, cssNamePrefix, inputIDs.C3!, 'C'),
    createInputNumber(pickerData, emit, cssNamePrefix, inputIDs.C3!, 'Chroma', 1, 0.001),
    createInputLabel(props, cssNamePrefix, inputIDs.H3!, 'H'),
    createInputNumber(pickerData, emit, cssNamePrefix, inputIDs.H3!, 'Hue', 360, 0.1),
  ];

  if (!props.hideAlpha) {
    inputLCH.push(
      createInputLabel(props, cssNamePrefix, inputIDs.A3!, 'A'),
      createInputNumber(pickerData, emit, cssNamePrefix, inputIDs.A3!, 'Alpha', 1, 0.01)
    );
  }

  return h(
    'div',
    {
      class: [`${cssNamePrefix}input-row`, `${cssPrefix}gap-x-2`, 'flex', 'items-center'],
    },
    inputLCH
  );
}

/**
 * Create form input for HEX color format.
 */
function createInputColorHEX(
  props: Readonly<TColorPickerOptionProps>,
  pickerData: TColorPickerData,
  cssNamePrefix: string,
  inputIDs: Record<string, string>,
  emit: TEmitFn
): VNode {
  return h(
    'div',
    {
      class: [`${cssNamePrefix}input-row`, `${cssPrefix}gap-x-2`, 'flex', 'items-center'],
    },
    [
      createInputLabel(props, cssNamePrefix, inputIDs.HEX!, 'HEX'),
      h(
        'div',
        {
          class: [`${cssNamePrefix}input-col`, 'flex-fill'],
        },
        [
          h('input', {
            class: ['form-input-text', 'block', 'w-full'],
            type: 'text',
            id: inputIDs.HEX,
            maxlength: 9,
            value: pickerData.config.value,
            placeholder: 'Enter HEX color',
            onChange: (event: Event) => {
              onUpdateInputColorHex((event.target as HTMLInputElement).value, pickerData, emit);
            },
          }),
        ]
      ),
    ]
  );
}

function onUpdateInputColorHex(value: string, pickerData: TColorPickerData, emit: TEmitFn): void {
  if (value && pickerData.config.value !== value && [6, 7, 9].includes(value.length)) {
    let srcStr = value.trim();

    if (!value.startsWith('#')) {
      srcStr = '#' + value.trim();
    }

    const rgba = rgbaFromString(pickerData.canvasCtx as CanvasRenderingContext2D, srcStr);
    const hsva = rgbaToHsva(rgba);

    updateColor(pickerData, rgba, hsva);
    updateColorCanvasUI(pickerData, hsva);
    updateColorPreview(pickerData, emit);
  }
}

function renderColorPickerInputs(
  props: Readonly<TColorPickerOptionProps>,
  pickerData: TColorPickerData,
  cssNamePrefix: string,
  inputIDs: Record<string, string>,
  emit: TEmitFn
): VNode {
  if (props.hideInputs === true) {
    return createCommentVNode(' v-if-inputs ', true);
  }

  return h(
    'div',
    {
      class: [`${cssNamePrefix}inputs`],
      // style: { paddingTop: '0.5rem' },
    },
    [
      pickerData.config.mode === 'OKLCH'
        ? createInputColorLCH(props, pickerData, cssNamePrefix, inputIDs, emit)
        : pickerData.config.mode === 'HSL'
          ? createInputColorHSL(props, pickerData, cssNamePrefix, inputIDs, emit)
          : pickerData.config.mode === 'RGB'
            ? createInputColorRGB(props, pickerData, cssNamePrefix, inputIDs, emit)
            : createInputColorHEX(props, pickerData, cssNamePrefix, inputIDs, emit),
    ]
  );
}

function renderColorPickerModeButtons(
  props: Readonly<TColorPickerOptionProps>,
  pickerData: TColorPickerData,
  emit: TEmitFn
): VNode {
  if (props.hideModeButton === true) {
    return createCommentVNode(' v-if-mode-buttons ', true);
  }

  return h(
    'div',
    {
      class: ['flex', 'justify-center', 'py-2'],
    },
    [
      h<TBsToggleButton>(BsToggleButton, {
        size: 'sm' as Prop<TButtonSize>,
        color: props.modeButtonColor as Prop<string>,
        toggleColor: props.modeButtonToggleColor as Prop<string>,
        outlined: props.modeButtonOutlined as unknown as Prop<boolean>,
        items: [
          { value: 'HEX', label: 'HEX' },
          { value: 'RGB', label: 'RGB' },
          { value: 'HSL', label: 'HSL' },
          { value: 'OKLCH', label: 'OKLCH' },
        ] as Prop<TInputOptionItem[]>,
        modelValue: pickerData.config.mode as Prop<string>,
        'onUpdate:model-value': async (value: TColorPickerMode) => {
          pickerData.config.mode = value;
          dispatchModelValue(emit, pickerData);
          await nextTick().then(() => emit('update:mode', value));
        },
      }),
    ]
  );
}

function renderColorPickerSwatches(
  props: Readonly<TColorPickerOptionProps>,
  pickerData: TColorPickerData,
  cssNamePrefix: string,
  emit: TEmitFn
): VNode {
  if (Helper.isEmpty(props.swatches)) {
    return createCommentVNode(' v-if-swatches ', true);
  }

  return h(
    'div',
    {
      class: [`${cssNamePrefix}swatches`, 'relative'],
      style: { 'max-height': Helper.cssUnit(props.swatchesMaxHeight) },
    },
    [
      h(
        'div',
        {
          class: [
            `${cssNamePrefix}swatches-content`,
            `${cssPrefix}gap-2`,
            'flex',
            'flex-wrap',
            'justify-center',
          ],
        },
        props.swatches?.map((it) =>
          h('button', {
            type: 'button',
            key: it,
            title: it,
            class: [`${cssPrefix}swatch-button`, 'relative', 'overflow-hidden'],
            style: { color: it },
            onClick: (event: Event) => {
              pickerData.config.value = (event.target as HTMLElement).title;
              useUpdateColorCanvas(pickerData, emit);
            },
          })
        )
      ),
    ]
  );
}

export function useRenderColorPicker(
  props: Readonly<TColorPickerOptionProps>,
  pickerClasses: ComputedRef<string[]>,
  pickerData: TColorPickerData,
  inputIDs: Record<string, string>,
  attrs: TRecord,
  emit: TEmitFn,
  colorMarkerMoveHandler: EventListener,
  hueSliderThumbMoveHandler: EventListener,
  alphaSliderThumbMoveHandler: EventListener
): VNode {
  const cssNamePrefix = `${cssPrefix}color-picker-`;
  const pickerProps = !Helper.isEmpty(props.activator)
    ? {
        ref: pickerData.pickerEl,
        class: pickerClasses.value,
        style: props.hideAlpha ? { width: '310px' } : undefined,
      }
    : mergeProps(
        {
          ref: pickerData.pickerEl,
          class: pickerClasses.value,
          style: props.hideAlpha ? { width: '310px' } : undefined,
        },
        attrs
      );

  return h('div', pickerProps, [
    h(
      'div',
      {
        ref: pickerData.colorArea,
        class: [`${cssNamePrefix}canvas`, 'w-full'],
        onClick: (event: UIEvent) => useMoveColorMarker(event, emit, pickerData),
      },
      [
        h('div', {
          tabIndex: 0,
          ref: pickerData.colorMarker,
          class: [`${cssNamePrefix}canvas-marker`, 'absolute'],
          onKeydown: (event: KeyboardEvent) => {
            const movements: Record<string, number[]> = {
              ArrowUp: [0, -1],
              ArrowDown: [0, 1],
              ArrowLeft: [-1, 0],
              ArrowRight: [1, 0],
            };
            if (Object.keys(movements).includes(event.key)) {
              moveColorMarkerOnKeydown(
                emit,
                pickerData,
                movements[event.key]![0]!,
                movements[event.key]![1]!
              );
              event.preventDefault();
            }
          },
          onMousedown: () => document.addEventListener('mousemove', colorMarkerMoveHandler),
          onTouchstart: () =>
            document.addEventListener('touchmove', colorMarkerMoveHandler, {
              passive: false,
            } as EventListenerOptions),
        }),
      ]
    ),
    h(
      'div',
      {
        class: [`${cssNamePrefix}body`],
      },
      [
        renderColorPickerControls(
          props,
          pickerData,
          cssNamePrefix,
          emit,
          hueSliderThumbMoveHandler,
          alphaSliderThumbMoveHandler
        ),
        renderColorPickerInputs(props, pickerData, cssNamePrefix, inputIDs, emit),
        renderColorPickerModeButtons(props, pickerData, emit),
      ]
    ),
    renderColorPickerSwatches(props, pickerData, cssNamePrefix, emit),
  ]);
}

export function useReleasePointerEvents(
  pickerData: TColorPickerData,
  colorMarkerMoveHandler: EventListener,
  hueSliderThumbMoveHandler: EventListener,
  alphaSliderThumbMoveHandler: EventListener
): void {
  document.addEventListener('mouseup', () =>
    document.removeEventListener('mousemove', colorMarkerMoveHandler)
  );
  document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', hueSliderThumbMoveHandler);
    Helper.defer(() => {
      pickerData.hueSliderThumb.value?.classList.remove(`${cssPrefix}pressed`);
    }, 75);
  });
  document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', alphaSliderThumbMoveHandler);
    Helper.defer(() => {
      pickerData.alphaSliderThumb.value?.classList.remove(`${cssPrefix}pressed`);
    }, 75);
  });
  document.addEventListener('touchend', () =>
    document.removeEventListener('touchmove', colorMarkerMoveHandler, {
      passive: false,
    } as EventListenerOptions)
  );
  document.addEventListener('touchend', () => {
    document.removeEventListener('touchmove', hueSliderThumbMoveHandler, {
      passive: false,
    } as EventListenerOptions);
    Helper.defer(() => {
      pickerData.hueSliderThumb.value?.classList.remove(`${cssPrefix}pressed`);
    }, 75);
  });
  document.addEventListener('touchend', () => {
    document.removeEventListener('touchmove', alphaSliderThumbMoveHandler, {
      passive: false,
    } as EventListenerOptions);
    Helper.defer(() => {
      pickerData.alphaSliderThumb.value?.classList.remove(`${cssPrefix}pressed`);
    }, 75);
  });
}

function getPointerPosition(event: UIEvent) {
  return {
    clientX: (event as TouchEvent).changedTouches
      ? (event as TouchEvent).changedTouches[0]?.clientX
      : (event as MouseEvent).clientX,
    clientY: (event as TouchEvent).changedTouches
      ? (event as TouchEvent).changedTouches[0]?.clientY
      : (event as MouseEvent).clientY,
  };
}

export function useMoveColorMarker(
  event: UIEvent,
  emit: TEmitFn,
  pickerData: TColorPickerData
): void {
  if (pickerData.colorArea.value) {
    pickerData.colorAreaRect = pickerData.colorArea.value?.getBoundingClientRect();
  }

  const pointer = getPointerPosition(event);
  const x = (pointer.clientX ?? 0) - pickerData.colorAreaRect.left;
  const y = (pointer.clientY ?? 0) - pickerData.colorAreaRect.top;

  setColorMarkerPosition(emit, pickerData, x, y);
  // Prevent scrolling while dragging the marker
  preventEventTarget(event);
}

function moveColorMarkerOnKeydown(
  emit: TEmitFn,
  pickerData: TColorPickerData,
  deltaX: number,
  deltaY: number
): void {
  const colorMarker = pickerData.colorMarker.value as HTMLElement;
  const x = parseInt(colorMarker.style.left.replace('px', '')) + deltaX;
  const y = parseInt(colorMarker.style.top.replace('px', '')) + deltaY;

  setColorMarkerPosition(emit, pickerData, x, y);
}

function setColorMarkerPosition(
  emit: TEmitFn,
  pickerData: TColorPickerData,
  posX: number,
  posY: number
): void {
  const colorMarker = pickerData.colorMarker.value as HTMLElement;
  const colorAreaRect = pickerData.colorAreaRect;

  // Set ColorMarker position and make sure it doesn't go out of bounds
  const x = posX < 0 ? 0 : posX > colorAreaRect.width ? colorAreaRect.width : posX;
  const y = posY < 0 ? 0 : posY > colorAreaRect.height ? colorAreaRect.height : posY;
  colorMarker.style.left = `${x}px`;
  colorMarker.style.top = `${y}px`;

  // Update the color
  setColorAtPosition(emit, pickerData, x, y);

  // Make sure the marker is focused
  colorMarker.focus();
}

function setColorAtPosition(
  emit: TEmitFn,
  pickerData: TColorPickerData,
  posX: number,
  posY: number
): void {
  const hsva: Color.HSVA = {
    h: pickerData.config.hueSlider,
    s: (posX / pickerData.colorAreaRect.width) * 100,
    v: 100 - (posY / pickerData.colorAreaRect.height) * 100,
    a: pickerData.config.alphaSlider / 100,
  };
  const rgba = hsvaToRgba(hsva);

  updateColor(pickerData, rgba, hsva);
  updateColorPreview(pickerData, emit);
}

export function useMoveHueSliderThumb(
  event: UIEvent,
  emit: TEmitFn,
  pickerData: TColorPickerData
): void {
  if (!pickerData.hueSlider.value) {
    return;
  }

  const child = pickerData.hueSlider.value?.firstElementChild;
  if (!child) {
    return;
  }

  const rect = child.getBoundingClientRect();
  const pointer = getPointerPosition(event);
  const px = (pointer.clientX ?? 0) - rect.left;

  // Make sure the Thumb doesn't go out of bounds
  const posX = px < 0 ? 0 : px > rect.width ? rect.width : px;
  const hueX = (posX / rect.width) * 100;

  updateHueSliderThumbUI(emit, pickerData, hueX);
  // Prevent scrolling while dragging the Thumb
  preventEventTarget(event);
}

function moveSliderThumbOnKeydown(
  thumb: HTMLElement,
  delta: number,
  pickerData: TColorPickerData,
  emit: TEmitFn,
  handlerFn: (emit: TEmitFn, pickerData: TColorPickerData, posX: number) => void
): void {
  let posX = parseFloat(thumb.style.left.replace('%', '')) + delta;

  // Make sure the Thumb doesn't go out of bounds
  if (posX < 0) {
    posX = 0;
  } else if (posX > 100) {
    posX = 100;
  }

  handlerFn(emit, pickerData, posX);
}

function updateHueSliderThumbUI(emit: TEmitFn, pickerData: TColorPickerData, posX: number): void {
  const hsva = {
    h: Math.round((posX / 100) * 360),
    s: pickerData.config.currentColor.s,
    v: pickerData.config.currentColor.v,
    a: pickerData.config.currentColor.a,
  };
  const rgba = hsvaToRgba(hsva);

  // Update UI
  (pickerData.colorArea.value as HTMLElement).style.color = `hsl(${hsva.h}, 100%, 50%)`;
  (pickerData.hueSliderThumb.value as HTMLElement).style.left = `${posX}%`;
  updateColor(pickerData, rgba, hsva);
  updateColorPreview(pickerData, emit);
  (pickerData.hueSliderThumb.value as HTMLElement).focus();
}

export function useMoveAlphaSliderThumb(
  event: UIEvent,
  emit: TEmitFn,
  pickerData: TColorPickerData
): void {
  if (!pickerData.alphaSlider.value) {
    return;
  }

  const child = pickerData.alphaSlider.value?.lastElementChild;
  if (!child) {
    return;
  }

  const rect = child.getBoundingClientRect();
  const pointer = getPointerPosition(event);
  const px = (pointer.clientX ?? 0) - rect.left;

  // Make sure the Thumb doesn't go out of bounds
  const posX = px < 0 ? 0 : px > rect.width ? rect.width : px;
  const alphaX = Math.round((posX / rect.width) * 100);

  updateAlphaSliderThumbUI(emit, pickerData, alphaX);
  // Prevent scrolling while dragging the Thumb
  preventEventTarget(event);
}

function updateAlphaSliderThumbUI(emit: TEmitFn, pickerData: TColorPickerData, posX: number): void {
  (pickerData.alphaSliderThumb.value as HTMLElement).style.left = `${posX}%`;
  pickerData.config.alphaSlider = posX;
  pickerData.config.currentColor.a = posX / 100;
  pickerData.colorHSL.a = posX / 100;
  pickerData.colorRGB.a = posX / 100;
  pickerData.colorOKLCH.a = posX / 100;
  updateColorPreview(pickerData, emit);
  (pickerData.alphaSliderThumb.value as HTMLElement).focus();
}

function updateColor(pickerData: TColorPickerData, rgba: Color.RGBA, hsva: Color.HSVA): void {
  for (const key in rgba) {
    if (Object.hasOwn(rgba, key)) {
      pickerData.config.currentColor[key as keyof Color.RGBA] = rgba[key as keyof Color.RGBA];
    }
  }

  for (const key in hsva) {
    if (Object.hasOwn(hsva, key)) {
      pickerData.config.currentColor[key as keyof Color.HSVA] = hsva[key as keyof Color.HSVA];
    }
  }

  pickerData.config.hueSlider = hsva.h;
  pickerData.config.alphaSlider = hsva.a * 100;
  pickerData.colorRGB = rgba;
  pickerData.colorOKLCH = rgbaToOklch(rgba);

  const hsla = hsvaToHsla(hsva);
  pickerData.colorHSL = {
    h: hsla.h,
    s: hsla.s / 100,
    l: hsla.l / 100,
    a: hsva.a,
  };
}

function updateColorPreview(pickerData: TColorPickerData, emit?: TEmitFn): void {
  const hex = rgbaToHex(pickerData.config.currentColor);
  (pickerData.colorMarker.value as HTMLElement).style.color = hex.substring(0, 7);
  (pickerData.colorPreview.value as HTMLElement).style.color = hex;

  if (pickerData.alphaSlider.value) {
    pickerData.alphaSlider.value.style.color = hex.substring(0, 7);
  }
  if (emit) {
    dispatchModelValue(emit, pickerData, hex);
  }
}

function dispatchModelValue(emit: TEmitFn, pickerData: TColorPickerData, hexColor?: string): void {
  switch (pickerData.config.mode) {
    case 'OKLCH':
      pickerData.config.value = oklchToString(pickerData.colorOKLCH);
      break;
    case 'HSL':
      pickerData.config.value = hslaToString(pickerData.colorHSL);
      break;
    case 'RGB':
      pickerData.config.value = rgbaToString(pickerData.config.currentColor);
      break;
    default:
      pickerData.config.value = hexColor || rgbaToHex(pickerData.config.currentColor);
      break;
  }

  emit('update:model-value', pickerData.config.value);
}

export function useUpdateColorCanvas(pickerData: TColorPickerData, emit?: TEmitFn): void {
  let hsva: Color.HSVA | undefined;
  let rgba: Color.RGBA | undefined;

  if (Helper.isEmpty(pickerData.config.value)) {
    const hsla: Color.HSLA = { h: 0, s: 100, l: 50, a: 1 };
    hsva = hslaToHsva(hsla);
    rgba = hsvaToRgba(hsva);
  } else {
    rgba = rgbaFromString(
      pickerData.canvasCtx as CanvasRenderingContext2D,
      pickerData.config.value
    );
    hsva = rgbaToHsva(rgba);
  }

  updateColor(pickerData, rgba, hsva);
  updateColorCanvasUI(pickerData, hsva);
  updateColorPreview(pickerData, emit);
}

function updateColorCanvasUI(pickerData: TColorPickerData, color?: Color.HSVA): void {
  const hsva: Color.HSVA = color || {
    h: pickerData.config.currentColor.h,
    s: pickerData.config.currentColor.s,
    v: pickerData.config.currentColor.v,
    a: pickerData.config.currentColor.a,
  };

  (pickerData.colorArea.value as HTMLElement).style.color = `hsl(${hsva.h}, 100%, 50%)`;
  (pickerData.colorMarker.value as HTMLElement).style.left =
    `${(pickerData.colorAreaRect.width * hsva.s) / 100}px`;
  (pickerData.colorMarker.value as HTMLElement).style.top =
    `${pickerData.colorAreaRect.height - (pickerData.colorAreaRect.height * hsva.v) / 100}px`;
  (pickerData.hueSliderThumb.value as HTMLElement).style.left = `${(hsva.h / 360) * 100}%`;

  if (pickerData.alphaSliderThumb.value) {
    pickerData.alphaSliderThumb.value.style.left = `${hsva.a * 100}%`;
  }
}
