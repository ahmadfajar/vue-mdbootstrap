import type {ComponentInternalInstance, ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {
    computed,
    createCommentVNode,
    defineComponent,
    getCurrentInstance,
    h,
    nextTick,
    onMounted,
    ref,
    Teleport,
    vShow,
    watchEffect,
    withDirectives
} from "vue";
import {popoverProps} from "./mixins/popoverProps";
import {usePopoverClose, useSetPopoverPosition} from "./mixins/popoverApi";
import {BsOverlay} from "../Animation";
import {cssPrefix, useRenderTransition} from "../../mixins/CommonApi";
import type {TBsPopover, TPopoverOptionProps, TRecord} from "../../types";
import clickOutside from "../../directives/ClickOutside";
import resize from "../../directives/Resize";
import scroll from "../../directives/Scroll";
import PopupManager from "./mixins/PopupManager";

export default defineComponent<TBsPopover, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsPopover",
    props: popoverProps,
    emits: [
        /**
         * Fired when this Popover state is updated.
         */
        "update:open",
        /**
         * Fired when this Popover closed or hide.
         */
        "close",
    ],
    setup(props, {slots}) {
        const thisProps = props as Readonly<TPopoverOptionProps>;
        const isActive = ref<boolean>(<boolean>thisProps.open);
        const actualPlacement = ref<string | undefined>(thisProps.placement);
        const popover = ref<Element | null>(null);
        let instance: ComponentInternalInstance | null;
        const setPosition = () => {
            nextTick().then(() =>
                useSetPopoverPosition(popover, instance, thisProps, actualPlacement, isActive)
            );
        };
        const onClickOutside = (evt: Event) => {
            if (thisProps.trigger && (<Element>thisProps.trigger).contains(<Node>evt.target)) {
                return;
            }
            if (thisProps.overlay && !thisProps.overlayClickClose) {
                return;
            }
            usePopoverClose(instance, isActive, "Clicked outside.");
            instance && PopupManager.remove(instance);
        }
        const classNames = computed(
            () => [
                `${cssPrefix}popover`,
                `transition-${actualPlacement.value}`,
                thisProps.color ? `bg-${thisProps.color}` : "",
            ]
        );

        watchEffect(() => {
            if (isActive.value) {
                setPosition();
            }
        });
        onMounted(() => {
            instance = getCurrentInstance();
            useSetPopoverPosition(popover, instance, thisProps, actualPlacement, isActive);
        });

        return () =>
            h(Teleport, {to: "body"}, [
                useRenderTransition({name: thisProps.transition}, [
                    thisProps.overlay
                        ? h(BsOverlay, {
                            show: props.overlay && props.open,
                            opacity: props.overlayOpacity,
                            color: props.overlayColor,
                        }) : createCommentVNode(" v-if-BsPopover-overlay ", true),
                    withDirectives(
                        h("div", {
                            class: classNames.value,
                            style: {"z-index": 1050},
                            ref: popover,
                        }, slots.default && slots.default()),
                        [
                            [vShow, isActive.value],
                            [clickOutside, onClickOutside],
                            [resize, setPosition],
                            [scroll, setPosition],
                        ]
                    ),
                ])
            ])
    }
});
