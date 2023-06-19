import type {ComponentInternalInstance, ComputedRef, Ref, ShallowRef, Slots, VNode} from "vue";
import {createCommentVNode, h, Teleport, toDisplayString, withDirectives} from "vue";
import type {TEmitFn, TImageDataset, TLightboxOptionProps, TRecord} from "../../../types";
import {cssPrefix, useBreakpointMax, useMobileDevice, useRenderTransition} from "../../../mixins/CommonApi";
import {BsOverlay} from "../../Animation";
import {BsSpacer} from "../../Basic";
import {BsButton} from "../../Button";
import {BsDropdownMenu} from "../../Menu";
import {useClosePopover} from "../../Popover/mixins/popoverApi";
import Touch from "../../../directives/Touch";
import Helper from "../../../utils/Helper";

export function useComputeImgStyle(
    props: Readonly<TLightboxOptionProps>,
    rotate: Ref<number>,
    zoom: Ref<number>,
): TRecord | undefined {
    const scale = zoom.value !== 1 && (zoom.value < 5 || zoom.value > 0.4)
        ? `scale(${zoom.value})` : '';
    const rotation = [0, 360, -360].includes(rotate.value) ? '' : `rotate(${rotate.value}deg)`;

    if (scale !== '' && rotation !== '') {
        return {
            ...props.imageStyles,
            transform: `${scale} ${rotation}`
        }
    } else if (scale !== '') {
        return {
            ...props.imageStyles,
            transform: scale
        }
    } else if (rotation !== '') {
        return {
            ...props.imageStyles,
            transform: rotation
        }
    } else {
        return props.imageStyles;
    }
}

export function useRenderLightbox(
    slots: Slots,
    emit: TEmitFn,
    instance: ShallowRef<ComponentInternalInstance | null>,
    props: Readonly<TLightboxOptionProps>,
    imgStyle: ComputedRef<TRecord | undefined>,
    isOpen: Ref<boolean>,
    activeItem: Ref<TImageDataset | undefined>,
    itemIndex: Ref<number>,
    rotate: Ref<number>,
    zoom: Ref<number>,
    transition: Ref<string>,
): VNode {
    return h(Teleport, {to: "body"}, [
        // @ts-ignore
        h(BsOverlay, {
            color: props.overlayColor,
            opacity: props.overlayOpacity,
            show: isOpen.value && props.overlay,
            fixed: true,
        }),
        (
            isOpen.value
                ? h("div", {
                    class: `${cssPrefix}lightbox-wrap`
                }, [
                    createLightboxToolbar(
                        slots, emit, instance, props, isOpen,
                        activeItem, itemIndex, rotate, zoom
                    ),
                    createLightboxDisplay(
                        emit, instance, props, imgStyle, isOpen,
                        activeItem, itemIndex, zoom, rotate, transition,
                    ),
                    createLightboxThumbnail(emit, props, activeItem, itemIndex, zoom, rotate),
                ])
                : createCommentVNode(" BsLightbox ")
        ),
    ]);
}

