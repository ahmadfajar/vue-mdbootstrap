import type {ComponentInternalInstance, ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {computed, defineComponent, getCurrentInstance, nextTick, onMounted, ref, shallowRef, watch} from "vue";
import type {TBsModal, TModalOptionProps, TRecord} from "../../types";
import {cssPrefix} from "../../mixins/CommonApi";
import {modalProps} from "./mixins/modalProps";
import {useRenderModalDialog, useSetDialogMaxHeight} from "./mixins/modalApi";
import PopupManager from "../Popover/mixins/PopupManager";

export default defineComponent<TBsModal, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsModal",
    props: modalProps,
    emits: [
        /**
         * Fired when the modal dialog is hiding.
         */
        "close",
        /**
         * Fired when this component's state is updated.
         */
        "update:open",
    ],
    setup(props, {emit, slots}) {
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
            [`${cssPrefix + thisProps.transition}`]: true
        }));

        watch(
            () => <boolean>thisProps.open,
            (value) => {
                modalOpen.value = value;
                if (value) {
                    instance.value && PopupManager.add(instance.value, thisProps, modalOpen);
                    nextTick().then(() => useSetDialogMaxHeight(thisProps, dialogEl, headerEl, bodyEl, footerEl));
                    // useSetDialogMaxHeight(thisProps, dialogEl, headerEl, bodyEl, footerEl);
                }
            }
        );

        onMounted(
            () => {
                instance.value = getCurrentInstance();
            }
        );

        return () =>
            useRenderModalDialog(
                slots, emit, instance, props, modalOpen, classNames,
                dialogEl, headerEl, bodyEl, footerEl,
            )
    }
});
