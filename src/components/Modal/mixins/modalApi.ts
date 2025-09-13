import { BsOverlay } from '@/components/Animation';
import { useClosePopover } from '@/components/Popover/mixins/popoverApi.ts';
import {
    cssPrefix,
    useBreakpointMax,
    useMergeClass,
    useRenderSlotWithWrapper,
    useRenderTransition,
} from '@/mixins/CommonApi.ts';
import type { TBsModal, TModalOptionProps, TRecord } from '@/types';
import Helper from '@/utils/Helper';
import type {
    ComponentInternalInstance,
    ComputedRef,
    ExtractPropTypes,
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
) {
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
    props: Readonly<ExtractPropTypes<TBsModal>>,
    modalOpen: Ref<boolean>,
    classNames: ComputedRef<TRecord>,
    dialogEl: Ref<HTMLElement | null>,
    headerEl: Ref<HTMLElement | null>,
    bodyEl: Ref<HTMLElement | null>,
    footerEl: Ref<HTMLElement | null>
): VNode {
    const thisProps = props as Readonly<TModalOptionProps>;

    return h(Teleport, { to: 'body' }, [
        h(BsOverlay, {
            color: props.overlayColor,
            opacity: props.overlayOpacity,
            // @ts-ignore
            show: (modalOpen.value && thisProps.overlay) as Prop<boolean>,
            // @ts-ignore
            fixed: true as Prop<boolean>,
            zIndex: 1037 as Prop<number>,
        }),
        createModalDialog(
            slots,
            instance,
            thisProps,
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
                      class: [`${cssPrefix}modal`],
                      onClick: () => {
                          (props.overlayClose || props.overlayClickClose) &&
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
                                  ? useRenderSlotWithWrapper(
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
                                  ? useRenderSlotWithWrapper(slots, 'footer', 'modal-footer', {
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