function createLightboxToolbar(
    slots: Slots,
    emit: TEmitFn,
    instance: ShallowRef<ComponentInternalInstance | null>,
    props: Readonly<TLightboxOptionProps>,
    isOpen: Ref<boolean>,
    activeItem: Ref<TImageDataset | undefined>,
    itemIndex: Ref<number>,
    rotate: Ref<number>,
    zoom: Ref<number>,
): VNode {
    if (!props.showToolbar && !props.showCounter) {
        return createCommentVNode(" v-if-toolbar ");
    }

    return h("div", {
        class: [`${cssPrefix}lightbox-toolbar`]
    }, [
        (
            props.showCounter === true
                ? h("div", {
                    class: [`${cssPrefix}counter`, "d-none", "d-md-flex"]
                }, [
                    h("span", {
                        class: [`${cssPrefix}counter-current`]
                    }, toDisplayString(itemIndex.value + 1)),
                    "/",
                    h("span", {
                        class: [`${cssPrefix}counter-all`]
                    }, toDisplayString(props.items?.length || 0)),
                ])
                : ""
        ),
        (
            props.showToolbar === true ? h(BsSpacer) : undefined
        ),
        (
            props.showToolbar === true
                ? h("div", {
                    class: [`${cssPrefix}toolbar-items`, "d-flex"]
                }, [
                    createButtonItem(
                        "download",
                        (activeItem.value !== undefined && props.toolbar?.download === true),
                        () => emit('exec-download', activeItem.value)
                    ),
                    createButtonItem(
                        "zoom_in",
                        (activeItem.value !== undefined && props.toolbar?.zoom === true),
                        () => {
                            if (zoom.value >= 1 && zoom.value < 4) {
                                zoom.value += 1;
                            } else if (zoom.value > 0.6 && zoom.value < 1) {
                                zoom.value += 0.1;
                            } else {
                                zoom.value = 1;
                            }
                            emit('exec-zoomin', activeItem.value, zoom.value);
                        }
                    ),
                    createButtonItem(
                        "zoom_out",
                        (activeItem.value !== undefined && props.toolbar?.zoom === true),
                        () => {
                            if (zoom.value > 1 && zoom.value < 4) {
                                zoom.value -= 1;
                            } else if (zoom.value > 0.6 && zoom.value <= 1) {
                                zoom.value -= 0.1;
                            } else {
                                zoom.value = 1;
                            }
                            emit('exec-zoomout', activeItem.value, zoom.value);
                        }
                    ),
                    createButtonItem(
                        "rotate_left",
                        (activeItem.value !== undefined && props.toolbar?.rotate === true),
                        () => {
                            if (rotate.value > -270 && rotate.value < 361) {
                                rotate.value -= 90;
                            } else {
                                rotate.value = 0;
                            }
                            emit('exec-rotate-left', activeItem.value, rotate.value);
                        }
                    ),
                    createButtonItem(
                        "rotate_right",
                        (activeItem.value !== undefined && props.toolbar?.rotate === true),
                        () => {
                            if (rotate.value > -361 && rotate.value < 270) {
                                rotate.value += 90;
                            } else {
                                rotate.value = 0;
                            }
                            emit('exec-rotate-right', activeItem.value, rotate.value);
                        }
                    ),
                    createButtonItem(
                        "info_outlined",
                        (activeItem.value !== undefined && props.toolbar?.info === true),
                        () => emit('exec-info', activeItem.value)
                    ),
                    createButtonItem(
                        "delete_outlined",
                        (activeItem.value !== undefined && props.toolbar?.delete === true),
                        () => emit('exec-delete', activeItem.value)
                    ),
                    (
                        (activeItem.value && props.toolbar?.menubar === true)
                            // @ts-ignore
                            ? h(BsDropdownMenu, {
                                color: "transparent",
                                placement: "bottom-right"
                            }, {
                                default: () =>
                                    // @ts-ignore
                                    h(BsButton, {
                                        color: "light-grey",
                                        mode: "icon",
                                        icon: "more_vert",
                                        flat: true,
                                    }),
                                content: () => slots.menubar && slots.menubar()
                            })
                            : undefined
                    ),
                    createButtonItem(
                        "close",
                        (props.toolbar?.close === true),
                        () => {
                            useClosePopover(instance.value, isOpen, "Button close clicked.");
                        }
                    ),
                ])
                : ""
        ),
    ]);
}

function createButtonItem(
    icon: string,
    condition: boolean,
    clickHandler: VoidFunction,
): VNode | undefined {
    return condition
        // @ts-ignore
        ? h(BsButton, {
            color: "light-grey",
            mode: "icon",
            icon: icon,
            flat: true,
            onClick: () => clickHandler()
        })
        : undefined;
}

function createLightboxDisplay(
    emit: TEmitFn,
    instance: ShallowRef<ComponentInternalInstance | null>,
    props: Readonly<TLightboxOptionProps>,
    imgStyle: ComputedRef<TRecord | undefined>,
    isOpen: Ref<boolean>,
    activeItem: Ref<TImageDataset | undefined>,
    itemIndex: Ref<number>,
    zoom: Ref<number>,
    rotate: Ref<number>,
    transition: Ref<string>,
): VNode {
    return h("div", {
        class: `${cssPrefix}lightbox-display`,
        style: {
            height: props.showThumbnail === true
                ? 'calc(100% - ' + (<number>props.thumbnailHeight + 2) + 'px)'
                : '100%'
        },
        onClick: () => {
            (props.overlayClose || props.overlayClickClose) &&
            useClosePopover(instance.value, isOpen, "Overlay clicked.");
        }
    }, [
        createLightboxNavCtrl(emit, props, activeItem, itemIndex, zoom, rotate, transition),
        useRenderTransition(
            {name: transition.value, mode: props.transitionMode, appear: true},
            (
                activeItem.value
                    ? h("div", {
                        key: activeItem.value.imageSrc,
                        class: `${cssPrefix}lightbox-item`
                    }, [
                        withDirectives(h("div", {
                            class: `${cssPrefix}lightbox-item-img`,
                        }, [
                            h("img", {
                                class: props.imageClass,
                                style: imgStyle.value,
                                alt: activeItem.value.title,
                                src: activeItem.value.imageSrc,
                                rel: "preload",
                                onClick: (e: Event) => e.stopPropagation(),
                            })
                        ]), [
                            [Touch, {
                                left: () => useNavigateNextSlide(
                                    emit, props, activeItem, itemIndex, zoom, rotate, transition, true
                                ),
                                right: () => useNavigatePrevSlide(
                                    emit, props, activeItem, itemIndex, zoom, rotate, transition, true
                                ),
                            }]
                        ]),
                        (
                            props.showItemTitle === true
                                ? h("div", {
                                    class: [`${cssPrefix}lightbox-item-title`],
                                    onClick: (e: Event) => e.stopPropagation(),
                                }, toDisplayString(activeItem.value?.title))
                                : ""
                        ),
                    ])
                    : createCommentVNode(" v-if-image ")
            )
        )
    ])
}

