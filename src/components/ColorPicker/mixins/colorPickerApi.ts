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
    emit: TEmitFn,
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
                onClick: (event: UIEvent) => {
                    pickerData.colorSliderMarker.value?.classList.add("move-transition");
                    moveColorSliderThumb(event, pickerData, emit);
                    Helper.defer(() => {
                        pickerData.colorSliderMarker.value?.classList.remove("move-transition");
                    }, 100);
                },
            }, [
                h("div", {
                    tabIndex: 0,
                    ref: pickerData.colorSliderMarker,
                    class: [`${cssNamePrefix}slider-thumb`],
                    onMousedown: () => document.addEventListener("mousemove", sliderThumbMoveHandler),
                    onTouchstart: () => document.addEventListener(
                        "touchmove",
                        sliderThumbMoveHandler,
                        {passive: false},
                    ),
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
                    onClick: (event: UIEvent) => {
                        pickerData.alphaSliderMarker.value?.classList.add("move-transition");
                        moveAlphaSliderThumb(event, pickerData, emit);
                        Helper.defer(() => {
                            pickerData.alphaSliderMarker.value?.classList.remove("move-transition");
                        }, 100);
                    },
                }, [
                    h("div", {
                        class: [`${cssNamePrefix}slider-track-alpha`],
                    }),
                    h("div", {
                        tabIndex: 0,
                        ref: pickerData.alphaSliderMarker,
                        class: [`${cssNamePrefix}slider-thumb`],
                        onMousedown: () => document.addEventListener("mousemove", alphaSliderThumbMoveHandler),
                        onTouchstart: () => document.addEventListener(
                            "touchmove",
                            alphaSliderThumbMoveHandler,
                            {passive: false},
                        ),
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

    if (mode === "RGB" && label === "R") {
        value = pickerData.colorRGB.r;
    } else if (mode === "RGB" && label === "G") {
        value = pickerData.colorRGB.g;
    } else if (mode === "RGB" && label === "B") {
        value = pickerData.colorRGB.b;
    } else if (mode === "HSL" && label === "H") {
        value = pickerData.colorHSL.h;
    } else if (mode === "HSL" && label === "S") {
        value = pickerData.colorHSL.s;
    } else if (mode === "HSL" && label === "L") {
        value = pickerData.colorHSL.l;
    } else {
        value = pickerData.colorRGB.a;
    }

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
            step: step,
            value: value,
            onChange: (event: Event) => {
                onUpdateInputNumber((<HTMLInputElement>event.target).value, label, pickerData, emit);
            }
        })
    ]);
}

function onUpdateInputNumber(value: string, label: string, pickerData: TColorPickerData, emit: TEmitFn) {
    const mode = pickerData.config.mode;
    let srcValue = mode === "RGB" && label !== "A"
        ? Number.parseInt(value.trim())
        : Number.parseFloat(value.trim());
    let rgba: RGBA | undefined;
    let hsla: HSLA | undefined;
    let hsva: HSVA | undefined;

    // Prevent value from going out of bounds.
    if (srcValue < 0) {
        srcValue = 0;
    } else if (["S", "L", "A"].includes(label) && srcValue > 1) {
        srcValue = 1;
    } else if (["R", "G", "B"].includes(label) && srcValue > 255) {
        srcValue = 255;
    } else if (label === "H" && srcValue > 360) {
        srcValue = 360;
    }

    if (mode === "RGB") {
        rgba = pickerData.colorRGB;

        if (label === "R") {
            rgba.r = srcValue;
        } else if (label === "G") {
            rgba.g = srcValue;
        } else if (label === "B") {
            rgba.b = srcValue;
        } else {
            rgba.a = srcValue;
        }

        hsva = rgbaToHsva(rgba);
    } else {
        hsla = pickerData.colorHSL;

        if (label === "H") {
            hsla.h = srcValue;
        } else if (label === "S") {
            hsla.s = srcValue;
        } else if (label === "L") {
            hsla.l = srcValue;
        } else {
            hsla.a = srcValue;
        }

        hsva = hslaToHsva(hsla);
        rgba = hsvaToRgba(hsva);
    }

    updateColor(pickerData, rgba, hsva);
    updateCanvasColorUI(pickerData, hsva);
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
        createInputLabel(props, cssNamePrefix, inputIDs.H, "H"),
        createInputNumber(pickerData, emit, cssNamePrefix, inputIDs.H, "H", 360),
        createInputLabel(props, cssNamePrefix, inputIDs.S, "S"),
        createInputNumber(pickerData, emit, cssNamePrefix, inputIDs.S, "S", 1, 0.01),
        createInputLabel(props, cssNamePrefix, inputIDs.L, "L"),
        createInputNumber(pickerData, emit, cssNamePrefix, inputIDs.L, "L", 1, 0.01),
    ];

    if (!props.hideAlpha) {
        inputHSL.push(
            createInputLabel(props, cssNamePrefix, inputIDs.A1, "A"),
            createInputNumber(pickerData, emit, cssNamePrefix, inputIDs.A1, "A", 1, 0.01),
        );
    }

    return h("div", {
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
        createInputLabel(props, cssNamePrefix, inputIDs.R, "R"),
        createInputNumber(pickerData, emit, cssNamePrefix, inputIDs.R, "R"),
        createInputLabel(props, cssNamePrefix, inputIDs.G, "G"),
        createInputNumber(pickerData, emit, cssNamePrefix, inputIDs.G, "G"),
        createInputLabel(props, cssNamePrefix, inputIDs.B, "B"),
        createInputNumber(pickerData, emit, cssNamePrefix, inputIDs.B, "B"),
    ];

    if (!props.hideAlpha) {
        inputRGB.push(
            createInputLabel(props, cssNamePrefix, inputIDs.A2, "A"),
            createInputNumber(pickerData, emit, cssNamePrefix, inputIDs.A2, "A", 1, 0.01),
        );
    }

    return h("div", {
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
                value: pickerData.config.value,
                onChange: (event: Event) => {
                    onUpdateInputColorHex((<HTMLInputElement>event.target).value, pickerData, emit);
                }
            }),
            // withDirectives(h("input", {
            //     class: ["form-control", "form-input-text", "form-control-sm"],
            //     type: "text",
            //     id: inputIDs.HEX,
            //     maxlength: 9,
            //     "onUpdate:modelValue": (value: string) => onUpdateInputColorHex(value, pickerData, emit)
            // }), [
            //     [vModelText, pickerData.config.value, "lazy", {lazy: true}]
            // ])
        ]),
    ]);
}

