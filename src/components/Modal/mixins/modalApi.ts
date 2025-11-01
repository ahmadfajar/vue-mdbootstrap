import { BsOverlay } from '@/components/Animation';
import { useClosePopover } from '@/components/Popover/mixins/popoverApi.ts';
import {
  cssPrefix,
  useBreakpointMax,
  useMergeClass,
  useRenderTransition,
  useWrapSlot,
} from '@/mixins/CommonApi.ts';
import type { TModalOptionProps, TRecord } from '@/types';
import Helper from '@/utils/Helper.ts';
import type {
  ComponentInternalInstance,
  ComputedRef,
  Prop,
  Ref,
  ShallowRef,
  Slots,
  VNode,
} from 'vue';
import { createCommentVNode, createTextVNode, h, Teleport } from 'vue';

export function useSetDialogMaxHeight(
  props: Readonly<TModalOptionProps>,
  dialogEl: Ref<HTMLElement | null>,
  headerEl: Ref<HTMLElement | null>,
  bodyEl: Ref<HTMLElement | null>,
  footerEl: Ref<HTMLElement | null>
): void {
  if (!dialogEl.value) {
    return;
  }
  if (!props.scrollable) {
    dialogEl.value.style.maxHeight = '';
    return;
  }

  const contentMaxHeight = props.fullPage
    ? window.innerHeight
    : useBreakpointMax('sm')
      ? window.innerHeight - 64
      : window.innerHeight - 110;

  if (bodyEl.value) {
    let maxBodyHeight = contentMaxHeight;

    if (footerEl.value) {
      maxBodyHeight -= footerEl.value.offsetHeight;
    }
    if (headerEl.value) {
      maxBodyHeight -= headerEl.value.offsetHeight;
    }
    bodyEl.value.style.maxHeight = <string>Helper.cssUnit(maxBodyHeight);
  }

  dialogEl.value.style.maxHeight = <string>Helper.cssUnit(contentMaxHeight);
}

export function useRenderModalDialog(
  slots: Slots,
  instance: ShallowRef<ComponentInternalInstance | null>,
  props: Readonly<TModalOptionProps>,
  modalOpen: Ref<boolean>,
  classNames: ComputedRef<TRecord>,
  dialogEl: Ref<HTMLElement | null>,
  headerEl: Ref<HTMLElement | null>,
  bodyEl: Ref<HTMLElement | null>,
  footerEl: Ref<HTMLElement | null>
): VNode {
  return h(Teleport, { to: 'body' }, [
    h(BsOverlay, {
      color: props.overlayColor as Prop<string>,
      opacity: props.overlayOpacity as Prop<number>,
      show: (modalOpen.value && props.overlay) as unknown as Prop<boolean>,
      fixed: true as unknown as Prop<boolean>,
      zIndex: 1037 as Prop<number>,
    }),
    createModalDialog(
      slots,
      instance,
      props,
      modalOpen,
      classNames,
      dialogEl,
      headerEl,
      bodyEl,
      footerEl
    ),
  ]);
}

function createModalDialog(
  slots: Slots,
  instance: ShallowRef<ComponentInternalInstance | null>,
  props: Readonly<TModalOptionProps>,
  modalOpen: Ref<boolean>,
  classNames: ComputedRef<TRecord>,
  dialogEl: Ref<HTMLElement | null>,
  headerEl: Ref<HTMLElement | null>,
  bodyEl: Ref<HTMLElement | null>,
  footerEl: Ref<HTMLElement | null>
): VNode {
  return useRenderTransition(
    { name: 'modal-dialog' },
    modalOpen.value
      ? h(
          'div',
          {
            class: [`${cssPrefix}modal`, 'flex', 'items-center', 'justify-center', 'fixed'],
            onClick: () => {
              props.overlayClickClose &&
                useClosePopover(instance.value, modalOpen, 'Overlay clicked.');
            },
          },
          [
            h(
              'div',
              {
                ref: dialogEl,
                class: classNames.value,
                style: {
                  width: Helper.cssUnit(props.width),
                  maxWidth: Helper.cssUnit(props.maxWidth),
                },
              },
              [
                !Helper.isEmpty(props.title) || slots.header
                  ? useWrapSlot(
                      slots,
                      'header',
                      'modal-header',
                      {
                        ref: headerEl,
                        class: useMergeClass(
                          `${cssPrefix}modal-title`,
                          props.headerClass as string | string[]
                        ),
                      },
                      createTextVNode(props.title)
                    )
                  : createCommentVNode(' v-if-modal-header '),
                h(
                  'div',
                  {
                    ref: bodyEl,
                    class: useMergeClass(
                      `${cssPrefix}modal-body`,
                      props.bodyClass as string | string[]
                    ),
                  },
                  slots.default && slots.default()
                ),
                slots.footer
                  ? useWrapSlot(slots, 'footer', 'modal-footer', {
                      ref: footerEl,
                      class: useMergeClass(
                        `${cssPrefix}modal-footer`,
                        props.footerClass as string | string[]
                      ),
                    })
                  : createCommentVNode(' v-if-modal-footer '),
              ]
            ),
          ]
        )
      : createCommentVNode(' BsModal ')
  );
}
