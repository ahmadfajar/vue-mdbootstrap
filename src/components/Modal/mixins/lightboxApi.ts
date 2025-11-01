import { BsSpacer } from '@/components/Basic';
import { BsButton } from '@/components/Button';
import { BsDropdownMenu } from '@/components/Menu';
import { useClosePopover } from '@/components/Popover/mixins/popoverApi.ts';
import { Touch } from '@/directives';
import {
  cssPrefix,
  useBreakpointMax,
  useMergeClass,
  useMobileDevice,
  useRenderTransition,
} from '@/mixins/CommonApi.ts';
import type {
  TBsButton,
  TBsDropdownMenu,
  TButtonMode,
  TButtonSize,
  TEmitFn,
  TLightboxOptionProps,
  TLightboxSource,
  TPopoverPosition,
  TRecord,
} from '@/types';
import Helper from '@/utils/Helper.ts';
import { isContains } from '@/utils/StringHelper.ts';
import {
  type ComponentInternalInstance,
  type ComputedRef,
  createCommentVNode,
  h,
  type Prop,
  ref,
  type Ref,
  type ShallowRef,
  type Slots,
  Teleport,
  toDisplayString,
  type VNode,
  withDirectives,
} from 'vue';

export function useComputeDisplayStyle(
  props: Readonly<TLightboxOptionProps>,
  rotate: Ref<number>,
  zoom: Ref<number>
): TRecord | undefined {
  const scale =
    zoom.value !== 1 && (zoom.value < 5 || zoom.value > 0.4) ? `scale(${zoom.value})` : '';
  const rotation = [0, 360, -360].includes(rotate.value) ? '' : `rotate(${rotate.value}deg)`;

  if (scale !== '' && rotation !== '') {
    return {
      ...props.viewerStyles,
      transform: `${scale} ${rotation}`,
    };
  } else if (scale !== '') {
    return {
      ...props.viewerStyles,
      transform: scale,
    };
  } else if (rotation !== '') {
    return {
      ...props.viewerStyles,
      transform: rotation,
    };
  } else {
    return props.viewerStyles;
  }
}

