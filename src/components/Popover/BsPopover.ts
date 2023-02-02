import type {ComponentInternalInstance, ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {
    computed,
    createCommentVNode,
    defineComponent,
    getCurrentInstance,
    h,
    mergeProps,
    nextTick,
    onMounted,
    ref,
    Teleport,
    vShow,
    watch,
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
import Helper from "../../utils/Helper";

export default defineComponent<TBsPopover, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsPopover",
    props: popoverProps,
    inheritAttrs: false,
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
            if (thisProps.overlay && !thisProps.overlayClickClose) {
                return;
            }
            const activatorEl = Helper.isString(thisProps.trigger)
                ? document.querySelector(<string>thisProps.trigger)
                : <Element>thisProps.trigger;
            if (activatorEl && activatorEl.contains(<Node>evt.target)) {
                return;
            }
            usePopoverClose(instance, isActive, "Clicked outside.");
            instance && PopupManager.remove(instance);
        };
        const classNames = computed(
            () => [
                `${cssPrefix}popover`,
                `transition-${actualPlacement.value}`,
                `bg-${thisProps.color}`,
            ]
        );

        watch(
            () => <boolean>thisProps.open,
            (value) => {
                isActive.value = value;
                if (value) {
                    setPosition();
                }
            }
        );
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
                        h("div", mergeProps(
                                {class: classNames.value, ref: popover},
                                // @ts-ignore
                                instance?.attrs),
                            slots.default && slots.default()),
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
