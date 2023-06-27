import type { ComputedRef, Prop, VNode } from 'vue';
import { createCommentVNode, h, mergeProps, nextTick, reactive, ref } from 'vue';
import {
    hslaToHsva,
    hslaToString,
    hsvaToHsla,
    hsvaToRgba,
    rgbaFromString,
    rgbaToHex,
    rgbaToHsva,
    rgbaToString
} from '../../../mixins/colorUtils';
import { cssPrefix, useMergeClass } from '../../../mixins/CommonApi';
import type {
    Color,
    TColorPickerData,
    TColorPickerMode,
    TColorPickerOptionProps,
    TEmitFn,
    TInputOptionItem,
    TRecord
} from '../../../types';
import Helper from '../../../utils/Helper';
import { BsToggleButton } from '../../Button';

export function initColorPickerData(props: Readonly<TColorPickerOptionProps>): TColorPickerData {
    return {
        config: reactive({
            currentColor: {r: 0, g: 0, b: 0, h: 0, s: 0, v: 0, a: 1},
            hueSlider: 0,
            alphaSlider: 100,
            value: props.modelValue,
            mode: <TColorPickerMode>props.mode,
        }),
        colorRGB: {r: 0, g: 0, b: 0, a: 1},
        colorHSL: {h: 0, s: 0, l: 0, a: 1},
        pickerEl: ref<HTMLElement | null>(null),
        colorArea: ref<HTMLElement | null>(null),
        colorAreaRect: DOMRect.fromRect({width: 0, height: 0, x: 0, y: 0}),
        colorMarker: ref<HTMLElement | null>(null),
        colorPreview: ref<HTMLElement | null>(null),
        hueSlider: ref<HTMLElement | null>(null),
        hueSliderThumb: ref<HTMLElement | null>(null),
        alphaSlider: ref<HTMLElement | null>(null),
        alphaSliderThumb: ref<HTMLElement | null>(null),
        canvasCtx: document.createElement('canvas').getContext('2d'),
    }
}