function onUpdateInputColorHex(value: string, pickerData: TColorPickerData, emit: TEmitFn) {
    if (value && pickerData.config.value !== value && [6, 7, 9].includes(value.length)) {
        let srcStr = value.trim();

        if (!value.startsWith("#")) {
            srcStr = "#" + value.trim();
        }

        const rgba = rgbaFromString(<CanvasRenderingContext2D>pickerData.canvasCtx, srcStr);
        const hsva = rgbaToHsva(rgba);

        updateColor(pickerData, rgba, hsva);
        updateCanvasColorUI(pickerData, hsva);
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
        return createCommentVNode(" v-if-inputs ", true);
    }

    return h("div", {
            class: [`${cssNamePrefix}inputs`, "pt-2"],
        }, [
            pickerData.config.mode === "HSL"
                ? renderInputColorHSL(props, pickerData, cssNamePrefix, inputIDs, emit)
                : (
                    pickerData.config.mode === "RGB"
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
                dispatchEventModelValue(pickerData, emit);
                nextTick().then(() => emit("update:mode", value));
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
                    props, pickerData, cssNamePrefix, emit,
                    sliderThumbMoveHandler, alphaSliderThumbMoveHandler,
                ),
                renderColorPickerInputs(props, pickerData, cssNamePrefix, inputIDs, emit),
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
    document.addEventListener(
        "touchend",
        () => document.removeEventListener(
            "touchmove",
            sliderThumbMoveHandler,
            {passive: false} as EventListenerOptions
        )
    );
    document.addEventListener(
        "touchend",
        () => document.removeEventListener(
            "touchmove",
            alphaSliderThumbMoveHandler,
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
    const px = pointer.pageX - rect.x;

    // Make sure the Thumb doesn't go out of bounds
    const posX = (px < 0) ? 0 : (px > rect.width) ? rect.width : px;
    const hueX = posX / rect.width * 100;
    const hsva = {
        h: Math.round(hueX / 100 * 360),
        s: pickerData.config.currentColor.s,
        v: pickerData.config.currentColor.v,
        a: pickerData.config.currentColor.a,
    };
    const rgba = hsvaToRgba(hsva);

    // Update UI
    (<HTMLElement>pickerData.colorArea.value).style.color = `hsl(${hsva.h}, 100%, 50%)`;
    (<HTMLElement>pickerData.colorSliderMarker.value).style.left = `${hueX}%`;
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
    const px = pointer.pageX - rect.x;

    // Make sure the Thumb doesn't go out of bounds
    const posX = (px < 0) ? 0 : (px > rect.width) ? rect.width : px;
    const alphaX = Math.round(posX / rect.width * 100);

    // Update UI
    (<HTMLElement>pickerData.alphaSliderMarker.value).style.left = `${alphaX}%`;
    pickerData.config.alphaSlider = alphaX;
    pickerData.config.currentColor.a = alphaX / 100;
    pickerData.colorHSL.a = alphaX / 100;
    pickerData.colorRGB.a = alphaX / 100;
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
        rgba = rgbaFromString(<CanvasRenderingContext2D>pickerData.canvasCtx, <string>pickerData.config.value);
        hsva = rgbaToHsva(rgba);
    }

    updateColor(pickerData, rgba, hsva);
    updateCanvasColorUI(pickerData, hsva);
    updateColorPreview(pickerData, emit);
}

function updateCanvasColorUI(pickerData: TColorPickerData, color?: HSVA) {
    const hsva: HSVA = color || {
        h: pickerData.config.currentColor.h,
        s: pickerData.config.currentColor.s,
        v: pickerData.config.currentColor.v,
        a: pickerData.config.currentColor.a,
    };

    (<HTMLElement>pickerData.colorArea.value).style.color = `hsl(${hsva.h}, 100%, 50%)`;
    (<HTMLElement>pickerData.colorMarker.value).style.left = `${pickerData.colorAreaRect.width * hsva.s / 100}px`;
    (<HTMLElement>pickerData.colorMarker.value).style.top = `${pickerData.colorAreaRect.height - (pickerData.colorAreaRect.height * hsva.v / 100)}px`;
    (<HTMLElement>pickerData.colorSliderMarker.value).style.left = `${hsva.h / 360 * 100}%`;

    if (pickerData.alphaSliderMarker.value) {
        (<HTMLElement>pickerData.alphaSliderMarker.value).style.left = `${hsva.a * 100}%`;
    }
}