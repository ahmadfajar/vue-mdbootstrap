import type {ComponentInternalInstance, ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {computed, defineComponent, getCurrentInstance, nextTick, onMounted, ref, watch} from "vue";
import {popoverProps} from "./mixins/popoverProps";
import {useRenderPopover, useSetPopoverPosition} from "./mixins/popoverApi";
import {cssPrefix} from "../../mixins/CommonApi";
import type {TBsPopover, TPopoverOptionProps, TRecord} from "../../types";

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
            useRenderPopover(props, slots, instance, classNames, popover, actualPlacement, isActive)
    }
});
