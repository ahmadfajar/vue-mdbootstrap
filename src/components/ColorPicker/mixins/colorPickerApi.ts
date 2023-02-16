import {ComputedRef, createCommentVNode, h, mergeProps, Ref, VNode} from "vue";
import {cssPrefix, useMergeClass} from "../../../mixins/CommonApi";
import type {
    TColorPickerData,
    TColorPickerMode,
    TColorPickerOptionProps,
    TElementRect,
    TEmitFn,
    THsva,
    TRecord, TRgba
} from "../../../types";
import {BsToggleButton} from "../../Button";
import {hsvaToRgba} from "./colorUtils";

function renderColorPickerControls(
    props: Readonly<TColorPickerOptionProps>,
    pickerData: TColorPickerData,
    cssNamePrefix: string,
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
                    ref: pickerData.colorSliderMarker,
                    class: [`${cssNamePrefix}slider-thumb`],
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
                        ref: pickerData.alphaSliderMarker,
                        class: [`${cssNamePrefix}slider-thumb`],
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
    inputIDs: TRecord,
    cssNamePrefix: string,
): VNode {
    const inputHSL = [
        createInputLabel(props, cssNamePrefix, <string>inputIDs.H, "H"),
        createInputNumber(cssNamePrefix, <string>inputIDs.H, 360),
        createInputLabel(props, cssNamePrefix, <string>inputIDs.S, "S"),
        createInputNumber(cssNamePrefix, <string>inputIDs.S, 100),
        createInputLabel(props, cssNamePrefix, <string>inputIDs.L, "L"),
        createInputNumber(cssNamePrefix, <string>inputIDs.L, 100),
    ];

    if (!props.hideAlpha) {
        inputHSL.push(
            createInputLabel(props, cssNamePrefix, <string>inputIDs.A1, "A"),
            createInputAlpha(cssNamePrefix, <string>inputIDs.A1),
        );
    }

    return h("div", {
        class: [`${cssNamePrefix}input-row`],
    }, inputHSL);
}

function createInputColorRGB(
    props: Readonly<TColorPickerOptionProps>,
    inputIDs: TRecord,
    cssNamePrefix: string,
): VNode {
    const inputRGB = [
        createInputLabel(props, cssNamePrefix, <string>inputIDs.R, "R"),
        createInputNumber(cssNamePrefix, <string>inputIDs.R),
        createInputLabel(props, cssNamePrefix, <string>inputIDs.G, "G"),
        createInputNumber(cssNamePrefix, <string>inputIDs.G),
        createInputLabel(props, cssNamePrefix, <string>inputIDs.B, "B"),
        createInputNumber(cssNamePrefix, <string>inputIDs.B),
    ];

    if (!props.hideAlpha) {
        inputRGB.push(
            createInputLabel(props, cssNamePrefix, <string>inputIDs.A2, "A"),
            createInputAlpha(cssNamePrefix, <string>inputIDs.A2),
        );
    }

    return h("div", {
        class: [`${cssNamePrefix}input-row`],
    }, inputRGB);
}

function renderColorPickerInputs(
    props: Readonly<TColorPickerOptionProps>,
    pickerMode: Ref<TColorPickerMode>,
    inputIDs: TRecord,
    cssNamePrefix: string,
): VNode {
    if (props.hideInputs === true) {
        return createCommentVNode(" v-if-inputs ", true);
    }

    return h("div", {
        class: [`${cssNamePrefix}inputs`, "pt-2"],
    }, [
        pickerMode.value === "HSL"
            ? createInputColorHSL(props, inputIDs, cssNamePrefix)
            : (
                pickerMode.value === "RGB"
                    ? createInputColorRGB(props, inputIDs, cssNamePrefix)
                    : h("div", {
                        class: [`${cssNamePrefix}input-row`],
                    }, [
                        createInputLabel(props, cssNamePrefix, <string>inputIDs.HEX, "HEX"),
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
                    ])
            ),
    ]);
}

function renderColorPickerModeButtons(
    props: Readonly<TColorPickerOptionProps>,
    pickerMode: Ref<TColorPickerMode>,
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
            modelValue: pickerMode.value,
            "onUpdate:model-value": (value: TColorPickerMode) => {
                pickerMode.value = value;
                emit("update:mode", value);
            }
        })
    ]);
}

