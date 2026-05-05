/* eslint-disable @typescript-eslint/no-empty-object-type */
import {
  useDisplayStyle,
  useNavigateNextSlide,
  useNavigatePrevSlide,
  useRenderLightbox,
  useSetActiveLightboxItem,
} from '@/components/Modal/mixins/lightboxApi.ts';
import { lightboxProps } from '@/components/Modal/mixins/lightboxProps.ts';
import type { TBsLightbox, TLightboxOptionProps, TLightboxSource } from '@/components/Modal/types';
import { PopupManager } from '@/components/Popover/mixins/PopupManager.ts';
import { EventListener } from '@/mixins/DomHelper.ts';
import type { IEventListenerResult, IHTMLElement, TRecord } from '@/types';
import type {
  ClosableEventProps,
  ClosableEventPublic,
  UpdateOpenEventProps,
  UpdateOpenEventPublic,
} from '@/types/internals.ts';
import type {
  ComponentInternalInstance,
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
  SlotsType,
  VNode,
} from 'vue';
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onBeforeMount,
  onMounted,
  onUnmounted,
  ref,
  shallowRef,
  watch,
} from 'vue';

export default defineComponent<TBsLightbox>({
  name: 'BsLightbox',
  props: lightboxProps,
  emits: [
    'change',
    'close',
    'exec-delete',
    'exec-download',
    'exec-info',
    'exec-rotate-left',
    'exec-rotate-right',
    'exec-zoomin',
    'exec-zoomout',
    'update:open',
  ],
  setup(props, { emit, expose, slots }) {
    const thisProps = props as Readonly<TLightboxOptionProps>;
    const instance = shallowRef<ComponentInternalInstance | null>(null);
    const activeItem = ref<TLightboxSource | undefined>(
      thisProps.items && thisProps.items.length > 0 ? thisProps.items[0] : undefined
    );
    const itemIndex = ref(thisProps.items && thisProps.items.length > 0 ? 0 : -1);
    const rotate = ref(0);
    const zoom = ref(1);
    const isOpen = ref(false);
    const transition = ref(<string>thisProps.transition);
    const viewerStyles = computed(() => useDisplayStyle(thisProps, rotate, zoom));
    let keyEvent: IEventListenerResult | undefined;

    const setActive = (index: number) =>
      useSetActiveLightboxItem(emit, thisProps, activeItem, itemIndex, zoom, rotate, index);
    const openAt = (index: number) => {
      if (thisProps.items && index > -1 && index < thisProps.items?.length) {
        itemIndex.value = index;
        activeItem.value = thisProps.items.length > 0 ? thisProps.items[index] : undefined;
        isOpen.value = true;
        emit('update:open', true);
      } else {
        throw Error('The given image index is out of bound.');
      }
    };
    const nextSlide = () => {
      useNavigateNextSlide(emit, thisProps, activeItem, itemIndex, zoom, rotate, transition);
    };
    const prevSlide = () => {
      useNavigatePrevSlide(emit, thisProps, activeItem, itemIndex, zoom, rotate, transition);
    };

    expose({ setActive, openAt, nextSlide, prevSlide });

    watch(
      () => thisProps.open as boolean,
      (value) => {
        if (value) {
          isOpen.value = value;
          zoom.value = 1;
          rotate.value = 0;
          itemIndex.value = itemIndex.value > -1 ? itemIndex.value : 0;
          activeItem.value =
            thisProps.items && thisProps.items.length > 0
              ? thisProps.items[itemIndex.value]
              : undefined;
          instance.value && PopupManager.add(instance.value, thisProps, isOpen);
        } else {
          instance.value && PopupManager.closePopover(instance.value, isOpen, 'State changed.');
        }
      }
    );

    onBeforeMount(() => {
      // preload images and store them globally in memory
      const images: HTMLImageElement[] = [];
      if (thisProps.items?.length) {
        thisProps.items.forEach((item, i) => {
          if (item.type === 'image') {
            images[i] = new Image();
            images[i].src = item.sourceUrl;
          }
        });
      }
    });

    onMounted(() => {
      instance.value = getCurrentInstance();
      keyEvent = EventListener.listen(document.body as IHTMLElement, 'keydown', (evt: Event) => {
        const evtKey = evt as KeyboardEvent;
        if (evtKey.key && evtKey.key === 'ArrowLeft') {
          isOpen.value &&
            useNavigatePrevSlide(emit, thisProps, activeItem, itemIndex, zoom, rotate, transition);
        } else if (evtKey.key && evtKey.key === 'ArrowRight') {
          isOpen.value &&
            useNavigateNextSlide(emit, thisProps, activeItem, itemIndex, zoom, rotate, transition);
        }
      });
    });
    onUnmounted(() => keyEvent?.remove());

    return () =>
      useRenderLightbox(
        slots,
        emit,
        instance,
        thisProps,
        viewerStyles,
        isOpen,
        activeItem,
        itemIndex,
        rotate,
        zoom,
        transition
      );
  },
}) as DefineComponent<
  TBsLightbox,
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  LightboxEventProps,
  string,
  PublicProps,
  Readonly<TLightboxOptionProps> & Readonly<LightboxEventPublic>,
  ExtractDefaultPropTypes<TBsLightbox>,
  SlotsType<LightboxSlots>,
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;

declare interface LightboxSlots {
  /**
   * The default slot used to place the dropdown-menu content.
   */
  menubar?: () => VNode[];
}

declare type LightboxEventProps = ClosableEventProps &
  UpdateOpenEventProps & {
    change?: (value: TLightboxSource, index: number) => void;
    'exec-delete'?: (target: TLightboxSource) => void;
    'exec-download'?: (target: TLightboxSource) => void;
    'exec-info'?: (target: TLightboxSource) => void;
    'exec-rotate-left'?: (target: TLightboxSource, rotate: number) => void;
    'exec-rotate-right'?: (target: TLightboxSource, rotate: number) => void;
    'exec-zoomin'?: (target: TLightboxSource, zoom: number) => void;
    'exec-zoomout'?: (target: TLightboxSource, zoom: number) => void;
  };

declare interface LightboxEventPublic extends ClosableEventPublic, UpdateOpenEventPublic {
  onChange?: (value: TLightboxSource, index: number) => void;
  onExecDelete?: (target: TLightboxSource) => void;
  onExecDownload?: (target: TLightboxSource) => void;
  onExecInfo?: (target: TLightboxSource) => void;
  onExecRotateLeft?: (target: TLightboxSource, rotate: number) => void;
  onExecRotateRight?: (target: TLightboxSource, rotate: number) => void;
  onExecZoomin?: (target: TLightboxSource, zoom: number) => void;
  onExecZoomout?: (target: TLightboxSource, zoom: number) => void;
  '@change'?: (value: TLightboxSource, index: number) => void;
  '@exec-delete'?: (target: TLightboxSource) => void;
  '@exec-download'?: (target: TLightboxSource) => void;
  '@exec-info'?: (target: TLightboxSource) => void;
  '@exec-rotate-left'?: (target: TLightboxSource, rotate: number) => void;
  '@exec-rotate-right'?: (target: TLightboxSource, rotate: number) => void;
  '@exec-zoomin'?: (target: TLightboxSource, zoom: number) => void;
  '@exec-zoomout'?: (target: TLightboxSource, zoom: number) => void;
}
