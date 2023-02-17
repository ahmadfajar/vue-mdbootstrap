import {ComputedRef, createCommentVNode, h, mergeProps, nextTick, VNode} from "vue";
import {cssPrefix, useMergeClass} from "../../../mixins/CommonApi";
import type {
    HSLA,
    HSVA,
    RGBA,
    TColorPickerData,
    TColorPickerMode,
    TColorPickerOptionProps,
    TEmitFn,
    TRecord
} from "../../../types";
import {BsToggleButton} from "../../Button";
import {
    hslaToHsva,
    hslaToString,
    hsvaToHsla,
    hsvaToRgba,
    rgbaFromString,
    rgbaToHex,
    rgbaToHsva,
    rgbaToString
} from "./colorUtils";
import Helper from "../../../utils/Helper";

function renderColorPickerControls(
    props: Readonly<TColorPickerOptionProps>,
    pickerData: TColorPickerData,
    cssNamePrefix: string,
    sliderThumbMoveHandler: EventListener,
    alphaSliderThumbMoveHandler: EventListener,
): VNode {
    const sliders = [
        h("div", {
            ref: pickerData.colorSlider,
            class: [`${cssNamePrefix}hue-slider`],
        }, [
            h("div", {
                class: [`${cssNamePrefix}slider-track`],
            }, [
                h("div", {
                    tabIndex: 0,
                    ref: pickerData.colorSliderMarker,
                    class: [`${cssNamePrefix}slider-thumb`],
                    onMousedown: () => document.addEventListener("mousemove", sliderThumbMoveHandler),
                }),
            ]),
        ]),
    ];

    if (!props.hideAlpha) {
        sliders.push(
            h("div", {
                ref: pickerData.alphaSlider,
                class: [`${cssNamePrefix}alpha-slider`],
            }, [
                h("div", {
                    class: [`${cssNamePrefix}slider-track`],
                }, [
                    h("div", {
                        class: [`${cssNamePrefix}slider-track-alpha`],
                    }),
                    h("div", {
                        tabIndex: 0,
                        ref: pickerData.alphaSliderMarker,
                        class: [`${cssNamePrefix}slider-thumb`],
                        onMousedown: () => document.addEventListener("mousemove", alphaSliderThumbMoveHandler),
                    }),
                ]),
            ])
        );
    }

    return h("div", {
        class: [`${cssNamePrefix}controls`],
    }, [
        h("div", {
            ref: pickerData.colorPreview,
            class: [`${cssNamePrefix}preview`],
        }, [
            h("div", {
                class: [`${cssNamePrefix}selected-color`],
            }, [
                h("div", {
                    class: [`${cssNamePrefix}selected-color-alpha`],
                })
            ]),
        ]),
        h("div", {
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
    return h("label", {
        class: useMergeClass(
            `${cssNamePrefix}input-label`,
            <string | string[]>props.inputLabelClass,
        ),
        for: forID,
    }, label);
}

function createInputNumber(
    cssNamePrefix: string,
    inputID: string,
    maxValue = 255,
    maxLength = 3,
): VNode {
    return h("div", {
        class: [`${cssNamePrefix}input-col`]
    }, [
        h("input", {
            class: ["form-control", "form-input-number", "form-control-sm"],
            type: "number",
            id: inputID,
            min: 0,
            max: maxValue,
            maxlength: maxLength,
        })
    ]);
}

function createInputAlpha(
    cssNamePrefix: string,
    inputID: string,
    maxValue = 1,
    step = .01,
): VNode {
    return h("div", {
        class: [`${cssNamePrefix}input-col`]
    }, [
        h("input", {
            class: ["form-control", "form-input-number", "form-control-sm"],
            type: "number",
            id: inputID,
            min: 0,
            max: maxValue,
            step: step,
        })
    ]);
}

function createInputColorHSL(
    props: Readonly<TColorPickerOptionProps>,
    cssNamePrefix: string,
    inputIDs: Record<string, string>,
): VNode {
    const inputHSL = [
        createInputLabel(props, cssNamePrefix, inputIDs.H, "H"),
        createInputNumber(cssNamePrefix, inputIDs.H, 360),
        createInputLabel(props, cssNamePrefix, inputIDs.S, "S"),
        createInputNumber(cssNamePrefix, inputIDs.S, 100),
        createInputLabel(props, cssNamePrefix, inputIDs.L, "L"),
        createInputNumber(cssNamePrefix, inputIDs.L, 100),
    ];

    if (!props.hideAlpha) {
        inputHSL.push(
            createInputLabel(props, cssNamePrefix, inputIDs.A1, "A"),
            createInputAlpha(cssNamePrefix, inputIDs.A1),
        );
    }

    return h("div", {
        class: [`${cssNamePrefix}input-row`],
    }, inputHSL);
}

function createInputColorRGB(
    props: Readonly<TColorPickerOptionProps>,
    cssNamePrefix: string,
    inputIDs: Record<string, string>,
): VNode {
    const inputRGB = [
        createInputLabel(props, cssNamePrefix, inputIDs.R, "R"),
        createInputNumber(cssNamePrefix, inputIDs.R),
        createInputLabel(props, cssNamePrefix, inputIDs.G, "G"),
        createInputNumber(cssNamePrefix, inputIDs.G),
        createInputLabel(props, cssNamePrefix, inputIDs.B, "B"),
        createInputNumber(cssNamePrefix, inputIDs.B),
    ];

    if (!props.hideAlpha) {
        inputRGB.push(
            createInputLabel(props, cssNamePrefix, inputIDs.A2, "A"),
            createInputAlpha(cssNamePrefix, inputIDs.A2),
        );
    }

    return h("div", {
        class: [`${cssNamePrefix}input-row`],
    }, inputRGB);
}

function createInputColorHEX(
    props: Readonly<TColorPickerOptionProps>,
    cssNamePrefix: string,
    inputIDs: Record<string, string>,
): VNode {
    return h("div", {
        class: [`${cssNamePrefix}input-row`],
    }, [
        createInputLabel(props, cssNamePrefix, inputIDs.HEX, "HEX"),
        h("div", {
            class: [`${cssNamePrefix}input-col`]
        }, [
            h("input", {
                class: ["form-control", "form-input-text", "form-control-sm"],
                type: "text",
                id: inputIDs.HEX,
                maxlength: 9,
            })
        ]),
    ]);
}

function renderColorPickerInputs(
    props: Readonly<TColorPickerOptionProps>,
    mode: TColorPickerMode,
    cssNamePrefix: string,
    inputIDs: Record<string, string>,
): VNode {
    if (props.hideInputs === true) {
        return createCommentVNode(" v-if-inputs ", true);
    }

    return h("div", {
        class: [`${cssNamePrefix}inputs`, "pt-2"],
    }, [
        mode === "HSL"
            ? createInputColorHSL(props, cssNamePrefix, inputIDs)
            : (
                mode === "RGB"
                    ? createInputColorRGB(props, cssNamePrefix, inputIDs)
                    : createInputColorHEX(props, cssNamePrefix, inputIDs)
            ),
    ]);
}

function renderColorPickerModeButtons(
    props: Readonly<TColorPickerOptionProps>,
    pickerData: TColorPickerData,
    emit: TEmitFn,
): VNode {
    if (props.hideModeButton === true) {
        return createCommentVNode(" v-if-mode-buttons ", true);
    }

    return h("div", {
        class: ["py-2", "text-center"]
    }, [
        // @ts-ignore
        h(BsToggleButton, {
            size: "sm",
            color: props.modeButtonColor,
            toggleColor: props.modeButtonSelectedColor,
            outlined: props.modeButtonOutlined,
            items: [
                {value: "HEX", label: "HEX"},
                {value: "RGB", label: "RGB"},
                {value: "HSL", label: "HSL"},
            ],
            modelValue: pickerData.config.mode,
            "onUpdate:model-value": (value: TColorPickerMode) => {
                pickerData.config.mode = value;
                emit("update:mode", value);
                nextTick().then(() => dispatchEventModelValue(pickerData, emit))
            }
        })
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
    sliderThumbMoveHandler: EventListener,
    alphaSliderThumbMoveHandler: EventListener,
): VNode {
    const cssNamePrefix = `${cssPrefix}color-picker-`;

    return h("div",
        mergeProps({
            ref: pickerData.pickerEl,
            class: pickerClasses.value,
        }, attrs), [
            h("div", {
                ref: pickerData.colorArea,
                class: [`${cssNamePrefix}canvas`],
                onClick: (event: UIEvent) => moveColorMarker(event, pickerData, emit),
            }, [
                h("div", {
                    tabIndex: 0,
                    ref: pickerData.colorMarker,
                    class: [`${cssNamePrefix}canvas-marker`],
                    onMousedown: () => document.addEventListener("mousemove", colorMarkerMoveHandler),
                    onTouchstart: () => document.addEventListener(
                        "touchmove",
                        colorMarkerMoveHandler,
                        {passive: false},
                    ),
                })
            ]),
            h("div", {
                class: [`${cssNamePrefix}body`]
            }, [
                renderColorPickerControls(
                    props, pickerData, cssNamePrefix,
                    sliderThumbMoveHandler, alphaSliderThumbMoveHandler,
                ),
                renderColorPickerInputs(props, pickerData.config.mode, cssNamePrefix, inputIDs),
                renderColorPickerModeButtons(props, pickerData, emit),
            ])
        ]);
}

export function useReleasePointerEvents(
    colorMarkerMoveHandler: EventListener,
    sliderThumbMoveHandler: EventListener,
    alphaSliderThumbMoveHandler: EventListener,
) {
    document.addEventListener(
        "mouseup",
        () => document.removeEventListener("mousemove", colorMarkerMoveHandler)
    );
    document.addEventListener(
        "mouseup",
        () => document.removeEventListener("mousemove", sliderThumbMoveHandler)
    );
    document.addEventListener(
        "mouseup",
        () => document.removeEventListener("mousemove", alphaSliderThumbMoveHandler)
    );
    document.addEventListener(
        "touchend",
        () => document.removeEventListener(
            "touchmove",
            colorMarkerMoveHandler,
            {passive: false} as EventListenerOptions
        )
    );
}

export function moveColorMarker(event: UIEvent, pickerData: TColorPickerData, emit: TEmitFn) {
    if (pickerData.colorArea.value) {
        pickerData.colorAreaRect = pickerData.colorArea.value?.getBoundingClientRect();
    }

    const pointer = getPointerPosition(event);
    const x = pointer.pageX - pickerData.colorAreaRect.x;
    const y = pointer.pageY - pickerData.colorAreaRect.y;

    // if (container) {
    //     y += container.scrollTop;
    // }

    setColorMarkerPosition(pickerData, emit, x, y);

    // Prevent scrolling while dragging the marker
    event.preventDefault();
    event.stopPropagation();
}

export function moveColorSliderThumb(
    event: UIEvent,
    pickerData: TColorPickerData,
    emit: TEmitFn,
) {
    if (!pickerData.colorSlider.value) {
        return;
    }

    const child = pickerData.colorSlider.value?.firstElementChild;
    if (!child) {
        return;
    }

    const rect = child.getBoundingClientRect();
    const pointer = getPointerPosition(event);
    const sx = pointer.pageX - rect.x;

    // Make sure the Thumb doesn't go out of bounds
    const posX = (sx < 0) ? 0 : (sx > rect.width) ? rect.width : sx;
    const relX = posX / rect.width * 100;
    const hsva = {
        h: Math.round(relX / 100 * 360),
        s: pickerData.config.currentColor.s,
        v: pickerData.config.currentColor.v,
        a: pickerData.config.currentColor.a,
    };
    const rgba = hsvaToRgba(hsva);

    // Update UI
    (<HTMLElement>pickerData.colorArea.value).style.color = `hsl(${hsva.h}, 100%, 50%)`;
    (<HTMLElement>pickerData.colorSliderMarker.value).style.left = `${relX}%`;
    updateColor(pickerData, rgba, hsva);
    updateColorPreview(pickerData, emit);
    (<HTMLElement>pickerData.colorSliderMarker.value).focus();

    // Prevent scrolling while dragging the Thumb
    event.preventDefault();
    event.stopPropagation();
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
    const sx = pointer.pageX - rect.x;

    // Make sure the Thumb doesn't go out of bounds
    const posX = (sx < 0) ? 0 : (sx > rect.width) ? rect.width : sx;
    const relX = Math.round(posX / rect.width * 100);

    // Update UI
    (<HTMLElement>pickerData.alphaSliderMarker.value).style.left = `${relX}%`;
    pickerData.config.alphaSlider = relX;
    pickerData.config.currentColor.a = relX / 100;
    updateColorPreview(pickerData, emit);
    (<HTMLElement>pickerData.alphaSliderMarker.value).focus();

    // Prevent scrolling while dragging the Thumb
    event.preventDefault();
    event.stopPropagation();
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

    // Make sure the marker doesn't go out of bounds
    const x = (posX < 0) ? 0 : (posX > colorAreaRect.width) ? colorAreaRect.width : posX;
    const y = (posY < 0) ? 0 : (posY > colorAreaRect.height) ? colorAreaRect.height : posY;

    // Set the position
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
    const hsva: HSVA = {
        h: pickerData.config.colorSlider,
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
    rgba: RGBA,
    hsva: HSVA,
) {
    for (const key in rgba) {
        if (Object.prototype.hasOwnProperty.call(rgba, key)) {
            // @ts-ignore
            pickerData.config.currentColor[key] = rgba[key];
        }
    }

    for (const key in hsva) {
        if (Object.prototype.hasOwnProperty.call(hsva, key)) {
            // @ts-ignore
            pickerData.config.currentColor[key] = hsva[key];
        }
    }

    pickerData.config.colorSlider = hsva.h;
    pickerData.config.alphaSlider = hsva.a * 100;
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
        case "HSL":
            pickerData.config.value = hslaToString(hsvaToHsla(pickerData.config.currentColor));
            break;
        case "RGB":
            pickerData.config.value = rgbaToString(pickerData.config.currentColor);
            break;
        default:
            pickerData.config.value = hexColor || rgbaToHex(pickerData.config.currentColor);
            break;
    }

    emit("update:model-value", pickerData.config.value);
}

export function useUpdateCanvasColor(pickerData: TColorPickerData, emit?: TEmitFn) {
    let hsva: HSVA | undefined;
    let rgba: RGBA | undefined;

    if (Helper.isEmpty(pickerData.config.value)) {
        const hsla: HSLA = {h: 0, s: 100, l: 50, a: 1};
        hsva = hslaToHsva(hsla);
        rgba = hsvaToRgba(hsva);
    } else {
        // console.info("model-value:", pickerData.config.value);
        rgba = rgbaFromString(<CanvasRenderingContext2D>pickerData.canvasCtx, <string>pickerData.config.value);
        hsva = rgbaToHsva(rgba);
    }

    updateColor(pickerData, rgba, hsva);

    (<HTMLElement>pickerData.colorArea.value).style.color = `hsl(${hsva.h}, 100%, 50%)`;
    (<HTMLElement>pickerData.colorMarker.value).style.left = `${pickerData.colorAreaRect.width * hsva.s / 100}px`;
    (<HTMLElement>pickerData.colorMarker.value).style.top = `${pickerData.colorAreaRect.height - (pickerData.colorAreaRect.height * hsva.v / 100)}px`;
    (<HTMLElement>pickerData.colorSliderMarker.value).style.left = `${hsva.h / 360 * 100}%`;

    if (pickerData.alphaSliderMarker.value) {
        (<HTMLElement>pickerData.alphaSliderMarker.value).style.left = `${hsva.a * 100}%`;
    }

    updateColorPreview(pickerData, emit);
}
