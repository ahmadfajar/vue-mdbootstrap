import { BsSpacer } from '@/components/Basic';
import { BsButton } from '@/components/Button';
import { BsDropdownMenu } from '@/components/Menu';
import { useClosePopover } from '@/components/Popover/mixins/popoverApi.ts';
import { Touch } from '@/directives';
import {
    cssPrefix,
    useBreakpointMax,
    useMobileDevice,
    useRenderTransition,
} from '@/mixins/CommonApi.ts';
import type {
    TButtonMode,
    TButtonSize,
    TEmitFn,
    TImageDataset,
    TLightboxOptionProps,
    TPopoverPosition,
    TRecord,
} from '@/types';
import Helper from '@/utils/Helper';
import type {
    ComponentInternalInstance,
    ComputedRef,
    Prop,
    Ref,
    ShallowRef,
    Slots,
    VNode,
} from 'vue';
import { createCommentVNode, h, Teleport, toDisplayString, withDirectives } from 'vue';

export function useComputeImgStyle(
    props: Readonly<TLightboxOptionProps>,
    rotate: Ref<number>,
    zoom: Ref<number>
): TRecord | undefined {
    const scale =
        zoom.value !== 1 && (zoom.value < 5 || zoom.value > 0.4) ? `scale(${zoom.value})` : '';
    const rotation = [0, 360, -360].includes(rotate.value) ? '' : `rotate(${rotate.value}deg)`;

    if (scale !== '' && rotation !== '') {
        return {
            ...props.imageStyles,
            transform: `${scale} ${rotation}`,
        };
    } else if (scale !== '') {
        return {
            ...props.imageStyles,
            transform: scale,
        };
    } else if (rotation !== '') {
        return {
            ...props.imageStyles,
            transform: rotation,
        };
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
    transition: Ref<string>
): VNode {
    return h(Teleport, { to: 'body' }, [
        useRenderTransition({ name: 'fade' }, [
            isOpen.value
                ? h(
                      'div',
                      {
                          class: [
                              `${cssPrefix}lightbox-wrap`,
                              props.overlay ? `${cssPrefix}lightbox-overlay` : '',
                          ],
                          style: { 'z-index': props.zIndex },
                      },
                      [
                          createLightboxToolbar(
                              slots,
                              emit,
                              instance,
                              props,
                              isOpen,
                              activeItem,
                              itemIndex,
                              rotate,
                              zoom
                          ),
                          createLightboxDisplay(
                              emit,
                              instance,
                              props,
                              imgStyle,
                              isOpen,
                              activeItem,
                              itemIndex,
                              zoom,
                              rotate,
                              transition
                          ),
                          createLightboxThumbnail(emit, props, activeItem, itemIndex, zoom, rotate),
                      ]
                  )
                : createCommentVNode(' BsLightbox '),
        ]),
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
    zoom: Ref<number>
): VNode {
    if (!props.showToolbar && !props.showCounter) {
        return createCommentVNode(' v-if-toolbar ');
    }

    return h(
        'div',
        {
            class: [`${cssPrefix}lightbox-toolbar`],
        },
        [
            props.showCounter === true
                ? h(
                      'div',
                      {
                          class: [`${cssPrefix}counter`, 'd-none', 'd-md-flex'],
                      },
                      [
                          h(
                              'span',
                              {
                                  class: [`${cssPrefix}counter-current`],
                              },
                              toDisplayString(itemIndex.value + 1)
                          ),
                          '/',
                          h(
                              'span',
                              {
                                  class: [`${cssPrefix}counter-all`],
                              },
                              toDisplayString(props.items?.length || 0)
                          ),
                      ]
                  )
                : '',
            props.showToolbar === true ? h(BsSpacer) : undefined,
            props.showToolbar === true
                ? h(
                      'div',
                      {
                          class: [`${cssPrefix}toolbar-items`, 'd-flex'],
                      },
                      [
                          createButtonItem(
                              'download',
                              activeItem.value != null && props.toolbar?.download === true,
                              () => emit('exec-download', activeItem.value)
                          ),
                          createButtonItem(
                              'zoom_in',
                              activeItem.value != null && props.toolbar?.zoom === true,
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
                              'zoom_out',
                              activeItem.value != null && props.toolbar?.zoom === true,
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
                              'rotate_left',
                              activeItem.value != null && props.toolbar?.rotate === true,
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
                              'rotate_right',
                              activeItem.value != null && props.toolbar?.rotate === true,
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
                              'info_outlined',
                              activeItem.value != null && props.toolbar?.info === true,
                              () => emit('exec-info', activeItem.value)
                          ),
                          createButtonItem(
                              'delete_outlined',
                              activeItem.value != null && props.toolbar?.delete === true,
                              () => emit('exec-delete', activeItem.value)
                          ),
                          activeItem.value && props.toolbar?.menubar === true
                              ? h(
                                    BsDropdownMenu,
                                    {
                                        color: 'transparent' as Prop<string>,
                                        placement: 'bottom-right' as Prop<TPopoverPosition>,
                                    },
                                    {
                                        default: () =>
                                            h(BsButton, {
                                                color: 'light-grey' as Prop<string>,
                                                mode: 'icon' as Prop<TButtonMode>,
                                                icon: 'more_vert' as Prop<string>,
                                                // @ts-ignore
                                                flat: true as Prop<boolean>,
                                            }),
                                        content: () => slots.menubar && slots.menubar(),
                                    }
                                )
                              : undefined,
                          createButtonItem('close', props.toolbar?.close === true, () => {
                              useClosePopover(instance.value, isOpen, 'Button close clicked.');
                          }),
                      ]
                  )
                : '',
        ]
    );
}

function createButtonItem(
    icon: string,
    condition: boolean,
    clickHandler: VoidFunction
): VNode | undefined {
    return condition
        ? h(BsButton, {
              color: 'light-grey' as Prop<string>,
              mode: 'icon' as Prop<TButtonMode>,
              icon: icon as Prop<string>,
              // @ts-ignore
              flat: true as Prop<boolean>,
              onClick: () => clickHandler(),
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
    transition: Ref<string>
): VNode {
    return h(
        'div',
        {
            class: `${cssPrefix}lightbox-display`,
            style: {
                height:
                    props.showThumbnail === true
                        ? 'calc(100% - ' + ((props.thumbnailHeight as number) + 2) + 'px)'
                        : '100%',
            },
            onClick: () => {
                (props.overlayClose || props.overlayClickClose) &&
                    useClosePopover(instance.value, isOpen, 'Overlay clicked.');
            },
        },
        [
            createLightboxNavCtrl(emit, props, activeItem, itemIndex, zoom, rotate, transition),
            useRenderTransition(
                { name: transition.value, mode: props.transitionMode, appear: true },
                activeItem.value
                    ? h(
                          'div',
                          {
                              key: activeItem.value.imageSrc,
                              class: `${cssPrefix}lightbox-item`,
                          },
                          [
                              withDirectives(
                                  h(
                                      'div',
                                      {
                                          class: `${cssPrefix}lightbox-item-img`,
                                      },
                                      [
                                          h('img', {
                                              class: props.imageClass,
                                              style: imgStyle.value,
                                              alt: activeItem.value.title,
                                              src: activeItem.value.imageSrc,
                                              rel: 'preload',
                                              onClick: (e: Event) => e.stopPropagation(),
                                          }),
                                      ]
                                  ),
                                  [
                                      [
                                          Touch,
                                          {
                                              left: () =>
                                                  useNavigateNextSlide(
                                                      emit,
                                                      props,
                                                      activeItem,
                                                      itemIndex,
                                                      zoom,
                                                      rotate,
                                                      transition,
                                                      true
                                                  ),
                                              right: () =>
                                                  useNavigatePrevSlide(
                                                      emit,
                                                      props,
                                                      activeItem,
                                                      itemIndex,
                                                      zoom,
                                                      rotate,
                                                      transition,
                                                      true
                                                  ),
                                          },
                                      ],
                                  ]
                              ),
                              props.showItemTitle === true
                                  ? h(
                                        'div',
                                        {
                                            class: [`${cssPrefix}lightbox-item-title`],
                                            onClick: (e: Event) => e.stopPropagation(),
                                        },
                                        toDisplayString(activeItem.value?.title)
                                    )
                                  : '',
                          ]
                      )
                    : createCommentVNode(' v-if-image ')
            ),
        ]
    );
}

function createLightboxNavCtrl(
    emit: TEmitFn,
    props: Readonly<TLightboxOptionProps>,
    activeItem: Ref<TImageDataset | undefined>,
    itemIndex: Ref<number>,
    zoom: Ref<number>,
    rotate: Ref<number>,
    transition: Ref<string>
): VNode {
    if (!props.showNavControl || !props.items?.length) {
        return createCommentVNode(' v-if-navigation ');
    }

    return h(
        'div',
        {
            class: `${cssPrefix}lightbox-controls`,
        },
        [
            h(
                'div',
                {
                    class: `${cssPrefix}control-prev`,
                },
                [
                    h(BsButton, {
                        color: 'light-grey' as Prop<string>,
                        mode: 'icon' as Prop<TButtonMode>,
                        icon: 'chevron_backward' as Prop<string>,
                        size: 'lg' as Prop<TButtonSize>,
                        // @ts-ignore
                        flat: true as Prop<boolean>,
                        iconSize: 40 as Prop<number>,
                        onClick: (e: Event) => {
                            e.stopPropagation();
                            useNavigatePrevSlide(
                                emit,
                                props,
                                activeItem,
                                itemIndex,
                                zoom,
                                rotate,
                                transition
                            );
                        },
                    }),
                ]
            ),
            h(
                'div',
                {
                    class: `${cssPrefix}control-next`,
                },
                [
                    h(BsButton, {
                        color: 'light-grey' as Prop<string>,
                        mode: 'icon' as Prop<TButtonMode>,
                        icon: 'chevron_forward' as Prop<string>,
                        size: 'lg' as Prop<TButtonSize>,
                        // @ts-ignore
                        flat: true as Prop<boolean>,
                        iconSize: 40 as Prop<number>,
                        onClick: (e: Event) => {
                            e.stopPropagation();
                            useNavigateNextSlide(
                                emit,
                                props,
                                activeItem,
                                itemIndex,
                                zoom,
                                rotate,
                                transition
                            );
                        },
                    }),
                ]
            ),
        ]
    );
}

export function useNavigatePrevSlide(
    emit: TEmitFn,
    props: Readonly<TLightboxOptionProps>,
    activeItem: Ref<TImageDataset | undefined>,
    itemIndex: Ref<number>,
    zoom: Ref<number>,
    rotate: Ref<number>,
    transition: Ref<string>,
    touchTriggered?: boolean
) {
    if (touchTriggered) {
        transition.value =
            useMobileDevice() && useBreakpointMax('md')
                ? 'slide-left-right'
                : (props.transition as string);
    } else {
        transition.value = props.transition as string;
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
    touchTriggered = false
) {
    if (touchTriggered) {
        transition.value =
            useMobileDevice() && useBreakpointMax('md')
                ? 'slide-right-left'
                : (props.transition as string);
    } else {
        transition.value = props.transition as string;
    }
    if (itemIndex.value < (props.items?.length ?? 0) - 1) {
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
    rotate: Ref<number>
): VNode {
    if (!props.showThumbnail || !props.items?.length) {
        return createCommentVNode(' v-if-thumbnail ');
    }

    return h(
        'div',
        {
            class: `${cssPrefix}lightbox-thumbnail`,
        },
        [
            h(
                'div',
                {
                    class: `${cssPrefix}lightbox-thumbnail-row`,
                },
                [
                    h(
                        'div',
                        {
                            class: `${cssPrefix}lightbox-thumbnails`,
                        },
                        props.items.map((it, idx) => {
                            return h(
                                'div',
                                {
                                    key: `item-${idx}`,
                                    class: [
                                        `${cssPrefix}thumbnail-item`,
                                        itemIndex.value === idx ? 'active' : '',
                                    ],
                                    onClick: () =>
                                        useSetActiveLightboxItem(
                                            emit,
                                            props,
                                            activeItem,
                                            itemIndex,
                                            zoom,
                                            rotate,
                                            idx
                                        ),
                                },
                                [
                                    h('img', {
                                        src: it.thumbnail,
                                        alt: it.title,
                                        style: {
                                            height: Helper.cssUnit(props.thumbnailHeight),
                                            width: 'auto',
                                        },
                                    }),
                                ]
                            );
                        })
                    ),
                ]
            ),
        ]
    );
}

export function useSetActiveLightboxItem(
    emit: TEmitFn,
    props: Readonly<TLightboxOptionProps>,
    activeItem: Ref<TImageDataset | undefined>,
    activeIndex: Ref<number>,
    zoom: Ref<number>,
    rotate: Ref<number>,
    newIndex: number
) {
    if (props.items && newIndex > -1 && newIndex < props.items?.length) {
        resetZoomRotate(zoom, rotate);
        activeIndex.value = newIndex;
        activeItem.value = props.items.length > 0 ? props.items[newIndex] : undefined;
        emit('change', activeItem.value, newIndex);
    } else {
        throw Error('The given image index is out of bound.');
    }
}
