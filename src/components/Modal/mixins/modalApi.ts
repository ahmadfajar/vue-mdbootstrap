import type {ComponentInternalInstance, ComputedRef, ExtractPropTypes, Ref, ShallowRef, Slots, VNode} from "vue";
import {createCommentVNode, createTextVNode, h, Teleport} from "vue";
import type {TBsModal, TEmitFn, TModalOptionProps, TRecord} from "../../../types";
import {
    cssPrefix,
    useBreakpointMax,
    useMergeClass,
    useRenderSlotWithWrapper,
    useRenderTransition
} from "../../../mixins/CommonApi";
import {useClosePopover} from "../../Popover/mixins/popoverApi";
import {BsOverlay} from "../../Animation";
import Helper from "../../../utils/Helper";

export function useSetDialogMaxHeight(
    props: Readonly<TModalOptionProps>,
    dialogEl: Ref<HTMLElement | null>,
    headerEl: Ref<HTMLElement | null>,
    bodyEl: Ref<HTMLElement | null>,
    footerEl: Ref<HTMLElement | null>,
) {
    if (!dialogEl.value) {
        return;
    }
    if (!props.scrollable) {
        dialogEl.value.style.maxHeight = '';
        return;
    }

    const contentMaxHeight = useBreakpointMax("sm")
        ? (window.innerHeight - 64) : (window.innerHeight - 128);

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
    emit: TEmitFn,
    instance: ShallowRef<ComponentInternalInstance | null>,
    props: Readonly<ExtractPropTypes<TBsModal>>,
    modalOpen: Ref<boolean>,
    classNames: ComputedRef<TRecord>,
    dialogEl: Ref<HTMLElement | null>,
    headerEl: Ref<HTMLElement | null>,
    bodyEl: Ref<HTMLElement | null>,
    footerEl: Ref<HTMLElement | null>,
): VNode {
    const thisProps = props as Readonly<TModalOptionProps>;

    return h(Teleport, {to: "body"}, [
        // @ts-ignore
        h(BsOverlay, {
            color: props.overlayColor,
            opacity: props.overlayOpacity,
            show: modalOpen.value && thisProps.overlay,
            fixed: true,
            zIndex: 1060,

        }),
        createModalDialog(
            slots, instance, thisProps, modalOpen, classNames,
            dialogEl, headerEl, bodyEl, footerEl,
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
    footerEl: Ref<HTMLElement | null>,
): VNode {
    return useRenderTransition({name: "modal-dialog"},
        modalOpen.value
            ? h("div", {
                class: [`${cssPrefix}modal`],
                onClick: () => {
                    (props.overlayClose || props.overlayClickClose) &&
                    useClosePopover(instance.value, modalOpen, "Overlay clicked.");
                }
            }, [
                h("div", {
                    ref: dialogEl,
                    class: classNames.value,
                    style: {
                        width: Helper.cssUnit(props.width),
                        maxWidth: Helper.cssUnit(props.maxWidth),
                    },
                }, [
                    (
                        !Helper.isEmpty(props.title) || slots.header
                            ? useRenderSlotWithWrapper(
                                slots, "header", "modal-header", {
                                    ref: headerEl,
                                    class: useMergeClass(`${cssPrefix}modal-title`, <string>props.headerClass)
                                },
                                createTextVNode(props.title)
                            )
                            : createCommentVNode(" v-if-modal-header ")
                    ),
                    h("div", {
                        ref: bodyEl,
                        class: useMergeClass(`${cssPrefix}modal-body`, <string>props.bodyClass)
                    }, slots.default && slots.default()),
                    (
                        slots.footer
                            ? useRenderSlotWithWrapper(
                                slots, "footer", "modal-footer", {
                                    ref: footerEl,
                                    class: useMergeClass(`${cssPrefix}modal-footer`, <string>props.footerClass)
                                }
                            )
                            : createCommentVNode(" v-if-modal-footer ")
                    ),
                ])
            ])
            : createCommentVNode(" BsModal ")
    );
}