export function useRenderLightbox(
  slots: Slots,
  emit: TEmitFn,
  instance: ShallowRef<ComponentInternalInstance | null>,
  props: Readonly<TLightboxOptionProps>,
  imgStyle: ComputedRef<TRecord | undefined>,
  isOpen: Ref<boolean>,
  activeItem: Ref<TLightboxSource | undefined>,
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
                `${cssPrefix}lightbox-container`,
                'fixed-top',
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
  activeItem: Ref<TLightboxSource | undefined>,
  itemIndex: Ref<number>,
  rotate: Ref<number>,
  zoom: Ref<number>
): VNode {
  if (!props.showToolbar && !props.showCounter) {
    return createCommentVNode(' v-if-toolbar ');
  }

  const dropdownOpen = ref(false);

  return h(
    'div',
    {
      class: [`${cssPrefix}lightbox-toolbar`, 'flex', 'justify-between', 'fixed-top'],
    },
    [
      props.showCounter === true
        ? h(
            'div',
            {
              class: [`${cssPrefix}counter`, 'hidden', 'd-md-flex', 'md:flex'],
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
              class: [`${cssPrefix}toolbar-items`, 'flex', `${cssPrefix}gap-x-1`],
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
                ? h<TBsDropdownMenu>(
                    BsDropdownMenu,
                    {
                      placement: 'bottom-right' as Prop<TPopoverPosition>,
                      space: 4 as Prop<number>,
                      'onUpdate:open': (state: boolean) => (dropdownOpen.value = state),
                    },
                    {
                      default: () =>
                        h<TBsButton>(BsButton, {
                          class: 'btn-menu',
                          color: 'light' as Prop<string>,
                          mode: 'icon' as Prop<TButtonMode>,
                          icon: 'more_vert' as Prop<string>,
                          flat: true as unknown as Prop<boolean>,
                          active: dropdownOpen.value as unknown as Prop<boolean>,
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
        color: 'light' as Prop<string>,
        mode: 'icon' as Prop<TButtonMode>,
        icon: icon as Prop<string>,
        flat: true as unknown as Prop<boolean>,
        onClick: () => clickHandler(),
      })
    : undefined;
}

function sourceIsYoutube(item: TLightboxSource): boolean {
  return item.type === 'youtube' || isContains(item.sourceUrl, ['youtube.com', 'youtu.be']);
}

function sourceIsMedia(item: TLightboxSource): boolean {
  return sourceIsYoutube(item) || item.type === 'video';
}

function normalizeYoutubeUrl(source: string): string {
  if (source.includes('youtube.com/watch?v=')) {
    return source.replace('youtube.com/watch?v=', 'youtube.com/embed/');
  } else if (source.includes('youtu.be')) {
    return source.replace('youtu.be', 'youtube.com/embed');
  }

  return source;
}

function mergeCssClass(
  props: Readonly<TLightboxOptionProps>,
  activeItem: TLightboxSource,
  other?: string | string[]
): string | string[] | undefined {
  if (props.viewerClass && activeItem.cssClass) {
    return useMergeClass(props.viewerClass, activeItem.cssClass, other!);
  }

  return useMergeClass(other!, (props.viewerClass || activeItem.cssClass)!);
}

function createIframeNode(
  props: Readonly<TLightboxOptionProps>,
  viewerStyle: ComputedRef<TRecord | undefined>,
  activeItem: TLightboxSource
): VNode {
  return h('iframe', {
    src: normalizeYoutubeUrl(activeItem.sourceUrl),
    allowfullscreen: true,
    class: mergeCssClass(props, activeItem, ['w-full', 'aspect-video']),
    style: viewerStyle.value,
    onClick: (e: Event) => e.stopPropagation(),
  });
}

function guessVideoType(source: string) {
  if (source.endsWith('m4v')) {
    return 'video/m4v';
  } else if (source.endsWith('webm')) {
    return 'video/webm';
  } else {
    return 'video/mp4';
  }
}

function createVideoNode(
  props: Readonly<TLightboxOptionProps>,
  viewerStyle: ComputedRef<TRecord | undefined>,
  activeItem: TLightboxSource
): VNode {
  return h(
    'video',
    {
      autoplay: true,
      controls: true,
      crossorigin: 'anonymous',
      // preload: 'metadata',
      class: mergeCssClass(props, activeItem, ['w-full', 'aspect-video']),
      style: viewerStyle.value,
      onClick: (e: Event) => e.stopPropagation(),
    },
    [
      h('source', {
        src: activeItem.sourceUrl,
        type: guessVideoType(activeItem.sourceUrl),
      }),
    ]
  );
}

function createImageNode(
  props: Readonly<TLightboxOptionProps>,
  viewerStyle: ComputedRef<TRecord | undefined>,
  activeItem: TLightboxSource
): VNode {
  return h('img', {
    class: mergeCssClass(props, activeItem),
    style: viewerStyle.value,
    alt: activeItem.title,
    src: activeItem.sourceUrl,
    rel: 'preload',
    onClick: (e: Event) => e.stopPropagation(),
  });
}

function createLightboxDisplay(
  emit: TEmitFn,
  instance: ShallowRef<ComponentInternalInstance | null>,
  props: Readonly<TLightboxOptionProps>,
  viewerStyle: ComputedRef<TRecord | undefined>,
  isOpen: Ref<boolean>,
  activeItem: Ref<TLightboxSource | undefined>,
  itemIndex: Ref<number>,
  zoom: Ref<number>,
  rotate: Ref<number>,
  transition: Ref<string>
): VNode {
  return h(
    'div',
    {
      class: [`${cssPrefix}lightbox-display`, 'flex', 'justify-center', 'items-center', 'relative'],
      style: {
        height:
          props.showThumbnail === true
            ? 'calc(100% - ' + (parseInt(props.thumbnailHeight as string) + 2) + 'px)'
            : '100%',
      },
      onClick: () => {
        props.overlayClickClose && useClosePopover(instance.value, isOpen, 'Overlay clicked.');
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
                key: activeItem.value.sourceUrl,
                class: [
                  `${cssPrefix}lightbox-item`,
                  'relative',
                  'overflow-hidden',
                  sourceIsMedia(activeItem.value) ? 'h-full' : '',
                  sourceIsMedia(activeItem.value) ? 'w-full' : '',
                ],
              },
              [
                withDirectives(
                  h(
                    'div',
                    {
                      class: [
                        `${cssPrefix}lightbox-item-view`,
                        'flex',
                        'items-center',
                        'h-full',
                        'relative',
                        'overflow-hidden',
                      ],
                    },
                    [
                      sourceIsYoutube(activeItem.value)
                        ? createIframeNode(props, viewerStyle, activeItem.value)
                        : activeItem.value.type === 'video'
                          ? createVideoNode(props, viewerStyle, activeItem.value)
                          : createImageNode(props, viewerStyle, activeItem.value),
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
                        class: [`${cssPrefix}lightbox-item-title`, 'w-full', 'absolute'],
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
  activeItem: Ref<TLightboxSource | undefined>,
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
      class: [`${cssPrefix}lightbox-controls`, 'flex', 'justify-between', 'fixed'],
      onClick: (e: Event) => e.stopPropagation(),
    },
    [
      h(
        'div',
        {
          class: [`${cssPrefix}control-prev`, 'inline-flex'],
        },
        [
          h(BsButton, {
            color: 'light' as Prop<string>,
            mode: 'icon' as Prop<TButtonMode>,
            icon: 'chevron_backward' as Prop<string>,
            size: 'lg' as Prop<TButtonSize>,
            flat: true as unknown as Prop<boolean>,
            iconSize: 40 as Prop<number>,
            onClick: (e: Event) => {
              e.stopPropagation();
              useNavigatePrevSlide(emit, props, activeItem, itemIndex, zoom, rotate, transition);
            },
          }),
        ]
      ),
      h(
        'div',
        {
          class: [`${cssPrefix}control-next`, 'inline-flex'],
        },
        [
          h(BsButton, {
            color: 'light' as Prop<string>,
            mode: 'icon' as Prop<TButtonMode>,
            icon: 'chevron_forward' as Prop<string>,
            size: 'lg' as Prop<TButtonSize>,
            flat: true as unknown as Prop<boolean>,
            iconSize: 40 as Prop<number>,
            onClick: (e: Event) => {
              e.stopPropagation();
              useNavigateNextSlide(emit, props, activeItem, itemIndex, zoom, rotate, transition);
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
  activeItem: Ref<TLightboxSource | undefined>,
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
  activeItem: Ref<TLightboxSource | undefined>,
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
  activeItem: Ref<TLightboxSource | undefined>,
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
      class: [`${cssPrefix}lightbox-thumbnail-container`, 'fixed-bottom'],
    },
    [
      h(
        'div',
        {
          class: [`${cssPrefix}lightbox-thumbnail-inner`, 'flex', 'flex-row'],
        },
        [
          h(
            'div',
            {
              class: [`${cssPrefix}lightbox-thumbnail-row`, 'flex'],
            },
            props.items.map((it, idx) => {
              return h(
                'div',
                {
                  key: `item-${idx}`,
                  class: [`${cssPrefix}thumbnail-item`, itemIndex.value === idx ? 'active' : ''],
                  onClick: () =>
                    useSetActiveLightboxItem(emit, props, activeItem, itemIndex, zoom, rotate, idx),
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
  activeItem: Ref<TLightboxSource | undefined>,
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