function createLightboxNavCtrl(
    emit: TEmitFn,
    props: Readonly<TLightboxOptionProps>,
    activeItem: Ref<TImageDataset | undefined>,
    itemIndex: Ref<number>,
    zoom: Ref<number>,
    rotate: Ref<number>,
    transition: Ref<string>,
): VNode {
    if (!props.showNavControl || !props.items?.length) {
        return createCommentVNode(" v-if-navigation ");
    }

    return h("div", {
        class: `${cssPrefix}lightbox-controls`
    }, [
        h("div", {
            class: `${cssPrefix}control-prev`
        }, [
            // @ts-ignore
            h(BsButton, {
                color: "light-grey",
                mode: "icon",
                icon: "navigate_before",
                size: "lg",
                flat: true,
                iconSize: 40,
                onClick: (e: Event) => {
                    e.stopPropagation();
                    useNavigatePrevSlide(emit, props, activeItem, itemIndex, zoom, rotate, transition);
                }
            })
        ]),
        h("div", {
            class: `${cssPrefix}control-next`
        }, [
            // @ts-ignore
            h(BsButton, {
                color: "light-grey",
                mode: "icon",
                icon: "navigate_next",
                size: "lg",
                flat: true,
                iconSize: 40,
                onClick: (e: Event) => {
                    e.stopPropagation();
                    useNavigateNextSlide(emit, props, activeItem, itemIndex, zoom, rotate, transition);
                }
            })
        ]),
    ]);
}

export function useNavigatePrevSlide(
    emit: TEmitFn,
    props: Readonly<TLightboxOptionProps>,
    activeItem: Ref<TImageDataset | undefined>,
    itemIndex: Ref<number>,
    zoom: Ref<number>,
    rotate: Ref<number>,
    transition: Ref<string>,
    touchTriggered?: boolean,
) {
    if (touchTriggered) {
        transition.value = useMobileDevice() && useBreakpointMax("md")
            ? "slide-left-right" : <string>props.transition;
    } else {
        transition.value = <string>props.transition;
    }
    if (itemIndex.value === 0) {
        itemIndex.value = (props.items?.length ?? 0) - 1;
    } else {
        itemIndex.value--;
    }

    useSetActiveLightboxItem(emit, props, activeItem, itemIndex, zoom, rotate, itemIndex.value);
}

export function useNavigateNextSlide(
    emit: TEmitFn,
    props: Readonly<TLightboxOptionProps>,
    activeItem: Ref<TImageDataset | undefined>,
    itemIndex: Ref<number>,
    zoom: Ref<number>,
    rotate: Ref<number>,
    transition: Ref<string>,
    touchTriggered = false,
) {
    if (touchTriggered) {
        transition.value = useMobileDevice() && useBreakpointMax("md")
            ? "slide-right-left" : <string>props.transition;
    } else {
        transition.value = <string>props.transition;
    }
    if (itemIndex.value < ((props.items?.length ?? 0) - 1)) {
        itemIndex.value++;
    } else {
        itemIndex.value = 0;
    }

    useSetActiveLightboxItem(emit, props, activeItem, itemIndex, zoom, rotate, itemIndex.value);
}

function resetZoomRotate(zoom: Ref<number>, rotate: Ref<number>) {
    zoom.value = 1;
    rotate.value = 0;
}

function createLightboxThumbnail(
    emit: TEmitFn,
    props: Readonly<TLightboxOptionProps>,
    activeItem: Ref<TImageDataset | undefined>,
    itemIndex: Ref<number>,
    zoom: Ref<number>,
    rotate: Ref<number>,
): VNode {
    if (!props.showThumbnail || !props.items?.length) {
        return createCommentVNode(" v-if-thumbnail ");
    }

    return h("div", {
        class: `${cssPrefix}lightbox-thumbnail`
    }, [
        h("div", {
            class: `${cssPrefix}lightbox-thumbnail-row`
        }, [
            h("div", {
                class: `${cssPrefix}lightbox-thumbnails`
            }, props.items.map((it, idx) => {
                return h("div", {
                    key: `item-${idx}`,
                    class: [`${cssPrefix}thumbnail-item`, (itemIndex.value === idx ? "active" : "")],
                    onClick: () => useSetActiveLightboxItem(emit, props, activeItem, itemIndex, zoom, rotate, idx),
                }, [
                    h("img", {
                        src: it.thumbnail,
                        alt: it.title,
                        style: {
                            height: Helper.cssUnit(props.thumbnailHeight),
                            width: "auto"
                        }
                    })
                ])
            }))
        ])
    ])
}

export function useSetActiveLightboxItem(
    emit: TEmitFn,
    props: Readonly<TLightboxOptionProps>,
    activeItem: Ref<TImageDataset | undefined>,
    activeIndex: Ref<number>,
    zoom: Ref<number>,
    rotate: Ref<number>,
    newIndex: number,
) {
    if (props.items && newIndex > -1 && newIndex < props.items?.length) {
        resetZoomRotate(zoom, rotate);
        activeIndex.value = newIndex;
        activeItem.value = props.items.length > 0 ? props.items[newIndex] : undefined;
        emit("change", activeItem.value, newIndex);
    } else {
        throw Error("The given image index is out of bound.");
    }
}