export function useRenderColorPicker(
    props: Readonly<TColorPickerOptionProps>,
    pickerClasses: ComputedRef<string[]>,
    pickerData: TColorPickerData,
    inputIDs: TRecord,
    attrs: TRecord,
    emit: TEmitFn,
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
            }, [
                h("div", {
                    tabIndex: 0,
                    ref: pickerData.colorMarker,
                    class: [`${cssNamePrefix}canvas-marker`],
                    onMousedown: () => moveColorMarkerListener("mousemove", pickerData, emit),
                    onTouchstart: () => moveColorMarkerListener(
                        "touchmove",
                        pickerData,
                        emit,
                        false,
                        {passive: false},
                    )
                })
            ]),
            h("div", {
                class: [`${cssNamePrefix}body`]
            }, [
                renderColorPickerControls(props, pickerData, cssNamePrefix),
                renderColorPickerInputs(props, pickerData.pickerMode, inputIDs, cssNamePrefix),
                renderColorPickerModeButtons(props, pickerData.pickerMode, emit),
            ])
        ]);
}

export function moveColorMarkerListener<K extends keyof DocumentEventMap>(
    eventType: K,
    pickerData: TColorPickerData,
    emit: TEmitFn,
    removeListener?: boolean,
    options?: boolean | AddEventListenerOptions,
) {
    const moveColorMarkerFn = (event: Event) => {
        moveColorMarker(<UIEvent>event, pickerData, emit);
    }

    if (removeListener) {
        document.removeEventListener(eventType, moveColorMarkerFn, options);
    } else {
        document.addEventListener(eventType, moveColorMarkerFn, options);
    }
}

function moveColorMarker(event: UIEvent, pickerData: TColorPickerData, emit: TEmitFn) {
    const pointer = getPointerPosition(event);
    const x = pointer.pageX - pickerData.colorAreaRect.x;
    const y = pointer.pageY - pickerData.colorAreaRect.y;

    // if (container) {
    //     y += container.scrollTop;
    // }

    setMarkerPosition(pickerData, x, y, emit);

    // Prevent scrolling while dragging the marker
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

function setMarkerPosition(
    pickerData: TColorPickerData,
    posX: number, posY: number,
    emit: TEmitFn,
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
    setColorAtPosition(pickerData, x, y, emit);

    // Make sure the marker is focused
    colorMarker.focus();
}

function setColorAtPosition(
    pickerData: TColorPickerData,
    posX: number,
    posY: number,
    emit: TEmitFn,
) {
    const hsva: THsva = {
        h: pickerData.colorSliderValue.value,
        s: posX / pickerData.colorAreaRect.width * 100,
        v: 100 - (posY / pickerData.colorAreaRect.height * 100),
        a: pickerData.alphaSliderValue.value / 100
    };
    const rgba = hsvaToRgba(hsva);

    // updateMarkerA11yLabel(hsva.s, hsva.v);
    updateColor(pickerData, rgba, hsva, emit);
    // pickColor();
}

function updateColor(
    pickerData: TColorPickerData,
    rgba: TRgba,
    hsva: THsva,
    emit: TEmitFn,
) {
    const mode = pickerData.pickerMode.value;

    for (const key in rgba) {
        currentColor[key] = rgba[key];
    }

    for (const key in hsva) {
        currentColor[key] = hsva[key];
    }

    const hex = RGBAToHex(currentColor);
    const opaqueHex = hex.substring(0, 7);

    colorMarker.style.color = opaqueHex;
    alphaMarker.parentNode.style.color = opaqueHex;
    alphaMarker.style.color = hex;
    colorPreview.style.color = hex;

    // Force repaint the color and alpha gradients as a workaround for a Google Chrome bug
    colorArea.style.display = 'none';
    colorArea.offsetHeight;
    colorArea.style.display = '';
    alphaMarker.nextElementSibling.style.display = 'none';
    alphaMarker.nextElementSibling.offsetHeight;
    alphaMarker.nextElementSibling.style.display = '';

    if (format === 'mixed') {
        format = currentColor.a === 1 ? 'hex' : 'rgb';
    } else if (format === 'auto') {
        format = currentFormat;
    }

    switch (format) {
        case 'hex':
            colorValue.value = hex;
            break;
        case 'rgb':
            colorValue.value = RGBAToStr(currentColor);
            break;
        case 'hsl':
            colorValue.value = HSLAToStr(HSVAtoHSLA(currentColor));
            break;
    }
}