function renderColorPickerControls(
    props: Readonly<TColorPickerOptionProps>,
    pickerData: TColorPickerData,
    cssNamePrefix: string,
    emit: TEmitFn,
    hueSliderThumbMoveHandler: EventListener,
    alphaSliderThumbMoveHandler: EventListener,
): VNode {
    const sliders = [
        h('div', {
            ref: pickerData.hueSlider,
            class: [`${cssPrefix}hue-slider`],
        }, [
            h('div', {
                class: [`${cssPrefix}slider-track`],
                onClick: (event: UIEvent) => {
                    pickerData.hueSliderThumb.value?.classList.add('move-transition', `${cssPrefix}focused`);
                    moveHueSliderThumb(event, pickerData, emit);
                    Helper.defer(() => {
                        pickerData.hueSliderThumb.value?.classList.remove('move-transition');
                    }, 100);
                },
            }, [
                h('div', {
                    tabIndex: 0,
                    ref: pickerData.hueSliderThumb,
                    class: [`${cssPrefix}slider-thumb`],
                    onBlur: (event: Event) => {
                        (<HTMLElement>event.target).classList.remove(`${cssPrefix}focused`);
                    },
                    onKeydown: (event: KeyboardEvent) => {
                        const movements: Record<string, number> = {
                            ArrowLeft: -1,
                            ArrowRight: 1
                        };
                        if (Object.keys(movements).includes(event.key)) {
                            pickerData.hueSliderThumb.value?.classList.add(`${cssPrefix}focused`);
                            moveSliderThumbOnKeydown(
                                <HTMLElement>pickerData.hueSliderThumb.value,
                                movements[event.key],
                                pickerData, emit,
                                updateHueSliderThumbUI,
                            );
                            event.preventDefault();
                        }
                    },
                    onMousedown: () => {
                        pickerData.hueSliderThumb.value?.classList.add(`${cssPrefix}pressed`);
                        document.addEventListener('mousemove', hueSliderThumbMoveHandler)
                    },
                    onTouchstart: () => {
                        pickerData.hueSliderThumb.value?.classList.add(`${cssPrefix}pressed`);
                        document.addEventListener(
                            'touchmove',
                            hueSliderThumbMoveHandler,
                            {passive: false},
                        );
                    },
                }, [
                    h('div', {
                        class: [`${cssPrefix}slider-thumb-surface`]
                    }),
                    h('div', {
                        class: [`${cssPrefix}slider-thumb-ripple`]
                    }),
                ]),
            ]),
        ]),
    ];

    if (!props.hideAlpha) {
        sliders.push(
            h('div', {
                ref: pickerData.alphaSlider,
                class: [`${cssPrefix}alpha-slider`],
            }, [
                h('div', {
                    class: [`${cssPrefix}slider-track`],
                    onClick: (event: UIEvent) => {
                        pickerData.alphaSliderThumb.value?.classList.add('move-transition', `${cssPrefix}focused`);
                        moveAlphaSliderThumb(event, pickerData, emit);
                        Helper.defer(() => {
                            pickerData.alphaSliderThumb.value?.classList.remove('move-transition');
                        }, 100);
                    },
                }, [
                    h('div', {
                        class: [`${cssPrefix}slider-track-alpha`],
                    }),
                    h('div', {
                        tabIndex: 0,
                        ref: pickerData.alphaSliderThumb,
                        class: [`${cssPrefix}slider-thumb`],
                        onBlur: (event: Event) => {
                            (<HTMLElement>event.target).classList.remove(`${cssPrefix}focused`);
                        },
                        onKeydown: (event: KeyboardEvent) => {
                            const movements: Record<string, number> = {
                                ArrowLeft: -1,
                                ArrowRight: 1
                            };
                            if (Object.keys(movements).includes(event.key)) {
                                pickerData.alphaSliderThumb.value?.classList.add(`${cssPrefix}focused`);
                                moveSliderThumbOnKeydown(
                                    <HTMLElement>pickerData.alphaSliderThumb.value,
                                    movements[event.key],
                                    pickerData, emit,
                                    updateAlphaSliderThumbUI,
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
                            document.addEventListener(
                                'touchmove',
                                alphaSliderThumbMoveHandler,
                                {passive: false},
                            );
                        },
                    }, [
                        h('div', {
                            class: [`${cssPrefix}slider-thumb-surface`]
                        }),
                        h('div', {
                            class: [`${cssPrefix}slider-thumb-ripple`]
                        }),
                    ]),
                ]),
            ])
        );
    }

    return h('div', {
        class: [`${cssNamePrefix}controls`],
    }, [
        h('div', {
            ref: pickerData.colorPreview,
            class: [`${cssNamePrefix}preview`],
        }, [
            h('div', {
                class: [`${cssNamePrefix}selected-color`],
            }, [
                h('div', {
                    class: [`${cssNamePrefix}selected-color-alpha`],
                })
            ]),
        ]),
        h('div', {
            class: [`${cssNamePrefix}sliders`],
        }, sliders),
    ]);
}

function createInputLabel(
    props: Readonly<TColorPickerOptionProps>,
    cssNamePrefix: string,
    forID: string,
    label: string,
): VNode {
    return h('label', {
        class: useMergeClass(`${cssNamePrefix}input-label`, <string | string[]>props.inputLabelClass),
        for: forID,
    }, label);
}

function createInputNumber(
    pickerData: TColorPickerData,
    emit: TEmitFn,
    cssNamePrefix: string,
    inputID: string,
    label: string,
    maxValue = 255,
    step?: number,
    maxLength?: number,
): VNode {
    const mode = pickerData.config.mode;
    let value: number | string;

    if (mode === 'RGB' && label === 'R') {
        value = pickerData.colorRGB.r;
    } else if (mode === 'RGB' && label === 'G') {
        value = pickerData.colorRGB.g;
    } else if (mode === 'RGB' && label === 'B') {
        value = pickerData.colorRGB.b;
    } else if (mode === 'HSL' && label === 'H') {
        value = pickerData.colorHSL.h;
    } else if (mode === 'HSL' && label === 'S') {
        value = pickerData.colorHSL.s;
    } else if (mode === 'HSL' && label === 'L') {
        value = pickerData.colorHSL.l;
    } else {
        value = pickerData.colorRGB.a;
    }

    return h('div', {
        class: [`${cssNamePrefix}input-col`]
    }, [
        h('input', {
            class: ['form-control', 'form-input-number', 'form-control-sm'],
            type: 'number',
            id: inputID,
            min: 0,
            max: maxValue,
            maxlength: maxLength,
            step: step,
            value: value,
            placeholder: label,
            onChange: (event: Event) => {
                onUpdateInputNumber((<HTMLInputElement>event.target).value, label, pickerData, emit);
            }
        })
    ]);
}

function onUpdateInputNumber(value: string, label: string, pickerData: TColorPickerData, emit: TEmitFn) {
    const mode = pickerData.config.mode;
    let srcValue = mode === 'RGB' && label !== 'A'
        ? Number.parseInt(value.trim())
        : Number.parseFloat(value.trim());

    let rgba: Color.RGBA | undefined;
    let hsla: Color.HSLA | undefined;
    let hsva: Color.HSVA | undefined;

    // Prevent value from going out of bounds.
    if (srcValue < 0) {
        srcValue = 0;
    } else if (['S', 'L', 'A'].includes(label) && srcValue > 1) {
        srcValue = 1;
    } else if (['R', 'G', 'B'].includes(label) && srcValue > 255) {
        srcValue = 255;
    } else if (label === 'H' && srcValue > 360) {
        srcValue = 360;
    }

    if (mode === 'RGB') {
        rgba = pickerData.colorRGB;

        if (label === 'R') {
            rgba.r = srcValue;
        } else if (label === 'G') {
            rgba.g = srcValue;
        } else if (label === 'B') {
            rgba.b = srcValue;
        } else {
            rgba.a = srcValue;
        }

        hsva = rgbaToHsva(rgba);
    } else {
        hsla = pickerData.colorHSL;

        if (label === 'H') {
            hsla.h = srcValue;
        } else if (label === 'S') {
            hsla.s = srcValue;
        } else if (label === 'L') {
            hsla.l = srcValue;
        } else {
            hsla.a = srcValue;
        }

        hsva = hslaToHsva(hsla);
        rgba = hsvaToRgba(hsva);
    }

    updateColor(pickerData, rgba, hsva);
    updateColorCanvasUI(pickerData, hsva);
    updateColorPreview(pickerData, emit);
}

function renderInputColorHSL(
    props: Readonly<TColorPickerOptionProps>,
    pickerData: TColorPickerData,
    cssNamePrefix: string,
    inputIDs: Record<string, string>,
    emit: TEmitFn,
): VNode {
    const inputHSL = [
        createInputLabel(props, cssNamePrefix, inputIDs.H, 'H'),
        createInputNumber(pickerData, emit, cssNamePrefix, inputIDs.H, 'H', 360),
        createInputLabel(props, cssNamePrefix, inputIDs.S, 'S'),
        createInputNumber(pickerData, emit, cssNamePrefix, inputIDs.S, 'S', 1, 0.01),
        createInputLabel(props, cssNamePrefix, inputIDs.L, 'L'),
        createInputNumber(pickerData, emit, cssNamePrefix, inputIDs.L, 'L', 1, 0.01),
    ];

    if (!props.hideAlpha) {
        inputHSL.push(
            createInputLabel(props, cssNamePrefix, inputIDs.A1, 'A'),
            createInputNumber(pickerData, emit, cssNamePrefix, inputIDs.A1, 'A', 1, 0.01),
        );
    }

    return h('div', {
        class: [`${cssNamePrefix}input-row`],
    }, inputHSL);
}

function renderInputColorRGB(
    props: Readonly<TColorPickerOptionProps>,
    pickerData: TColorPickerData,
    cssNamePrefix: string,
    inputIDs: Record<string, string>,
    emit: TEmitFn,
): VNode {
    const inputRGB = [
        createInputLabel(props, cssNamePrefix, inputIDs.R, 'R'),
        createInputNumber(pickerData, emit, cssNamePrefix, inputIDs.R, 'R'),
        createInputLabel(props, cssNamePrefix, inputIDs.G, 'G'),
        createInputNumber(pickerData, emit, cssNamePrefix, inputIDs.G, 'G'),
        createInputLabel(props, cssNamePrefix, inputIDs.B, 'B'),
        createInputNumber(pickerData, emit, cssNamePrefix, inputIDs.B, 'B'),
    ];

    if (!props.hideAlpha) {
        inputRGB.push(
            createInputLabel(props, cssNamePrefix, inputIDs.A2, 'A'),
            createInputNumber(pickerData, emit, cssNamePrefix, inputIDs.A2, 'A', 1, 0.01),
        );
    }

    return h('div', {
        class: [`${cssNamePrefix}input-row`],
    }, inputRGB);
}

function renderInputColorHEX(
    props: Readonly<TColorPickerOptionProps>,
    pickerData: TColorPickerData,
    cssNamePrefix: string,
    inputIDs: Record<string, string>,
    emit: TEmitFn,
): VNode {
    return h('div', {
        class: [`${cssNamePrefix}input-row`],
    }, [
        createInputLabel(props, cssNamePrefix, inputIDs.HEX, 'HEX'),
        h('div', {
            class: [`${cssNamePrefix}input-col`]
        }, [
            h('input', {
                class: ['form-control', 'form-input-text', 'form-control-sm'],
                type: 'text',
                id: inputIDs.HEX,
                maxlength: 9,
                value: pickerData.config.value,
                placeholder: 'HEX color',
                onChange: (event: Event) => {
                    onUpdateInputColorHex((<HTMLInputElement>event.target).value, pickerData, emit);
                }
            }),
        ]),
    ]);
}

function onUpdateInputColorHex(value: string, pickerData: TColorPickerData, emit: TEmitFn) {
    if (value && pickerData.config.value !== value && [6, 7, 9].includes(value.length)) {
        let srcStr = value.trim();

        if (!value.startsWith('#')) {
            srcStr = '#' + value.trim();
        }

        const rgba = rgbaFromString(<CanvasRenderingContext2D>pickerData.canvasCtx, srcStr);
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
    emit: TEmitFn,
): VNode {
    if (props.hideInputs === true) {
        return createCommentVNode(' v-if-inputs ', true);
    }

    return h('div', {
            class: [`${cssNamePrefix}inputs`, 'pt-2'],
        }, [
            pickerData.config.mode === 'HSL'
                ? renderInputColorHSL(props, pickerData, cssNamePrefix, inputIDs, emit)
                : (
                    pickerData.config.mode === 'RGB'
                        ? renderInputColorRGB(props, pickerData, cssNamePrefix, inputIDs, emit)
                        : renderInputColorHEX(props, pickerData, cssNamePrefix, inputIDs, emit)
                )
        ]
    );
}

function renderColorPickerModeButtons(
    props: Readonly<TColorPickerOptionProps>,
    pickerData: TColorPickerData,
    emit: TEmitFn,
): VNode {
    if (props.hideModeButton === true) {
        return createCommentVNode(' v-if-mode-buttons ', true);
    }

    return h('div', {
        class: ['py-2', 'text-center']
    }, [
        h(BsToggleButton, {
            size: 'sm' as Prop<string>,
            color: props.modeButtonColor as Prop<string>,
            toggleColor: props.modeButtonToggleColor as Prop<string>,
            // @ts-ignore
            outlined: props.outlineModeButton as Prop<boolean>,
            items: [
                {value: 'HEX', label: 'HEX'},
                {value: 'RGB', label: 'RGB'},
                {value: 'HSL', label: 'HSL'},
            ] as Prop<TInputOptionItem[]>,
            modelValue: pickerData.config.mode as Prop<string>,
            'onUpdate:model-value': (value: TColorPickerMode) => {
                pickerData.config.mode = value;
                dispatchEventModelValue(pickerData, emit);
                nextTick().then(() => emit('update:mode', value));
            }
        })
    ]);
}

function renderColorPickerSwatches(
    props: Readonly<TColorPickerOptionProps>,
    pickerData: TColorPickerData,
    cssNamePrefix: string,
    emit: TEmitFn,
): VNode {
    if (Helper.isEmpty(props.swatches)) {
        return createCommentVNode(' v-if-swatches ', true);
    }

    return h('div', {
        class: [`${cssNamePrefix}swatches`],
        style: {'max-height': Helper.cssUnit(props.swatchesMaxHeight)},
    }, [
        h('div', {
                class: [`${cssNamePrefix}swatches-content`, 'd-flex', 'flex-wrap', 'justify-content-center']
            }, props.swatches?.map(it => h('button', {
                type: 'button',
                key: it,
                title: it,
                class: [`${cssPrefix}swatch-button`],
                style: {color: it},
                onClick: (event: Event) => {
                    pickerData.config.value = (<HTMLElement>event.target).title;
                    useUpdateColorCanvas(pickerData, emit);
                }
            }))
        )
    ]);
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
    alphaSliderThumbMoveHandler: EventListener,
): VNode {
    const cssNamePrefix = `${cssPrefix}color-picker-`;
    const pickerProps = !Helper.isEmpty(props.activator)
        ? {
            ref: pickerData.pickerEl,
            class: pickerClasses.value,
            style: props.hideAlpha ? {width: '250px'} : undefined,
        } : mergeProps({
            ref: pickerData.pickerEl,
            class: pickerClasses.value,
            style: props.hideAlpha ? {width: '250px'} : undefined,
        }, attrs);

    return h('div', pickerProps, [
        h('div', {
            ref: pickerData.colorArea,
            class: [`${cssNamePrefix}canvas`],
            onClick: (event: UIEvent) => moveColorMarker(event, pickerData, emit),
        }, [
            h('div', {
                tabIndex: 0,
                ref: pickerData.colorMarker,
                class: [`${cssNamePrefix}canvas-marker`],
                onKeydown: (event: KeyboardEvent) => {
                    const movements: Record<string, number[]> = {
                        ArrowUp: [0, -1],
                        ArrowDown: [0, 1],
                        ArrowLeft: [-1, 0],
                        ArrowRight: [1, 0]
                    };
                    if (Object.keys(movements).includes(event.key)) {
                        moveColorMarkerOnKeydown(
                            pickerData, emit,
                            movements[event.key][0],
                            movements[event.key][1],
                        );
                        event.preventDefault();
                    }
                },
                onMousedown: () => document.addEventListener('mousemove', colorMarkerMoveHandler),
                onTouchstart: () => document.addEventListener(
                    'touchmove',
                    colorMarkerMoveHandler,
                    {passive: false},
                ),
            })
        ]),
        h('div', {
            class: [`${cssNamePrefix}body`]
        }, [
            renderColorPickerControls(
                props, pickerData, cssNamePrefix, emit,
                hueSliderThumbMoveHandler, alphaSliderThumbMoveHandler,
            ),
            renderColorPickerInputs(props, pickerData, cssNamePrefix, inputIDs, emit),
            renderColorPickerModeButtons(props, pickerData, emit),
        ]),
        renderColorPickerSwatches(props, pickerData, cssNamePrefix, emit),
    ]);
}

export function useReleasePointerEvents(
    pickerData: TColorPickerData,
    colorMarkerMoveHandler: EventListener,
    hueSliderThumbMoveHandler: EventListener,
    alphaSliderThumbMoveHandler: EventListener,
) {
    document.addEventListener(
        'mouseup',
        () => document.removeEventListener('mousemove', colorMarkerMoveHandler)
    );
    document.addEventListener(
        'mouseup',
        () => {
            document.removeEventListener('mousemove', hueSliderThumbMoveHandler);
            Helper.defer(() => {
                pickerData.hueSliderThumb.value?.classList.remove(`${cssPrefix}pressed`);
            }, 75);
        }
    );
    document.addEventListener(
        'mouseup',
        () => {
            document.removeEventListener('mousemove', alphaSliderThumbMoveHandler);
            Helper.defer(() => {
                pickerData.alphaSliderThumb.value?.classList.remove(`${cssPrefix}pressed`);
            }, 75);
        }
    );
    document.addEventListener(
        'touchend',
        () => document.removeEventListener(
            'touchmove',
            colorMarkerMoveHandler,
            {passive: false} as EventListenerOptions
        )
    );
    document.addEventListener(
        'touchend',
        () => {
            document.removeEventListener(
                'touchmove',
                hueSliderThumbMoveHandler,
                {passive: false} as EventListenerOptions
            );
            Helper.defer(() => {
                pickerData.hueSliderThumb.value?.classList.remove(`${cssPrefix}pressed`);
            }, 75);
        }
    );
    document.addEventListener(
        'touchend',
        () => {
            document.removeEventListener(
                'touchmove',
                alphaSliderThumbMoveHandler,
                {passive: false} as EventListenerOptions
            );
            Helper.defer(() => {
                pickerData.alphaSliderThumb.value?.classList.remove(`${cssPrefix}pressed`);
            }, 75);
        }
    );
}

export function moveColorMarker(event: UIEvent, pickerData: TColorPickerData, emit: TEmitFn) {
    if (pickerData.colorArea.value) {
        pickerData.colorAreaRect = pickerData.colorArea.value?.getBoundingClientRect();
    }

    const pointer = getPointerPosition(event);
    const x = pointer.pageX - pickerData.colorAreaRect.x;
    const y = pointer.pageY - pickerData.colorAreaRect.y;

    setColorMarkerPosition(pickerData, emit, x, y);

    // Prevent scrolling while dragging the marker
    event.preventDefault();
    event.stopPropagation();
}

function moveColorMarkerOnKeydown(
    pickerData: TColorPickerData,
    emit: TEmitFn,
    deltaX: number,
    deltaY: number,
) {
    const colorMarker = <HTMLElement>pickerData.colorMarker.value;
    const x = parseInt(colorMarker.style.left.replace('px', '')) + deltaX;
    const y = parseInt(colorMarker.style.top.replace('px', '')) + deltaY;

    setColorMarkerPosition(pickerData, emit, x, y);
}

export function moveHueSliderThumb(
    event: UIEvent,
    pickerData: TColorPickerData,
    emit: TEmitFn,
) {
    if (!pickerData.hueSlider.value) {
        return;
    }

    const child = pickerData.hueSlider.value?.firstElementChild;
    if (!child) {
        return;
    }

    const rect = child.getBoundingClientRect();
    const pointer = getPointerPosition(event);
    const px = pointer.pageX - rect.x;

    // Make sure the Thumb doesn't go out of bounds
    const posX = (px < 0) ? 0 : (px > rect.width) ? rect.width : px;
    const hueX = posX / rect.width * 100;

    updateHueSliderThumbUI(pickerData, emit, hueX);

    // Prevent scrolling while dragging the Thumb
    event.preventDefault();
    event.stopPropagation();
}

function moveSliderThumbOnKeydown(
    thumb: HTMLElement,
    delta: number,
    pickerData: TColorPickerData,
    emit: TEmitFn,
    handlerFn: (pickerData: TColorPickerData, emit: TEmitFn, posX: number) => void
) {
    let posX = parseFloat(thumb.style.left.replace('%', '')) + delta;

    // Make sure the Thumb doesn't go out of bounds
    if (posX < 0) {
        posX = 0
    } else if (posX > 100) {
        posX = 100;
    }

    handlerFn(pickerData, emit, posX);
}

function updateHueSliderThumbUI(
    pickerData: TColorPickerData,
    emit: TEmitFn,
    posX: number,
) {
    const hsva = {
        h: Math.round(posX / 100 * 360),
        s: pickerData.config.currentColor.s,
        v: pickerData.config.currentColor.v,
        a: pickerData.config.currentColor.a,
    };
    const rgba = hsvaToRgba(hsva);

    // Update UI
    (<HTMLElement>pickerData.colorArea.value).style.color = `hsl(${hsva.h}, 100%, 50%)`;
    (<HTMLElement>pickerData.hueSliderThumb.value).style.left = `${posX}%`;
    updateColor(pickerData, rgba, hsva);
    updateColorPreview(pickerData, emit);
    (<HTMLElement>pickerData.hueSliderThumb.value).focus();
}

export function moveAlphaSliderThumb(
    event: UIEvent,
    pickerData: TColorPickerData,
    emit: TEmitFn,
) {
    if (!pickerData.alphaSlider.value) {
        return;
    }

    const child = pickerData.alphaSlider.value?.lastElementChild;
    if (!child) {
        return;
    }

    const rect = child.getBoundingClientRect();
    const pointer = getPointerPosition(event);
    const px = pointer.pageX - rect.x;

    // Make sure the Thumb doesn't go out of bounds
    const posX = (px < 0) ? 0 : (px > rect.width) ? rect.width : px;
    const alphaX = Math.round(posX / rect.width * 100);

    updateAlphaSliderThumbUI(pickerData, emit, alphaX);

    // Prevent scrolling while dragging the Thumb
    event.preventDefault();
    event.stopPropagation();
}

function updateAlphaSliderThumbUI(
    pickerData: TColorPickerData,
    emit: TEmitFn,
    posX: number,
) {
    (<HTMLElement>pickerData.alphaSliderThumb.value).style.left = `${posX}%`;
    pickerData.config.alphaSlider = posX;
    pickerData.config.currentColor.a = posX / 100;
    pickerData.colorHSL.a = posX / 100;
    pickerData.colorRGB.a = posX / 100;
    updateColorPreview(pickerData, emit);
    (<HTMLElement>pickerData.alphaSliderThumb.value).focus();
}

function getPointerPosition(event: UIEvent) {
    return {
        pageX: (<TouchEvent>event).changedTouches
            ? (<TouchEvent>event).changedTouches[0].pageX
            : (<MouseEvent>event).pageX,
        pageY: (<TouchEvent>event).changedTouches
            ? (<TouchEvent>event).changedTouches[0].pageY
            : (<MouseEvent>event).pageY
    };
}

function setColorMarkerPosition(
    pickerData: TColorPickerData,
    emit: TEmitFn,
    posX: number,
    posY: number,
) {
    const colorMarker = <HTMLElement>pickerData.colorMarker.value;
    const colorAreaRect = pickerData.colorAreaRect;

    // Set ColorMarker position and make sure it doesn't go out of bounds
    const x = (posX < 0) ? 0 : (posX > colorAreaRect.width) ? colorAreaRect.width : posX;
    const y = (posY < 0) ? 0 : (posY > colorAreaRect.height) ? colorAreaRect.height : posY;
    colorMarker.style.left = `${x}px`;
    colorMarker.style.top = `${y}px`;

    // Update the color
    setColorAtPosition(pickerData, emit, x, y);

    // Make sure the marker is focused
    colorMarker.focus();
}

function setColorAtPosition(
    pickerData: TColorPickerData,
    emit: TEmitFn,
    posX: number,
    posY: number,
) {
    const hsva: Color.HSVA = {
        h: pickerData.config.hueSlider,
        s: posX / pickerData.colorAreaRect.width * 100,
        v: 100 - (posY / pickerData.colorAreaRect.height * 100),
        a: pickerData.config.alphaSlider / 100
    };
    const rgba = hsvaToRgba(hsva);

    updateColor(pickerData, rgba, hsva);
    updateColorPreview(pickerData, emit);
}

function updateColor(
    pickerData: TColorPickerData,
    rgba: Color.RGBA,
    hsva: Color.HSVA,
) {
    for (const key in rgba) {
        if (Object.hasOwn(rgba, key)) {
            // @ts-ignore
            pickerData.config.currentColor[key] = rgba[key];
        }
    }

    for (const key in hsva) {
        if (Object.hasOwn(hsva, key)) {
            // @ts-ignore
            pickerData.config.currentColor[key] = hsva[key];
        }
    }

    pickerData.config.hueSlider = hsva.h;
    pickerData.config.alphaSlider = hsva.a * 100;
    pickerData.colorRGB = rgba;

    const hsla = hsvaToHsla(hsva);
    pickerData.colorHSL = {
        h: hsla.h,
        s: hsla.s / 100,
        l: hsla.l / 100,
        a: hsva.a,
    };
}

function updateColorPreview(pickerData: TColorPickerData, emit?: TEmitFn) {
    const hex = rgbaToHex(pickerData.config.currentColor);
    (<HTMLElement>pickerData.colorMarker.value).style.color = hex.substring(0, 7);
    (<HTMLElement>pickerData.colorPreview.value).style.color = hex;

    if (pickerData.alphaSlider.value) {
        (<HTMLElement>pickerData.alphaSlider.value).style.color = hex.substring(0, 7);
    }
    if (emit) {
        dispatchEventModelValue(pickerData, emit, hex);
    }
}

function dispatchEventModelValue(pickerData: TColorPickerData, emit: TEmitFn, hexColor?: string) {
    switch (pickerData.config.mode) {
        case 'HSL':
            pickerData.config.value = hslaToString(hsvaToHsla(pickerData.config.currentColor));
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

export function useUpdateColorCanvas(pickerData: TColorPickerData, emit?: TEmitFn) {
    let hsva: Color.HSVA | undefined;
    let rgba: Color.RGBA | undefined;

    if (Helper.isEmpty(pickerData.config.value)) {
        const hsla: Color.HSLA = {h: 0, s: 100, l: 50, a: 1};
        hsva = hslaToHsva(hsla);
        rgba = hsvaToRgba(hsva);
    } else {
        rgba = rgbaFromString(<CanvasRenderingContext2D>pickerData.canvasCtx, <string>pickerData.config.value);
        hsva = rgbaToHsva(rgba);
    }

    updateColor(pickerData, rgba, hsva);
    updateColorCanvasUI(pickerData, hsva);
    updateColorPreview(pickerData, emit);
}

function updateColorCanvasUI(pickerData: TColorPickerData, color?: Color.HSVA) {
    const hsva: Color.HSVA = color || {
        h: pickerData.config.currentColor.h,
        s: pickerData.config.currentColor.s,
        v: pickerData.config.currentColor.v,
        a: pickerData.config.currentColor.a,
    };

    (<HTMLElement>pickerData.colorArea.value).style.color = `hsl(${hsva.h}, 100%, 50%)`;
    (<HTMLElement>pickerData.colorMarker.value).style.left = `${pickerData.colorAreaRect.width * hsva.s / 100}px`;
    (<HTMLElement>pickerData.colorMarker.value).style.top = `${pickerData.colorAreaRect.height - (pickerData.colorAreaRect.height * hsva.v / 100)}px`;
    (<HTMLElement>pickerData.hueSliderThumb.value).style.left = `${hsva.h / 360 * 100}%`;

    if (pickerData.alphaSliderThumb.value) {
        (<HTMLElement>pickerData.alphaSliderThumb.value).style.left = `${hsva.a * 100}%`;
    }
}
