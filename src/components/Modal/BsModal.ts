import { useRenderModalDialog, useSetDialogMaxHeight } from '@/components/Modal/mixins/modalApi.ts';
import { modalProps } from '@/components/Modal/mixins/modalProps.ts';
import type { TBsModal, TModalOptionProps } from '@/components/Modal/types';
import { PopupManager } from '@/components/Popover/mixins/PopupManager.ts';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import type { TRecord } from '@/types';
import type {
  ClosableEventProps,
  ClosableEventPublic,
  UpdateOpenEventProps,
  UpdateOpenEventPublic,
  VoidDefaultSlots,
} from '@/types/internals.ts';
import type {
  Component,
  ComponentInternalInstance,
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  Directive,
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
  nextTick,
  onMounted,
  ref,
  shallowRef,
  watch,
} from 'vue';

export default defineComponent<TBsModal>({
  name: 'BsModal',
  props: modalProps,
  emits: ['close', 'update:open'],
  setup(props, { slots }) {
    const thisProps = props as Readonly<TModalOptionProps>;
    const instance = shallowRef<ComponentInternalInstance | null>(null);
    const dialogEl = ref<HTMLElement | null>(null);
    const headerEl = ref<HTMLElement | null>(null);
    const bodyEl = ref<HTMLElement | null>(null);
    const footerEl = ref<HTMLElement | null>(null);
    const modalOpen = ref(<boolean>thisProps.open);
    const classNames = computed<TRecord>(() => ({
      [`${cssPrefix}modal-inner`]: true,
      [`${cssPrefix}modal-fullscreen`]: thisProps.fullPage,
      [`${cssPrefix}modal-scrollable`]: thisProps.scrollable,
      [`${cssPrefix + thisProps.transition}`]: true,
    }));

    watch(
      () => thisProps.open as boolean,
      async (value) => {
        if (value) {
          modalOpen.value = value;
          instance.value && PopupManager.add(instance.value, thisProps, modalOpen);
          await nextTick().then(() =>
            useSetDialogMaxHeight(thisProps, dialogEl, headerEl, bodyEl, footerEl)
          );
        } else {
          instance.value && PopupManager.closePopover(instance.value, modalOpen, 'State changed.');
        }
      }
    );

    onMounted(() => {
      instance.value = getCurrentInstance();
    });

    return () =>
      useRenderModalDialog(
        slots,
        instance,
        thisProps,
        modalOpen,
        classNames,
        dialogEl,
        headerEl,
        bodyEl,
        footerEl
      );
  },
}) as DefineComponent<
  TBsModal,
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  ModalEventProps,
  string,
  PublicProps,
  Readonly<TModalOptionProps> & Readonly<ModalEventPublic>,
  ExtractDefaultPropTypes<TBsModal>,
  SlotsType<ModalSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;

declare interface ModalSlots extends VoidDefaultSlots {
  /**
   * Additional slot used to place the modal dialog header content.
   */
  header?: () => VNode[] | VNode;

  /**
   * Additional slot used to place the modal dialog footer content.
   */
  footer?: () => VNode[] | VNode;
}

declare type ModalEventProps = ClosableEventProps & UpdateOpenEventProps;

declare interface ModalEventPublic extends ClosableEventPublic, UpdateOpenEventPublic {}
